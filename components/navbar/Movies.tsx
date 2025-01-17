import React from "react";
import { RiMovie2Line } from "react-icons/ri";
import { Button } from "../ui/button";
import Link from "next/link";

interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // Button Element
}

function Movies({ onClick }: Props) {
  const handleReload = () => {
    window.location.href = "/search?type=movie"; // Force page reload
  };

  return (
    <Button
      variant="ghost"
      onClick={(e) => {
        if (onClick) onClick(e); // Call the passed onClick handler if provided
        handleReload(); // Reload the page
      }}
      className="!bg-transparent hover:text-white text-white/70 rounded-lg focus:ring-0 font-bold text-[0.8vw] md:space-x-[0.4vw] space-x-[3vw]"
    >
        <RiMovie2Line className="w-5 h-5" />
        <span className='text-[4vw] md:text-[0.8vw]'>Movies</span>
    </Button>
  );
}

export default Movies;
