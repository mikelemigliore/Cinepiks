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

interface DeleteProp {
  email: any;
}

function DeleteAccount({ email }: DeleteProp) {
  console.log(email);

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
      <h1 className="mb-[1vh] text-[0.9vw]">Delete Account</h1>
      <h2 className="text-customTextColor ">
        By deleting your account, all of your data and related profiles will be
        canceled and will be permanently lost.
      </h2>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger className="mt-[1.5vh] px-[1vw] py-[0.5vw] rounded-full text-sm md:text-[0.8vw] bg-customDeleteButton hover:bg-hoveredCustomDeleteButton">
          Delete
        </DialogTrigger>
        <DialogContent className="md:w-[25vw] md:h-[13.5vw] bg-buttonColor ">
          <div className="flex flex-col mt-[1vw] mx-[2vw] space-y-[3vh]">
            <h1 className="text-[0.9vw]">
              {`To confirm you cancellation, type '${deleteSentence}' in the text box
              below and confirm.`}
            </h1>
            <form onSubmit={handleSubmit}>
              {/* Search Input */}
              <input
                type="text"
                className={`md:bg-backgroundButton md:h-[6vh] md:w-[20vw] md:px-[1.5vw] md:rounded-full md:text-[0.8vw]`}
                placeholder="Type..."
              />

              <div className="flex justify-start ml-[-1vw] mt-[1.5vw]">
                <Button
                  onClick={handleCancel}
                  className="bg-transparent rounded-full px-[1.5vw] py-[1.2vw] text-[0.9vw] m-[0.2vw] hover:bg-transparent"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-customDeleteButton rounded-full px-[1.5vw] py-[1.2vw] text-[0.9vw] m-[0.2vw] hover:bg-hoveredCustomDeleteButton"
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
