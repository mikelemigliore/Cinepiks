"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Eye icons for toggle

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const confirmTogglePasswordVisibility = () => {
    setConfirmShowPassword((prevState) => !prevState);
  };

  return (
    <div className='background'>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="md:w-[19vw] md:h-[31vw] bg-buttonColor pb-[4vw] rounded-3xl">
          <div className="flex flex-col mt-[0.7vw] ml-[2vw] space-y-[3vh]">
            <h1 className="text-[1.5vw]">Sign Up</h1>
            <div>
              <h1 className="mb-[1vh]">Username</h1>
              <form>
                {/* Search Input */}
                <input
                  type="text"
                  className={`md:bg-backgroundButton md:h-[5.5vh] md:w-[15vw] md:px-[1.5vw] md:rounded-full md:text-[0.8vw]`}
                  placeholder="Search..."
                />
              </form>
            </div>
            <div>
              <h1 className="mb-[1vh]">Email</h1>
              <form>
                {/* Search Input */}
                <input
                  type="text"
                  className={`md:bg-backgroundButton md:h-[5.5vh] md:w-[15vw] md:px-[1.5vw] md:rounded-full md:text-[0.8vw] `}
                  placeholder="Search..."
                />
              </form>
            </div>
            <div>
              <h1 className="mb-[1vh]">Password</h1>
              <form className="flex relative">
                {/* Search Input */}
                <input
                  type={showPassword ? "text" : "password"}
                  className={`md:bg-transparent md:h-[5.5vh] md:px-[1.5vw] w-[15vw] placeholder-customTextColor md:rounded-full md:text-[0.8vw] border border-customTextColor ${
                    showPassword ? "text-[0.9vw]" : "text-[0.9vw]"
                  }`}
                  placeholder=""
                  readOnly
                  value="dthsthsrthesrtvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv"
                />
                <div
                  className="absolute right-[3vw] top-[50%] transform -translate-y-[50%] cursor-pointer bg-buttonColor pl-[0.5vw]"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="bg-buttonColor w-[1.3vw] h-[1.3vw]" />
                  ) : (
                    <AiOutlineEye className="bg-buttonColor w-[1.3vw] h-[1.3vw]" />
                  )}
                </div>
              </form>
            </div>
            <div>
              <h1 className="mb-[1vh]">Confirm Password</h1>
              <form className="flex relative">
                {/* Search Input */}
                <input
                  type={confirmShowPassword ? "text" : "password"}
                  className={`md:bg-transparent md:h-[5.5vh] md:px-[1.5vw] w-[15vw] placeholder-customTextColor md:rounded-full md:text-[0.8vw] border border-customTextColor ${
                    confirmShowPassword ? "text-[0.9vw]" : "text-[0.9vw]"
                  }`}
                  placeholder=""
                  readOnly
                  value="dthsthsrthesrtvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv"
                />
                <div
                  className="absolute right-[3vw] top-[50%] transform -translate-y-[50%] cursor-pointer bg-buttonColor pl-[0.5vw]"
                  onClick={confirmTogglePasswordVisibility}
                >
                  {confirmShowPassword ? (
                    <AiOutlineEyeInvisible className="bg-buttonColor w-[1.3vw] h-[1.3vw]" />
                  ) : (
                    <AiOutlineEye className="bg-buttonColor w-[1.3vw] h-[1.3vw]" />
                  )}
                </div>
              </form>
            </div>
            <div className="flex justify-start ml-[-1vw]">
              <Link
                href="/"
                className="bg-transparent rounded-full px-[1.5vw] py-[0.5vw] text-[0.9vw] m-[0.2vw] hover:bg-transparent"
              >
                Cancel
              </Link>
              <Button className="bg-customColorCard rounded-full px-[1.5vw] py-[1.2vw] text-[0.9vw] m-[0.2vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95">
                Apply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
