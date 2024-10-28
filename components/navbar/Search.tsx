"use client";

import React, { useState, useRef } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import { useOutsideClick } from "@/utils/outsideClicks";
import { useRouter, usePathname } from "next/navigation";

function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const pathname = usePathname();

  // Extract the page name from the pathname
  const pageName = pathname.split("/").pop() || "/"; // Fallback to '/' if on root

  // Close search when clicking outside or navigating away from the /search page
  const containerRef = useOutsideClick(() => {
    if (isOpen && (!inputRef.current || inputRef.current.value.trim() === "" || pageName !== 'search')) {
      setIsOpen(false);
    }
  });

  // Toggle search field visibility
  const toggleSearch = () => {
    setIsOpen(!isOpen);
    router.push("/search");
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Additional logic here if needed, e.g., search query processing
  };

  return (
    <div ref={containerRef} className="relative flex">
      {/* Search Button */}
      <Button
        className="w-[2.2vw] h-[2.2vw] p-0 md:bg-transparent rounded-full bg-customColor hover:bg-white/30 text-white flex items-center justify-center z-10"
        onClick={toggleSearch}
      >
        <IoSearchOutline className="w-[1.3vw] h-[1.3vw]" />
      </Button>

      <form onSubmit={handleSubmit}>
        {/* Search Input */}
        <input
          type="text"
          ref={inputRef}
          className={`hidden md:block md:bg-transparent md:h-[4.5vh] md:px-[1.5vw] md:rounded-full md:text-[0.8vw] md:border md:border-gray-500 md:transition-all md:duration-300 md:ease-in-out md:absolute md:right-0 ${
            isOpen ? "md:w-[20vw] opacity-100 mr-[3vw]" : "w-0 opacity-0 mr-0"
          }`}
          placeholder="Search..."
          autoFocus={isOpen}
        />
      </form>
    </div>
  );
}

export default Search;