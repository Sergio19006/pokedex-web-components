import './index.less';
import '../filter/index.js';
export default class Filters extends HTMLElement {

  constructor() {
    super();
    this.filters = {
      type: {
        filters: []
      },
      'pokemon-color': {
        filters: []
      },
      gender: {
        filters: []
      }
    };
  }

  template() {
    this.innerHTML = `
      <div class="filters">
        <filter-component type="type" id="type"></filter-component>
        <filter-component type="pokemon-color" id="pokemopn-color"></filter-component>
        <filter-component type="gender" id="gender"></filter-component>
      </div>`;
  }

  connectedCallback() {
    this.render();
  }

  async emitFilters(event) {
    const { type, filters } = event.detail;
    this.filters[type].filters = filters;

    const combinedFilters = [
      ...this.filters.type.filters,
      ...this.filters['pokemon-color'].filters,
      ...this.filters.gender.filters,
    ];

    this.dispatchEvent(new CustomEvent('filter', {
      detail: { filters: combinedFilters }
    }));
  }

  render() {
    this.template();
    this.querySelectorAll('filter-component').forEach(filterElement => {
      filterElement.addEventListener('filter', (event) => {
        this.emitFilters(event);
      });
    });
  }
}
customElements.define('filters-component', Filters);

