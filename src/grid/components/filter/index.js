import './index.less';
import FiltersManager from '../../services/FiltersManager.js';
export default class Filter extends HTMLElement {
  static observedAttributes = ['type'];
  constructor() {
    super();
    this._manager = new FiltersManager();
    this.filters = [];
    this.type = '';
  }

  connectedCallback() {
    this.render();
  }

  template() {
    this.innerHTML = `
    <div class="filters">
      ${this.type}
      <ul class="filter">
        ${this.filters.map(filter =>
        `<li class"filter-element">
            <button class="filter-button ${filter.name}">${filter.name}</button>
        </li>`
        ).join('')}
      </ul>
    </div>`;
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    this.type = newValue;
    await this.getFilters(newValue);
    this.render();
  }

  async getFilters(type) {
    this.filters = await this._manager.getFilters(type);
  }

  async emitFilter(event) {
    event.target.classList.toggle('selected');
    const filters = this.filters.filter(filter => {
      return this.querySelector(`button.${filter.name}`).classList.contains('selected');
    });
    this.dispatchEvent(new CustomEvent('filter', {
      detail: { filters, type: this.type }
    }));
  }

  render() {
    this.template();
    this.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', this.emitFilter.bind(this));
    });
  }
}
customElements.define('filter-component', Filter);

