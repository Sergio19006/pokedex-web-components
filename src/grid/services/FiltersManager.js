import FiltersDataProvider from './FiltersDataProvider.js';
export default class FiltersManager {
  constructor() {
    this._provider  = new FiltersDataProvider();
  }

  async getFilters(name) {
    return await this._provider.getFilters(name);
  }
}