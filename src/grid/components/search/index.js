import './index.less';
export default class Search extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  emitSearch(searchValue) {
    this.dispatchEvent(new CustomEvent('search', {
      detail: searchValue
    }));
  }
  
    template() {
      this.innerHTML = `
        <div class="search">
          <span> Seach here!</span>  
          <input class ="search__input" type="text" id="search" name="search" />
        </div>`;
    }

    render() {
      this.template()
      this.querySelector('input').addEventListener('input', (event) => {
        this.emitSearch(event.target.value);
      });
    }
  }
  customElements.define('search-component', Search);
  
