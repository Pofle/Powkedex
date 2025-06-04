import Head from "next/head";
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
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
    </main>
    </div>  
    
  );
}
