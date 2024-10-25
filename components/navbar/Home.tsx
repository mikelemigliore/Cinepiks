import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import Link from "next/link";


interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>; // Button Element
}

function Home({onClick}:Props) {
  return (
      <Button
        variant="ghost"
        onClick={onClick}
        className="!bg-transparent hover:text-white text-white/70 font-bold text-base"
        asChild
      >
        <Link href="/" className="flex items-center space-x-2">
          <IoHomeOutline className="w-5 h-5" />
          <span>Home</span>
        </Link>
      </Button>
  );
}

export default Home;
