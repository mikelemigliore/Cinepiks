"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoPersonSharp } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import { IoCheckmark } from "react-icons/io5";
import { AiFillLike } from "react-icons/ai";
import { IoMdLogOut } from "react-icons/io";
import { signOut, useSession } from "next-auth/react";
import { useGetAccountQuery } from "@/app/features/account/accountSlice";
import { useRouter } from "next/navigation";

interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function LinksDropdown({ onClick }: Props) {
  const [src, setSrc] = useState<string | null>(null);
  const { data: session }: any = useSession();

  const { data: accountDb, isSuccess } = useGetAccountQuery({});

  const router = useRouter();

  useEffect(() => {
    if (isSuccess && accountDb) {
      setSrc(accountDb?.picture);
    }
  }, [accountDb, isSuccess]);

  const handleLikesReload = () => {
    window.location.href = "/likes";
  };

  const handleWatchedReload = () => {
    window.location.href = "/watched";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex gap-[1vw] rounded-full p-0 bg-black/10 hover:bg-white/30 text-white mr-[2vw] md:mr-[0vw]"
        >
          <Avatar>
            <AvatarImage src={src || undefined} />
            <AvatarFallback><IoPersonSharp className="md:w-[1vw] md:h-[1vw] w-[5vw] h-[5vw]  text-white" /></AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="rounded-[2vh] md:w-[14vw] w-[50vw] bg-customColor text-white border-none drop-shadow-xl z-[100]"
        align="end"
        sideOffset={10}
      >
        <DropdownMenuItem className="flex flex-col md:space-y-[1vw] md:p-[1vh] space-y-[3vw] p-[1vh] hover:bg-transparent focus:bg-transparent active:bg-transparent">
          {!session ? (
            <></>
          ) : (
            <div className="flex items-center font-medium text-[1.2vw] capitalize w-full">
              <Button
                variant="ghost"
                onClick={() => router.push("/account")}
                className="justify-start w-full md:text-[0.8vw] text-[3.5vw] hover:text-black text-white rounded-[2vh] p-[2.4vh] md:gap-[1.5vw] gap-[5vw]"
              >
                <IoPersonSharp size={20} />
                Account
              </Button>
            </div>
          )}

          <div className="flex items-center font-medium text-[1.2vw] capitalize w-full">
            <Button
              variant="ghost"
              onClick={() => router.push("/watchlist")}
              className="justify-start w-full md:text-[0.8vw] text-[3.5vw] hover:text-black text-white rounded-[2vh] p-[2.4vh] md:gap-[1.5vw] gap-[5vw]"
            >
              <LuPlus size={25} />
              Watchlist
            </Button>
          </div>
          <div className="flex items-center font-medium text-[1.2vw] capitalize w-full">
            <Button
              variant="ghost"
              //onClick={() => router.push("/watched")}
              onClick={(e) => {
                if (onClick) onClick(e);
                handleWatchedReload();
              }}
              className="justify-start w-full md:text-[0.8vw] text-[3.5vw] hover:text-black text-white rounded-[2vh] p-[2.4vh] md:gap-[1.5vw] gap-[5vw]"
            >
              <IoCheckmark size={25} />
              Watched
            </Button>
          </div>
          <div className="flex items-center font-medium text-[1.2vw] capitalize w-full">
            <Button
              variant="ghost"
              onClick={(e) => {
                if (onClick) onClick(e);
                handleLikesReload();
              }}
              className="justify-start w-full md:text-[0.8vw] text-[3.5vw] hover:text-black text-white rounded-[2vh] p-[2.4vh] md:gap-[1.5vw] gap-[5vw]"
            >
              <AiFillLike size={25} />
              Likes
            </Button>
          </div>
          {!session ? (
            <></>
          ) : (
            <div className="flex items-center font-medium text-[1.2vw] capitalize w-full">
              <Button
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                }}
                variant="ghost"
                className="justify-start w-full md:text-[0.8vw] text-[3vw] hover:text-black text-white rounded-[2vh] p-[2.4vh] gap-[1.5vw]"
              >
                <IoMdLogOut size={25} />
                Log Out
              </Button>
            </div>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LinksDropdown;
