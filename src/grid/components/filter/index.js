import './index.less';
import FiltersManager from '../../services/FiltersManager.js';
export default class Filter extends HTMLElement {
  static observedAttributes = ['type'];
  constructor() {
    super();
    this._manager = new FiltersManager();
    this.filters = [];
  }

  connectedCallback() {
    this.render();
  }
  
    template() {
      this.innerHTML = `<div class="filters">
        ${this.type}
        <ul class="filter">
          ${this.filters.map(filter => 
            `<li>
            <input type="checkbox" id="${filter.name}" name="${filter.name}" />
            <label for="${filter.name}">${filter.name}</label></li>`
          ).join('')}
        </div>`;
    }

    async attributeChangedCallback(name, oldValue, newValue) {
      this.type = newValue;
      await this.getFilters(this.type);
      this.render();
    }

    async getFilters () {
      this.filters = await this._manager.getFilters(this.type);
    }
    
    async emitFilter () {
      const filters = this.filters.filter(filter => {
        return this.querySelector(`#${filter.name}`).checked;
      });
      this.dispatchEvent(new CustomEvent('filter', {
        detail: { filters, type: this.type }
      }));
    }

    render() {
      this.template();
      this.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', () => {
          this.emitFilter();
        });
      });
    }
  }
  customElements.define('filter-component', Filter);
  
