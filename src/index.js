import {
  html,
  component,
  useState,
} from "haunted";
import { nothing } from 'lit';
import "./SearchInput.js";
import "./Drink.js";
import "./Toast.js";

function App() {
  const [results, setResults] = useState("");
  const [toastMessage, setToastMessage] = useState([]);
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const [ingredientsList, setIngredientsList] = useState([]);

  const onSearch = (query) => {
    fetch(`${endpoint}${query}`)
      .then(res => res.json())
      .then(data => {
        setResults(data.drinks);
      })
  }

  const onAddIngredients = (newIngredients) => {
    const ingredientsToAdd = ingredientsList;

    newIngredients.forEach(ingredient => {
      if (!ingredientsList.includes(ingredient)) {
        ingredientsToAdd.push(ingredient)
      }
    })

    setIngredientsList([...ingredientsList]);

    setToastMessage(['Ingredients added to shopping list.'])
  }

  return html`
    <search-input @init-search=${event => onSearch(event.detail.query)}></search-input>
    <br>
    

    <div class="container">
      <div class="drinks-list">
      ${results ?
      results.map(result => html`<app-drink @add-ingredients=${event => onAddIngredients(event.detail.ingredients)} .drinks=${result}></app-drink>`) :
      nothing}
      </div>
    </div>

    <app-toaster .message=${toastMessage} .setMessage=${setToastMessage}></app-toaster>

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
