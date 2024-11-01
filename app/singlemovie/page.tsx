"use client";
import YoutubeTrailerPlayer from "@/components/trailer/YoutubeTrailerPlayer";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
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
import React from "react";


const movie = [
  {
    id: 1,
    title: "Venom: The Last Dance",
    imgUrl:
      "https://image.tmdb.org/t/p/original/k42Owka8v91trK1qMYwCQCNwJKr.jpg",
  },
];

function SingleMoviePage() {
  const [videoKey4, setVideoKey4] = useState("__2bjWbetsA"); // Alien
  const [autoplay, setAutoplay] = useState(true);
  const [play, setPlay] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [unmute, setUnmute] = useState(false);
  const [pause, setPause] = useState(false);
  const [reload, setReload] = useState(false);
  const [isAdded, setIsAdded] = useState<Record<number, boolean>>({});
  const [isTrailer, setIsTrailer] = useState(false);
  const [isLiked, setIsLiked] = useState<Record<number, boolean>>({});
  const [singlemovie, setSinglemovie] = useState(true);
  const [isListView, setIsListView] = useState(true);
  const [reviews, setReviews] = useState(true);
  const [value, setValue] = React.useState<number | null>(2);

  const handleValue = (newValue: number | null) => {
    if (newValue !== null) {
      setValue(newValue);
    } else {
      setValue(0);
    }
  };

  // Fetch call to TMDB to get the data I need for cast section, excellent example
  const [cast, setCast] = useState([]);
  const movieId = 580489; // Example movie ID for Venom

  useEffect(() => {
    const fetchCast = async () => {
      const API_KEY = "1fc54b7ab4fb46412074eec75b746280"; // Add your TMDb API key
      const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        const formattedCast = data.cast.map(
          (member: {
            id: any;
            name: any;
            character: any;
            profile_path: any;
          }) => ({
            id: member.id,
            name: member.name,
            character: member.character,
            picture: `https://image.tmdb.org/t/p/w500${member.profile_path}`,
          })
        );
        setCast(formattedCast);
      } catch (error) {
        console.error("Failed to fetch cast:", error);
      }
    };

    fetchCast();
  }, []);

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

  const handlePlay = () => {
    setPlay(true);
    setIsLoading(false); // Stop showing loading spinner once the video plays
    setPause(!pause);
  };

  const handlePause = () => {
    setPlay(false);
  };

  const handleEnd = () => {
    setPlay(false);
  };

  // Handle when video starts playing
  const handleReload = () => {
    setReload(false);
    setPause(false);
  };

  return (
    <div>
      <div className={`w-full h-[47.5vw] relative`}>
        <YoutubeTrailerPlayer
          handlePlay={handlePlay}
          //handleFullscreen={handleFullscreen}
          //handleExpand={handleExpand}
          //expand={expand}
          unmute={unmute}
          pause={pause}
          reload={reload}
          handleReload={handleReload}
          handleEnd={handleEnd}
          //handleStarted={handleStarted}
          play={play}
          autoplay={autoplay}
          videoKey={videoKey4}
          src={
            "https://image.tmdb.org/t/p/original/f8JTWmelQEDUqujwCeVeS7Jn10b.jpg"
          }
          setIsLoading={setIsLoading} // Pass the loading state handler
        />
        <div
          className={`${
            play ? "opacity-0" : "opacity-100"
          } z-40 absolute inset-0 bg-gradient-to-t from-customColor to-transparent w-full h-full transition-opacity duration-500 ease-in-out`}
        />

        <Button
          onClick={handlePlay}
          className={`active:scale-95 duration-500 z-40 absolute top-1/2 left-1/2 w-[4.5vw] h-[4.5vw] rounded-full border-2 border-white bg-slate-300 bg-transparent hover:bg-slate-300 hover:bg-opacity-5 -translate-x-1/2 -translate-y-1/2 ${
            play ? "hidden" : ""
          }`}
        >
          {isLoading ? (
            <Rings color="#ffffff" height={40} width={40} />
          ) : (
            <CiPlay1 className="w-[2vw] h-[2vw]" />
          )}
        </Button>
        {/* Display the appropriate icon based on fullscreen state */}
        {play && (
          <div className="ml-[80vw] mt-[-10vw]  z-[100] absolute">
            <Button
              onClick={() => setUnmute(!unmute)}
              className="mr-3 w-[4.5vw] h-[4.5vw] rounded-full border-2 border-white bg-slate-300 bg-transparent hover:bg-slate-300 hover:bg-opacity-5"
            >
              {unmute ? (
                <GoUnmute className="w-[2vw] h-[2vw]" />
              ) : (
                <div>
                  <GoMute className="w-[2vw] h-[2vw]" />
                </div>
              )}
            </Button>
            <Button
              onClick={handlePause}
              className="mr-3 w-[4.5vw] h-[4.5vw] rounded-full border-2 border-white bg-slate-300 bg-transparent hover:bg-slate-300 hover:bg-opacity-5"
            >
              <CiPause1 className="w-[2vw] h-[2vw]" />
            </Button>
            <Button
              onClick={() => setReload(true)}
              className="w-[4.5vw] h-[4.5vw] rounded-full border-2 border-white bg-slate-300 bg-transparent hover:bg-slate-300 hover:bg-opacity-5"
            >
              <MdOutlineReplay className="w-[2vw] h-[2vw]" />
            </Button>
          </div>
        )}
      </div>
      {/* <div className="min-h-screen mb-[50vw] "> */}
      <div className="min-h-screen mb-[110vw] ">
        <div
          // className={`flex justify-center w-full mt-[-6vw] z-[50] absolute transition-transform duration-700 ease-in-out ${
          //   play ? "translate-y-[7vw]" : ""
          // }`}
          className={`w-full mt-[-6vw] z-[50] absolute transition-transform duration-700 ease-in-out ${
            play ? "translate-y-[7vw]" : ""
          }`}
        >
          <div className="flex flex-col">
            <div
              className={`flex w-full m-[1vw] transition-transform duration-700 justify-center`}
              //style={{ width: "12.6vw", height: "40vh" }}
            >
              <MovieCard
                imgUrl={movie[0].imgUrl}
                //title={movie.title}
                //isLastOne={isLastOne}
                singlemovie={singlemovie}
              />
              <div className="flex">
                <div className="flex flex-col pl-[3vw]">
                  {/* Movie info here */}
                  <h2 className="text-[2vw] font-bold">{movie[0].title}</h2>
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
                      While scavenging the deep ends of a derelict space
                      station, a group of young space colonists come face to
                      face with the most terrifying life form in the universe.
                      While scavenging the deep ends of a derelict space
                      station, a group of young space
                    </p>
                  </div>

                  <div className="flex items-center justify-center md:justify-start mt-[2rem] md:mt-[3vh] md:mb-[2vh]">
                    <Button
                      onClick={() => handleAdded(movie[0].id)}
                      className={`mr-[0.5vw] h-10 w-28 md:w-[7vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500 ${
                        isAdded[movie[0].id]
                          ? "bg-white/90 text-black font-bold"
                          : ""
                      }`}
                    >
                      Watchlist
                      {isAdded[movie[0].id] ? (
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
                          videoKey={videoKey4}
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
                      onClick={() => handleLike(movie[0].id)}
                      className={`ml-[0.5vw] flex justify-center items-center h-10 w-28  md:pl-[1vw] md:w-[6vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500 ${
                        isLiked[movie[0].id]
                          ? "bg-white/90 text-black font-bold"
                          : ""
                      }`}
                    >
                      Like
                      {isLiked[movie[0].id] ? (
                        <AiFillLike className="w-[2.5vw] h-[2.5vh] ml-[0.4vw]" />
                      ) : (
                        <AiOutlineLike className="w-[2.5vw] h-[2.5vh] ml-[0.4vw]" />
                      )}
                    </Button>
                  </div>
                  {/* Box for Ratings */}
                  <div className="w-[22vw]">
                    <div className="w-full mt-[3vw] hidden md:block">
                      <h1 className="text-white text-base md:text-[1vw]">
                        Ratings
                      </h1>
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
                <div className="flex flex-col gap-[6vh] content-between p-[1vw] ml-[9vw]">
                  <div>
                    <div className="">
                      <div className="flex">
                        <div className=" text-[1vw]">Your Score</div>
                        <StarRating
                          title={movie[0].title}
                          value={value}
                          handleValue={handleValue}
                        />
                      </div>

                      <div className="flex items-end text-[1vw] mt-[1vh]">
                        <img
                          className="mr-[0.5vw] w-[1.7vw] h-[1.7vw]"
                          src="genresIcons/icons8-star.svg"
                        />{" "}
                        {value ? value : "--"} / 5
                        <div>
                        </div>
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
            <div className="flex gap-[4vw] mt-[3vw] h-[22vw] w-full justify-center ml-[2vw]">
              <div className="h-[2vw]">
                <div className="text-[1vw]">How To Watch</div>
                <div className="mb-[2vh] mt-[1vh]">
                  <Tags />
                </div>
                <div className="w-full">
                  <HowToWatchCard />
                </div>
              </div>
              <div className="h-[2vw]">
                <div className="text-[1vw]">Reviews</div>
                <div className="my-[1vh] mb-[2vh]">
                  <Tags reviews={reviews} />
                </div>
                <div className="w-full h-[22vw]">
                  <Reviews />
                </div>
              </div>
            </div>
            <div className="h-[6vw] mt-[10vw] bg-buttonColor rounded-[1vw] max-w-[75vw] ml-[14vw]">
              <div className="text-[1vw] mt-[-2vw]">More Info</div>
              <MoreInfo />
            </div>
            {/* <div className="mt-[6vw] max-w-[50vw]"> */}
            <div className="mt-[4vw] max-w-[75vw] ml-[14vw]">
              <CastSwiper cast={cast} />
            </div>
            {/* Divider line */}
            <div className="max-w-[75vw] ml-[15vw] h-[0.1vh] mt-[4vh] bg-white/20"></div>
            <div className="mt-[6vw]">
              {/* mx-auto max-w-full */}
              <MoreLikeThisSwiper />
            </div>
            <div>
              {/* mx-auto max-w-full */}
              <RecommendationSwiper />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleMoviePage;
