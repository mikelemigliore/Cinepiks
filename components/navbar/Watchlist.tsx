import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { LuPlus } from "react-icons/lu";

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function Watchlist({ onClick }: Props) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className="!bg-transparent hover:text-white text-white/70 rounded-lg focus:ring-0 font-bold text-[0.8vw] md:space-x-[0.4vw] space-x-[3vw]"
      asChild
    >
      <Link href="/watchlist" className="flex items-center">
        <LuPlus className="w-5 h-5" />
        <span className="text-[4vw] md:text-[0.8vw]">Watchlist</span>
      </Link>
    </Button>
  );
}

export default Watchlist;

