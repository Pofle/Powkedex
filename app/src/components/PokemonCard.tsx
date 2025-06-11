import Image from "next/image";
import React from "react";
import { getTypeColor} from "../api/utils";

export type PokemonCardProps = {
  id: number;
  key: number
  name: string;
  order: number;
  weight: number;
  height: number;
  image: string;
  types : string[];
};

export default function PokemonCard({
  id,
  name,
  order,
  weight,
  height,
  image,
  types,
}: PokemonCardProps) {
  return (
    <div className="rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition duration-200">
      {/* Image + numéro */}
      <div className="relative h-48 bg-gray-100 flex items-center justify-center">
        <span className="absolute top-3 right-3 text-gray-400 font-bold text-sm">
          #{order.toString().padStart(3, "0")}
        </span>
        <Image
          src={image}
          alt={`Image of ${name}`}
          width={150}
          height={150}
          className="h-40 object-contain"
        />
      </div>
      {/* Types */}
      <div className="flex flex-wrap gap-2 mt-2">
        {types.map((type) => (
        <span
          key={type}
          className={`text-white capitalize text-sm font-semibold px-3 py-1 rounded-full ${getTypeColor(type)}`}>
          {type}
        </span>
        ))}
      </div>
      {/* Infos */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 capitalize mb-2">
          {name}
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
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
