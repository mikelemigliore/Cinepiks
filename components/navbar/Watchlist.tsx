import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { LuPlus } from "react-icons/lu";

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>; // Button Element
}

function Watchlist({ onClick }: Props) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className="!bg-transparent hover:text-white text-white/70 rounded-lg focus:ring-0 font-bold text-base"
      asChild
    >
      <Link href="/watchlist" className="flex items-center">
        <LuPlus className="w-6 h-6 mr-2" />
        <span>Watchlist</span>
      </Link>
    </Button>
  );
}

export default Watchlist;
