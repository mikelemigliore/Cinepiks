import React from "react";
import { Button } from "../ui/button";
import { MdOutlineLiveTv } from "react-icons/md";

interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>; 
}

function Series({ onClick }: Props) {
  const handleReload = () => {
    window.location.href = "/search?type=series"; 
  };

  return (
    <Button
      variant="ghost"
      onClick={(e) => {
        if (onClick) onClick(e); 
        handleReload(); 
      }}
      className="!bg-transparent hover:text-white text-white/70 rounded-lg focus:ring-0 font-bold text-[0.8vw] md:space-x-[0.4vw] space-x-[3vw]"
    >
      <MdOutlineLiveTv className="w-5 h-5" />
      <span className='text-[4vw] md:text-[0.8vw]'>TV Series</span>
    </Button>
  );
}

export default Series;