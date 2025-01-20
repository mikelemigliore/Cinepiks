"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Eye icons for toggle
import { signOut, useSession } from "next-auth/react";

function Password() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <h1 className="mb-[1vh] md:text-[0.9vw]">Password</h1>
      <form className="flex relative">
        {/* Search Input */}
        <input
          type={"password"}
          className={`bg-buttonColor h-[7vh] w-[75vw] md:h-[5.5vh]  md:px-[1.5vw] px-[4vw] md:w-[14vw] rounded-full md:pr-[2.5rem]`}
          placeholder=""
          readOnly
          value="dthsthsrthesrtvvvv"
        />
        {/* <div
          className="absolute right-[1vw] top-[50%] transform -translate-y-[50%] cursor-pointer bg-buttonColor pl-[0.5vw]"
          onClick={togglePasswordVisibility}
        ></div> */}
      </form>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger className="mt-[1.5vh] md:px-[1vw] px-[4vw] md:py-[0.5vw] py-[3vw] rounded-full text-sm md:text-[0.8vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500">
          Update
        </DialogTrigger>
        <DialogContent className="md:w-[21vw] md:h-[13vw] w-[70vw] h-[58vw] rounded-2xl bg-buttonColor md:pb-[4vw]">
          <div className="flex flex-col md:mt-[1vw] mt-[5vw] md:ml-[2vw] ml-[4vw] space-y-[3vh]">
            <h1 className="md:text-[1vw] text-[5vw]">Update Passowrd</h1>
            <h1 className="md:mb-[1vh] md:text-[0.9vw] md:max-w-[17vw]">
              To update your password, you'll be signed out and
              redirected to the appropraite page
            </h1>
            <div className="flex justify-start pt-[1vh] ml-[-1vw]">
              <Button
                onClick={handleCancel}
                className="bg-transparent rounded-full md:px-[1.5vw] px-[5vw] md:py-[0.5vw] py-[2vw] md:text-[0.9vw] md:m-[0.2vw] m-[2vw] hover:bg-transparent"
              >
                Cancel
              </Button>
              <Button
                onClick={() => signOut({ callbackUrl: "/forgotpassword" })}
                className="bg-customColorCard rounded-full md:px-[1.5vw] px-[5vw] md:py-[0.5vw] py-[2vw] md:text-[0.9vw] md:m-[0.2vw] m-[2vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95"
              >
                Confirm
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* <Button className="mt-[1.5vh] px-[1vw] py-[1vw] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500">
              Update
            </Button> */}
    </div>
  );
}

export default Password;
