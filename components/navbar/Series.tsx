import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { MdOutlineLiveTv } from "react-icons/md";

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>; // Button Element
}

function Series({ onClick }: Props) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className="!bg-transparent hover:text-white text-white/70 rounded-lg focus:ring-0 font-bold text-base"
      asChild
    >
      <Link href="/series" className="flex items-center space-x-2">
        <MdOutlineLiveTv className="w-6 h-6" />
        <span>TV Series</span>
      </Link>
    </Button>
  );
}

export default Series;
