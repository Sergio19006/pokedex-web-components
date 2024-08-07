import GridNormalizer from './GridNormalizer.js';
export default class GridDataProvider {
    constructor() {
        this._normalizer = new GridNormalizer();
    }

    async getPokemons() {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokedex/national');
            const data = await response.json();
            return this._normalizer.normalizePokemons(data.pokemon_entries);
        } catch (error) {
            console.error('There was an error!', error);
            throw new Error('There was an error fetching the pokemons');
        }
    }

    async getPokemonsByCriterial(criterial) {
        try {
            const urls = criterial.map(filter => filter.url);
            const responses = await Promise.all(urls.map(url => fetch(url)));
            const data = await Promise.all(responses.map(response => {
                return response.json();
            }));
            const normalizedPokemons = data.map(pokemon => this._normalizer.normalizeFilteredPokemon(pokemon));
            return normalizedPokemons.flat().map(pokemon => pokemon.name);
        } catch (error) {
            console.error('There was an error fetching the pokemons by criteria!', error);
            throw new Error('There was an error fetching the pokemons by criteria');
        }
    }

    async getPokemon(id) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await response.json();
            return this._normalizer.normalizePokemon(data);
        } catch (error) {
            console.error('There was an error!', error);
            throw new Error('There was an error fetching the pokemons');
        }
    }
}