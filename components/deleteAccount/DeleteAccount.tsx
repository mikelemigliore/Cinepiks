"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { signOut, useSession } from "next-auth/react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface DeleteProp {
  email: any;
}

function DeleteAccount({ email }: DeleteProp) {
  //console.log(email);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState("");
  const deleteSentence = "delete-account";

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const deleteConfirm = e.target[0].value;

    if (deleteConfirm !== deleteSentence) {
      alert("Spelling error detected");
      return;
    }

    try {
      const res = await fetch("/api/account", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      if (res.status === 400) {
        setError("Something went wrong");
      }

      if (res.status === 200) {
        setError("");
        signOut({ callbackUrl: "/" });
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div>
      <h1 className="mb-[1vh] md:text-[0.9vw]">Delete Account</h1>
      <h2 className="md:text-[0.9vw] text-customTextColor ">
        By deleting your account, all of your data and related profiles will be
        canceled and will be permanently lost.
      </h2>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger className="mt-[1.5vh] md:px-[1vw] px-[4vw] md:py-[0.5vw] py-[3vw] rounded-full text-sm md:text-[0.8vw] bg-customDeleteButton hover:bg-hoveredCustomDeleteButton">
          Delete
        </DialogTrigger>
        <DialogContent className="md:w-[25vw] md:h-[13.5vw] w-[83vw] h-[28vh] bg-buttonColor rounded-2xl">
        <VisuallyHidden>
                <DialogTitle></DialogTitle>
              </VisuallyHidden>
          <div className="flex flex-col md:mt-[1vw] mt-[5vw] md:mx-[2vw] ml-[4vw] space-y-[3vh]">
            <h1 className="md:text-[0.9vw]">
              {`To confirm you cancellation, type '${deleteSentence}' in the text box
              below and confirm.`}
            </h1>
            <form onSubmit={handleSubmit}>
              {/* Search Input */}
              <input
                type="text"
                className={`bg-backgroundButton h-[7vh] w-[75vw] md:h-[5.5vh] md:w-[15vw] md:px-[1.5vw] px-[4vw] rounded-full md:text-[0.8vw]`}
                placeholder="Type..."
              />

              <div className="flex justify-start ml-[-1vw] mt-[1.5vw]">
                <Button
                  onClick={handleCancel}
                  className="bg-transparent rounded-full md:px-[1.5vw] px-[5vw] md:py-[1.2vw] py-[2vw] md:text-[0.9vw] md:m-[0.2vw] m-[2vw] hover:bg-transparent"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-customDeleteButton rounded-full md:px-[1.5vw] px-[5vw] md:py-[1.2vw] py-[2vw] md:text-[0.9vw] md:m-[0.2vw] m-[2vw] hover:bg-hoveredCustomDeleteButton"
                >
                  Delete
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DeleteAccount;
