"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Eye icons for toggle

function ForgotPassword() {
  const [error, setError] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    //console.log("Session", session);

    if (sessionStatus === "authenticated") {
      router.replace("/homepage");
    }
  }, [sessionStatus, router]);

//   const togglePasswordVisibility = () => {
//     setShowPassword((prevState) => !prevState);
//   };

//   const confirmTogglePasswordVisibility = () => {
//     setConfirmShowPassword((prevState) => !prevState);
//   };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    //const username = e.target[0].value;
    const email = e.target[0].value;
    // const password = e.target[2].value;
    // const confirmPassword = e.target[3].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    // if (!password || password.length < 8) {
    //   setError("Password is invalid");
    //   return;
    // }

    // Check if passwords match
    // if (password !== confirmPassword) {
    //   alert("Passwords do not match!");
    //   return; // Prevent form submission
    // }

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
          <div className="w-[19vw] h-[15vw] bg-buttonColor pb-[4vw] rounded-3xl">
            <div className="flex flex-col mt-[0.9vw] ml-[2vw] space-y-[3vh]">
              <h1 className="text-[1.5vw]">Reset</h1>
              <form onSubmit={handleSubmit}>
                <div className="space-y-[1.5vw]">
                  {/* <div>
                    <h1 className="mb-[1vh]">Username</h1>

                    <input
                      type="text"
                      className={`md:bg-backgroundButton md:h-[5.5vh] md:w-[15vw] md:px-[1.5vw] md:rounded-full md:text-[0.8vw]`}
                      placeholder="Username..."
                      required
                    />
                  </div> */}
                  <div>
                    <h1 className="mb-[1vh]">Email</h1>
                    <input
                      type="text"
                      className={`md:bg-backgroundButton md:h-[5.5vh] md:w-[15vw] md:px-[1.5vw] md:rounded-full md:text-[0.8vw] `}
                      placeholder="Email..."
                      required
                    />
                  </div>
                  {/* <div>
                    <h1 className="mb-[1vh]">New Password</h1>
                    <div className="flex relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`md:bg-transparent md:h-[5.5vh] md:px-[1.5vw] w-[15vw] placeholder-customTextColor md:rounded-full md:text-[0.8vw] border border-customTextColor ${
                          showPassword ? "text-[0.9vw]" : "text-[0.9vw]"
                        }`}
                        placeholder="Password..."
                        required
                        //value="dthsthsrthesrtvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv"
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
                    </div>
                  </div> */}
                  <div>
                    {/* <h1 className="mb-[1vh]">Confirm New Password</h1> */}
                    {/* <div className="flex relative">
                      <input
                        type={confirmShowPassword ? "text" : "password"}
                        className={`md:bg-transparent md:h-[5.5vh] md:px-[1.5vw] w-[15vw] placeholder-customTextColor md:rounded-full md:text-[0.8vw] border border-customTextColor ${
                          confirmShowPassword ? "text-[0.9vw]" : "text-[0.9vw]"
                        }`}
                        placeholder="Confirm password..."
                        required
                        //value="dthsthsrthesrtvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv"
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
                    </div> */}
                  </div>
                  <div className="flex justify-start ml-[-1vw]">
                    <Link
                      href="/"
                      className="bg-transparent rounded-full px-[1.5vw] py-[0.5vw] text-[0.9vw] m-[0.2vw] hover:bg-transparent"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      className="bg-customColorCard rounded-full px-[1.5vw] py-[0.7vw] text-[0.9vw] m-[0.2vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95"
                    >
                      Send
                    </button>
                  </div>
                  <p className="text-red-600 text-[0.9vw] mt-[0.5vw]">
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
