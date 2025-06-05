/* export set tis type importable in the app : (import { PokemonListItem } from ...)*/
export type PokemonDatas = {
  /*id: number;  
  order: number;*/
  name: string;  
};


export async function fetchPokemonList(limit : number): Promise<PokemonDatas[]> {
    /*Fetch result in constante */
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    /* Transform result in json object */
  const data = await res.json();

  //return data.results.map((pokemon: { name: string }) => {
  const pokemonDatas = data.results.map((pokemon: { name: string }) => {
    return {
      name: pokemon.name,
    };
  });

  // FOR TESTING
  console.log('3 premiers Pokémon :', pokemonDatas.slice(0, 3));

   return pokemonDatas;

}
