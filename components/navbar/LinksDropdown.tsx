import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { links } from "@/utils/links";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function LinksDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex gap-[1vw] rounded-full p-0 bg-black/10 hover:bg-white/30 text-white"
        >
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" className="w-[2vw] h-[2vw]" />
            <AvatarFallback>MM</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="rounded-[2vh] w-[14vw] bg-customColor text-white border-none drop-shadow-xl"
        align="end"
        sideOffset={10}
      >
        {links.map((link) => {
          return (
            <DropdownMenuItem
              key={link.href}
              className="p-[1vh] hover:bg-transparent focus:bg-transparent active:bg-transparent"
            >
              <Link
                href={link.href}
                className="flex items-center font-medium text-[1.2vw] capitalize w-full"
              >
                <Button
                  variant="ghost"
                  className="justify-start w-full text-[0.8vw] hover:text-black text-white rounded-[2vh] p-[2vh] gap-[1.5vw]"
                >
                  {link.icon}
                  {link.label}
                </Button>
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LinksDropdown;