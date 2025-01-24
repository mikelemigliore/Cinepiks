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

function UsernameUpdate() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCancel = () => {
    setIsDialogOpen(false);
  };


  return (
    <div>
      <h1 className="mb-[1vh] text-[0.9vw]">Username</h1>
      <form>
        <input
          type="text"
          className={`bg-buttonColor md:h-[5.5vh] md:px-[1.5vw] w-[14vw] md:rounded-full md:text-[0.9vw] placeholder-white`}
          placeholder="mikelemigliore"
        />
      </form>
      <div className="flex justify-start ml-[-1vw] mt-[1.5vh]">
        <Button
          onClick={handleCancel}
          className="bg-transparent rounded-full px-[1vw] py-[0.5vw] text-[0.8vw]  hover:bg-transparent"
        >
          Cancel
        </Button>
        <Button className="bg-customDeleteButton rounded-full px-[1vw] py-[0.5vw] text-[0.8vw]  text-sm md:text-[0.8vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500">
          Save
        </Button>
      </div>
    </div>
  );
}

export default UsernameUpdate;
