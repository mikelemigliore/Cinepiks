import Link from "next/link";
import React, { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { Button } from "../ui/button";
import { SlArrowRight } from "react-icons/sl";
import { LuPlus } from "react-icons/lu";
import { IoCheckmark } from "react-icons/io5";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

interface BigCardProps {
  image: string;
  title: string;
  genres1: string;
  genres2: string;
  genres3: string;
  rated: string;
  time: string;
  description: string;
  isPartialSlide: boolean;
  isLastOne: boolean;
}

function BigCard({
  image,
  title,
  genres1,
  genres2,
  genres3,
  rated,
  time,
  description,
  isPartialSlide,
  isLastOne,
}: BigCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="ml-2 md:ml-[4rem] bg-gradient-to-b md:bg-gradient-to-r from-customServicesColor via-customServicesColor/96 to-customColorBigCard w-[25rem] md:w-[115rem] h-[40rem] md:h-[42.2rem] rounded-3xl shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between md:h-full h-[38rem]">
        {/* Left Side: Image */}
        <img
          className={`rounded-tl-3xl rounded-tr-3xl rounded-br-customMobile rounded-bl-customMobile md:rounded-tl-3xl md:rounded-bl-3xl md:rounded-tr-custom md:rounded-br-custom md:w-[75rem] h-[18rem] md:h-full object-cover ${
            isPartialSlide ? "opacity-30 pointer-events-none" : ""
          }`}
          src={image}
        />

        {/* Right Side: Movie Info */}
        <div className="flex flex-col justify-center items-center md:mr-[3rem]">
          <div className="text-4xl md:text-6xl font-semibold text-center md:max-w-[25rem]">
            {title}
          </div>

          {/* Add more info below the title */}
          <div className="md:text-2xl mt-4 text-center md:max-w-[25rem]">
            <div className="flex justify-start items-center m-2 text-customTextColor font-bold md:text-lg">
              <span>Action</span>
              <GoDotFill className="bg-customTextColor w-1.5 h-1.5 mx-2 rounded-full" />
              <span>Sci-fi</span>
              <GoDotFill className="bg-customTextColor w-1.5 h-1.5 mx-2 rounded-full" />
              <span className="pr-5">Comedy</span>
              <span className="mx-2 text-customTextColor font-bold">R</span>
              <span className="mx-2 text-customTextColor font-bold">2h 3m</span>
            </div>
          </div>

          <div className="relative">
            <p className="text-white text-base md:text-xl text-center max-w-[23rem] md:max-w-[28rem] line-clamp-4 md:min-h-[10rem] leading-[2] md:leading-[2]">
              While scavenging the deep ends of a derelict space station, a
              group of young space colonists come face to face with the most
              terrifying life form in the universe. While scavenging the deep
              ends of a derelict space station, a group of young space
            </p>
          </div>

          {/* Box for Ratings */}
          <div className="w-full flex justify-start items-start mt-8 ml-[6rem] hidden md:block">
            <h1 className="text-white text-base md:text-xl">Ratings</h1>
          </div>

          {/* Box for Three Titles */}
          <div className="w-full flex justify-between items-start mt-4 ml-[6rem] hidden md:block">
            <div className="w-[25rem]">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="text-customTextColor text-sm md:text-lg">
                  <span>Rotten&nbsp;Tomatoes</span>
                  <div className="flex items-center">
                    <div className="flex items-center mt-3">
                      <img
                        className="w-7 h-7"
                        src="/genresIcons/icons8-rotten-tomatoes.svg"
                        alt="Rotten Tomatoes Icon"
                      />
                      <span className="ml-2 text-xl text-white text-bold pr-5">
                        80%
                      </span>
                    </div>
                    <div className="flex items-center mt-3 md:pl-4">
                      <img
                        className="w-7 h-7"
                        src="/genresIcons/icons8-rotten-tomatoes.svg"
                        alt="Rotten Tomatoes Icon"
                      />
                      <span className="ml-2 text-xl text-white text-bold">
                        80%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-customTextColor mt-5 md:mt-0 text-sm md:text-lg md:ml-[5rem]">
                  iMDB
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <img
                        className="w-12"
                        src="/genresIcons/icons8-imdb.svg"
                        alt="Rotten Tomatoes Icon"
                      />
                      <span className="ml-2 text-xl text-white text-bold pr-5">
                        80%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-customTextColor mt-5 md:mt-0 text-sm md:text-lg md:ml-[5rem]">
                  Popularity
                  <div className="flex items-center mt-3">
                    <div className="flex items-center">
                      <img
                        className="w-7 h-7"
                        src="/genresIcons/5c2d24739a206a1df3d19e60c801c494 1.svg"
                        alt="Popularity"
                      />
                      <span className="ml-2 text-xl text-white text-bold pr-5">
                        80%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center md:justify-between w-full mt-[2rem] md:mt-[4rem] md:mr-[2rem]">
            <Link href="/singlemovie">
              <Button className="h-10 w-28 md:w-40 md:h-14 rounded-full text-sm md:text-lg bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500 mx-1 md:mx-2">
                View
                <SlArrowRight className="w-4 md:w-6 h-4 md:h-6 ml-6 md:ml-12" />
              </Button>
            </Link>

            <Button
              onClick={() => setIsAdded(!isAdded)}
              className={`h-10 w-28 md:w-40 md:h-14 rounded-full text-sm md:text-lg bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500 mx-1 md:mx-2 ${
                isAdded ? "bg-white/90 text-black font-bold" : ""
              }`}
            >
              Watchlist
              {isAdded ? (
                <IoCheckmark className="w-6 h-6 ml-4" />
              ) : (
                <LuPlus className="w-6 h-6 ml-4" />
              )}
            </Button>

            <Button
              onClick={() => setIsLiked(!isLiked)}
              className={`h-10 w-28 md:w-40 md:h-14 rounded-full text-sm md:text-lg bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500 mx-1 md:mx-2 ${
                isLiked ? "bg-white/90 text-black" : ""
              }`}
            >
              Like
              {isLiked ? (
                <AiFillLike className="w-6 h-6 ml-10" />
              ) : (
                <AiOutlineLike className="w-6 h-6 ml-10" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BigCard;
