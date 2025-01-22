"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Password from "@/components/password/Password";
import EmailUpdate from "@/components/emailUpdate/EmailUpdate";
import DeleteAccount from "@/components/deleteAccount/DeleteAccount";
import Link from "next/link";
import { IoPersonSharp } from "react-icons/io5";
import { useGetAccountQuery } from "../features/account/accountSlice";
import ProfilePicture from "@/components/profilePicture/ProfilePicture";

function AccountPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [likes, setLikes] = useState(0);
  const [watchlist, setWatchlist] = useState(0);
  const [watched, setWatched] = useState(0);

  const { data: accountDb, isSuccess } = useGetAccountQuery({});

  //console.log(email);

  useEffect(() => {
    if (isSuccess && accountDb) {
      //console.log(accountDb);
      setPreview(accountDb?.picture)
      setLikes(accountDb?.likes.length);
      setWatchlist(accountDb?.watchlist.length);
      setWatched(accountDb?.watched.length);
      setEmail(accountDb?.email); // Directly setting email
    }
  }, [accountDb, isSuccess]);



  return (
    <div className="">
      <div className="md:flex justify-between md:mx-[22vw] md:mt-[20vh] mt-[10vh] mb-[10vh]">
        <div className="md:ml-[0vw] ml-[30vw]">
          <h1 className="md:text-[2.5vw] text-[10vw] font-bold md:mb-[4vh] md:ml-[0vw] ml-[5vw]">Profile</h1>
          {preview ? (
            <img src={preview} alt="Preview" className=" md:w-[16vw] md:h-[11vw] w-[40vw] h-[40vw] rounded-full object-cover" />
          ) : (
            <div className="md:w-[11vw] md:h-[11vw] w-[40vw] h-[40vw] bg-buttonColor flex items-center justify-center rounded-full">
              <IoPersonSharp className="md:w-[6vw] md:h-[6vw] w-[20vw] h-[20vw]  text-customTextColor" />
            </div>
          )}
          <div>
            <ProfilePicture
              setPreview={setPreview}
              email={email}
            />
          </div>
        </div>
        <div>
          <div className="md:flex md:space-x-[9vw] ml-[5vw]">
            <div className="md:mt-[11vh] mt-[6vh] space-y-[4vh]">
              <div>
                <EmailUpdate email={email} />
              </div>
              <div>
                <Password />
              </div>
              <div>
                <h1 className="mb-[1vh] md:text-[0.9vw]">Likes</h1>
                <h1 className="text-customTextColor md:text-[0.9vw]">
                  {` You have liked ${likes} items`}
                </h1>
                <Link href="/likes">
                  <Button className="mt-[1.5vh] md:px-[1vw] px-[4vw] md:py-[0.5vw] py-[3vw] rounded-full text-sm md:text-[0.8vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500">
                    View All
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:mt-[11vh] mt-[5vh] space-y-[5vh]">
              <div>
                <h1 className="mb-[1vh] md:text-[0.9vw]">Watchlist Stats</h1>
                <h1 className="text-customTextColor md:text-[0.9vw]">
                  {`You have ${watchlist} items in your watchlist`}
                </h1>
                <Link href="/watchlist">
                  <Button className="mt-[1.5vh] md:px-[1vw] px-[4vw] md:py-[0.5vw] py-[3vw] rounded-full text-sm md:text-[0.8vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500">
                    View All
                  </Button>
                </Link>
              </div>
              <div>
                <h1 className="mb-[1vh] md:text-[0.9vw]">Watched Stats</h1>
                <h1 className="text-customTextColor md:text-[0.9vw]">
                  {`You have watched ${watched} items`}
                </h1>
                <Link href="/watched">
                  <Button className="mt-[1.5vh] md:px-[1vw] px-[4vw] md:py-[0.5vw] py-[3vw] rounded-full text-sm md:text-[0.8vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500">
                    View All
                  </Button>
                </Link>
              </div>
              <div>
                <DeleteAccount email={email} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
