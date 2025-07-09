import { useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import PokemonCard from "../components/PokemonCard";
import Footer from "../components/Footer";
import { getPokemonList, PokemonDatas } from "../api/pokemonApi";

// Set to the home component the props
type HomeProps = {
  pokemonDatas: PokemonDatas[];
};

export default function Home({ pokemonDatas }: HomeProps) {
  const [visibleCount, setVisibleCount] = useState(8); //  Display the 8 pokemons
  const [searchTerm, setSearchTerm] = useState(""); // Set an empty string state for search button
  const handleLoadMore = () => {
    setVisibleCount((loadedPokemons) => loadedPokemons + 8); // Add 8 each click
  };
  //const remainingPokemons = filteredPokemons.length - visibleCount;
  const handleLoadAll = () => {
    setVisibleCount(filteredPokemons.length);
  };
  
  
  // Filter pokemon by typing in research 
  const filteredPokemons = pokemonDatas.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        {visibleCount < pokemonDatas.length && (
          <div className="mt-8 text-center">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium">
                Load More Pokemons ({filteredPokemons.length - visibleCount})
            </button>
            <button
              onClick={handleLoadAll}
              className="px-6 py-3 bg-white text-red-600 border border-red-600 rounded-lg hover:bg-red-100 transition font-medium ml-4">
              Load All
            </button>
          </div>
        )}
        <Footer/>
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