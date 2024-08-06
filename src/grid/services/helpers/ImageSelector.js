export default class ImageSelector {
  static selectImageForPokemon(pokemonId) {
      const id = pokemonId.toString().padStart(3, '0');
      return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;
  }
}