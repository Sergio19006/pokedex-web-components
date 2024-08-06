import Pokemon from '../../domain/models/Pokemon.js';
import ImageSelector from './helpers/ImageSelector.js';
export default class GridNormalizer {
  normalizePokemons(pokemons) {
    const normalizedPokemons = pokemons.map(({entry_number, pokemon_species}) => { 
        let image = ImageSelector.selectImageForPokemon(entry_number);
        return new Pokemon(pokemon_species.name, image, '', entry_number) 
    });
    return normalizedPokemons;
  }

  normalizeFilteredPokemon (pokemons) {
    const value = pokemons.pokemon ||  pokemons.pokemon_species || pokemons.pokemon_species_details;
    const normalizedPokemons = value?.map((pokemon) => { 
      const name = pokemon.name || pokemon.pokemon?.name || pokemon.pokemon_species?.name;
      return new Pokemon(name) 
  });
    return normalizedPokemons;
  }
}