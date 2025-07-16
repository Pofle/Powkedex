export {}; // Ensures this file is treated as a module (required when using --isolatedModules)

import dotenv from 'dotenv';
import path from 'path';

// Explicitly load the .env file from two directories above (to access DATABASE_URL, etc.)
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

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
    await prisma.pokemon.create({
      data: {
        name: details.name,
        weight: Math.floor(details.weight / 10), // Convert weight to kg
        height: Math.floor(details.height / 10), // Convert height to meters
        pokemon_types: {
          create: typeRecords.map((type) => ({
            type: { connect: { type_id: type.type_id } }, // Link the Pokémon to its types
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
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
    normal: '#A8A878',
  };
  return colors[type] || '#A8A878'; // Fallback to normal type color
}
