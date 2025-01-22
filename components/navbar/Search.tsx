"use client";

import React, { useState, useRef, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import { useOutsideClick } from "@/utils/outsideClicks";
import { useRouter, usePathname } from "next/navigation";

function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const pathname = usePathname();

  // Extract the page name from the pathname
  const pageName = pathname.split("/").pop() || "/"; // Fallback to '/' if on root
  const query = inputRef.current?.value.trim();

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }
  }, []);

  // Close search when clicking outside or navigating away from the /search page
  const containerRef = useOutsideClick(() => {
    if (isOpen && !query) {
      setIsOpen(false);
    }
  });

  // const handleReload = () => {
  //   const queryParams = new URLSearchParams({
  //     type: mediaType === "movie" ? "movie" : "tv",
  //     servicesParam: JSON.stringify(activeServiceIds),
  //   });
  //   window.location.href = `/search?${queryParams.toString()}`;
  // };

  // Toggle search field visibility and Handle form submission Click
  const toggleSearch = () => {
    if (!isOpen) {
      setIsOpen(true);
      inputRef.current?.focus();
    } else if (inputRef.current?.value.trim()) {
      // console.log(encodeURIComponent(inputRef.current.value.trim()));

      // router.push(
      //   `/search?q=${encodeURIComponent(inputRef.current.value.trim())}`
      // );

      const queryParams = new URLSearchParams({
        type: "all",
        queryParam: JSON.stringify(
          encodeURIComponent(inputRef.current.value.trim())
        ),
      });
      window.location.href = `/search?${queryParams.toString()}`;
    }
    //router.push("/search");
  };

  const toggleSearchMobile = () => {
    if (!isOpen) {
      setIsOpen(true);
      //inputRef.current?.focus();
      // } else if (inputRef.current?.value.trim()) {
      //   // console.log(encodeURIComponent(inputRef.current.value.trim()));

      //   // router.push(
      //   //   `/search?q=${encodeURIComponent(inputRef.current.value.trim())}`
      //   // );

      //   const queryParams = new URLSearchParams({
      //     type: "all",
      //     queryParam: JSON.stringify(
      //       encodeURIComponent(inputRef.current.value.trim())
      //     ),
      //   });
      //   window.location.href = `/search?${queryParams.toString()}`;
    }
    //router.push("/search");
  };

  // Handle form submission Enter
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    if (inputRef.current?.value.trim()) {
      const queryParams = new URLSearchParams({
        type: "all",
        queryParam: JSON.stringify(
          encodeURIComponent(inputRef.current.value.trim())
        ),
      });
      window.location.href = `/search?${queryParams.toString()}`;
    }
  };

  return (
    <>
      {isDesktop ? (
        <div ref={containerRef} className="relative flex">
          {/* Search Button */}
          <Button
            className="md:w-[2.2vw] md:h-[2.2vw] w-[10vw] h-[10vw] md:mr-[0vw] mr-[4vw] p-0 md:bg-transparent rounded-full bg-customColor hover:bg-white/30 text-white flex items-center justify-center z-10"
            onClick={toggleSearch}
          >
            <IoSearchOutline className="md:w-[1.3vw] md:h-[1.3vw] w-[6vw] h-[6vh]" />
          </Button>

          <form onSubmit={handleSubmit}>
            {/* Search Input */}
            <input
              type="text"
              ref={inputRef}
              className={`hidden md:block md:bg-transparent md:h-[4.5vh] md:px-[1.5vw] md:rounded-full md:text-[0.8vw] md:border md:border-gray-500 md:transition-all md:duration-300 md:ease-in-out md:absolute md:right-0 ${
                isOpen
                  ? "md:w-[20vw] opacity-100 mr-[3vw]"
                  : "w-0 opacity-0 mr-0"
              }`}
              placeholder="Search..."
              autoFocus={isOpen}
            />
          </form>
        </div>
      ) : (
        <div ref={containerRef} className="flex">
          {/* Search Button */}
          <Button
            className="md:w-[2.2vw] md:h-[2.2vw] w-[10vw] h-[10vw] md:mr-[0vw] mr-[2vw] p-0 md:bg-transparent rounded-full bg-customColor hover:bg-white/30 text-white flex items-center justify-center z-10 transition-all duration-500 ease-in-out"
            onClick={toggleSearchMobile}
          >
            <IoSearchOutline className="md:w-[1.3vw] md:h-[1.3vw] w-[6vw] h-[6vh]" />
          </Button>

          {isOpen && (
            <div className="absolute bg-customColor w-[101vw] h-[13vh] mt-[5vh] ml-[-76vw] flex items-center justify-center">
              <form onSubmit={handleSubmit}>
                {/* <div className="absolute"> */}
                <input
                  type="text"
                  ref={inputRef}
                  className={`relative bg-transparent h-[7vh] px-[4vw] rounded-full text-[4vw] border border-gray-500 ${
                    isOpen ? "w-[93vw] opacity-100" : "w-0 opacity-0"
                  }`}
                  placeholder="Search..."
                  //autoFocus={isOpen}
                />
                <Button
                  className="absolute mt-[-6vh] ml-[80vw]  w-[10vw] h-[10vw]  p-0  rounded-full bg-customColor hover:bg-white/30 text-white flex items-center justify-center z-10"
                  onClick={toggleSearch}
                >
                  <IoSearchOutline className="md:w-[1.3vw] md:h-[1.3vw] w-[6vw] h-[6vh]" />
                </Button>
                {/* </div> */}
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Search;
