import React from "react";

interface CastCardProp {
  name: string;
  character: string;
  picture: string;
}

function CastCard({ name, character, picture }: CastCardProp) {
  return (
    <div className="md:w-[7.5vw] w-[33vw] flex flex-col items-center justify-center">
      <div className='bg-buttonColor md:w-[7vw] md:h-[7vw] w-[30vw] h-[30vw] rounded-full flex justify-center overflow-hidden'>
        <img className="object-cover w-full h-full" src={picture} />
      </div>
      <div className='text-center font-bold mt-[0.8vw] md:text-[0.8vw]'>{name}</div>
      <div className='text-center font-bold text-customTextColor md:text-[0.8vw]'>{character}</div>
    </div>
  );
}

export default CastCard;
