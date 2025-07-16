import Image from "next/image";
import React from "react";
import  {PokemonDatas } from "../api/pokemonAPI";

// Function to create component with props = pokemon datas
export default function PokemonCard({
  id,
  //key,
  name,
  weight,
  height,
  types,
  image
}: PokemonDatas) {
  return (
    <div className="rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition duration-200">
      {/* Image + numéro */}
      <div className="relative h-48 bg-gray-100 flex items-center justify-center">
        <span className="absolute top-3 right-3 text-gray-400 font-bold text-sm">
          #{id.toString().padStart(3, "0")}
        </span>
        <Image
          src={image}
          alt={`Image of ${name}`}
          width={150}
          height={150}
          className="h-40 object-contain"
        />
      </div>   
      {/* Infos */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 capitalize mb-2">
          {name}
        </h3>
         <div className="flex flex-wrap gap-2">
          {types.map((type) => (
            <span
              key={type.name}
              className="text-white capitalize text-sm font-semibold px-3 py-1 rounded-full"
              style={{ backgroundColor: type.color }}
            >
              {type.name}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 my-3">
          <div>
            <p className="font-bold">Height</p>
            <p>{height} m</p>
          </div>
          <div>
            <p className="font-bold">Weight</p>
            <p>{weight} kg</p>
          </div>
        </div>
      </div>
    </div>
  );
}
