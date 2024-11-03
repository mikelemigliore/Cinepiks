"use client";
import { useState } from "react";
import EpisodeCard from "@/components/cards/EpisodeCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CarouselEpisode from "@/components/carousel/CarouselEpisode";
import { Progress } from "@/components/ui/progress";
import YoutubeTrailerPlayer from "@/components/trailer/YoutubeTrailerPlayer";
import React from "react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import { FaExpand, FaFacebook, FaLink, FaPlay } from "react-icons/fa";
import { Rings } from "react-loader-spinner";
import { FiMinimize } from "react-icons/fi";
import { GoDotFill, GoMute, GoUnmute } from "react-icons/go";
import { MdOutlineReplay } from "react-icons/md";
import MovieCard from "@/components/cards/MovieCard";
import { IoCheckmark } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AiFillInstagram, AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import HowToWatchCard from "@/components/cards/HowToWatchCard";
import Tags from "@/components/tags/Tags";
import Reviews from "@/components/reviews/Reviews";
import MoreInfo from "@/components/moreinfo/MoreInfo";
import CastSwiper from "@/components/carousel/CastSwiper";
import MoreLikeThisSwiper from "@/components/carousel/MoreLikeThisSwiper";
import RecomendationSwiper from "@/components/carousel/RecommendationSwiper";
import RecommendationSwiper from "@/components/carousel/RecommendationSwiper";
import StarRating from "@/components/starRating/StarRating";
import SinglePageMainTrailer from "@/components/singlePageComps/SinglePageMainTrailer";

// const movie = [
//     {
//       id: 1,
//       title: "Dragon Ball Super",
//       imgUrl:
//         "https://image.tmdb.org/t/p/original/8xc6QcxN8ZOCW4lo4IpVNm3VqKt.jpg",
//     },
//   ];

interface SeriesProp {
  id: number;
  title: string;
  imgUrl: string;
}

interface MainDetailsProps {
  //imgUrl: string;
  title?: string;
  className?: string; // Optional className prop
  isPartialSlide?: boolean; // Optional prop to indicate if it's a partial slide
  isLastThreeSlides?: boolean;
  isLastOne?: boolean;
  list?: boolean;
  single?: boolean;
  type?: string; // Define possible values
  //id: number;
  media: SeriesProp[];
  handleAdded: (movieId: number) => void;
  handleLike: (movieId: number) => void;
  isAdded:any;
  isLiked:any
  handlePlay: () => void;
  videoKey: string;
  handleReload: () => void;
  handleEnd: () => void;
  setIsLoading: (loading: boolean) => void;
  isListView?: boolean;
  value: number | null;
  handleValue: (newValue: number | null) => void;
}

function MainDetails({
  videoKey,
  type,
  single,
  media,
  handleAdded,
  handleLike,
  isAdded,
  handlePlay,
  handleReload,
  handleEnd,
  setIsLoading,
  isListView,
  value,
  handleValue,
  isLiked
}: MainDetailsProps) {
  return (
    <div
      className={`flex w-full ml-[1vw] transition-transform duration-700 justify-center`}
      //style={{ width: "12.6vw", height: "40vh" }}
    >
      <MovieCard
        type={type}
        imgUrl={media[0].imgUrl}
        //title={movie.title}
        //isLastOne={isLastOne}
        single={single}
      />
      <div className="flex">
        <div className="flex flex-col pl-[3vw]">
          {/* Movie info here */}
          <h2 className="text-[2vw] font-bold">{media[0].title}</h2>
          <div className="text-center">
            <div className="flex justify-start items-center text-customTextColor font-bold md:text-[0.9vw]">
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
          <div>
            <p className="mt-[1vh] text-white text-base md:text-[1vw]  max-w-[23rem] md:max-w-[33vw] line-clamp-4 leading-[2] md:leading-[2]">
              While scavenging the deep ends of a derelict space station, a
              group of young space colonists come face to face with the most
              terrifying life form in the universe. While scavenging the deep
              ends of a derelict space station, a group of young space
            </p>
          </div>

          <div className="flex items-center justify-center md:justify-start mt-[2rem] md:mt-[3vh] md:mb-[2vh]">
            <Button
              onClick={() => handleAdded(media[0].id)}
              className={`mr-[0.5vw] h-10 w-28 md:w-[7vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500 ${
                isAdded[media[0].id] ? "bg-white/90 text-black font-bold" : ""
              }`}
            >
              Watchlist
              {isAdded[media[0].id] ? (
                <IoCheckmark className="w-[2vw] h-[2vh] md:ml-[0.4vw]" />
              ) : (
                <LuPlus className="w-[2vw] h-[2vh] md:ml-[0.4vw]" />
              )}
            </Button>

            <Dialog>
              <DialogTrigger className="flex justify-center items-center h-10 w-28 md:pl-[0.4vw] md:w-[6vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500">
                Trailer
                <FaPlay className="w-[2vw] h-[2vh] md:ml-[0.4vw]" />
              </DialogTrigger>
              <DialogContent className="md:w-[70vw] md:h-[40vw]">
                <YoutubeTrailerPlayer
                  //VideoEnd={handleVideoEnd}
                  handlePlay={handlePlay}
                  videoKey={videoKey}
                  setIsLoading={setIsLoading}
                  handleReload={handleReload}
                  handleEnd={handleEnd}
                  isListView={isListView}
                  src={
                    "https://image.tmdb.org/t/p/original/f8JTWmelQEDUqujwCeVeS7Jn10b.jpg"
                  }
                />
              </DialogContent>
            </Dialog>

            <Button
              onClick={() => handleLike(media[0].id)}
              className={`ml-[0.5vw] flex justify-center items-center h-10 w-28  md:pl-[1vw] md:w-[6vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500 ${
                isLiked[media[0].id] ? "bg-white/90 text-black font-bold" : ""
              }`}
            >
              Like
              {isLiked[media[0].id] ? (
                <AiFillLike className="w-[2.5vw] h-[2.5vh] ml-[0.4vw]" />
              ) : (
                <AiOutlineLike className="w-[2.5vw] h-[2.5vh] ml-[0.4vw]" />
              )}
            </Button>
          </div>
          {/* Box for Ratings */}
          <div className="w-[22vw]">
            <div className="w-full mt-[2vw] hidden md:block">
              <h1 className="text-white text-base md:text-[1vw]">Ratings</h1>
            </div>

            {/* Box for Three Titles */}
            <div className="w-full flex justify-between items-start mt-[1.7vh] hidden md:block">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="text-customTextColor text-sm md:text-[1vw]">
                  <span>Rotten&nbsp;Tomatoes</span>
                  <div className="flex items-center">
                    <div className="flex items-center mt-[1.5vh]">
                      <img
                        className="w-[3vw] h-[3vh]"
                        src="/genresIcons/icons8-rotten-tomatoes.svg"
                        alt="Rotten Tomatoes Icon"
                      />
                      <span className="ml-[0.5vw] text-[1vw] text-white text-bold pr-[2.5vw]">
                        80%
                      </span>
                    </div>
                    <div className="flex items-center mt-[1.5vh]">
                      <img
                        className="w-[3vw] h-[3vh]"
                        src="/genresIcons/icons8-rotten-tomatoes.svg"
                        alt="Rotten Tomatoes Icon"
                      />
                      <span className="ml-[0.5vw] text-[1vw] text-white text-bold">
                        80%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-customTextColor mt-5 md:mt-0 text-sm md:text-[1vw] md:ml-[4vw]">
                  iMDB
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <img
                        className="w-[2.4vw]"
                        src="/genresIcons/icons8-imdb.svg"
                        alt="Rotten Tomatoes Icon"
                      />
                      <span className="ml-[0.5vw] text-[1vw] text-white text-bold">
                        80%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-customTextColor mt-5 md:mt-0 text-sm md:text-[1vw] md:ml-[5vw]">
                  Popularity
                  <div className="flex items-center mt-[0.8vh]">
                    <div className="flex items-center">
                      <img
                        className="w-[3vw] h-[3vh]"
                        src="/genresIcons/5c2d24739a206a1df3d19e60c801c494 1.svg"
                        alt="Popularity"
                      />
                      <span className="ml-[0.5vw] text-[1vw] text-white text-bold pr-[1vw]">
                        80%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[6vh] content-between  ml-[11vw]">
          <div>
            <div className="">
              <div className="flex">
                <div className=" text-[1vw]">Your Score</div>
                <StarRating
                  title={media[0].title}
                  value={value}
                  handleValue={handleValue}
                />
              </div>

              <div className="flex items-end text-[1vw] mt-[1vh]">
                <img
                  className="mr-[0.5vw] w-[1.7vw] h-[1.7vw]"
                  src="genresIcons/icons8-star.svg"
                />{" "}
                {value ? value : "--"} / 5<div></div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-[1vw]">Director</h2>
            <span className="text-[1vw] text-customTextColor">
              Fede Alvarez
            </span>
          </div>
          <div>
            <h2 className="text-[1vw]">Starring</h2>
            <span className="text-[1vw] text-customTextColor">
              Cailee Spaeny,
              <br />
              David Jonsson,
              <br />
              Archie Renax
            </span>
          </div>
          <div>
            <h2 className="text-[1vw] mb-[1vh]">Socials</h2>
            <div className="text-customTextColor flex">
              <Link
                href="https://venom.movie/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLink className="w-[1.5vw] h-[1.5vw] mr-[0.5vw]" />
              </Link>
              <Link
                href="https://www.facebook.com/VenomMovie"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="w-[1.5vw] h-[1.5vw] mr-[0.5vw]" />
              </Link>
              <Link
                href="https://x.com/VenomMovie"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter className="w-[1.5vw] h-[1.5vw] mr-[0.5vw]" />
              </Link>
              <Link
                href="https://www.instagram.com/venommovie/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillInstagram className="w-[1.5vw] h-[1.5vw]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainDetails;
