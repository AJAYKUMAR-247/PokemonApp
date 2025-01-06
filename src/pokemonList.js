import React from "react";

const PokemonList = (props) => {
  return (
    <div>
      {props.pokemon.map((p, index) => (
        <div key={index}>{p}</div>
      ))}
    </div>
  );
};

export default PokemonList;
