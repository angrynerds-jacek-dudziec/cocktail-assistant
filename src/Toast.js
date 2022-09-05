import {
  html,
  component,
  useEffect,
  useState
} from "haunted";
import { when } from 'lit/directives/when.js';

function Toast(props) {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const toastTimeout = 3000;

  useEffect(() => {
    if (!props.toastMessage.length) { return }
    setIsDisplayed(!!props.toastMessage);

    const timeout = setTimeout(() => {
      setIsDisplayed(false);
      props.setToastMessage('');
    }, toastTimeout);

    setIsDisplayed(true);
    return () => { clearTimeout(timeout); }
  }, [props.toastMessage]);


  const closeToast = () => {
    setIsDisplayed(false)
  }

  return html`
  ${when(isDisplayed,
    () => html`<div class="container" @click=${closeToast}><p class="is-entrance">${props.toastMessage}</p></div>`
  )}

  <style>
    div {
      width: 300px;
      height: 50px;
      background-color: black;
      border: 1px solid white;
      position: fixed;
      bottom: 25px;
      right: 25px;
      z-index: 9999;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    p {
      text-align: center;
      color: white;
      margin: 0;
    }
  </style>
  `
}

customElements.define("app-toast", component(Toast));