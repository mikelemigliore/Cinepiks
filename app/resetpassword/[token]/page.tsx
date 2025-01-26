"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useToast } from "@/hooks/use-toast";
import { use } from "react";
import { Skeleton } from "@mui/material";

interface User {
  email: string;
}

function ResetPassword({ params }: { params: Promise<{ token: string }> }) {
  const unwrappedParams = use(params);
  const token = unwrappedParams.token;

  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);

  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const { data: session, status: sessionStatus } = useSession();

  const { toast } = useToast();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch("/api/verifytoken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
          }),
        });

        if (res.status === 400) {
          setError("Invalid token or has expired");
          setVerified(true);
        }
        if (res.status === 200) {
          setError("");
          setVerified(true);
          const userData = await res.json();
          setUser(userData);
        }
      } catch (error) {
        setError("Error, try again");
        console.log(error);
      }
    };
    verifyToken();
  }, [token]);

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const password = e.target[0].value;
    const confirmPassword = e.target[1].value;

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("/api/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          email: user?.email,
        }),
      });

      if (res.status === 400) {
        setError("Something went wrong, try again");
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

  if (sessionStatus === "loading" || !verified) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Skeleton className="w-[19vw] h-[20vw] bg-buttonColor pb-[4vw] rounded-3xl" />
      </div>
    );
  }

  const resetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const form = e.currentTarget.form as HTMLFormElement;
    const password = (form[0] as HTMLInputElement).value;
    const confirmPassword = (form[1] as HTMLInputElement).value;

    if (!password || !confirmPassword) {
      setError("Both fields must be filled.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    toast({
      title: "Password Reset Successful!",
      description: "You can now log in with your new password.",
      className: "bg-customServicesColor text-white",
    });
  };

  return (
    sessionStatus !== "authenticated" && (
      <div className="background">
        <div className="w-full h-screen flex justify-center items-center">
          <div className="md:w-[19vw] md:h-[20vw] h-[46vh] w-[82vw] bg-buttonColor pb-[4vw] rounded-3xl">
            <div className="flex flex-col md:mt-[0.9vw] mt-[5vw] md:ml-[2vw] ml-[4vw] space-y-[3vh]">
              <h1 className="md:text-[1.5vw] text-[5vw]">Reset Password</h1>
              <form onSubmit={handleSubmit}>
                <div className="md:space-y-[1.5vw] space-y-[3vh]">
                  <div>
                    <h1 className="mb-[1vh] md:text-[0.9vw]">New Password</h1>
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
                    <h1 className="mb-[1vh]">Confirm New Password</h1>
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
                      disabled={error.length > 0}
                      onClick={(e) => resetClick(e)}
                      className={`bg-customColorCard rounded-full md:px-[1.5vw] px-[5vw] md:py-[0.5vw] py-[2vw] md:text-[0.9vw] md:m-[0.2vw] m-[2vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
                        error.length > 0
                          ? ""
                          : `hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95`
                      }`}
                    >
                      Reset Password
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

export default ResetPassword;
