import React, { useState, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import { Modal } from "../modal/Modal";
import { CloseButton } from "../input/CloseButton";
import { Button, CancelButton } from "../input/Button";
import { Column } from "../layout/Column";
import { TextInputField } from "../input/TextInputField";

export function CloseRoomModal({ roomName, onClose, onConfirm }) {
  const [confirmText, setConfirmText] = useState("");
  const [showIsNotMatchError, setShowIsNotMatchError] = useState(false);

  const onClickConfirm = useCallback(
    () => {
      if (confirmText.toLowerCase() === roomName.toLowerCase()) {
        onConfirm();
      } else {
        setShowIsNotMatchError(true);
      }
    },
    [onConfirm, confirmText, roomName]
  );

  return (
    <Modal
      title={<FormattedMessage id="close-room-modal.title" defaultMessage="Fechar Sala" />}
      beforeTitle={<CloseButton onClick={onClose} />}
    >
      <Column padding center centerMd="both" grow>
        <p>
          <FormattedMessage
            id="close-room-modal.message"
            defaultMessage="Fechar essa sala irá remover você e qualquer outro participante da sala, fechando-a permanentemente.{linebreak}Você tem certeza? Essa ação não pode ser bem feita."
            values={{ linebreak: <br /> }}
          />
        </p>
        <p>
          <FormattedMessage
            id="close-room-modal.type-to-confirm"
            defaultMessage="Digite o nome da sala para confirmar: {roomName}"
            values={{ roomName: <b>{roomName}</b> }}
          />
        </p>
        <TextInputField
          label={<FormattedMessage id="close-room-modal.confirm-room-name-field" defaultMessage="Confirme o Nome da Sala" />}
          onChange={e => setConfirmText(e.target.value)}
          value={confirmText}
          error={
            showIsNotMatchError && (
              <FormattedMessage id="close-room-modal.room-name-match-error" defaultMessage="Nome da sala não confere" />
            )
          }
        />
        <Button preset="accept" onClick={onClickConfirm}>
          <FormattedMessage id="close-room-modal.confirm" defaultMessage="Sim, Fechar Sala" />
        </Button>
        <CancelButton onClick={onClose} />
      </Column>
    </Modal>
  );
}

CloseRoomModal.propTypes = {
  roomName: PropTypes.string,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func
};
