/* export set this type importable in the app : (import { PokemonDatas } from ...)*/
export type PokemonDatas = {
  id: number;
  name: string;
  order: number;
  weight: number;
  height: number;
  image: string;
};

/* GET all pokemons */
export async function getPokemonList(limit: number): Promise<PokemonDatas[]> {
  // fetch request result in constant
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  // transform result in json object
  const data = await res.json();

  const pokemonDatas: PokemonDatas[] = await Promise.all(
    data.results.map(async (pokemon: { name: string; url: string }) => {
      // fetch result for each pokemon in constant
      const resDetails = await fetch(pokemon.url);
      // transform result in json object
      const details = await resDetails.json();

      return {
        id: details.id,
        name: details.name,
        order: details.order,
        weight: details.weight,
        height: details.height,
        image: getPokemonImage(details.id),
      };
    })
  );

  // FOR TESTING
  console.log('3 premiers Pokémon détaillés :', pokemonDatas.slice(0, 4));

  return pokemonDatas.slice(0, 4);
}

/* GET pokemon image */
export function getPokemonImage(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}


