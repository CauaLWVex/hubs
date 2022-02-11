import React from "react";
import { FormattedMessage } from "react-intl";
import { ReactComponent as AddIcon } from "../icons/Add.svg";
import { IconButton } from "../input/IconButton";
import checkIsMobile from "../../utils/is-mobile";
import { useInstallPWA } from "./useInstallPWA";
import styles from "./PWAButton.scss";

const isMobile = checkIsMobile();

export function PWAButton() {
  const [pwaAvailable, installPWA] = useInstallPWA();

  return (
    <>
      {pwaAvailable && (
        <IconButton className={styles.pwaButton} lg onClick={installPWA}>
          <AddIcon width={16} height={16} />
          {isMobile ? (
            <FormattedMessage id="pwa-button.mobile" defaultMessage="Adicionar à Tela Inicial" />
          ) : (
            <FormattedMessage id="pwa-button.desktop" defaultMessage="Instalar Aplicativo para Desktop" />
          )}
        </IconButton>
      )}
    </>
  );
}
