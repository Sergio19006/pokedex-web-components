import GridDataProvider from './GridDataProvider.js';
export default class GridManager {
  constructor() {
    this._provider  = new GridDataProvider();
    this.pokemons = [];
  }

  async getPokemons() {
    this.pokemons = await this._provider.getPokemons();
    return this.pokemons;
  }

  async getPokemonsByCriterial(criterial) {
    if(typeof criterial === 'string') {
      return this.pokemons.filter(pokemon => pokemon.name.includes(criterial)).map(pokemon => pokemon.name);
    }
    return await this._provider.getPokemonsByCriterial(criterial);
  }

  async getPokemon(id) {
    return await this._provider.getPokemon(id);
  }
}