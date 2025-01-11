"use client";
import React, { useEffect, useState } from "react";
//import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MdModeEditOutline } from "react-icons/md";
import Password from "@/components/password/Password";
import EmailUpdate from "@/components/emailUpdate/EmailUpdate";
import DeleteAccount from "@/components/deleteAccount/DeleteAccount";
import Link from "next/link";
//import Avatar from "react-avatar-edit";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { IoPersonSharp } from "react-icons/io5";
import { useGetAccountQuery } from "../features/account/accountSlice";
//import UsernameUpdate from "@/components/usernameUpdate/UsernameUpdate";

function AccountPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [src, setSrc] = useState("");
  const [email, setEmail] = useState("");
  const [likes, setLikes] = useState(0);
  const [watchlist, setWatchlist] = useState(0);
  const [watched, setWatched] = useState(0);

  const { data: accountDb, isSuccess } = useGetAccountQuery({});

  //console.log(email);

  useEffect(() => {
    if (isSuccess && accountDb) {
      //console.log(accountDb?.email);
      setLikes(accountDb?.likes.length);
      setWatchlist(accountDb?.watchlist.length);
      setWatched(accountDb?.watched.length);
      setEmail(accountDb?.email); // Directly setting email
    }
  }, [accountDb, isSuccess]);

  // Called when the crop is complete, updates preview
  const onCrop = (preview: string) => {
    setPreview(preview);
  };

  // Called when the editor is closed
  const onClose = () => {
    setPreview(null);
  };

  const handleSave = () => {
    if (preview) {
      // Save logic here
      console.log("Image saved:", preview);

      // Example: Save to localStorage
      localStorage.setItem("profilePicture", preview);

      // Example: Call an API to update the user profile
      // await api.updateProfilePicture({ image: preview });

      //alert("Profile picture updated successfully!");
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="">
      <div className="flex justify-between mx-[22vw] mt-[20vh] mb-[10vh]">
        <div className="">
          <h1 className="text-[2.5vw] font-bold mb-[4vh]">Profile</h1>
          {preview ? (
            <img src={preview} alt="Preview" className="w-[16vw]" />
          ) : (
            <div className="w-[11vw] h-[11vw] bg-buttonColor flex items-center justify-center rounded-full">
              <IoPersonSharp className="w-[6vw] h-[6vw] text-customTextColor" />
            </div>
          )}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="md:w-[36vw] md:h-[33vw] bg-buttonColor pb-[4vw] ">
              <h1 className="ml-[2.2vw] mt-[1vw] text-[1vw]">
                Update Profile Picture
              </h1>
              <div className="mt-[-2vw] flex items-center justify-center w-full h-full text-white">
                {/* Dotted square container */}
                <div className="relative w-[600px] h-[350px] flex items-center justify-center overflow-hidden rounded-3xl border-[0.15vw] border-solid hover:bg-white/5 mb-[4vw]  mt-[4vw] mx-[2vw]">
                  {/* <Avatar
                    width={600}
                    height={350}
                    onCrop={onCrop}
                    onClose={onClose}
                    //onBeforeFileLoad={onBeforeFileLoad}
                    src={src}
                    label="Select Picture"
                    labelStyle={{
                      color: "white",
                      fontSize: "1vw",
                      display: "inline-block",
                      fontFamily: "sans-serif",
                      cursor: "pointer",
                      lineHeight: "400px",
                      width: "100%", // Adjust to fit parent container
                      height: "100%",
                    }}
                  /> */}
                </div>
              </div>
              <div className="flex justify-center items-center">
                <Button
                  onClick={handleSave}
                  disabled={!preview} // Disable if no image is cropped
                  className="w-[12vw] mt-[-2vh] px-[1vw] py-[1.3vw] rounded-full text-sm md:text-[0.8vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500"
                >
                  Save
                </Button>
              </div>
            </DialogContent>
            <div className="flex justify-center">
              <DialogTrigger className="mt-[1.5vh] px-[0.3vw] py-[0.8vw] rounded-full text-sm md:text-[0.8vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500">
                <MdModeEditOutline className="w-[2vw] h-[2vh]" />
              </DialogTrigger>
            </div>
          </Dialog>
        </div>
        <div>
          <div className="flex space-x-[9vw] ml-[5vw]">
            <div className="mt-[11vh] space-y-[3vh]">
              {/* <div>
                <UsernameUpdate/>
              </div> */}
              <div>
                <EmailUpdate email={email} />
              </div>
              <div>
                <Password />
              </div>
              <div>
                <h1 className="mb-[1vh] text-[0.9vw]">Likes</h1>
                <h1 className="text-customTextColor text-[0.9vw]">
                  {` You have liked ${likes} items`}
                </h1>
                <Link href="/likes">
                  <Button className="mt-[1.5vh] px-[1vw] py-[1vw] rounded-full text-sm md:text-[0.8vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500">
                    View All
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mt-[11vh] space-y-[5vh]">
              <div>
                <h1 className="mb-[1vh] text-[0.9vw]">Watchlist Stats</h1>
                <h1 className="text-customTextColor text-[0.9vw]">
                  {`You have ${watchlist} items in your watchlist`}
                </h1>
                <Link href="/watchlist">
                  <Button className="mt-[1.5vh] px-[1vw] py-[1vw] rounded-full text-sm md:text-[0.8vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500">
                    View All
                  </Button>
                </Link>
              </div>
              <div>
                <h1 className="mb-[1vh] text-[0.9vw]">Watched Stats</h1>
                <h1 className="text-customTextColor text-[0.9vw]">
                  {`You have watched ${watched} items`}
                </h1>
                <Link href="/watched">
                  <Button className="mt-[1.5vh] px-[1vw] py-[1vw] rounded-full text-sm md:text-[0.8vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500">
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
