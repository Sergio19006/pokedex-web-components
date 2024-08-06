import FiltersNormalizer from './FiltersNormalizer.js';
export default class GridDataProvider {
    constructor() {
        this._normalizer = new FiltersNormalizer();
    }

    async getFilters(name) {
        try {
            const filter = await fetch(`https://pokeapi.co/api/v2/${name}`);
            const data = await filter.json();

            return this._normalizer.normalizeFilters(data.results);
        } catch (reason) {
            console.error('There was an error!', reason);
            throw new Error('There was an error fetching the filters');
        }
    }
}