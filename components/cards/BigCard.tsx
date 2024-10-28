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
    <div className="ml-2 md:ml-[3.5vw] bg-gradient-to-b md:bg-gradient-to-r from-customServicesColor via-customServicesColor/96 to-customColorBigCard w-[80vw] md:w-[90vw] h-[80vh] md:h-[71vh] rounded-3xl shadow-2xl">
      <div className="flex flex-col md:flex-row md:h-full h-[38rem]">
        {/* Left Side: Image */}
        <img
          className={`rounded-tl-3xl rounded-tr-3xl rounded-br-customMobile rounded-bl-customMobile md:rounded-tl-3xl md:rounded-bl-3xl md:rounded-tr-custom md:rounded-br-custom h-[18rem] md:h-full object-cover ${
            isPartialSlide ? "opacity-30 pointer-events-none" : ""
          }`}
          src={image}
        />

        {/* Right Side: Movie Info */}
        <div className="flex flex-col justify-center items-center ml-[1vw]">
          <div className="text-4xl md:text-[2.5vw] font-semibold text-center line-clamp-1">
            {title}
          </div>

          {/* Add more info below the title */}
          <div className="mt-[2vh] text-center">
            <div className="flex justify-start items-center text-customTextColor font-bold md:text-[0.8vw]">
              <span>Action</span>
              <GoDotFill className="bg-customTextColor w-1.5 h-1.5 mx-[0.4vw] rounded-full" />
              <span>Sci-fi</span>
              <GoDotFill className="bg-customTextColor w-1.5 h-1.5 mx-[0.4vw] rounded-full" />
              <span className="pr-[0.6vw]">Comedy</span>
              <span className="mx-[0.6vw] text-customTextColor font-bold">
                R
              </span>
              <span className="mx-[0.6vw] text-customTextColor font-bold">
                2h 3m
              </span>
            </div>
          </div>

          <div className="relative">
            <p className="mt-[1.5vh] text-white text-base md:text-[1vw] text-center max-w-[23rem] md:max-w-[23vw] line-clamp-4 leading-[2] md:leading-[2]">
              While scavenging the deep ends of a derelict space station, a
              group of young space colonists come face to face with the most
              terrifying life form in the universe. While scavenging the deep
              ends of a derelict space station, a group of young space
            </p>
          </div>

          {/* Box for Ratings */}
          <div className="w-[22vw]">
            <div className="w-full mt-[2vw] hidden md:block">
              <h1 className="text-white text-base md:text-[1vw]">Ratings</h1>
            </div>

            {/* Box for Three Titles */}
            <div className="w-full flex justify-between items-start mt-[1vh] hidden md:block">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="text-customTextColor text-sm md:text-[0.9vw]">
                    <span>Rotten&nbsp;Tomatoes</span>
                    <div className="flex items-center">
                      <div className="flex items-center mt-[1.5vh]">
                        <img
                          className="w-[3vw] h-[3vh]"
                          src="/genresIcons/icons8-rotten-tomatoes.svg"
                          alt="Rotten Tomatoes Icon"
                        />
                        <span className="ml-[0.5vw] text-[0.9vw] text-white text-bold pr-[2.5vw]">
                          80%
                        </span>
                      </div>
                      <div className="flex items-center mt-[1.5vh]">
                        <img
                          className="w-[3vw] h-[3vh]"
                          src="/genresIcons/icons8-rotten-tomatoes.svg"
                          alt="Rotten Tomatoes Icon"
                        />
                        <span className="ml-[0.5vw] text-[0.9vw] text-white text-bold">
                          80%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-customTextColor mt-5 md:mt-0 text-sm md:text-[0.9vw] md:ml-[4vw]">
                    iMDB
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <img
                          className="w-[2.4vw]"
                          src="/genresIcons/icons8-imdb.svg"
                          alt="Rotten Tomatoes Icon"
                        />
                        <span className="ml-[0.5vw] text-[0.9vw] text-white text-bold">
                          80%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-customTextColor mt-5 md:mt-0 text-sm md:text-[0.9vw] md:ml-[5vw]">
                    Popularity
                    <div className="flex items-center mt-[0.8vh]">
                      <div className="flex items-center">
                        <img
                          className="w-[3vw] h-[3vh]"
                          src="/genresIcons/5c2d24739a206a1df3d19e60c801c494 1.svg"
                          alt="Popularity"
                        />
                        <span className="ml-[0.5vw] text-[0.9vw] text-white text-bold pr-[1vw]">
                          80%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-start mt-[2rem] md:mt-[6vh]">
            <Link href="/singlemovie">
              <Button className="h-10 w-28 md:w-[8vw] md:h-[6vh] md:mr-[1vw] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500">
                View
                <SlArrowRight className="w-[2vw] h-[2vh] ml-6 md:ml-[2vw]" />
              </Button>
            </Link>

            <Button
              onClick={() => setIsAdded(!isAdded)}
              className={`h-10 w-28 md:w-[8vw] md:h-[6vh] md:mr-[1vw] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500${
                isAdded ? "bg-white/90 text-black font-bold" : ""
              }`}
            >
              Watchlist
              {isAdded ? (
                <IoCheckmark className="w-[2.5vw] h-[2.5vh] md:ml-[1vw]" />
              ) : (
                <LuPlus className="w-[2.5vw] h-[2.5vh] md:ml-[1vw]" />
              )}
            </Button>

            <Button
              onClick={() => setIsLiked(!isLiked)}
              className={`h-10 w-28 md:w-[8vw] md:h-[6vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500 ${
                isLiked ? "bg-white/90 text-black" : ""
              }`}
            >
              Like
              {isLiked ? (
                <AiFillLike className="w-[2.5vw] h-[2.5vh] ml-[2vw]" />
              ) : (
                <AiOutlineLike className="w-[2.5vw] h-[2.5vh] ml-[2vw]" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BigCard;
