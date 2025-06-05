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
  const id = props.id;
  const name = props.name;
  const order = props.order;
  const weight = props.weight

  return (
    <div className={styles.card} >
      <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      <p><strong>Order :</strong> {order}</p>
      <p><strong>Poids :</strong> {weight}</p>
    </div>
  );
}

export default PokemonCard;
