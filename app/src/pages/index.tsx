import { useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import PokemonCard from "@/components/PokemonCard";
import Footer from "@/components/Footer";
import { getPokemonList, PokemonDatas } from "../api/pokemonAPI";

type HomeProps = {
  pokemonDatas: PokemonDatas[];
};

export default function Home({ pokemonDatas }: HomeProps) {
  const [visibleCount, setVisibleCount] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPokemons = pokemonDatas.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const handleLoadAll = () => {
    setVisibleCount(filteredPokemons.length);
  };

  return (
    <div>
      <Head>
        <title>Powkedex</title>
      </Head>
      <main>
        <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 mx-4">
          {filteredPokemons.slice(0, visibleCount).map((pokemon) => (
            <PokemonCard key={pokemon.id} {...pokemon} />
          ))}
        </section>
        {visibleCount < filteredPokemons.length && (
          <div className="mt-8 text-center">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
            >
              Load More Pokemons ({filteredPokemons.length - visibleCount})
            </button>
            <button
              onClick={handleLoadAll}
              className="px-6 py-3 bg-white text-red-600 border border-red-600 rounded-lg hover:bg-red-100 transition font-medium ml-4"
            >
              Load All
            </button>
          </div>
        )}
        <Footer />
      </main>
    </div>
  );
}

// Chargement des données côté serveur (build time)
export async function getStaticProps() {
  const pokemonDatas = await getPokemonList(1302);
  return {
    props: {
      pokemonDatas,
    },
    revalidate: 60, // (optionnel) pour ISR : régénérer toutes les 60 secondes
  };
}
