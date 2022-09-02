import {
  html,
  component,
  useState,
} from "haunted";
import "./SearchInput.js";
import "./Drink.js";
import "./Toast.js";
import "./ShoppingList.js";
import { nothing } from 'lit';

function App() {
  const [results, setResults] = useState("");
  const [toastMessage, setToastMessage] = useState([]);
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const [ingredientsList, setIngredientsList] = useState([]);

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
        setToastMessage(['Here are the results.']) })
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

  const handleNameChange = (ingredient) => {
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
        ${results ? 
          results.map(result => html`<drink-result @add-ingredients=${event => onAddIngredients(event.detail.ingredients)} .drinks=${result}></drink-result>`) : 
          nothing}
      </div>
      <shopping-list .ingredientsList=${ingredientsList} .onChangeName=${handleNameChange}></shopping-list>
    </div>

    <app-toast .message=${toastMessage} .setMessage=${setToastMessage}></app-toast>

    <style>
      h1 {
        text-align: center;
      }

      .container {
        display: flex;
        justify-content: center;
      }

      body {
        background-color: #303f42;
        color: #a7dbe5;
        font-family: "Roboto", sans-serif;
        margin: 0;
      }
    </style>
    `;
}

customElements.define("my-app", component(App));
