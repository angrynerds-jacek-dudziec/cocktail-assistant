import {
  html,
  component,
  useEffect,
  useState
} from "haunted";
import { nothing } from 'lit';

function Toast(props) {
  const [isDisplayed, setIsDisplayed] = useState(false);

  useEffect(() => {
    if (!props.message[0]) { return }
    setIsDisplayed(!!props.message); 

    const timeout = setTimeout(() => {
      setIsDisplayed(false);
      props.setMessage('');
    }, 3000);

    setIsDisplayed(true);
    return () => {clearTimeout(timeout);}
  }, [props.message]);


  const closeToast = () => {
    setIsDisplayed(false)
  }

  return html`
  ${isDisplayed ?
      html`<div class="container" @click=${closeToast}><p class="is-entrance">${props.message[0]}</p></div>` :
      nothing
    }

  <style>
    .container {
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
      flex-direction: column;
      box-sizing: border-box;
    }

    p {
      text-align: center;
      color: white;
      margin: 0;
      height: 100%;
    }
  </style>
  `
}

customElements.define("app-toast", component(Toast));