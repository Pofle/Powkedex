import React from 'react';
/*TypeScript Type : describes expected datas in component
FACULTATIVE 
iF UNCOMMENTED => function PokemonCard(props: PokemonCardProps) 
type PokemonCardProps = {
  name: string;
  id: number;
}; */

function PokemonCard(props) {
  const name = props.name;
  const id = props.id;

  return (
    <div className={styles.card} >
      <p>#{id}</p>
      <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
    </div>
  );
}

export default PokemonCard;
