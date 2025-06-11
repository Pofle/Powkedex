import Head from "next/head";
import Header from "../components/Header";
import PokemonCard from "../components/PokemonCard";
import { getPokemonList, PokemonDatas } from "../api/pokemonApi";

type HomeProps = {
  pokemonDatas: PokemonDatas[];
};

export default function Home({ pokemonDatas }: HomeProps) {
  return (
    <div>
      <Head>
        <title>Powkedex</title>
      </Head>

      <main>
        <Header />

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 mx-4">
          {pokemonDatas.map((pokemon) => (
            <PokemonCard key={pokemon.id} {...pokemon} />
          ))}
        </section>
        <div className="mt-8 text-center">
            <button id="loadMore" class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium">
                Load More Pokémons
            </button>
          </div>
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
