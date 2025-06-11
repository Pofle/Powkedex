import { useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import PokemonCard from "../components/PokemonCard";
import { getPokemonList, PokemonDatas } from "../api/pokemonApi";

// Set to the home component the props
type HomeProps = {
  pokemonDatas: PokemonDatas[];
};

export default function Home({ pokemonDatas }: HomeProps) {
  const [visibleCount, setVisibleCount] = useState(8); //  Display the 8 pokemons
  const handleLoadMore = () => {
    setVisibleCount((loadedPokemons) => loadedPokemons + 8); // Add 8 each click
  };

  return (
    <div>
      <Head>
        <title>Powkedex</title>
      </Head>
      <main>
        <Header />
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 mx-4">
          {pokemonDatas.slice(0, visibleCount).map((pokemon) => (
            <PokemonCard key={pokemon.id} {...pokemon} />
          ))}
        </section>
        {visibleCount < pokemonDatas.length && (
          <div className="mt-8 text-center">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium">
                Load More Pokemons
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const pokemonDatas = await getPokemonList(1302);
  return {
    props: {
      pokemonDatas,
    },
  };
}
