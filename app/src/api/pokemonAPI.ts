import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type PokemonDatas = {
  id: number;
  name: string;
  weight: number;
  height: number;
  image: string;
  types: { name: string; color: string }[];
};

// Helper to format datas
function formatPokemon(pokemon: any): PokemonDatas {
  return {
    id: pokemon.pokemon_id,
    name: pokemon.name,
    weight: pokemon.weight,
    height: pokemon.height,
    image: getPokemonImage(pokemon.pokemon_id),
    types: pokemon.pokemon_types.map((pt: any) => ({
      name: pt.type.name,
      color: pt.type.color,
    })),
  };
}

// Function to get pokemons
export async function getPokemonList(limit: number = 150): Promise<PokemonDatas[]> {
  const pokemons = await prisma.pokemon.findMany({
    take: limit,
    include: {
      pokemon_types: {
        include: {
          type: true,
        },
      },
    },
    orderBy: { pokemon_id: "asc" },
  });

  return pokemons.map(formatPokemon);
}

/* GET pokemon image */
export function getPokemonImage(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}
