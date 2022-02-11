import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import styles from "./Header.scss";
import { ReactComponent as Hamburger } from "../icons/Hamburger.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons/faCog";
export function MobileNav({ isHmc, showDocsLink, docsUrl, showSourceLink, showCommunityLink, communityUrl, isAdmin }) {
  const [navOpen, setNav] = useState(false);
  const toggleNav = () => {
    setNav(!navOpen);
  };
  const cloud = isHmc ? null : "cloud";

  return (
    <>
      <div className={styles.navContainer}>
        <div className={styles.mobileNavWrapper}>
          <Hamburger onClick={toggleNav} />
          <header className={`${navOpen ? `is-active ${cloud}` : "esconder"}`}>
            <nav role="navigation">
              <ul>
                {isHmc && (
                  <li>
                    <a href="/spoke">
                      <FormattedMessage id="header.spoke" defaultMessage="Spoke" />
                    </a>
                  </li>
                )}
                {showDocsLink && (
                  <li>
                    <a href={docsUrl}>
                      <FormattedMessage id="header.docs" defaultMessage="Guias" />
                    </a>
                  </li>
                )}
                {showSourceLink && (
                  <li>
                    <a href="https://github.com/mozilla/hubs">
                      <FormattedMessage id="header.source" defaultMessage="Desenvolvedores" />
                    </a>
                  </li>
                )}
                {showCommunityLink && (
                  <li>
                    <a href={communityUrl}>
                      <FormattedMessage id="header.community" defaultMessage="Comunidade" />
                    </a>
                  </li>
                )}
                {isHmc && (
                  <li>
                    <a href="/cloud">
                      <FormattedMessage id="header.cloud" defaultMessage="Metaverso TOT" />
                    </a>
                  </li>
                )}
                {isAdmin && (
                  <li>
                    <a style={{ marginLeft: 0 }} href="/admin" rel="noreferrer noopener">
                      <i>
                        <FontAwesomeIcon icon={faCog} />
                      </i>
                      &nbsp;
                      <FormattedMessage id="header.admin" defaultMessage="Admin" />
                    </a>
                  </li>
                )}
              </ul>
            </nav>
          </header>
        </div>
      </div>
    </>
  );
}

MobileNav.propTypes = {
  appName: PropTypes.string,
  appLogo: PropTypes.string,
  showCloud: PropTypes.bool,
  enableSpoke: PropTypes.bool,
  editorName: PropTypes.string,
  showDocsLink: PropTypes.bool,
  docsUrl: PropTypes.string,
  showSourceLink: PropTypes.bool,
  showCommunityLink: PropTypes.bool,
  communityUrl: PropTypes.string,
  isAdmin: PropTypes.bool,
  isSignedIn: PropTypes.bool,
  email: PropTypes.string,
  onSignOut: PropTypes.func,
  isHmc: PropTypes.bool
};
