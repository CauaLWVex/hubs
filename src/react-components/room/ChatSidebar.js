import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Sidebar } from "../sidebar/Sidebar";
import { CloseButton } from "../input/CloseButton";
import { ReactComponent as WandIcon } from "../icons/Wand.svg";
import { ReactComponent as AttachIcon } from "../icons/Attach.svg";
import { ReactComponent as ChatIcon } from "../icons/Chat.svg";
import { ReactComponent as SendIcon } from "../icons/Send.svg";
import { ReactComponent as ReactionIcon } from "../icons/Reaction.svg";
import { IconButton } from "../input/IconButton";
import { TextAreaInput } from "../input/TextAreaInput";
import { ToolbarButton } from "../input/ToolbarButton";
import { Popover } from "../popover/Popover";
import { EmojiPicker } from "./EmojiPicker";
import styles from "./ChatSidebar.scss";
import { formatMessageBody } from "../../utils/chat-message";
import { FormattedMessage, useIntl, defineMessages, FormattedRelativeTime } from "react-intl";

export function SpawnMessageButton(props) {
  return (
    <IconButton className={styles.chatInputIcon} {...props}>
      <WandIcon />
    </IconButton>
  );
}

export function SendMessageButton(props) {
  return (
    <IconButton className={styles.chatInputIcon} {...props}>
      <SendIcon />
    </IconButton>
  );
}

export function EmojiPickerPopoverButton({ onSelectEmoji }) {
  return (
    <Popover
      title=""
      content={props => (
        <EmojiPicker
          onSelect={emoji => {
            onSelectEmoji(emoji);
            // eslint-disable-next-line react/prop-types
            props.closePopover();
          }}
          {...props}
        />
      )}
      placement="top"
      offsetDistance={28}
    >
      {({ togglePopover, popoverVisible, triggerRef }) => (
        <IconButton ref={triggerRef} className={styles.chatInputIcon} selected={popoverVisible} onClick={togglePopover}>
          <ReactionIcon />
        </IconButton>
      )}
    </Popover>
  );
}

EmojiPickerPopoverButton.propTypes = {
  onSelectEmoji: PropTypes.func.isRequired
};

export function MessageAttachmentButton(props) {
  return (
    <>
      <IconButton as="label" className={styles.chatInputIcon}>
        <AttachIcon />
        <input type="file" {...props} />
      </IconButton>
    </>
  );
}

export function ChatLengthWarning({ messageLength, maxLength }) {
  return (
    <p
      className={classNames(styles.chatInputWarning, {
        [styles.warningTextColor]: messageLength > maxLength
      })}
    >
      <FormattedMessage id="chat-message-input.warning-max-characters" defaultMessage="Máximo de carácteres" />
      {` (${messageLength}/${maxLength})`}
    </p>
  );
}

ChatLengthWarning.propTypes = {
  messageLength: PropTypes.number,
  maxLength: PropTypes.number
};

export function ChatInput({ warning, isOverMaxLength, ...props }) {
  const intl = useIntl();

  return (
    <div className={styles.chatInputContainer}>
      <TextAreaInput
        textInputStyles={styles.chatInputTextAreaStyles}
        className={classNames({ [styles.warningBorder]: isOverMaxLength })}
        placeholder={intl.formatMessage({ id: "chat-sidebar.input.placeholder", defaultMessage: "Mensagem..." })}
        {...props}
      />
      {warning}
    </div>
  );
}

ChatInput.propTypes = {
  onSpawn: PropTypes.func,
  warning: PropTypes.node,
  isOverMaxLength: PropTypes.bool
};

const enteredMessages = defineMessages({
  room: { id: "chat-sidebar.system-message.entered-room", defaultMessage: "{name} entrou na sala." },
  lobby: { id: "chat-sidebar.system-message.entered-lobby", defaultMessage: "{name} entrou no lobby." }
});

const joinedMessages = defineMessages({
  lobby: { id: "chat-sidebar.system-message.joined-lobby", defaultMessage: "{name} juntou-se ao lobby." },
  room: { id: "chat-sidebar.system-message.joined-room", defaultMessage: "{name} juntou-se à sala." }
});

export const LogMessageType = {
  roomEntryRequired: "roomEntryRequired",
  flyModeDisabled: "flyModeDisabled",
  flyModeEnabled: "flyModeEnabled",
  unauthorizedSceneChange: "unauthorizedSceneChange",
  invalidSceneUrl: "invalidSceneUrl",
  unauthorizedRoomRename: "unauthorizedRoomRename",
  captureUnavailable: "captureUnavailable",
  captureStopped: "captureStopped",
  captureStarted: "captureStarted",
  captureAlreadyStopped: "captureAlreadyStopped",
  captureAlreadyRunning: "captureAlreadyRunning",
  positionalAudioEnabled: "positionalAudioEnabled",
  positionalAudioDisabled: "positionalAudioDisabled",
  setAudioNormalizationFactor: "setAudioNormalizationFactor",
  audioNormalizationDisabled: "audioNormalizationDisabled",
  audioNormalizationNaN: "audioNormalizationNaN",
  invalidAudioNormalizationRange: "invalidAudioNormalizationRange",
  audioSuspended: "audioSuspended",
  audioResumed: "audioResumed",
  joinFailed: "joinFailed",
  avatarChanged: "avatarChanged"
};

const logMessages = defineMessages({
  [LogMessageType.roomEntryRequired]: {
    id: "chat-sidebar.log-message.room-entry-required",
    defaultMessage: "Você precisa entrar na sala para usar este comando."
  },
  [LogMessageType.flyModeDisabled]: {
    id: "chat-sidebar.log-message.fly-mode-disabled",
    defaultMessage: "Modo de voo desativado."
  },
  [LogMessageType.flyModeEnabled]: {
    id: "chat-sidebar.log-message.fly-mode-enabled",
    defaultMessage: "Modo de voo ativado."
  },
  [LogMessageType.unauthorizedSceneChange]: {
    id: "chat-sidebar.log-message.unauthorized-scene-change",
    defaultMessage: "Você não tem permissão para mudar a sala."
  },
  [LogMessageType.invalidSceneUrl]: {
    id: "chat-sidebar.log-message.invalid-scene-url",
    defaultMessage: "Essa URL não aponta para uma cena ou um GLB válido."
  },
  [LogMessageType.unauthorizedRoomRename]: {
    id: "chat-sidebar.log-message.unauthorized-room-rename",
    defaultMessage: "Você não tem permissão para renomear esta sala."
  },
  [LogMessageType.captureUnavailable]: {
    id: "chat-sidebar.log-message.capture-unavailable",
    defaultMessage: "Captura indisponível."
  },
  [LogMessageType.captureStopped]: {
    id: "chat-sidebar.log-message.capture-stopped",
    defaultMessage: "Captura encerrada."
  },
  [LogMessageType.captureStarted]: {
    id: "chat-sidebar.log-message.capture-started",
    defaultMessage: "Captura iniciada."
  },
  [LogMessageType.captureAlreadyStopped]: {
    id: "chat-sidebar.log-message.capture-already-stopped",
    defaultMessage: "Captura já encerrada."
  },
  [LogMessageType.captureAlreadyRunning]: {
    id: "chat-sidebar.log-message.capture-already-running",
    defaultMessage: "Captura já iniciada."
  },
  [LogMessageType.positionalAudioEnabled]: {
    id: "chat-sidebar.log-message.positional-audio-enabled",
    defaultMessage: "Áudio posicional ativado."
  },
  [LogMessageType.positionalAudioDisabled]: {
    id: "chat-sidebar.log-message.positional-audio-disabled",
    defaultMessage: "Áudio posicional desativado."
  },
  [LogMessageType.setAudioNormalizationFactor]: {
    id: "chat-sidebar.log-message.set-audio-normalization-factor",
    defaultMessage: "audioNormalization está setado para {factor}."
  },
  [LogMessageType.audioNormalizationDisabled]: {
    id: "chat-sidebar.log-message.audio-normalization-disabled",
    defaultMessage: "audioNormalization está desativado."
  },
  [LogMessageType.audioNormalizationNaN]: {
    id: "chat-sidebar.log-message.audio-normalization-nan",
    defaultMessage: "comando de audioNormalization precisa de um parâmetro numérico válido."
  },
  [LogMessageType.invalidAudioNormalizationRange]: {
    id: "chat-sidebar.log-message.invalid-audio-normalization-range",
    defaultMessage:
      "comando de audioNormalization precisa de um número base entre 0 [no normalization] e 255. O padrão é 0. Se você quer habilitar a normalização o valor recomendado é 4."
  },
  [LogMessageType.audioSuspended]: {
    id: "chat-sidebar.log-message.audio-suspended",
    defaultMessage: "O áudio foi suspenso, clique em algum lugar da sala para reativa-lo."
  },
  [LogMessageType.audioResumed]: {
    id: "chat-sidebar.log-message.audio-resumed",
    defaultMessage: "O áudio foi reativado."
  },
  [LogMessageType.joinFailed]: {
    id: "chat-sidebar.log-message.join-failed",
    defaultMessage: "Falha ao entrar na sala: {message}"
  },
  [LogMessageType.avatarChanged]: {
    id: "chat-sidebar.log-message.avatar-changed",
    defaultMessage: "Seu Avatar foi alterado."
  }
});

// TODO: use react-intl's defineMessages to get proper extraction
export function formatSystemMessage(entry, intl) {
  switch (entry.type) {
    case "join":
      return intl.formatMessage(joinedMessages[entry.presence], { name: <b>{entry.name}</b> });
    case "entered":
      return intl.formatMessage(enteredMessages[entry.presence], { name: <b>{entry.name}</b> });
    case "leave":
      return (
        <FormattedMessage
          id="chat-sidebar.system-message.leave"
          defaultMessage="{name} saiu."
          values={{ name: <b>{entry.name}</b> }}
        />
      );
    case "display_name_changed":
      return (
        <FormattedMessage
          id="chat-sidebar.system-message.name-change"
          defaultMessage="{oldName} agora é conhecido como {newName}"
          values={{ oldName: <b>{entry.oldName}</b>, newName: <b>{entry.newName}</b> }}
        />
      );
    case "scene_changed":
      return (
        <FormattedMessage
          id="chat-sidebar.system-message.scene-change"
          defaultMessage="{name} mudou a cena para {sceneName}"
          values={{ name: <b>{entry.name}</b>, sceneName: <b>{entry.sceneName}</b> }}
        />
      );
    case "hub_name_changed":
      return (
        <FormattedMessage
          id="chat-sidebar.system-message.hub-name-change"
          defaultMessage="{name} mudou o nome da sala para {hubName}"
          values={{ name: <b>{entry.name}</b>, hubName: <b>{entry.hubName}</b> }}
        />
      );
    case "hub_changed":
      return (
        <FormattedMessage
          id="chat-sidebar.system-message.hub-change"
          defaultMessage="Você agora está em {hubName}"
          values={{ hubName: <b>{entry.hubName}</b> }}
        />
      );
    case "log":
      return intl.formatMessage(logMessages[entry.messageType], entry.props);
    default:
      return null;
  }
}

export function SystemMessage(props) {
  const intl = useIntl();

  return (
    <li className={classNames(styles.messageGroup, styles.systemMessage)}>
      {props.showLineBreak && <hr />}
      <p className={styles.messageGroupLabel}>
        <i>{formatSystemMessage(props, intl)}</i>
        <span>
          <FormattedRelativeTime updateIntervalInSeconds={10} value={(props.timestamp - Date.now()) / 1000} />
        </span>
      </p>
    </li>
  );
}

SystemMessage.propTypes = {
  timestamp: PropTypes.any,
  showLineBreak: PropTypes.bool
};

function MessageBubble({ media, monospace, emoji, children }) {
  return (
    <div
      className={classNames(styles.messageBubble, {
        [styles.media]: media,
        [styles.emoji]: emoji,
        [styles.monospace]: monospace
      })}
    >
      {children}
    </div>
  );
}

MessageBubble.propTypes = {
  media: PropTypes.bool,
  monospace: PropTypes.bool,
  emoji: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  children: PropTypes.node
};

function getMessageComponent(message) {
  switch (message.type) {
    case "chat": {
      const { formattedBody, monospace, emoji } = formatMessageBody(message.body);
      return (
        <MessageBubble key={message.id} monospace={monospace} emoji={emoji}>
          {formattedBody}
        </MessageBubble>
      );
    }
    case "video":
      return (
        <MessageBubble key={message.id} media>
          <video controls src={message.body.src} />
        </MessageBubble>
      );
    case "image":
    case "photo":
      return (
        <MessageBubble key={message.id} media>
          <img src={message.body.src} />
        </MessageBubble>
      );
    default:
      return null;
  }
}

export function ChatMessageGroup({ sent, sender, timestamp, messages }) {
  return (
    <li className={classNames(styles.messageGroup, { [styles.sent]: sent })}>
      <p className={styles.messageGroupLabel}>
        {sender} | <FormattedRelativeTime updateIntervalInSeconds={10} value={(timestamp - Date.now()) / 1000} />
      </p>
      <ul className={styles.messageGroupMessages}>{messages.map(message => getMessageComponent(message))}</ul>
    </li>
  );
}

ChatMessageGroup.propTypes = {
  sent: PropTypes.bool,
  sender: PropTypes.string,
  timestamp: PropTypes.any,
  messages: PropTypes.array
};

export const ChatMessageList = forwardRef(({ children, ...rest }, ref) => (
  <ul {...rest} className={styles.messageList} ref={ref}>
    {children}
  </ul>
));

ChatMessageList.propTypes = {
  children: PropTypes.node
};

export function ChatSidebar({ onClose, children, ...rest }) {
  return (
    <Sidebar
      title={<FormattedMessage id="chat-sidebar.title" defaultMessage="Chat" />}
      beforeTitle={<CloseButton onClick={onClose} />}
      contentClassName={styles.content}
      disableOverflowScroll
      {...rest}
    >
      {children}
    </Sidebar>
  );
}

ChatSidebar.propTypes = {
  onClose: PropTypes.func,
  onScrollList: PropTypes.func,
  children: PropTypes.node,
  listRef: PropTypes.func
};

export function ChatToolbarButton(props) {
  return (
    <ToolbarButton
      {...props}
      icon={<ChatIcon />}
      preset="accent4"
      label={<FormattedMessage id="chat-toolbar-button" defaultMessage="Chat" />}
    />
  );
}
