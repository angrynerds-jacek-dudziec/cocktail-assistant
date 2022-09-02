import {
  html,
  component
} from "haunted";

function ShoppingList({ ingredientsList, onChangeName }) {
  const onPrintClick = () => {
    const printWindow = window.open('', '', 'height=1080, width=1920');
    printWindow.document.write('<h3>Your Shopping List</h3>');
    this.shadowRoot.querySelectorAll('li').forEach(node => {
      printWindow.document.write(`<p>• ${removeTrashIconFromText(node)}</p>`);
    });

    printWindow.document.close();
    printWindow.print();
  }

  const removeTrashIconFromText = (node) => {
    return node.textContent.slice(0, node.textContent.length - 2)
  }

  const onRemoveClick = (ingredient) => {
    onChangeName(ingredient);
  }

  return html`
    <div>
      <h3>Shopping List</h3>
        ${ingredientsList.length > 0 ?
      html`<ul>${ingredientsList.map(ingredient => html`<li>${ingredient}<button class="delete-button" @click=${() => onRemoveClick(ingredient)}>❌</button></li>`)}</ul>
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