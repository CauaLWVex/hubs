import React from "react";
import { ReactionPopoverButton } from "./ReactionPopover";
import { spawnEmojiInFrontOfUser, emojis } from "../../components/emoji";
import { defineMessages, useIntl } from "react-intl";

const emojiLabels = defineMessages({
  smile: { id: "reaction-popover.emoji-label.smile", defaultMessage: "Sorrir" },
  laugh: { id: "reaction-popover.emoji-label.laugh", defaultMessage: "Rir" },
  clap: { id: "reaction-popover.emoji-label.clap", defaultMessage: "Aplaudir" },
  heart: { id: "reaction-popover.emoji-label.heart", defaultMessage: "Coração" },
  wave: { id: "reaction-popover.emoji-label.wave", defaultMessage: "Aceno" },
  angry: { id: "reaction-popover.emoji-label.angry", defaultMessage: "Raiva" },
  cry: { id: "reaction-popover.emoji-label.cry", defaultMessage: "Choro" }
});

export function ReactionPopoverContainer() {
  const intl = useIntl();

  const items = emojis.map(emoji => ({
    src: emoji.particleEmitterConfig.src,
    onSelect: spawnEmojiInFrontOfUser,
    label: intl.formatMessage(emojiLabels[emoji.id]),
    ...emoji
  }));

  return <ReactionPopoverButton items={items} />;
}
