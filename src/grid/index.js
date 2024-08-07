import GridManager from './services/GridManager';
import './index.less';
import './components/card/index.js';
import './components/filters/index.js';
import './components/search/index.js';
export default class Grid extends HTMLElement {

    constructor() {
        super();
        this._manager = new GridManager();
        this.error = '';
        this.allPokemons = [];
        this.filteredPokemons = [];
        this.searchedPokemons = [];
        this.activesSearch = '';
        this.activesFilters = [];
        this.criterial = { filters: [] };
        this.offset = 20;
    }

    template() {
        this.innerHTML = `
        ${this.error ? `<p>${this.error}</p>` : ''}
        <search-component></search-component>
        <div class="container">
            <filters-component></filters-component>
            <div class="grid-container">
            </div> 
        </div>
      `.trim();
    }

    async connectedCallback() {
        await this.getPokemons();
        this.render();
    }

    loadMoreEventHandler() {
        if (this.offset < this.pokemons.length) {
            this.offset += 20;
            this._updatePokemonsToRender()
            this.renderGrid();
        }
    }

    _updatePokemonsToRender() {
        this.pokemonsToRender = this.pokemons.slice(0, this.offset);
    }

    async getPokemons() {
        try {
            this.allPokemons = await this._manager.getPokemons();
            this.pokemons = this.allPokemons;
            this.filteredPokemons = [];
            this.searchedPokemons = [];
            this._updatePokemonsToRender()
        } catch (error) {
            this.allPokemons = [];
            this.error = error;
            this.render();
        }
    }

    async searchPokemons(criterial) {
        this.activesSearch = criterial;
        await this._fetchAndRenderPokemons();
    }

    async filterPokemons(criterial) {
        this.activesFilters = criterial;
        await this._fetchAndRenderPokemons();
    }

    async _fetchAndRenderPokemons() {
        if (!this.activesFilters.length && !this.activesSearch.length) {
            await this.getPokemons();
            this.renderGrid();
            return;
        }

        const searchResults = this.activesSearch.length ? await this._manager.getPokemonsByCriterial(this.activesSearch) : [];
        const filterResults = this.activesFilters.length ? await this._manager.getPokemonsByCriterial(this.activesFilters) : [];

        this.searchedPokemons = searchResults;
        this.filteredPokemons = filterResults;

        const intersectionPokemons = this._getIntersection(searchResults, filterResults);
        this.pokemons = this.allPokemons.filter(pokemon => intersectionPokemons.includes(pokemon.name));

        this._updatePokemonsToRender();
        this.renderGrid();
    }

    _getIntersection(searchResults, filterResults) {
        if (searchResults.length && filterResults.length) {
            return searchResults.filter(pokemon => filterResults.includes(pokemon));
        } else if (searchResults.length) {
            return searchResults;
        } else {
            return filterResults;
        }
    }

    render() {
        this._updatePokemonsToRender()
        this.template();
        this.renderGrid();
        this.querySelector('search-component').addEventListener('search', (event) => {
            this.searchPokemons(event.detail);
        });
        this.querySelector('filters-component').addEventListener('filter', (event) => {
            this.filterPokemons(event.detail.filters);
        });
    }

    renderGrid() {
        const gridElement = this.querySelector('.grid-container');
        if (!gridElement) return;
        if (!this.pokemonsToRender.length) {
            gridElement.innerHTML =
                `<div> 
                    <span class="grid__error-text"> No hay resultados para esta búsqueda </span>  
                </div>`;
            return
        }
        gridElement.innerHTML =
            `<ul class="grid">
            ${this.pokemonsToRender.map(pokemon =>
                `<li class="grid-element">
                    <card-component pokemon='${encodeURIComponent(JSON.stringify(pokemon))}'></card-component>
                </li>`
            ).join('')}
            </ul>
            ${this.offset < this.pokemons.length ? '<button class="grid__load-more">Load More</button>' : ''}`
        this.querySelector('.grid__load-more')?.addEventListener('click', this.loadMoreEventHandler.bind(this));
    }
}
customElements.define('grid-component', Grid);
