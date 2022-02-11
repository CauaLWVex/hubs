import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { FormattedMessage, useIntl, defineMessages } from "react-intl";
import { Tip } from "./Tip";
import { useEffect } from "react";
import { discordBridgesForPresences, hasEmbedPresences } from "../../utils/phoenix-utils";
import configs from "../../utils/configs";

// These keys are hardcoded in the input system to be based on the physical location on the keyboard rather than character
let moveKeys = "W A S D";
let turnLeftKey = "Q";
let turnRightKey = "E";

// TODO The API to map from physical key to character is experimental. Depending on prospects of this getting wider
// implimentation we may want to cook up our own polyfill based on observing key inputs
if (window.navigator.keyboard !== undefined && window.navigator.keyboard.getLayoutMap) {
  window.navigator.keyboard
    .getLayoutMap()
    .then(function(map) {
      moveKeys = `${map.get("KeyW") || "W"} ${map.get("KeyA") || "A"} ${map.get("KeyS") || "S"} ${map.get("KeyD") ||
        "D"}`.toUpperCase();
      turnLeftKey = map.get("KeyQ")?.toUpperCase();
      turnRightKey = map.get("KeyE")?.toUpperCase();
    })
    .catch(function(e) {
      // This occurs on Chrome 93 when the Hubs page is in an iframe
      console.warn(`Unable to remap keyboard: ${e}`);
    });
}

const onboardingMessages = defineMessages({
  "tips.mobile.look": {
    id: "tips.mobile.look",
    defaultMessage: "Bem Vindo! 👋 Clique e arraste para olhar ao redor."
  },
  "tips.mobile.locomotion": {
    id: "tips.mobile.locomotion",
    defaultMessage: "Ótimo! Para se mover, faça uma pinça com 2 dedos."
  },
  "tips.mobile.invite": {
    id: "tips.mobile.invite",
    defaultMessage: "Use o Botão de Convite no canto esquerdo da tela para compartilhar a sala."
  },
  "tips.desktop.look": {
    id: "tips.desktop.look",
    defaultMessage: "Bem Vindo ao {appName}! Vamos fazer um tour rápido. 👋 Clique e arraste para olhar ao redor."
  },
  "tips.desktop.locomotion": {
    id: "tips.desktop.locomotion",
    defaultMessage: "Use as teclas {moveKeys} para se mover. Segure shift para correr."
  },
  "tips.desktop.turning": {
    id: "tips.desktop.turning",
    defaultMessage: "Perfeito. Use a tecla {turnLeftKey} e a {turnRightKey} para rotacionar."
  },
  "tips.desktop.invite": {
    id: "tips.desktop.invite",
    defaultMessage: "Ninguém mais esta aqui. Use o Botão de Convite na esquerda da tela para compartilhar a sala."
  }
});

function OkDismissLabel() {
  return <FormattedMessage id="tips.dismiss.ok" defaultMessage="Ok" />;
}

function SkipDismissLabel() {
  return <FormattedMessage id="tips.dismiss.skip" defaultMessage="Pular" />;
}

export function FullscreenTip(props) {
  return (
    <Tip {...props} dismissLabel={<OkDismissLabel />}>
      <FormattedMessage id="tips.fullscreen" defaultMessage="Entrou em modo tela cheia. Pressione Esc para mostrar a interface." />
    </Tip>
  );
}

export function TipContainer({ hide, inLobby, inRoom, isStreaming, isEmbedded, scene, store, hubId, presences }) {
  const intl = useIntl();
  const [lobbyTipDismissed, setLobbyTipDismissed] = useState(false);
  const [broadcastTipDismissed, setBroadcastTipDismissed] = useState(() =>
    store.state.confirmedBroadcastedRooms.includes(hubId)
  );
  const [streamingTipDismissed, setStreamingTipDismissed] = useState(false);
  const [embeddedTipDismissed, setEmbeddedTipDismissed] = useState(false);
  const [onboardingTipId, setOnboardingTipId] = useState(null);

  const onSkipOnboarding = useCallback(
    () => {
      scene.systems.tips.skipTips();
    },
    [scene]
  );

  useEffect(
    () => {
      function onSceneTipChanged({ detail: tipId }) {
        setOnboardingTipId(tipId);
      }

      scene.addEventListener("tip-changed", onSceneTipChanged);

      setOnboardingTipId(scene.systems.tips.activeTip);
    },
    [scene]
  );

  const discordBridges = presences ? discordBridgesForPresences(presences) : [];
  const isBroadcasting = discordBridges.length > 0;

  // TODO: This only exists because we store local state in this component.
  // If we move tip state to a context then we can remove this and not render this component at all.
  if (hide) {
    return null;
  }

  if (inLobby) {
    if (lobbyTipDismissed) {
      return null;
    }

    return (
      <Tip onDismiss={() => setLobbyTipDismissed(true)} dismissLabel={<OkDismissLabel />}>
        <FormattedMessage id="tips.lobby" defaultMessage="Você está no Lobby. Os outros não podem te ver ou ouvir." />
      </Tip>
    );
  } else if (inRoom) {
    if (onboardingTipId) {
      return (
        <Tip onDismiss={onSkipOnboarding} dismissLabel={<SkipDismissLabel />}>
          {intl.formatMessage(onboardingMessages[onboardingTipId], {
            appName: configs.translation("app-name"),
            moveKeys,
            turnLeftKey,
            turnRightKey
          })}
        </Tip>
      );
    }

    if (isStreaming && !streamingTipDismissed) {
      return (
        <Tip onDismiss={() => setStreamingTipDismissed(true)} dismissLabel={<OkDismissLabel />}>
          <FormattedMessage
            id="tips.streaming"
            defaultMessage="Agora transmitindo para o Lobby. Saia do Modo Streamer quando estiver pronto."
          />
        </Tip>
      );
    }

    if (isBroadcasting && !broadcastTipDismissed) {
      return (
        <Tip onDismiss={() => setBroadcastTipDismissed(true)} dismissLabel={<OkDismissLabel />}>
          <FormattedMessage
            id="tips.discord"
            defaultMessage="Chat in this room is being bridged to {broadcastTarget} on Discord."
            values={{ broadcastTarget: discordBridges.map(channelName => "#" + channelName).join(", ") }}
          />
        </Tip>
      );
    }

    if ((isEmbedded || hasEmbedPresences(presences)) && !embeddedTipDismissed) {
      return (
        <Tip onDismiss={() => setEmbeddedTipDismissed(true)} dismissLabel={<OkDismissLabel />}>
          <FormattedMessage
            id="tips.embedded"
            defaultMessage="This room is embedded, so it may be visible to visitors on other websites."
          />
        </Tip>
      );
    }

    return null;
  }

  return null;
}

TipContainer.propTypes = {
  hide: PropTypes.bool,
  inLobby: PropTypes.bool,
  inRoom: PropTypes.bool,
  isStreaming: PropTypes.bool,
  isEmbedded: PropTypes.bool,
  scene: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  hubId: PropTypes.string,
  presences: PropTypes.object
};
