import React from 'react';
import styles from '../styles/PokemonCard.module.css';
/*TypeScript Type : describes expected datas in component
FACULTATIVE 
iF UNCOMMENTED => function PokemonCard(props: PokemonCardProps) 
type PokemonCardProps = {
  name: string;
  order: number;
}; */

function PokemonCard(props) {
  const name = props.name;
  const order = props.order;

  return (
    <div className={styles.card} >
      <p>#{order}</p>
      <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
    </div>
  );
}

export default PokemonCard;
