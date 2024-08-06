import './index.less';
export default class Card extends HTMLElement {

  constructor() {
    super();
    this.pokemon = this.getAttribute('pokemon');

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
  }

  template() {
    this.innerHTML = `
      <div class="card">
        <div class="card__loading card__text">Loading...</div>
          <img class="card__image" loading="lazy" src="${this.pokemon.image}" alt="${this.pokemon.name}"/>
          <span class="card__text">
            ${this.pokemon.name}
          </span>
      </div>`;
  }

  render() {
    this.template();
    this.querySelector('.card__image').addEventListener('load', this.removeSkeleton.bind(this));
  }
}
customElements.define('card-component', Card);

