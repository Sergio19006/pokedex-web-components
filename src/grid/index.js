import GridManager from './services/gridManager';
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
      this.querySelector('search-component').addEventListener('search', (event) => {
        this.filterPokemons(event.detail);
      });
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
            this._updatePokemonsToRender()
        } catch (error) {
            this.allPokemons = [];
            this.error = error;
            this.render();
        }
    }

    async filterPokemons(criterial) {
        if (criterial.length === 0) {
            await this.getPokemons();
            this.renderGrid();
            return
        }
        const filteredPokemons = await this._manager.getPokemonsByCriterial(criterial);
        this.pokemons = this.allPokemons.filter(pokemon => filteredPokemons.includes(pokemon.name))
        this._updatePokemonsToRender()
        this.renderGrid();
    }

    render() {
        this._updatePokemonsToRender()
        this.template()
        this.renderGrid();
        this.querySelector('filters-component').addEventListener('filter', (event) => {
            this.filterPokemons(event.detail.filters);
        });
    }

    renderGrid() {
        const gridElement = this.querySelector('.grid-container');
        if (gridElement) {
            if (this.pokemonsToRender.length) {
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
            } else {
                gridElement.innerHTML =
                    '<div class="grid"> <span class="grid__error-text"> No hay resultados para esta búsqueda </span>  </div>';
            }
        }
    }

}
customElements.define('grid-component', Grid);
