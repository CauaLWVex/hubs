import React from "react";
import PropTypes from "prop-types";
import { Modal } from "../modal/Modal";
import { Button } from "../input/Button";
import { ReactComponent as VRIcon } from "../icons/VR.svg";
import styles from "./EnterOnDeviceModal.scss";
import { BackButton } from "../input/BackButton";
import { Column } from "../layout/Column";
import { FormattedMessage, useIntl } from "react-intl";

export function EnterOnDeviceModal({
  className,
  shortUrl,
  loadingCode,
  code,
  headsetConnected,
  unsupportedBrowser,
  onEnterOnConnectedHeadset,
  onBack,
  ...rest
}) {
  const intl = useIntl();

  return (
    <Modal
      title={<FormattedMessage id="enter-on-device-modal.title" defaultMessage="Entrar em VR" />}
      beforeTitle={<BackButton onClick={onBack} />}
      className={className}
      {...rest}
    >
      <Column center={loadingCode ? "both" : true} padding grow>
        {loadingCode ? (
          <b>
            <FormattedMessage id="enter-on-device-modal.generating-code" defaultMessage="Gerando código de entrada..." />
          </b>
        ) : (
          <>
            <b>
              <FormattedMessage id="enter-on-device-modal.heading" defaultMessage="Entrar em Headset Sem Fio / Celular" />
            </b>
            <small>
              <FormattedMessage
                id="enter-on-device-modal.short-url-directions"
                defaultMessage="No navegador do seu dispositivo, vá para:"
              />
            </small>
            <div className={styles.shortUrlContainer}>{shortUrl}</div>
            <small>
              <FormattedMessage
                id="enter-on-device-modal.code-directions"
                defaultMessage="Então, insira este código único:"
              />
            </small>
            <div className={styles.codeContainer}>
              {code.split("").map((char, i) => (
                <div key={i} className={styles.codeLetter}>
                  {char}
                </div>
              ))}
            </div>
            <strong>
              <FormattedMessage
                id="enter-on-device-modal.data-transfer"
                defaultMessage="Sua conta e avatar serão transferidos para o dispositivo."
              />
            </strong>
            <strong>
              <FormattedMessage
                id="enter-on-device-modal.keep-page-open"
                defaultMessage="Mantenha esta página aberta para usar este código."
              />
            </strong>
            {headsetConnected && (
              <>
                <hr
                  data-or-text={intl.formatMessage({ id: "enter-on-device-modal.divider-label", defaultMessage: "ou" })}
                />
                <b>
                  <FormattedMessage
                    id="enter-on-device-modal.headset-connected-heading"
                    defaultMessage="Entre no Headset Conectado"
                  />
                </b>
                {unsupportedBrowser ? (
                  <>
                    <small>
                      <FormattedMessage
                        id="enter-on-device-modal.unsupported-browser"
                        defaultMessage="WebVR não é suportado neste navegador, para entrar com Oculus ou SteamVR, use o Firefox."
                      />
                    </small>
                    <Button
                      as="a"
                      preset="accent2"
                      href="https://www.mozilla.org/firefox/"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <span>
                        <FormattedMessage
                          id="enter-on-device-modal.download-firefox-button"
                          defaultMessage="Baixe o Firefox"
                        />
                      </span>
                    </Button>
                  </>
                ) : (
                  <>
                    <small>
                      <FormattedMessage
                        id="enter-on-device-modal.headset-connected-message"
                        defaultMessage="Você tem um headset VR conectado à este dispositivo."
                      />
                    </small>
                    <Button preset="accent5" onClick={onEnterOnConnectedHeadset}>
                      <VRIcon />
                      <span>
                        <FormattedMessage id="enter-on-device-modal.enter-in-vr-button" defaultMessage="Entre no VR" />
                      </span>
                    </Button>
                  </>
                )}
              </>
            )}
          </>
        )}
      </Column>
    </Modal>
  );
}

EnterOnDeviceModal.propTypes = {
  className: PropTypes.string,
  shortUrl: PropTypes.string.isRequired,
  loadingCode: PropTypes.bool,
  code: PropTypes.string,
  headsetConnected: PropTypes.bool,
  unsupportedBrowser: PropTypes.bool,
  onEnterOnConnectedHeadset: PropTypes.func,
  onBack: PropTypes.func
};
