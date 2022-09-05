import {
  html,
  component,
  useState,
} from "haunted";
import "./SearchInput.js";
import "./Drink.js";
import "./Toast.js";
import "./ShoppingList.js";
import { when } from 'lit/directives/when.js';

function App() {
  const [results, setResults] = useState([]);
  const [toastMessage, setToastMessage] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  const onSearch = (query) => {
    setToastMessage(['Searching...']);
    fetch(`${endpoint}${query}`)
      .then(res => res.json())
      .then(data => {
        setResults(data.drinks);
        if (!data.drinks) {
          setToastMessage(['No results found.'])
          return;
        }
        setToastMessage(['Here are the results.'])
      })
      .catch(_error => {
        setToastMessage(['There was an unexpected error during search.'])
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

  const handleIngredientRemove = (ingredient) => {
    const ingredientsWithoutDeleted = ingredientsList;
    ingredientsWithoutDeleted.splice(ingredientsWithoutDeleted.indexOf(ingredient), 1);

    setIngredientsList([...ingredientsList]);
    setToastMessage(['Ingredient removed from shopping list.'])
  }

  return html`
    <h1>🍹Cocktail Assistant🍹</h1>

    <search-input @init-search=${event => onSearch(event.detail.query)}></search-input>
    <br>

    <div class="container">
      <div class="drinks-list">
        ${when(results,
          () => results.map(result => html`<app-drink @add-ingredients=${event => onAddIngredients(event.detail.ingredients)} .drinks=${result}></app-drink>`)
        )}
      </div>
      <shopping-list .ingredientsList=${ingredientsList} .onRemoveClick=${handleIngredientRemove}></shopping-list>
    </div>

    <app-toast .toastMessage=${toastMessage} .setToastMessage=${setToastMessage}></app-toast>

    <style>
      h1 {
        text-align: center;
      }

      .container {
        display: flex;
        justify-content: center;
      }
    </style>
    `;
}

customElements.define("my-app", component(App));
