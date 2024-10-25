//If you have a form or a button that requires user interaction and changes the UI based on the user's input, 
//you need to mark that component as a client component using "use client"
"use client";

import React, { useState, useRef } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import { useOutsideClick } from "@/utils/outsideClicks";
import { useRouter, usePathname  } from "next/navigation";

function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const pathname = usePathname()


   // Extract the page name from the pathname
   const pageName = pathname.split("/").pop() || "/"; // Fallback to 'home' if on root

  // Use the hook and get the ref to attach to the search container
  const containerRef = useOutsideClick(() => {
    if (isOpen && inputRef.current && inputRef.current.value.trim() === "" || pageName!=='search') {
      setIsOpen(false);
    }
  });

  const toggleSearch = () => {
    setIsOpen(!isOpen);
    router.push("/search");
  };

 //In your handleSubmit function, the event is an object that represents the event that triggered the function—in this case, 
 //the form submission. When a form is submitted in React, it generates a FormEvent, which is passed to the event handler as an argument
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //router.push("/search");
  };

  
  return (
    <div ref={containerRef} className="relative flex">
      {/* Search Button */}
      <Button
        className="w-10 h-10 p-0 md:bg-transparent rounded-full bg-customColor hover:bg-white/30 text-white flex items-center justify-center z-10"
        onClick={toggleSearch}
      >
        <IoSearchOutline className="w-6 h-6" />
      </Button>

      <form onSubmit={handleSubmit}>
        {/* Search Input */}
        <input
          type="text"
          ref={inputRef}
          className={`hidden md:block md:bg-transparent md:h-10 md:px-5 md:rounded-full md:text-md md:border md:border-gray-500 md:transition-all md:duration-300 md:ease-in-out md:absolute md:right-0 ${
            isOpen ? "w-[25rem] opacity-100 mr-12" : "w-0 opacity-0 mr-0"
          }`}
          placeholder="Search..."
          autoFocus={isOpen}
        />
      </form>
    </div>
  );
}

export default Search;