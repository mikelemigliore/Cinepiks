"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

function ForgotPassword() {
  const [error, setError] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const { data: session, status: sessionStatus } = useSession();

  const { toast } = useToast();

  useEffect(() => {

    if (sessionStatus === "authenticated") {
      router.replace("/homepage");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const emailInput = e.target[0].value;
    const email = emailInput.toLowerCase();

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    try {
      const res = await fetch("/api/forgotpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      if (res.status === 400) {
        setError("User with this email is not registered");
      }
      if (res.status === 200) {
        setError("");
        router.push("/");
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="background">
        <div className="w-full h-screen flex justify-center items-center">
          <div className="md:w-[19vw] md:h-[18vw] w-[82vw] h-[40vh] bg-buttonColor md:pb-[4vw] rounded-3xl">
            <div className="flex flex-col md:mt-[0.9vw] mt-[5vw] md:ml-[2vw] ml-[4vw] space-y-[2vh]">
              <h1 className="md:text-[1.5vw] text-[5vw]">Reset Password</h1>
              <p className="md:text-[0.8vw] text-customTextColor md:w-[15vw]">
                Please enter your current email address to receive a link for
                resetting your password.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="md:space-y-[1.5vw] space-y-[3vh]">
                  <div>
                    <h1 className="mb-[1vh] md:text-[0.9vw]">Email</h1>
                    <input
                      type="text"
                      className={`bg-backgroundButton h-[7vh] w-[75vw] md:h-[5.5vh] md:w-[15vw] md:px-[1.5vw] px-[4vw] rounded-full md:text-[0.8vw] `}
                      placeholder="Email..."
                      required
                    />
                  </div>
                  <div></div>
                  <div className="flex justify-start md:ml-[-1vw] ml-[-5vw]">
                    <Link
                      href="/"
                      className="bg-transparent rounded-full md:px-[1.5vw] px-[5vw] md:py-[0.5vw] py-[2vw] md:text-[0.9vw] md:m-[0.2vw] m-[2vw] hover:bg-transparent"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      onClick={() =>
                        toast({
                          title: "Password reset link as been sent",
                          description: "Check your email and click the link to reset your password.",
                          className: "bg-customServicesColor text-white", 
                        })
                      }
                      className="bg-customColorCard rounded-full md:px-[1.5vw] px-[5vw] md:py-[0.5vw] py-[2vw] md:text-[0.9vw] md:m-[0.2vw] m-[2vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95"
                    >
                      Send
                    </button>
                  </div>
                  <p className="text-red-600 md:text-[0.9vw] text-[4vw] mt-[0.5vw]">
                    {error && error}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default ForgotPassword;
