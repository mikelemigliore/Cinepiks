import React from "react";
import { RiMovie2Line } from "react-icons/ri";
import { Button } from "../ui/button";
import Link from "next/link";

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>; // Button Element
}

function Movies({onClick}:Props) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className="!bg-transparent hover:text-white text-white/70 rounded-lg focus:ring-0 font-bold text-[0.8vw]"
      asChild
    >
      <Link href="/movies" className="flex items-center space-x-[0.4vw]">
        <RiMovie2Line className="w-5 h-5 " />
        <span>Movies</span>
      </Link>
    </Button>
  );
}

export default Movies;
