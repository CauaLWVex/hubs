import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { CloseButton } from "../input/CloseButton";
import { Modal } from "../modal/Modal";
import { FormattedMessage, useIntl, defineMessages } from "react-intl";
import { CancelButton, NextButton, ContinueButton } from "../input/Button";
import { TextInputField } from "../input/TextInputField";
import { Column } from "../layout/Column";
import { LegalMessage } from "./LegalMessage";

export const SignInStep = {
  submit: "submit",
  waitForVerification: "waitForVerification",
  complete: "complete"
};

export const SignInMessages = defineMessages({
  pin: {
    id: "sign-in-modal.signin-message.pin",
    defaultMessage: "Você precisa entrar para fixar objetos."
  },
  unpin: {
    id: "sign-in-modal.signin-message.unpin",
    defaultMessage: "Você precisa entrar para desfixar objetos."
  },
  changeScene: {
    id: "sign-in-modal.signin-message.change-scene",
    defaultMessage: "Você precisa entrar para mudar a cena."
  },
  roomSettings: {
    id: "sign-in-modal.signin-message.room-settings",
    defaultMessage: "Você precisa entrar para mudar as configurações da sala."
  },
  closeRoom: {
    id: "sign-in-modal.signin-message.close-room",
    defaultMessage: "Você precisa entrar para fechar a sala."
  },
  muteUser: {
    id: "sign-in-modal.signin-message.mute-user",
    defaultMessage: "Você precisa entrar para silenciar outros usuários."
  },
  kickUser: {
    id: "sign-in-modal.signin-message.kick-user",
    defaultMessage: "Você precisa entrar para expulsar outros usuários."
  },
  addOwner: {
    id: "sign-in-modal.signin-message.add-owner",
    defaultMessage: "Você precisa entrar para designar moderadores."
  },
  removeOwner: {
    id: "sign-in-modal.signin-message.remove-owner",
    defaultMessage: "Você precisa entrar para remover moderadores."
  },
  createAvatar: {
    id: "sign-in-modal.signin-message.create-avatar",
    defaultMessage: "Você precisa entrar para criar avatares."
  },
  remixAvatar: {
    id: "sign-in-modal.signin-message.remix-avatar",
    defaultMessage: "Você precisa entrar para editar avatares."
  },
  remixScene: {
    id: "sign-in-modal.signin-message.remix-scene",
    defaultMessage: "Você precisa entrar para editar cenas."
  },
  favoriteRoom: {
    id: "sign-in-modal.signin-message.favorite-room",
    defaultMessage: "Você precisa entrar para adicionar esta sala aos seus favoritos."
  },
  favoriteRooms: {
    id: "sign-in-modal.signin-message.favorite-rooms",
    defaultMessage: "Você precisa entrar para adicionar salas favoritas."
  },
  tweet: {
    id: "sign-in-modal.signin-message.tweet",
    defaultMessage: "Você precisa entrar para enviar tweets."
  }
});

export function SubmitEmail({ onSubmitEmail, initialEmail, privacyUrl, termsUrl, message }) {
  const intl = useIntl();

  const [email, setEmail] = useState(initialEmail);

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      onSubmitEmail(email);
    },
    [onSubmitEmail, email]
  );

  const onChangeEmail = useCallback(
    e => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

  return (
    <Column center padding as="form" onSubmit={onSubmitForm}>
      <p>
        {message ? (
          intl.formatMessage(message)
        ) : (
          <FormattedMessage id="sign-in-modal.prompt" defaultMessage="Por Favor Entra na sua Conta" />
        )}
      </p>
      <TextInputField
        name="email"
        type="email"
        required
        value={email}
        onChange={onChangeEmail}
        placeholder="exemplo@exemplo.com"
      />
      <p>
        <small>
          <LegalMessage termsUrl={termsUrl} privacyUrl={privacyUrl} />
        </small>
      </p>
      <NextButton type="submit" />
    </Column>
  );
}

SubmitEmail.defaultProps = {
  initialEmail: ""
};

SubmitEmail.propTypes = {
  message: PropTypes.string,
  termsUrl: PropTypes.string,
  privacyUrl: PropTypes.string,
  initialEmail: PropTypes.string,
  onSubmitEmail: PropTypes.func.isRequired
};

export function WaitForVerification({ email, onCancel, showNewsletterSignup }) {
  return (
    <Column center padding>
      <FormattedMessage
        id="sign-in-modal.wait-for-verification"
        defaultMessage="<p>Email enviado para {email}!</p><p>Para continuar, clique no link enviado no email.</p><p>Sem email? Você pode não ser capaz de criar uma conta.</p>"
        // eslint-disable-next-line react/display-name
        values={{ email, p: chunks => <p>{chunks}</p> }}
      />
      {showNewsletterSignup && (
        <p>
          <small>
            <FormattedMessage
              id="sign-in-modal.newsletter-signup-question"
              defaultMessage="Deseja receber as novidades no seu email?"
            />
            <br />
            <a href="https://eepurl.com/gX_fH9" target="_blank" rel="noopener noreferrer">
              <FormattedMessage id="sign-in-modal.newsletter-signup-link" defaultMessage="Inscreva-se para atualizações" />
            </a>
          </small>
        </p>
      )}
      <CancelButton onClick={onCancel} />
    </Column>
  );
}

WaitForVerification.propTypes = {
  showNewsletterSignup: PropTypes.bool,
  email: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired
};

export function SignInComplete({ message, onContinue }) {
  const intl = useIntl();

  return (
    <Column center padding>
      <p>
        <b>
          {message ? (
            intl.formatMessage(message)
          ) : (
            <FormattedMessage id="sign-in-modal.complete" defaultMessage="Você entrou." />
          )}
        </b>
      </p>
      <ContinueButton onClick={onContinue} />
    </Column>
  );
}

SignInComplete.propTypes = {
  message: PropTypes.string.isRequired,
  onContinue: PropTypes.func.isRequired
};

export function SignInModal({ closeable, onClose, children, ...rest }) {
  return (
    <Modal
      title={<FormattedMessage id="sign-in-modal.title" defaultMessage="Entre" />}
      beforeTitle={closeable && <CloseButton onClick={onClose} />}
      {...rest}
    >
      {children}
    </Modal>
  );
}

SignInModal.propTypes = {
  closeable: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node
};
