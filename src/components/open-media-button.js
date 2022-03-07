import { isLocalHubsUrl, isLocalHubsSceneUrl, isHubsRoomUrl, isLocalHubsAvatarUrl } from "../utils/media-url-utils";
import { guessContentType } from "../utils/media-url-utils";
import { handleExitTo2DInterstitial } from "../utils/vr-interstitial";
import { changeHub } from "../change-hub";

const spawnIframe = (src) => {
  const body = document.querySelector('body')

  const ifrModal = document.createElement('div')
  ifrModal.classList.add('ifrModal')
  ifrModal.style.position = 'absolute'
  ifrModal.style.height = '80vh'
  ifrModal.style.width = '70vw'
  ifrModal.style.margin = '0 auto'
  ifrModal.style.left = '0'
  ifrModal.style.right = '0'
  ifrModal.style.top = '10px'
  ifrModal.style.backgroundColor = '#000'
  ifrModal.style.display = 'flex'
  ifrModal.style.flexDirection = 'row'
  ifrModal.style.alignItems = 'start'
  ifrModal.style.borderRadius = '15px'

  const closeBtn = document.createElement('p')
  closeBtn.innerText = 'X'
  closeBtn.style.margin = '5px 10px 0 10px'
  closeBtn.style.cursor = 'pointer'
  closeBtn.onclick = () => { document.querySelector('.ifrModal').remove() }

  const iframe = document.createElement('iframe')
  iframe.setAttribute('src', `${src}`)
  iframe.style.height = '80vh'
  iframe.style.width = '70vw'
  iframe.style.border = '0'
  iframe.style.borderBottomRightRadius = '15px'
  iframe.style.borderTopRightRadius = '15px'

  ifrModal.appendChild(closeBtn)
  ifrModal.appendChild(iframe)

  body.appendChild(ifrModal)
 }

AFRAME.registerComponent("open-media-button", {
  schema: {
    onlyOpenLink: { type: "boolean" }
  },
  init() {
    this.label = this.el.querySelector("[text]");

    this.updateSrc = async () => {
      if (!this.targetEl.parentNode) return; // If removed
      const mediaLoader = this.targetEl.components["media-loader"].data;
      const src = (this.src = (mediaLoader.mediaOptions && mediaLoader.mediaOptions.href) || mediaLoader.src);
      const visible = src && guessContentType(src) !== "video/vnd.hubs-webrtc";
      const mayChangeScene = this.el.sceneEl.systems.permissions.canOrWillIfCreator("update_hub");

      this.el.object3D.visible = !!visible;

      if (visible) {
        let label = "abrir link";
        if (!this.data.onlyOpenLink) {
          let hubId;
          if (await isLocalHubsAvatarUrl(src)) {
            label = "usar avatar";
          } else if ((await isLocalHubsSceneUrl(src)) && mayChangeScene) {
            label = "usar cena";
          } else if ((hubId = await isHubsRoomUrl(src))) {
            const url = new URL(src);
            if (url.hash && window.APP.hub.hub_id === hubId) {
              label = "ir para";
            } else {
              label = "visitar sala";
            }
          }
        }
        this.label.setAttribute("text", "value", label);
      }
    };

    this.onClick = async () => {
      const mayChangeScene = this.el.sceneEl.systems.permissions.canOrWillIfCreator("update_hub");

      const exitImmersive = async () => await handleExitTo2DInterstitial(false, () => {}, true);

      let hubId;
      if (this.data.onlyOpenLink) {
        await exitImmersive();
        // window.open(this.src);
        spawnIframe(this.src)
      } else if (await isLocalHubsAvatarUrl(this.src)) {
        const avatarId = new URL(this.src).pathname.split("/").pop();
        window.APP.store.update({ profile: { avatarId } });
        this.el.sceneEl.emit("avatar_updated");
      } else if ((await isLocalHubsSceneUrl(this.src)) && mayChangeScene) {
        this.el.sceneEl.emit("scene_media_selected", this.src);
      } else if ((hubId = await isHubsRoomUrl(this.src))) {
        const url = new URL(this.src);
        if (url.hash && window.APP.hub.hub_id === hubId) {
          // move to waypoint w/o writing to history
          window.history.replaceState(null, null, window.location.href.split("#")[0] + url.hash);
        } else if (APP.store.state.preferences.fastRoomSwitching && isLocalHubsUrl(this.src)) {
          // move to new room without page load or entry flow
          changeHub(hubId);
        } else {
          await exitImmersive();
          location.href = this.src;
        }
      } else {
        await exitImmersive();
        window.open(this.src);
      }
    };

    NAF.utils.getNetworkedEntity(this.el).then(networkedEl => {
      this.targetEl = networkedEl;
      this.targetEl.addEventListener("media_resolved", this.updateSrc, { once: true });
      this.updateSrc();
    });
  },

  play() {
    this.el.object3D.addEventListener("interact", this.onClick);
  },

  pause() {
    this.el.object3D.removeEventListener("interact", this.onClick);
  }
});
