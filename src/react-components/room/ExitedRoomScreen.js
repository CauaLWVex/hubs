import React from "react";
import PropTypes from "prop-types";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import { LoadingScreenLayout } from "../layout/LoadingScreenLayout";
import { Button } from "../input/Button";

export const ExitReason = {
  exited: "exited",
  closed: "closed",
  denied: "denied",
  disconnected: "disconnected",
  left: "left",
  full: "full",
  sceneError: "sceneError",
  connectError: "connectError",
  versionMismatch: "versionMismatch"
};

const messages = defineMessages({
  [ExitReason.exited]: {
    id: "exited-room-screen.reason.exited",
    defaultMessage: "Sua sessão terminou. Reinicie seu navegador para iniciar uma nova."
  },
  [ExitReason.closed]: {
    id: "exited-room-screen.reason.closed",
    defaultMessage: "Esta sala não está mais disponível."
  },
  [ExitReason.denied]: {
    id: "exited-room-screen.reason.denied",
    defaultMessage: "Você não tem permissão para acessar esta sala. Por favor solicite acesso ao criador da sala."
  },
  [ExitReason.disconnected]: {
    id: "exited-room-screen.reason.disconnected",
    defaultMessage: "Você foi desconectado da sala. Recarrege a sala para tentar novamente."
  },
  [ExitReason.left]: {
    id: "exited-room-screen.reason.left",
    defaultMessage: "Você saiu da sala."
  },
  [ExitReason.full]: {
    id: "exited-room-screen.reason.full",
    defaultMessage: "Esta sala está cheia, por favor tente novamente mais tarde."
  },
  [ExitReason.sceneError]: {
    id: "exited-room-screen.reason.scene-error",
    defaultMessage: "A cena falhou ao carregar."
  },
  [ExitReason.connectError]: {
    id: "exited-room-screen.reason.connect-error",
    defaultMessage: "Impossível de conectar à esta sala, por favor tente novamenet."
  },
  [ExitReason.versionMismatch]: {
    id: "exited-room-screen.reason.version-mismatch",
    defaultMessage: "A versão que você publicou não está disponível ainda. Seu navegador irá recarregar em 5 segundos."
  }
});

export function ExitedRoomScreen({ reason, showTerms, termsUrl, logoSrc, showSourceLink }) {
  const intl = useIntl();

  let subtitle = null;
  if (reason === ExitReason.closed) {
    const contactEmail = intl.formatMessage({ id: "contact-email" });

    subtitle = (
      <>
        <b>
          <FormattedMessage
            id="exited-room-screen.no-longer-availible"
            defaultMessage="Desculpe, esta sala não está mais disponível."
          />
        </b>
        {showTerms && (
          <p>
            <FormattedMessage
              id="exited-room-screen.closed-room-tos"
              defaultMessage="Uma sala deve ser fechada pelo dono, ou se for reportada por violar os <toslink>Termos de Uso</toslink>."
              values={{
                // eslint-disable-next-line react/display-name
                toslink: chunks => (
                  <a target="_blank" rel="noreferrer noopener" href={termsUrl}>
                    {chunks}
                  </a>
                )
              }}
            />
          </p>
        )}
        <p>
          <FormattedMessage
            id="exited-room-screen.contact-us"
            defaultMessage="Se você tem perguntas, entre em contato por {contactEmail}."
            values={{ contactEmail: <a href={`mailto:${contactEmail}`}>{contactEmail}</a> }}
          />
        </p>
        {showSourceLink && (
          <p>
            <FormattedMessage
              id="exited-room-screen.source-link"
              defaultMessage="<a></a>"
              values={{
                // eslint-disable-next-line react/display-name
                a: chunks => <a href="https://github.com/mozilla/hubs">{chunks}</a>
              }}
            />
          </p>
        )}

        <Button as="a" preset="accept" href="/">
          <FormattedMessage id="exited-room-screen.home-button" defaultMessage="Voltar ao Ínicio" />
        </Button>
      </>
    );
  } else {
    const tcpUrl = new URL(document.location.toString());
    const tcpParams = new URLSearchParams(tcpUrl.search);
    tcpParams.set("force_tcp", true);
    tcpUrl.search = tcpParams.toString();

    subtitle = (
      <>
        <b>{intl.formatMessage(messages[reason])}</b>

        {reason === ExitReason.connectError && (
          <p>
            <FormattedMessage
              id="exited-room-screen.connect-tcp"
              defaultMessage="Você pode tentar <a>conectar via TCP</a>, que pode ser melhor em algumas conexões."
              values={{
                // eslint-disable-next-line react/display-name
                a: chunks => <a href={tcpUrl.toString()}>{chunks}</a>
              }}
            />
          </p>
        )}
        {![ExitReason.left, ExitReason.disconnected, ExitReason.sceneError].includes(reason) && (
          <p>
            <FormattedMessage
              id="exited-room-screen.create-room"
              defaultMessage="Você também pode <a>criar uma nova sala</a>."
              values={{
                // eslint-disable-next-line react/display-name
                a: chunks => <a href="/">{chunks}</a>
              }}
            />
          </p>
        )}

        <Button as="a" preset="accept" href={window.location.href}>
          <FormattedMessage id="exited-room-screen.refresh-page-button" defaultMessage="Recarregar Página" />
        </Button>
      </>
    );
  }

  return <LoadingScreenLayout center={subtitle} logoSrc={logoSrc} />;
}

ExitedRoomScreen.propTypes = {
  reason: PropTypes.string.isRequired,
  showTerms: PropTypes.bool,
  termsUrl: PropTypes.string,
  logoSrc: PropTypes.string,
  showSourceLink: PropTypes.bool
};
