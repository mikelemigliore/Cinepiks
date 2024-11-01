import React from "react";

interface CastCardProp {
  name: string;
  character: string;
  picture: string;
}

function CastCard({ name, character, picture }: CastCardProp) {
  return (
    <div className="w-[7.5vw] flex flex-col items-center justify-center">
      <div className='bg-buttonColor w-[7vw] h-[7vw] rounded-full flex justify-center overflow-hidden'>
        <img className="object-cover w-full h-full" src={picture} />
      </div>
      <div className='text-center font-bold mt-[0.8vw]'>{name}</div>
      <div className='text-center font-bold text-customTextColor'>{character}</div>
    </div>
  );
}

export default CastCard;
