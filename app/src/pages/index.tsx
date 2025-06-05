import Head from "next/head";
import Image from 'next/image';
import styles from '../styles/Home.module.css';
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
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Image 
            src="/images/logo.png"  
            alt="Logo Powkedex"
            fill 
            className={styles.logo}
          />
        </div>
        <div className={styles.searchPlaceholder}>
          <p>Recherche</p>
        </div>
      </header>

      <section className={styles.pokemonGrid}>
          {pokemonDatas.map((pokemon) => (
            <PokemonCard name={pokemon.name} />
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
