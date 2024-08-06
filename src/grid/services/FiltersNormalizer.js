import Filter from '../../domain/models/Filter.js';
export default class GridNormalizer {
  async normalizeFilters(filters) {
    return filters.map(filter => new Filter(filter.name, filter.url));
  }
}