import React from "react";
import { RiMovie2Line } from "react-icons/ri";
import { Button } from "../ui/button";
import Link from "next/link";

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>; // Button Element
}

function TestPage({ onClick }: Props) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className="!bg-transparent hover:text-white text-white/70 rounded-lg focus:ring-0 font-bold text-base"
      asChild
    >
      <Link href="/testpage" className="flex items-center">
        <span>TestPage</span>
      </Link>
    </Button>
  );
}

export default TestPage;
