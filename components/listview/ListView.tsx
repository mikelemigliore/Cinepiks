import React, { useState } from "react";
import MovieCard from "../cards/MovieCard";
import { GoDotFill } from "react-icons/go";
import Link from "next/link";
import { Button } from "../ui/button";
import { SlArrowRight } from "react-icons/sl";
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
import { FaPlay } from "react-icons/fa";
import YoutubeTrailerPlayer from "../trailer/YoutubeTrailerPlayer";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";


interface Movie {
    id: number;
    title: string;
    imgUrl: string;
    type: string; // Add type here to indicate the media type
}

interface ListViewProp {
    filter?: boolean;
    moviesSearch: Movie[];
    list?:boolean;
    //mediaType?: string; // Indicates the type of content
}

function ListView({filter,moviesSearch,list}:ListViewProp) {
    const [isAdded, setIsAdded] = useState<Record<number, boolean>>({});
    const [isLiked, setIsLiked] = useState<Record<number, boolean>>({});
    const [isTrailer, setIsTrailer] = useState(false);
    const [videoKey3, setVideoKey3] = useState("o17MF9vnabg"); // avatar
    const [isLoading, setIsLoading] = useState(false); // Track loading state
    const [isListView, setIsListView]=useState(true)

    const handleReload = () => {
    };
  
    const handleEnd = () => {
    };
  
    const handleExpand = () => {
    };
  
    const handleFullscreen = () => {
    };
  
    const handlePlay = () => {
    };

    const handleAdded = (movieId: number) => {
        setIsAdded((prevAdded) => ({
          ...prevAdded,
          [movieId]: !prevAdded[movieId], // Toggle the like state for the specific movie
        }));
      };
    
      const handleLike = (movieId: number) => {
        setIsLiked((prevLiked) => ({
          ...prevLiked,
          [movieId]: !prevLiked[movieId], // Toggle the like state for the specific movie
        }));
      };


  return (
    <div
      className={`flex flex-col gap-y-[5vh] mt-[2vh] mb-[5vh] transition-all duration-700 ease-in-out ${
        filter ? "" : ""
      }`}
    >
      {moviesSearch.map((movie, index) => {
        const isLastOne = filter ? index === 5 : index === 6;

        return (
          <div key={movie.id} className="flex flex-col w-full">
            <div
              className={`flex w-full m-[1vw] transition-transform duration-700`}
              //style={{ width: "12.6vw", height: "40vh" }}
            >
              <MovieCard
              type={movie.type}
                imgUrl={movie.imgUrl}
                //title={movie.title}
                isLastOne={isLastOne}
                list={list}
              />
              <div className="flex">
                <div className="flex flex-col pl-[3vw]">
                  {/* Movie info here */}
                  <h2 className="text-[1.5vw] font-bold">{movie.title}</h2>
                  <div className="text-center">
                    <div className="flex justify-start items-center text-customTextColor font-bold md:text-[0.7vw]">
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
                    <p className="mt-[1vh] text-white text-base md:text-[0.9vw]  max-w-[23rem] md:max-w-[33vw] line-clamp-4 leading-[2] md:leading-[2]">
                      While scavenging the deep ends of a derelict space
                      station, a group of young space colonists come face to
                      face with the most terrifying life form in the universe.
                      While scavenging the deep ends of a derelict space
                      station, a group of young space
                    </p>
                  </div>

                  <div className="flex items-center justify-center md:justify-start mt-[2rem] md:mt-[2vh] md:mb-[2vh]">
                    <Link href="/singlemovie">
                      <Button className="h-10 w-28 md:w-[6vw] md:h-[5vh] md:mr-[1vw] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500">
                        View
                        <SlArrowRight className="w-[2vw] h-[2vh] ml-6 md:ml-[1vw]" />
                      </Button>
                    </Link>

                    <Button
                      onClick={() => handleAdded(movie.id)}
                      className={`h-10 w-28 md:w-[7vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500 ${
                        isAdded[movie.id]
                          ? "bg-white/90 text-black font-bold"
                          : ""
                      }`}
                    >
                      Watchlist
                      {isAdded[movie.id] ? (
                        <IoCheckmark className="w-[2vw] h-[2vh] md:ml-[0.4vw]" />
                      ) : (
                        <LuPlus className="w-[2vw] h-[2vh] md:ml-[0.4vw]" />
                      )}
                    </Button>

                    <Button
                      onClick={() => setIsTrailer(!isTrailer)}
                      className={``}
                    >
                      <Dialog>
                        <DialogTrigger className="flex justify-center items-center h-10 w-28 md:pl-[0.4vw] md:w-[6vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500">
                          Trailer
                          <FaPlay className="w-[2vw] h-[2vh] md:ml-[0.4vw]" />
                        </DialogTrigger>
                        <DialogContent className="md:w-[70vw] md:h-[40vw]">
                          <YoutubeTrailerPlayer
                            //VideoEnd={handleVideoEnd}
                            handlePlay={handlePlay}
                            videoKey={videoKey3}
                            setIsLoading={setIsLoading}
                            handleReload={handleReload}
                            handleEnd={handleEnd}
                            isListView={isListView}
                            //handleFullscreen={handleFullscreen}
                            //handleExpand={handleExpand}
                            //unmute={unmute}
                            //pause={pause}
                            //reload={reload}
                            //handleReload={handleReload}
                            //handleStarted={handleStarted}
                            src={
                              "https://image.tmdb.org/t/p/original/f8JTWmelQEDUqujwCeVeS7Jn10b.jpg"
                            }
                          />
                        </DialogContent>
                      </Dialog>
                    </Button>

                    <Button
                      onClick={() => handleLike(movie.id)}
                      className={`flex justify-center items-center h-10 w-28  md:pl-[1vw] md:w-[6vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500 ${
                        isLiked[movie.id]
                          ? "bg-white/90 text-black font-bold"
                          : ""
                      }`}
                    >
                      Like
                      {isLiked[movie.id] ? (
                        <AiFillLike className="w-[2.5vw] h-[2.5vh] ml-[0.4vw]" />
                      ) : (
                        <AiOutlineLike className="w-[2.5vw] h-[2.5vh] ml-[0.4vw]" />
                      )}
                    </Button>
                  </div>
                  {/* Box for Ratings */}
                  <div className="w-[22vw]">
                    <div className="w-full mt-[1vw] hidden md:block">
                      <h1 className="text-white text-base md:text-[0.9vw]">
                        Ratings
                      </h1>
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
                </div>
                <div className="flex flex-col gap-[9vh] content-between p-[1vw] ml-[10vw]">
                  <div>
                    <div className="">
                      <div className=" text-[0.9vw]">Your Score</div>
                      <div className="flex items-end text-[1vw] mt-[1vh]">
                        <img
                          className="mr-[0.5vw] w-[1.7vw] h-[1.7vw]"
                          src="genresIcons/icons8-star.svg"
                        />{" "}
                        8.5/10
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-[0.9vw]">Director</h2>
                    <span className="text-[0.9vw] text-customTextColor">
                      Fede Alvarez
                    </span>
                  </div>
                  <div>
                    <h2 className="text-[0.9vw]">Starring</h2>
                    <span className="text-[0.9vw] text-customTextColor">
                      Cailee Spaeny,
                      <br />
                      David Jonsson,
                      <br />
                      Archie Renax
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Divider line */}
            <div className="w-full h-[0.1vh] mt-[2vh] bg-white/20"></div>
          </div>
        );
      })}
    </div>
  );
}

export default ListView;
