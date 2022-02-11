import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import configs from "../../utils/configs";
import { useIntl } from "react-intl";
import { LoadingScreen } from "./LoadingScreen";
import { useRoomLoadingState } from "./useRoomLoadingState";

export function LoadingScreenContainer({ onLoaded, scene }) {
  const intl = useIntl();

  const { loading, message } = useRoomLoadingState(scene);

  useEffect(
    () => {
      if (!loading) {
        onLoaded();
      }
    },
    [loading, onLoaded]
  );

  //TODO: Make these configurable
  const infoMessages = useMemo(
    () => [
      {
        heading: intl.formatMessage({ id: "loading-screen.heading.tip", defaultMessage: "Dica:" }),
        message: intl.formatMessage({
          id: "loading-screen.message.keyboard-controls",
          defaultMessage: "Pressione Q e E para virar para a esquerda e para a direita."
        })
      },
      {
        heading: intl.formatMessage({ id: "loading-screen.heading.whats-new", defaultMessage: "O que há de novo?" }),
        message: intl.formatMessage(
          {
            id: "loading-screen.message.whats-new",
            defaultMessage: "Você agora pode definir seu local nas configurações. <a>Leia Mais</a>"
          },
          {
            // eslint-disable-next-line react/display-name
            a: chunks => (
              <a href="/whats-new" target="_blank">
                {chunks}
              </a>
            )
          }
        )
      }
    ],
    [intl]
  );

  return <LoadingScreen logoSrc={configs.image("logo")} message={message} infoMessages={infoMessages} />;
}

LoadingScreenContainer.propTypes = {
  scene: PropTypes.object.isRequired,
  onLoaded: PropTypes.func.isRequired
};
