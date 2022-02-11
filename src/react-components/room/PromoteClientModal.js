import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { Modal } from "../modal/Modal";
import { Button, CancelButton } from "../input/Button";
import { CloseButton } from "../input/CloseButton";
import { Column } from "../layout/Column";

export function PromoteClientModal({ onClose, onConfirm, displayName }) {
  return (
    <Modal title="Promote User" beforeTitle={<CloseButton onClick={onClose} />}>
      <Column center padding>
        <p>
          <FormattedMessage
            id="promote-client-modal.message"
            defaultMessage="Promover um usuário irá conceder acesso total às configurações da sala e ferramentas de moderação.{linebreak}Você tem certeza?"
            values={{ linebreak: <br /> }}
          />
        </p>
        <Button preset="accept" onClick={onConfirm}>
          <FormattedMessage
            id="promote-client-modal.confirm-prefix"
            defaultMessage="Sim, promover {name}"
            values={{ name: displayName }}
          />
        </Button>
        <CancelButton preset="cancel" onClick={onClose} />
      </Column>
    </Modal>
  );
}

PromoteClientModal.propTypes = {
  displayName: PropTypes.string.isRequired,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func
};
