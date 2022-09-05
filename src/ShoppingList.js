import {
  html,
  component
} from "haunted";

function ShoppingList({ ingredientsList, onRemoveClick }) {
  const deleteSymbol = '❌';

  const onPrintClick = () => {
    const printWindow = window.open('', '', `height=${screen.availHeight}, width=${screen.availWidth}'`);
    printWindow.document.write('<h3>Your Shopping List</h3>');

    this.shadowRoot.querySelectorAll('li').forEach(node => {
      printWindow.document.write(`<p>• ${node.textContent.replace(deleteSymbol,'')}</p>`);
    });

    printWindow.document.close();
    printWindow.print();
  }

  return html`
    <div>
      <h3>Shopping List</h3>
        ${ingredientsList.length > 0 ?
          html`<ul>
            ${ingredientsList.map(ingredient => html`<li>${ingredient}<button class="delete-button" @click=${() => onRemoveClick(ingredient)}>${deleteSymbol}</button></li>`)}
            </ul>
            <button @click=${() => onPrintClick()}>Print</button>` :
          html`<p>Shopping list is empty...</p>`}
    </div>
    <style>
      div {
        width: 300px;
        border: 1px solid white;
        padding: 10px;
        margin-left: 20px;
      }

      h3 {
        margin: 0;
      }

      p {
        margin-bottom: 0;
      }

      ul {
        padding-inline-start: 20px;
      }

      .delete-button {
        margin-left: 5px;
        padding: 0;
      }
    </style>
  `
}

customElements.define("shopping-list", component(ShoppingList));