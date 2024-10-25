import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { links } from "@/utils/links";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function LinksDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex gap-4 rounded-full p-0 rounded-full bg-black/1 hover:bg-white/30 text-white"
        >
          <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" className="w-9 h-9" />
          <AvatarFallback>MM</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="rounded-3xl w-60 bg-customColor text-white border-none drop-shadow-xl"
        align="end"
        sideOffset={10}
      >
        {links.map((link) => {
          return (
            <DropdownMenuItem
              key={link.href}
              className="p-2 hover:bg-transparent focus:bg-transparent active:bg-transparent"
            >
              {/* {link.icon} */}
              <Link
                  href={link.href}
                  className="flex items-center font-medium text-base capitalize w-full"
                >
              <Button
                variant="ghost"
                className="justify-start w-full text-base hover:text-black text-white rounded-3xl p-6 gap-5"
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
