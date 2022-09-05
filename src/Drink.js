import {
  html,
  component
} from "haunted";

function Drink({ drinks }) {
  const onAddClick = (drinkToAdd) => {
    const deduplicatedIngredients = addWithoutDuplicates(drinkToAdd);
    addIngredients(deduplicatedIngredients);
  }

  const addWithoutDuplicates = (drinkToAdd) => {
    const ingredients = [];
    Object.keys(drinkToAdd).forEach((key) => {
      if (key.includes('strIngredient') && !!drinkToAdd[key]) {
        ingredients.push(drinkToAdd[key])
      }
    })
    return ingredients;
  }

  const addIngredients = (ingredients) => {
    const event = new CustomEvent('add-ingredients', {
      detail: { ingredients }
    });
    this.dispatchEvent(event);
  }

  return html`
  <div class="container">
    <img class="container__image" src=${drinks.strDrinkThumb}/>
    <div class="container__info">
      <h2 class="container__drink-name">${drinks.strDrink}</h2>
      <div class="container__description">
        <p class="container__instructions">${drinks.strInstructions}</p>
        <button class="container__button" @click=${() => onAddClick(drinks)}>➕</button>
      </div>
    </div>
  </div>


  <style>
    .container {
      width: 600px;
      height: 200px;
      border: 1px solid white;
      display: flex;
      align-items: center;
      padding: 10px;
      box-sizing: border-box;
      margin-bottom: 20px;
    }

    .container__info {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
    }

    .container__drink-name {
      margin: 0;
    }

    .container__instructions {
      height: 100%;
      width: 100%;
      overflow-y: auto;
      margin: 5px 0;
    }

    .container__description {
      display: flex;
      height: 100%;
      position: relative;
      overflow: hidden;
    }

    .container__image {
      width: auto;
      height: 100%;
      border: 1px solid white;
      margin-right: 10px;
    }

    .container__button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      align-self: end;
    }
  </style>
  `
}

customElements.define("app-drink", component(Drink));