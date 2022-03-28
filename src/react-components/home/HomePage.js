import React, { useContext, useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import classNames from "classnames";
import configs from "../../utils/configs";
import { getAppLogo } from "../../utils/get-app-logo";
import { CreateRoomButton } from "./CreateRoomButton";
import { PWAButton } from "./PWAButton";
import { useFavoriteRooms } from "./useFavoriteRooms";
import { usePublicRooms } from "./usePublicRooms";
import styles from "./HomePage.scss";
import { AuthContext } from "../auth/AuthContext";
import { createAndRedirectToNewHub } from "../../utils/phoenix-utils";
import { MediaGrid } from "../room/MediaGrid";
import { MediaTile } from "../room/MediaTiles";
import { PageContainer } from "../layout/PageContainer";
import { scaledThumbnailUrlFor } from "../../utils/media-url-utils";
import { Column } from "../layout/Column";
import { Button } from "../input/Button";
import { Container } from "../layout/Container";
import { SocialBar } from "../home/SocialBar";
import { SignInButton } from "./SignInButton";
import maskEmail from "../../utils/mask-email";
import { ReactComponent as HmcLogo } from "../icons/HmcLogo.svg";

// export function HomePage() {
//   const auth = useContext(AuthContext);
//   const intl = useIntl();

//   const { results: favoriteRooms } = useFavoriteRooms();
//   const { results: publicRooms } = usePublicRooms();

//   const sortedFavoriteRooms = Array.from(favoriteRooms).sort((a, b) => b.member_count - a.member_count);
//   const sortedPublicRooms = Array.from(publicRooms).sort((a, b) => b.member_count - a.member_count);
//   const wrapInBold = chunk => <b>{chunk}</b>;
//   const isHmc = configs.feature("show_cloud");
//   useEffect(() => {
//     const qs = new URLSearchParams(location.search);

//     // Support legacy sign in urls.
//     if (qs.has("sign_in")) {
//       const redirectUrl = new URL("/signin", window.location);
//       redirectUrl.search = location.search;
//       window.location = redirectUrl;
//     } else if (qs.has("auth_topic")) {
//       const redirectUrl = new URL("/verify", window.location);
//       redirectUrl.search = location.search;
//       window.location = redirectUrl;
//     }

//     if (qs.has("new")) {
//       createAndRedirectToNewHub(null, null, true);
//     }
//   }, []);

//   const canCreateRooms = !configs.feature("disable_room_creation") || auth.isAdmin;
//   const email = auth.email;
//   return (
//     <PageContainer className={styles.homePage}>
//       <Container>
//         <div className={styles.hero}>
//           {auth.isSignedIn ? (
//             <div className={styles.signInContainer}>
//               <span>
//                 <FormattedMessage
//                   id="header.signed-in-as"
//                   defaultMessage="Logado como {email}"
//                   values={{ email: maskEmail(email) }}
//                 />
//               </span>
//               <a href="#" onClick={auth.signOut} className={styles.mobileSignOut}>
//                 <FormattedMessage id="header.sign-out" defaultMessage="Sair" />
//               </a>
//             </div>
//           ) : (
//             <SignInButton mobile />
//           )}
//           <div className={styles.logoContainer}>
//             {isHmc ? (
//               <HmcLogo className="hmc-logo" />
//             ) : (
//               <img alt={configs.translation("app-name")} src={getAppLogo()} />
//             )}
//           </div>
//           <div className={styles.appInfo}>
//             <div className={styles.appDescription}>{configs.translation("app-description")}</div>
//             {canCreateRooms && <CreateRoomButton />}
//             <PWAButton />
//           </div>
//           <div className={styles.heroImageContainer}>
//             <img
//               alt={intl.formatMessage(
//                 {
//                   id: "home-page.hero-image-alt",
//                   defaultMessage: "Captura de {appName}"
//                 },
//                 { appName: configs.translation("app-name") }
//               )}
//               src={configs.image("home_background")}
//             />
//           </div>
//         </div>
//       </Container>
//       {configs.feature("show_feature_panels") && (
//         <Container className={classNames(styles.features, styles.colLg, styles.centerLg)}>
//           <Column padding gap="xl" className={styles.card}>
//             <img src={configs.image("landing_rooms_thumb")} />
//             <h3>
//               <FormattedMessage id="home-page.rooms-title" defaultMessage="Crie salas instantaneamente" />
//             </h3>
//             <p>
//               <FormattedMessage
//                 id="home-page.rooms-blurb"
//                 defaultMessage="Compartilhe espaços virtuais com seus amigos, colegas de trabalho, e comunidades. Quando você cria uma sala, você tem um espaço de reunião privado que você pode compartilhar instantaneamente <b>- sem downloads ou óculos de VR necessários.</b>"
//                 values={{ b: wrapInBold }}
//               />
//             </p>
//           </Column>
//           <Column padding gap="xl" className={styles.card}>
//             <img src={configs.image("landing_communicate_thumb")} />
//             <h3>
//               <FormattedMessage id="home-page.communicate-title" defaultMessage="Comunique-se e colabore" />
//             </h3>
//             <p>
//               <FormattedMessage
//                 id="home-page.communicate-blurb"
//                 defaultMessage="Escolha um avatar para te representar, bote seu fone de ouvido, e caia dentro. É fácil se manter conectado com voz e chat em texto com outras pessoas no seu espaço privado."
//               />
//             </p>
//           </Column>
//           <Column padding gap="xl" className={styles.card}>
//             <img src={configs.image("landing_media_thumb")} />
//             <h3>
//               <FormattedMessage id="home-page.media-title" defaultMessage="Um jeito fácil de compartilhar mídia." />
//             </h3>
//             <p>
//               <FormattedMessage
//                 id="home-page.media-blurb"
//                 defaultMessage="Compartilhe conteúdo com os outros selecionando e arrastando fotos, vídeos, arquivos PDF, links, e modelos 3D no seu espaço."
//               />
//             </p>
//           </Column>
//         </Container>
//       )}
//       {sortedPublicRooms.length > 0 && (
//         <Container className={styles.roomsContainer}>
//           <h3 className={styles.roomsHeading}>
//             <FormattedMessage id="home-page.public--rooms" defaultMessage="Salas Públicas" />
//           </h3>
//           <Column grow padding className={styles.rooms}>
//             <MediaGrid center>
//               {sortedPublicRooms.map(room => {
//                 return (
//                   <MediaTile
//                     key={room.id}
//                     entry={room}
//                     processThumbnailUrl={(entry, width, height) =>
//                       scaledThumbnailUrlFor(entry.images.preview.url, width, height)
//                     }
//                   />
//                 );
//               })}
//             </MediaGrid>
//           </Column>
//         </Container>
//       )}
//       {sortedFavoriteRooms.length > 0 && (
//         <Container className={styles.roomsContainer}>
//           <h3 className={styles.roomsHeading}>
//             <FormattedMessage id="home-page.favorite-rooms" defaultMessage="Salas Favoritas" />
//           </h3>
//           <Column grow padding className={styles.rooms}>
//             <MediaGrid center>
//               {sortedFavoriteRooms.map(room => {
//                 return (
//                   <MediaTile
//                     key={room.id}
//                     entry={room}
//                     processThumbnailUrl={(entry, width, height) =>
//                       scaledThumbnailUrlFor(entry.images.preview.url, width, height)
//                     }
//                   />
//                 );
//               })}
//             </MediaGrid>
//           </Column>
//         </Container>
//       )}
//       <Container>
//         <Column center grow>
//           <Button thin preset="landing" as="a" href="/link">
//             <FormattedMessage id="home-page.have-code" defaultMessage="Tem um código de sala?" />
//           </Button>
//         </Column>
//       </Container>
//       {isHmc ? (
//         <Column center>
//           <SocialBar />
//         </Column>
//       ) : null}
//     </PageContainer>
//   );
// }

export function HomePage() {
  const auth = useContext(AuthContext);
  const intl = useIntl();

  const { results: favoriteRooms } = useFavoriteRooms();
  const { results: publicRooms } = usePublicRooms();

  const sortedFavoriteRooms = Array.from(favoriteRooms).sort((a, b) => b.member_count - a.member_count);
  const sortedPublicRooms = Array.from(publicRooms).sort((a, b) => b.member_count - a.member_count);
  const wrapInBold = chunk => <b>{chunk}</b>;
  const isHmc = configs.feature("show_cloud");
  useEffect(() => {
    const qs = new URLSearchParams(location.search);

    // Support legacy sign in urls.
    if (qs.has("sign_in")) {
      const redirectUrl = new URL("/signin", window.location);
      redirectUrl.search = location.search;
      window.location = redirectUrl;
    } else if (qs.has("auth_topic")) {
      const redirectUrl = new URL("/verify", window.location);
      redirectUrl.search = location.search;
      window.location = redirectUrl;
    }

    if (qs.has("new")) {
      createAndRedirectToNewHub(null, null, true);
    }
  }, []);

    const canCreateRooms = !configs.feature("disable_room_creation") || auth.isAdmin;
  const email = auth.email;

  const windowWidth = window.screen.width
  return (
    <>
      <video autoplay="true" loop="true" style={{
        position: 'fixed',
        right: 0,
        bottom: 0,
        zIndex: -1,
        height: '100vh',
        width: '100vw',
        objectFit: 'cover'
      }}>
        <source src="src\assets\homebg.mp4"></source>
      </video>
      <img style={{
        height: '200px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: window.screen.width >= 1040 ? '20px' : '100px'
      }} src="https://metaverso-grupovex-assets-804e14a0.s3.amazonaws.com/Logo+Metaverso.png"></img>
      <div style={{
        position: 'absolute',
        right: auth.isSignedIn ? '20px' : 0,
        top: '20px',
      }}>
      {auth.isSignedIn ? (
            <div className={styles.signInContainer}>
              <span>
                <FormattedMessage
                  id="header.signed-in-as"
                  defaultMessage="Logado como {email}"
                  values={{ email: maskEmail(email) }}
                />
              </span>
              <a href="#" onClick={auth.signOut} className={styles.mobileSignOut}>
                <FormattedMessage id="header.sign-out" defaultMessage="Sair" />
              </a>
            </div>
          ) : (
            <SignInButton mobile />
          )}
      </div>
      <div style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '25px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        {canCreateRooms && <CreateRoomButton />}
      </div>
      {sortedPublicRooms.length > 0 && (
          <Column grow padding className={styles.rooms}>
            <MediaGrid center>
              {sortedPublicRooms.map(room => {
                return (
                  <MediaTile
                    key={room.id}
                    entry={room}
                    processThumbnailUrl={(entry, width, height) =>
                      scaledThumbnailUrlFor(entry.images.preview.url, width, height)
                    }
                  />
                );
              })}
            </MediaGrid>
            <Button thin preset="landing" as="a" href="/link">
              <FormattedMessage id="home-page.have-code" defaultMessage="Tem um código de sala?" />
            </Button>
            <img style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '70px'
            }} src="https://metaverso-grupovex-assets-804e14a0.s3.amazonaws.com/Logo+vex.png"></img>
          </Column>
      )}
    </>
  )
}