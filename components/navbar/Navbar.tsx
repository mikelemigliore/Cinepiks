"use client"; 
import Container from "../global/Container";
import React, { useState } from "react";
import LinksDropdown from "./LinksDropdown";
import Logo from "./Logo";
import Movies from "./Movies";
import Series from "./Series";
import Watchlist from "./Watchlist";
import Home from "./Home";
import Search from "./Search";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5"; 
import { usePathname } from "next/navigation";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleRouteClick = () => setIsOpen(false);

  const pathname = usePathname();

  return (
    <>
      {pathname === "/singup" ||
      pathname === "/" ||
      pathname === "/forgotpassword" ||
      pathname.startsWith("/resetpassword") ||
      pathname === "/privatePolicy" ||
      pathname === "/termsofservice" ||
      pathname === "/disclaimer" ? (
        <div></div>
      ) : (
        <div className="fixed w-full bg-customColor py-[1vw] md:bg-transparent lg:bg-gradient-to-b md:from-customColor/50 md:to-transparent md:hover:bg-customColor md:transition-all md:duration-700 z-[100]">
          <Container className="flex justify-between gap-4 flex-wrap md:py-0 px-[1vw] md:px-[2vw] mt-[1.5vh] md:mt-[0vh]">
            <div className="sm:hidden flex space-x-4 items-center justify-between w-full">
              <div className="flex items-center">
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
                <Logo />
              </div>

              <div className="flex items-center ">
                <Search />
                <LinksDropdown />
              </div>
            </div>

            <div className="hidden sm:flex sm:items-center">
              <Logo />
            </div>

            <div
              className={`sm:flex ${
                isOpen
                  ? "flex flex-col h-screen items-center justify-center pb-[200px]"
                  : "hidden"
              } items-center w-full sm:w-auto gap-6 lg:gap-5`}
            >
              <Home onClick={handleRouteClick} />
              <Movies onClick={handleRouteClick} />
              <Series onClick={handleRouteClick} />
              <Watchlist onClick={handleRouteClick} />
            </div>

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
