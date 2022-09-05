import {
  html,
  component,
  useState,
  useEffect
} from "haunted";

function SearchInput() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const event = new CustomEvent('change', {
      detail: `${query}`
    });
    this.dispatchEvent(event);
  }, [query]);

  const initSearch = () => {
    const event = new CustomEvent('init-search', {
      detail: { query }
    });
    this.dispatchEvent(event);
  }

  return html`
  <div class="container">
    <input
      value=${query}
      type="text"
      name="query"
      @keyup=${ev => setQuery(ev.target.value)}
    />
    <button @click=${initSearch}>Search</button>
  </div>

  <style>
    div {
      margin-bottom: 10px;
      height: 30px;
      display: flex;
      justify-content: center;
    }

    input {
      height: 100%;
      width: 40%;
      box-sizing: border-box;
      border: 1px solid white;
    }

    button {
      height: 100%;
      border: 1px solid white;
      background-color: #303f42;
      color: #a7dbe5;
    }
  </style>
  `
}

customElements.define("search-input", component(SearchInput));

SearchInput.observedAttributes = ['query'];