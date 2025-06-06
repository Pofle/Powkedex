import Head from "next/head";
import styles from '../styles/Home.module.css';
import Header from '../components/Header';
import PokemonCard from '../components/PokemonCard';
import { fetchPokemonList, PokemonDatas } from '../api/pokemonApi';
/*Here you specify that Home_component will receive a pokemonDatas prop, which is an array of Pokémon. */
type HomeProps =  {
  pokemonDatas: PokemonDatas[];
}

export default function Home({pokemonDatas}: HomeProps) {
  return (
    <div>
      <Head>
        <title>Powkedex</title>
      </Head>
      <main className={styles.main}>
        <Header/>

      <section className={styles.pokemonGrid}>
          {pokemonDatas.map((pokemon) => (
             <PokemonCard
                key={pokemon.id}
                name={pokemon.name}
                order={pokemon.order}
                weight={pokemon.weight}/>
          ))}
        </section>
    </main>
    </div>     
  );
  
}export async function getStaticProps() {
  const pokemonDatas = await fetchPokemonList(1302);

  return {
    props: {
      pokemonDatas,
    },
  };
}
