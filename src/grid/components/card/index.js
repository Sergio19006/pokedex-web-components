import GridManager from '../../services/GridManager';
import './index.less';
export default class Card extends HTMLElement {

  constructor() {
    super();
    this.pokemon = this.getAttribute('pokemon');
    this._manager = new GridManager();
    this.loadInfo = false;

  }

  static observedAttributes = ['pokemon'];

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.pokemon = JSON.parse(decodeURIComponent(newValue));
    this.render();
  }

  removeSkeleton() {
    this.querySelector('.card__loading')?.remove();
    this.querySelector('.card__image')?.classList.remove('hidden');
  }

  async loadPokeInfo () {
    if(this.loadInfo) return;
    this.loadInfo = true;
    const info = await this._manager.getPokemon(this.pokemon.id);
    this.renderPokemonInfo(info);
  }

  template() {
    this.innerHTML = `
      <div class="card">
        <div class="card__loading card__text">Loading...</div>
          <img class="card__image hidden" loading="lazy" src="${this.pokemon.image}" alt="${this.pokemon.name}"/>
          <span class="card__text">
            ${this.pokemon.name}
          </span>
      </div>`;
  }

  render() {
    this.template();
    this.querySelector('.card__image').addEventListener('load', this.removeSkeleton.bind(this));
    this.querySelector('.card__image').addEventListener('mouseover', this.loadPokeInfo.bind(this));
  }

  renderPokemonInfo (pokemonInfo) {
    const info = document.createElement('div')
    info.classList.add('card__info')
    info.innerHTML = `
      <span class="card__info__number"> Número: ${pokemonInfo.id} </span>
        <div class="card__info__types">
          ${pokemonInfo.types.map(({ type }) =>
            `<span class="${type.name}">
              ${type.name}
            </span>`
          ).join('')} 
        </div>
      <span class="card__info__weigth"> peso:${pokemonInfo.weight} </span>
    `
    this.querySelector('.card').appendChild(info);

  }
}
customElements.define('card-component', Card);

