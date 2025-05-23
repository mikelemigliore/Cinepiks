import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import Link from "next/link";

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function Home({ onClick }: Props) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className="!bg-transparent hover:text-white text-white/70 font-bold text-[0.8vw]"
      asChild
    >
      <Link
        href="/homepage"
        className="flex items-center md:space-x-[0.4vw] space-x-[3vw]"
      >
        <IoHomeOutline className="w-5 h-5" />
        <span className="text-[4vw] md:text-[0.8vw]">Home</span>
      </Link>
    </Button>
  );
}

export default Home;
