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
        const urls = criterial.map(filter => filter.url);
        const pokemons_filters = await Promise.all(urls.map(url => fetch(url)))
            .then(responses => Promise.all(responses.map(response => response.json())))
            .then(data => data.map(pokemon => this._normalizer.normalizeFilteredPokemon(pokemon)));
        return pokemons_filters.flat().map(pokemon => pokemon.name);
    }
}