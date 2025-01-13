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
//import { updateEmail } from "@/app/features/dbSlice";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

interface EmailProp {
  email: any;
}

function EmailUpdate({ email }: EmailProp) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();


  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const currentEmail = e.target[0].value;
    const newEmail = e.target[1].value;
    const confirmNewEmail = e.target[2].value;

    if (
      !isValidEmail(currentEmail) ||
      !isValidEmail(newEmail) ||
      !isValidEmail(confirmNewEmail)
    ) {
      setError("Email is invalid");
      return;
    }

    if (newEmail !== confirmNewEmail) {
      alert("Emails do not match!");
      return;
    }

    if (currentEmail !== email) {
      alert("Emails do not match!");
      return;
    }

    try {
      const res = await fetch("/api/account", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          newEmail,
          confirmNewEmail,
        }),
      });

      if (res.status === 400) {
        setError("This email is already registered");
      }
      if (res.status === 200) {
        setError("");
        signOut({ callbackUrl: "/" });
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="mb-[1vh] text-[0.9vw]">Email</h1>
      <form>
        {/* Search Input */}
        <h1
          //type="text"
          className={`flex items-center bg-buttonColor md:h-[5.5vh]  md:px-[1.5vw] w-[14vw] md:rounded-full md:text-[0.9vw] placeholder-white`}
          //placeholder={`${email}`}
        >{`${email}`}</h1>
      </form>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger className="mt-[1.5vh] px-[1vw] py-[0.5vw] rounded-full text-sm md:text-[0.8vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500">
          Update
        </DialogTrigger>
        <DialogContent className="w-[19vw] h-[26vw]  bg-buttonColor pb-[4vw]">
          <div className="flex flex-col mt-[1vw] ml-[2vw] space-y-[3vh]">
            <h1 className="text-[1vw]">Update Email</h1>

            <form className="space-y-[1.1vw]" onSubmit={handleSubmit}>
              <h1 className="mb-[1vh] text-[0.9vw]">Current Email</h1>
              <div>
                {/* Search Input */}
                <input
                  type="text"
                  className={`md:bg-backgroundButton md:h-[5.5vh] md:w-[15vw] md:px-[1.5vw] md:rounded-full md:text-[0.8vw]`}
                  placeholder="Current Email..."
                />
              </div>
              <div>
                <h1 className="mb-[1vh] text-[0.9vw]">New Email</h1>
                <div>
                  {/* Search Input */}
                  <input
                    type="text"
                    className={`md:bg-backgroundButton md:h-[5.5vh] md:w-[15vw] md:px-[1.5vw] md:rounded-full md:text-[0.8vw] `}
                    placeholder="New Email..."
                  />
                </div>
              </div>
              <div>
                <h1 className="mb-[1vh] text-[0.9vw]">Confirm New Email</h1>
                <div>
                  {/* Search Input */}
                  <input
                    type="text"
                    className={`md:bg-backgroundButton md:h-[5.5vh] md:w-[15vw] md:px-[1.5vw] md:rounded-full md:text-[0.8vw]`}
                    placeholder="Confirm New Email..."
                  />
                </div>
              </div>
              <div className="flex justify-start pt-[1vh] ml-[-1vw]">
                <Button
                  onClick={handleCancel}
                  className="bg-transparent rounded-full px-[1.5vw] py-[1.2vw] text-[0.9vw] m-[0.2vw] hover:bg-transparent"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-customColorCard rounded-full px-[1.5vw] py-[1.2vw] text-[0.9vw] m-[0.2vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95"
                >
                  Apply
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EmailUpdate;
