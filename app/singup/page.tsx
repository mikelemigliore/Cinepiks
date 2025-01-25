"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useToast } from "@/hooks/use-toast";

function SignUp() {
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

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const confirmTogglePasswordVisibility = () => {
    setConfirmShowPassword((prevState) => !prevState);
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const usernameInput = e.target[0].value;
    const username = usernameInput.toLowerCase();
    const emailInput = e.target[1].value;
    const email = emailInput.toLowerCase();
    const password = e.target[2].value;
    const confirmPassword = e.target[3].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (res.status === 400) {
        setError("This email is already registered");
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

  return (
    sessionStatus !== "authenticated" && (
      <div className="background">
        <div className="w-full h-screen flex justify-center items-center">
          <div className="md:w-[19vw] w-[82vw] md:h-[32vw] h-[74vh] bg-buttonColor pb-[4vw] rounded-3xl">
            <div className="flex flex-col md:mt-[0.9vw] mt-[5vw] md:ml-[2vw] ml-[4vw] space-y-[3vh]">
              <h1 className="md:text-[1.5vw] text-[5vw]">Sign Up</h1>
              <form onSubmit={handleSubmit}>
                <div className="md:space-y-[1.5vw] space-y-[3vh]">
                  <div>
                    <h1 className="mb-[1vh] md:text-[0.9vw]">Username</h1>

                    <input
                      type="text"
                      className={`bg-backgroundButton h-[7vh] w-[75vw] md:h-[5.5vh] md:w-[15vw] md:px-[1.5vw] px-[4vw] rounded-full md:text-[0.8vw] `}
                      placeholder="Username..."
                      required
                    />
                  </div>
                  <div>
                    <h1 className="mb-[1vh] md:text-[0.9vw]">Email</h1>

                    <input
                      type="text"
                      className={`bg-backgroundButton h-[7vh] w-[75vw] md:h-[5.5vh] md:w-[15vw] md:px-[1.5vw] px-[4vw] rounded-full md:text-[0.8vw] `}
                      placeholder="Email..."
                      required
                    />
                  </div>
                  <div>
                    <h1 className="mb-[1vh] md:text-[0.9vw]">Password</h1>
                    <div className="flex relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`bg-transparent h-[7vh] w-[75vw]  md:h-[5.5vh] md:px-[1.5vw] px-[4vw]  md:w-[15vw] placeholder-customTextColor rounded-full md:text-[0.8vw] border border-customTextColor ${
                          showPassword ? "md:text-[0.9vw]" : "md:text-[0.9vw]"
                        }`}
                        placeholder="Password..."
                        required
                      />
                      <div
                        className="absolute md:right-[3vw] right-[7vw] top-[50%] transform -translate-y-[50%] cursor-pointer bg-buttonColor pl-[0.5vw]"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <AiOutlineEyeInvisible className="bg-buttonColor md:w-[1.3vw] md:h-[1.3vw] w-[6vw] h-[6vh]" />
                        ) : (
                          <AiOutlineEye className="bg-buttonColor md:w-[1.3vw] md:h-[1.3vw] w-[6vw] h-[6vh]" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h1 className="mb-[1vh] md:text-[0.9vw]">
                      Confirm Password
                    </h1>
                    <div className="flex relative">
                      <input
                        type={confirmShowPassword ? "text" : "password"}
                        className={`bg-transparent h-[7vh] w-[75vw]  md:h-[5.5vh] md:px-[1.5vw] px-[4vw]  md:w-[15vw] placeholder-customTextColor rounded-full md:text-[0.8vw] border border-customTextColor ${
                          confirmShowPassword
                            ? "md:text-[0.9vw]"
                            : "md:text-[0.9vw]"
                        }`}
                        placeholder="Confirm password..."
                        required
                      />
                      <div
                        className="absolute md:right-[3vw] right-[7vw] top-[50%] transform -translate-y-[50%] cursor-pointer bg-buttonColor pl-[0.5vw]"
                        onClick={confirmTogglePasswordVisibility}
                      >
                        {confirmShowPassword ? (
                          <AiOutlineEyeInvisible className="bg-buttonColor md:w-[1.3vw] md:h-[1.3vw] w-[6vw] h-[6vh]" />
                        ) : (
                          <AiOutlineEye className="bg-buttonColor md:w-[1.3vw] md:h-[1.3vw] w-[6vw] h-[6vh]" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-start ml-[-1vw]">
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
                          title: "Welcome to CinePiks!",
                          description: "Your account has been created successfully.",
                          className: "bg-customServicesColor text-white", 
                        })
                      }
                      className="bg-customColorCard rounded-full md:px-[1.5vw] px-[5vw] md:py-[0.5vw] py-[2vw] md:text-[0.9vw] md:m-[0.2vw] m-[2vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95"
                    >
                      Apply
                    </button>
                  </div>
                  <p className="text-red-600 text-[4vw] md:text-[0.9vw] mt-[0.5vw]">
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

export default SignUp;
