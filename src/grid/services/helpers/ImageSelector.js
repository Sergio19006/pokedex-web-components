export default class ImageSelector {
    //refactorizar para que reciba el id del pokemon
    static selectImageForPokemon(pokemonId) {
        let image
        if(pokemonId < 10) {
            image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${pokemonId}.png`;
          } else if(pokemonId < 100) {
            image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${pokemonId}.png`;
          } else {
            image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonId}.png`;
          }
        return image
    }
}