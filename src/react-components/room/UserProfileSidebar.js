import React from "react";
import PropTypes from "prop-types";
import { Sidebar } from "../sidebar/Sidebar";
import { CloseButton } from "../input/CloseButton";
import { BackButton } from "../input/BackButton";
import { Button } from "../input/Button";
import { Column } from "../layout/Column";
import styles from "./UserProfileSidebar.scss";
import { FormattedMessage, useIntl } from "react-intl";

export function UserProfileSidebar({
  className,
  displayName,
  identityName,
  avatarPreview,
  isSignedIn,
  canPromote,
  onPromote,
  canDemote,
  onDemote,
  isHidden,
  onToggleHidden,
  canMute,
  onMute,
  canKick,
  onKick,
  showBackButton,
  onBack,
  onClose,
  ...rest
}) {
  const intl = useIntl();

  return (
    <Sidebar
      title={identityName ? `${displayName} (${identityName})` : displayName}
      beforeTitle={showBackButton ? <BackButton onClick={onBack} /> : <CloseButton onClick={onClose} />}
      className={className}
      {...rest}
    >
      <Column center padding>
        <div className={styles.avatarPreviewContainer}>{avatarPreview || <div />}</div>
        {canPromote && (
          <Button
            preset="accept"
            disabled={!isSignedIn}
            title={
              isSignedIn
                ? intl.formatMessage({ id: "user-profile-sidebar.promote-button", defaultMessage: "Promover" })
                : intl.formatMessage(
                    {
                      id: "user-profile-sidebar.promote-button-disabled-label",
                      defaultMessage: "{displayName} saiu."
                    },
                    { displayName }
                  )
            }
            onClick={onPromote}
          >
            <FormattedMessage id="user-profile-sidebar.promote-button" defaultMessage="Promover" />
          </Button>
        )}
        {canDemote && (
          <Button
            preset="cancel"
            disabled={!isSignedIn}
            title={
              isSignedIn
                ? intl.formatMessage({ id: "user-profile-sidebar.demote-button", defaultMessage: "Rebaixar" })
                : intl.formatMessage(
                    {
                      id: "user-profile-sidebar.demote-button-disabled-label",
                      defaultMessage: "{displayName} saiu."
                    },
                    { displayName }
                  )
            }
            onClick={onDemote}
          >
            <FormattedMessage id="user-profile-sidebar.demote-button" defaultMessage="Rebaixar" />
          </Button>
        )}
        <Button onClick={onToggleHidden}>
          {isHidden ? (
            <FormattedMessage id="user-profile-sidebar.unhide-button" defaultMessage="Mostrar" />
          ) : (
            <FormattedMessage id="user-profile-sidebar.hide-button" defaultMessage="Esconder" />
          )}
        </Button>
        {canMute && (
          <Button preset="cancel" onClick={onMute}>
            <FormattedMessage id="user-profile-sidebar.mute-button" defaultMessage="Silenciar" />
          </Button>
        )}
        {canKick && (
          <Button preset="cancel" onClick={onKick}>
            <FormattedMessage id="user-profile-sidebar.kick-button" defaultMessage="Expulsar" />
          </Button>
        )}
      </Column>
    </Sidebar>
  );
}

UserProfileSidebar.propTypes = {
  className: PropTypes.string,
  displayName: PropTypes.string,
  identityName: PropTypes.string,
  avatarPreview: PropTypes.node,
  isSignedIn: PropTypes.bool,
  canPromote: PropTypes.bool,
  onPromote: PropTypes.func,
  canDemote: PropTypes.bool,
  onDemote: PropTypes.func,
  isHidden: PropTypes.bool,
  onToggleHidden: PropTypes.func,
  canMute: PropTypes.bool,
  onMute: PropTypes.func,
  canKick: PropTypes.bool,
  onKick: PropTypes.func,
  showBackButton: PropTypes.bool,
  onBack: PropTypes.func,
  onClose: PropTypes.func
};
