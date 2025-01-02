"use client"; // Add this line at the top
import Container from "../global/Container";
import React, { useState } from "react";
import LinksDropdown from "./LinksDropdown";
import Logo from "./Logo";
import Movies from "./Movies";
import Series from "./Series";
import Watchlist from "./Watchlist";
import Home from "./Home";
import Search from "./Search";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5"; // Icons for hamburger menu
import { usePathname } from "next/navigation";

//const pathname = usePathname();

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleRouteClick = () => setIsOpen(false);

  const pathname = usePathname();

  return (
    <>
      {pathname === "/singup" || pathname === "/" ? (
        <div></div>
      ) : (
        <div className="fixed w-full bg-customColor py-[1vw] md:bg-transparent lg:bg-gradient-to-b md:from-customColor/50 md:to-transparent md:hover:bg-customColor md:transition-all md:duration-700 z-[100]">
          <Container className="flex justify-between gap-4 flex-wrap md:py-0 px-[1vw] md:px-[2vw]">
            {/* Hamburger Menu for mobile */}
            <div className="sm:hidden flex space-x-4 items-center w-full">
              <button
                className="text-white"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <IoCloseOutline size={30} />
                ) : (
                  <IoMenuOutline size={30} />
                )}
              </button>

              {/* Logo in mobile menu */}
              <Logo />

              {/* Search and Dropdown */}
              <div className="">
                <Search />
                <LinksDropdown />
              </div>
            </div>

            {/* Logo in desktop menu */}
            <div className="hidden sm:flex sm:items-center">
              <Logo />
            </div>

            {/* Main Navigation Links - Hidden on small screens */}
            {/* This components are styled first and controlled by the tailwind in the Container and nav for desktop view, 
        this div and style will only apply when the screen is sm for phone. */}
            <div
              // Try to apply smothing transition when the user clicks on hamburger, i was unable to do so.
              className={`sm:flex ${
                isOpen
                  ? "flex flex-col h-screen items-center justify-center pb-[200px]"
                  : "hidden"
              } items-center w-full sm:w-auto gap-16 lg:gap-5`}
            >
              <Home onClick={handleRouteClick} />
              <Movies onClick={handleRouteClick} />
              <Series onClick={handleRouteClick} />
              <Watchlist onClick={handleRouteClick} />
            </div>

            {/* Search and Dropdown for desktop*/}
            <div className="sm:flex hidden flex space-x-[1vw] items-center">
              <Search />
              <LinksDropdown />
            </div>
          </Container>
        </div>
      )}
    </>
  );
}

export default Navbar;
