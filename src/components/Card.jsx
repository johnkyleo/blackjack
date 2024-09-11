import React from "react";
 
const Card = ({ card }) => {
  return (
    <div className="w-24 h-32 bg-white border rounded-lg shadow-md flex flex-col items-center  justify-items-start text-xl text-slate-800 animate-[pulse_1s_ease-in-out]">
      <p className="flex justify-end">{card.rank}</p>
      <h1 className="text-6xl">{card.suit}</h1>
    </div>
  );
};
 
export default Card;