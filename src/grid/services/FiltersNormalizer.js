import Filter from '../../domain/models/Filter.js';
export default class GridNormalizer {
  async normalizeFilters(filters) {
    const normalizedFilters = filters.map(filter => new Filter(filter.name, filter.url));
    return normalizedFilters
  }
}