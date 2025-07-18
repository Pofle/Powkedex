export {}; // Ensures this file is treated as a module (required when using --isolatedModules)

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // Initialize Prisma Client to interact with the database

const LIMIT = 150; // Limit the number of Pokémon to fetch from the API

async function main() {
  // Fetch the list of Pokémon from the PokéAPI (first 150)
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}`);
  const data = await res.json();

  // Loop through each Pokémon from the fetched data
  for (const p of data.results) {
    // Fetch detailed info about each Pokémon
    const details = await (await fetch(p.url)).json();

    // Extract all type names from the Pokémon data
    const types = details.types.map((t: any) => t.type.name);

    // Upsert (create or update) each type in the database with color info
    const typeRecords = await Promise.all(
      types.map((typeName: string) =>
        prisma.type.upsert({
          where: { name: typeName }, // Look up by name
          update: {}, // Do nothing if it exists
          create: {
            name: typeName,
            color: getColorForType(typeName), // Assign a color for each type
          },
        })
      )
    );

    // Create the Pokémon in the database with its basic info and associated types
     await prisma.pokemon.upsert({
      where: { name: details.name },
      update: {
        weight: details.weight / 10,
        height: details.height / 10,
        pokemon_types: {
          deleteMany: {},
          create: typeRecords.map(type => ({
            type: { connect: { type_id: type.type_id } },
          })),
        },
      },
      create: {
        name: details.name,
        weight: details.weight / 10,
        height: details.height / 10,
        pokemon_types: {
          create: typeRecords.map(type => ({
            type: { connect: { type_id: type.type_id } },
          })),
        },
      },
    });

    console.log(`✅ ${details.name} created`);
  }

  // Disconnect Prisma once the seed is complete
  await prisma.$disconnect();
  console.log('Seed done');
}

// Returns a hex color code for each Pokémon type
function getColorForType(type: string): string {
  const colors: { [key: string]: string } = {
    normal: "bg-gray-400",
    fire: "bg-red-500",
    water: "bg-blue-500",
    electric: "bg-yellow-400",
    grass: "bg-green-500",
    ice: "bg-blue-200",
    fighting: "bg-red-700",
    poison: "bg-purple-500",
    ground: "bg-yellow-700",
    flying: "bg-indigo-300",
    psychic: "bg-pink-500",
    bug: "bg-lime-500",
    rock: "bg-yellow-800",
    ghost: "bg-indigo-700",
    dragon: "bg-indigo-900",
    dark: "bg-gray-800",
    steel: "bg-gray-500",
    fairy: "bg-pink-300",
  };
  return colors[type] || 'bg-gray-300'; // Fallback to normal type color
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  });