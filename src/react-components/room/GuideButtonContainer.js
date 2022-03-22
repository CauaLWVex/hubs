import React, { useEffect, useRef } from "react";
import { ReactComponent as TotIcon } from "../icons/totLogo.svg";
import { ToolbarButton } from "../input/ToolbarButton";
import { FormattedMessage } from "react-intl";

export function GuideButtonContainer({ }) {
  const spawnIframe = () => {
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
    iframe.setAttribute('src', 'https://toteduca.com.br/')
    iframe.style.height = '80vh'
    iframe.style.width = '70vw'
    iframe.style.border = '0'
    iframe.style.borderBottomRightRadius = '15px'
    iframe.style.borderTopRightRadius = '15px'

    ifrModal.appendChild(closeBtn)
    ifrModal.appendChild(iframe)

    body.appendChild(ifrModal)
   }

  return (
    <ToolbarButton
      icon={<TotIcon/>}
      label={<FormattedMessage id="guide-button-container.label" defaultMessage="TOT" />}
      preset="basic"
      onClick={ () => { spawnIframe() } }
    />
  );
}

GuideButtonContainer.propTypes = {
};
