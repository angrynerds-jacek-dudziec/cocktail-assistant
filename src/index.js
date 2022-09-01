import {
  html,
  component,
  useState,
} from "haunted";
import { nothing } from 'lit';
import "./SearchInput.js";

function App() {
  const [results, setResults] = useState("");
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  const onSearch = (query) => {
    fetch(`${endpoint}${query}`)
      .then(res => res.json())
      .then(data => { 
        setResults(data.drinks); })
  }

  return html`
    <search-input @init-search=${event => onSearch(event.detail.query)}></search-input>
    <br>
    

    <div class="container">
      <div class="drinks-list">
        ${results ? 
          results.map(result => html`${result.strDrink}`) : 
          nothing}
      </div>
    </div>

    <style>
      fieldset {
        border: none;
      }

      .container {
        display: flex;
        justify-content: center;
      }
    </style>
    `;
}

customElements.define("cocktail-app", component(App));
