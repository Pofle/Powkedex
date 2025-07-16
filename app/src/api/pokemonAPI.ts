import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type PokemonDatas = {
  id: number;
  name: string;
  weight: number;
  height: number;
  types: { name: string; color: string }[];
};

// Helper pour formater les données Pokémon
function formatPokemon(pokemon: any): PokemonDatas {
  return {
    id: pokemon.pokemon_id,
    name: pokemon.name,
    weight: pokemon.weight,
    height: pokemon.height,
    types: pokemon.pokemon_types.map((pt: any) => ({
      name: pt.type.name,
      color: pt.type.color,
    })),
  };
}

// Fonction principale pour récupérer la liste depuis la DB
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
