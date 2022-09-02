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

    setTimeout(() => {
      setIsDisplayed(false);
      props.setMessage('');
    }, 3000);
  }, [props.message]);

  return html`
  ${isDisplayed ?
      html`<div @click=${closeToast}><p>${props.message[0]}</p></div>` :
      nothing
    }

  <style>
    div {
      width: 300px;
      height: 50px;
      background-color: black;
      border: 1px solid white;
      position: fixed;
      bottom: 25px;
      right: 25px;
    }

    p {
      text-align: center;
    }
  </style>
  `
}

customElements.define("app-toast", component(Toast));