/* export set tis type importable in the app : (import { PokemonListItem } from ...)*/
export type PokemonDatas = {
  id: number;  
  name: string;
  order: number;
};


export async function fetchPokemonList(limit = 20): Promise<PokemonDatas[]> {
    /*Fetch result in constante */
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    /* Transform result in json object */
  const data = await res.json();

  return data.results.map((pokemon: { name: string; order: number; id: number }) => {
    return {
      id: pokemon.id,  
      name: pokemon.name,
      order: pokemon.order
    };
  });
}
