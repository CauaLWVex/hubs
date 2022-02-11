import React from "react";
import { Modal } from "../modal/Modal";
import { Button } from "../input/Button";
import { Column } from "../layout/Column";
import { FormattedMessage } from "react-intl";

export function SafariMicModal() {
  return (
    <Modal title={<FormattedMessage id="safari-mic-modal.title" defaultMessage="Acesso ao Microfone Necessário" />}>
      <Column center padding>
        <FormattedMessage
          id="safari-mic-modal.message"
          defaultMessage="<p>Acesso ao microfone necessário no Safari.</p><p>Por favor recarregue e permita o acesso para continuar.</p>"
          values={{
            // eslint-disable-next-line react/display-name
            p: chunks => <p>{chunks}</p>
          }}
        />
        <Button preset="accept" onClick={() => location.reload()}>
          <FormattedMessage id="safari-mic-modal.reload-button" defaultMessage="Recarregar" />
        </Button>
      </Column>
    </Modal>
  );
}
