//If you have a form or a button that requires user interaction and changes the UI based on the user's input,
//you need to mark that component as a client component using "use client"
"use client";
import MovieCard from "@/components/cards/MovieCard";
import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaList } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import Filter from "@/components/filter/Filter";
import Sort from "@/components/sort/Sort";
import { GoDotFill } from "react-icons/go";
import Link from "next/link";
import { SlArrowRight } from "react-icons/sl";
import { IoCheckmark } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaPlay } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import YoutubePlayerMainCaroisel from "@/components/maincarousel/YoutubePlayerMainCaroisel";
import YoutubeTrailerPlayer from "@/components/trailer/YoutubeTrailerPlayer";



const moviesSearch = [
  {
    id: 1,
    title: "Deadpool & Wolverine",
    imgUrl:
      "https://image.tmdb.org/t/p/original/jbwYaoYWZwxtPP76AZnfYKQjCEB.jpg",
  },
  {
    id: 2,
    title: "Spider-Man",
    imgUrl:
      "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
  },
  {
    id: 3,
    title: "Avengers",
    imgUrl:
      "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
  },
  {
    id: 4,
    title: "Batman",
    imgUrl:
      "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
  },
  {
    id: 5,
    title: "Avatar:The Way of Water",
    imgUrl:
      "https://image.tmdb.org/t/p/original/5ScPNT6fHtfYJeWBajZciPV3hEL.jpg",
  },
  {
    id: 6,
    title: "Spider-Man",
    imgUrl:
      "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
  },
  {
    id: 7,
    title: "Avengers",
    imgUrl:
      "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
  },
  {
    id: 8,
    title: "Batman",
    imgUrl:
      "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
  },
  {
    id: 9,
    title: "Deadpool & Wolverine",
    imgUrl:
      "https://image.tmdb.org/t/p/original/jbwYaoYWZwxtPP76AZnfYKQjCEB.jpg",
  },
  {
    id: 10,
    title: "Spider-Man",
    imgUrl:
      "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
  },
  {
    id: 11,
    title: "Avengers",
    imgUrl:
      "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
  },
  {
    id: 12,
    title: "Batman",
    imgUrl:
      "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
  },
  {
    id: 13,
    title: "Batman",
    imgUrl:
      "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
  },
  {
    id: 14,
    title: "Avatar:The Way of Water",
    imgUrl:
      "https://image.tmdb.org/t/p/original/5ScPNT6fHtfYJeWBajZciPV3hEL.jpg",
  },
  {
    id: 15,
    title: "Deadpool & Wolverine",
    imgUrl:
      "https://image.tmdb.org/t/p/original/jbwYaoYWZwxtPP76AZnfYKQjCEB.jpg",
  },
  {
    id: 16,
    title: "Spider-Man",
    imgUrl:
      "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
  },
  {
    id: 17,
    title: "Avengers",
    imgUrl:
      "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
  },
  {
    id: 18,
    title: "Batman",
    imgUrl:
      "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
  },
  {
    id: 19,
    title: "Avatar:The Way of Water",
    imgUrl:
      "https://image.tmdb.org/t/p/original/5ScPNT6fHtfYJeWBajZciPV3hEL.jpg",
  },
  {
    id: 20,
    title: "Spider-Man",
    imgUrl:
      "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
  },
  {
    id: 21,
    title: "Avengers",
    imgUrl:
      "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
  },
  {
    id: 22,
    title: "Batman",
    imgUrl:
      "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
  },
  {
    id: 23,
    title: "Deadpool & Wolverine",
    imgUrl:
      "https://image.tmdb.org/t/p/original/jbwYaoYWZwxtPP76AZnfYKQjCEB.jpg",
  },
  {
    id: 24,
    title: "Spider-Man",
    imgUrl:
      "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
  },
  {
    id: 25,
    title: "Avengers",
    imgUrl:
      "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
  },
  {
    id: 26,
    title: "Batman",
    imgUrl:
      "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
  },
  {
    id: 27,
    title: "Batman",
    imgUrl:
      "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
  },
  {
    id: 28,
    title: "Avatar:The Way of Water",
    imgUrl:
      "https://image.tmdb.org/t/p/original/5ScPNT6fHtfYJeWBajZciPV3hEL.jpg",
  },
];



//type MovieFilter = (typeof moviesSearch)[number][string][string]


function SearchPage() {
  const [filter, setFilterd] = useState(false);
  const [all, setAll] = useState(true);
  const [movies, setMovies] = useState(false);
  const [series, setSeries] = useState(false);
  const [documentary, setDocumentary] = useState(false);
  const [grid, setGrid] = useState(true);
  const [list, setList] = useState(false);
  const [isAdded, setIsAdded] = useState<Record<number, boolean>>({});
  const [isLiked, setIsLiked] = useState<Record<number, boolean>>({});
  const [isTrailer, setIsTrailer] = useState(false);
  const [videoKey3, setVideoKey3] = useState("o17MF9vnabg"); // avatar
  //In your handleSubmit function, the event is an object that represents the event that triggered the function—in this case,
  //the form submission. When a form is submitted in React, it generates a FormEvent, which is passed to the event handler as an argument
  //  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   //router.push("/search");
  // };


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

  const handleFilter = () => {
    setFilterd(!filter);
  };

  const handleAll = () => {
    setAll(true);
    setMovies(false);
    setSeries(false);
    setDocumentary(false);
  };

  const handleMovies = () => {
    setMovies((prev) => !prev);
    //setSeries(false);
    if (!movies) setAll(false);
  };

  const handleDocumentary = () => {
    setDocumentary((prev) => !prev);
    // setSeries(false);
    // setMovies(false);
    if (!documentary) setAll(false);
  };

  const handleSeries = () => {
    setSeries((prev) => !prev);
    //setMovies(false);
    if (!series) setAll(false);
  };

  // Logic to check if both Movies and Series are selected
  if (movies && series && documentary) {
    handleAll(); // Re-enable "All" and disable both movies and series
  }

  // Set 'All' to true when none of the other categories are selected
  useEffect(() => {
    if (!movies && !series && !documentary) {
      setAll(true);
    } else {
      setAll(false);
    }
  }, [movies, series, documentary]);

  const handleGrid = () => {
    setGrid(!grid);
    setList(false);
  };

  const handleList = () => {
    setList(!list);
    setGrid(false);
  };


  

  return (
    <div className="mt-[20vh] mb-[5vh]">
      <div className="flex justify-between ml-[5vw]">
        <div
          className={`${
            filter ? "translate-x-[15vw]" : ""
          } transition-transform duration-700 ease-in-out`}
        >
          <div className="text-[2.5vw] font-bold">Search</div>
          <div className="h-[5vh] text-[0.7vw] md:text-[0.9vw] text-gray-300">
            Use filter on the left to refine your search
          </div>
        </div>

        <div className="relative flex flex-col mr-[2vw]" style={{ top: "3vh" }}>
          <div className="flex justify-end mb-[2vh] mt-[2vh]">
            <Button
              onClick={handleGrid}
              className={`p-0 w-[2.5vw] h-[2.5vw] bg-customServicesColor rounded-[0.4vw] mr-[1vw] flex justify-center items-center hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 duration-100 ${
                grid ? "bg-white/90" : ""
              }`}
            >
              <BsFillGrid3X3GapFill
                className={`w-[1.4vw] h-[1.4vw] ${grid ? "text-black" : ""}`}
              />
            </Button>
            <Button
              onClick={handleList}
              className={`p-0 w-[2.5vw] h-[2.5vw] bg-customServicesColor rounded-[0.4vw] flex justify-center items-center hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 duration-100 ${
                list ? "bg-white/90" : ""
              }`}
            >
              <FaList
                className={`w-[1.4vw] h-[1.4vw] ${list ? "text-black" : ""}`}
              />
            </Button>
          </div>
          {/* Sort component */}
          <Sort />
        </div>
      </div>

      <div className="flex flex-col">
        <div
          className={`flex justify-start mt-[-2vh] ${filter ? "mr-[2vw]" : ""}`}
        >
          {/* Filter component */}
          <Filter handleFilter={handleFilter} filter={filter} />

          {/* Apply the transition to the entire buttons and cards container */}
          <div
            className={`transition-transform duration-700 ease-in-out flex flex-col ${
              filter ? "translate-x-[1vw]" : ""
            }`}
          >
            <div className="flex transition-transform duration-700 ease-in-out">
              <Button
                onClick={handleAll}
                className={`w-[3vw] h-[5.5vh] bg-customServicesColor rounded-full flex justify-center items-center mr-[0.5vw] text-[1vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
                  all ? "bg-white/90 text-black font-bold" : ""
                }`}
              >
                All
              </Button>
              <Button
                onClick={handleMovies}
                className={`w-[7vw] h-[5.5vh] bg-customServicesColor rounded-full flex justify-center items-center mr-[0.5vw] text-[1vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
                  movies ? "bg-white/90 text-black font-bold" : ""
                }`}
              >
                Movies
              </Button>
              <Button
                onClick={handleSeries}
                className={`w-[7vw] h-[5.5vh] bg-customServicesColor rounded-full flex justify-center items-center mr-[0.5vw] text-[1vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
                  series ? "bg-white/90 text-black font-bold" : ""
                }`}
              >
                Series
              </Button>
              <Button
                onClick={handleDocumentary}
                className={`w-[10vw] h-[5.5vh] bg-customServicesColor rounded-full flex justify-center items-center mr-[1vw] text-[1vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
                  documentary ? "bg-white/90 text-black font-bold" : ""
                }`}
              >
                Documentary
              </Button>
            </div>
            {grid ? (
              <div
                className={`grid gap-y-[5vh] mt-[2vh] mb-[5vh] transition-all duration-700 ease-in-out ${
                  filter
                    ? "grid-cols-2 md:grid-cols-6"
                    : "grid-cols-2 md:grid-cols-7"
                }`}
              >
                {moviesSearch.map((movie, index) => {
                  const isLastOne = filter ? index === 5 : index === 6;

                  return (
                    <div
                      key={movie.id}
                      className={`m-[1vw] transition-transform duration-700 ml-[-0.2vw]`}
                      //style={{ width: "12.6vw", height: "40vh" }}
                    >
                      <MovieCard
                        imgUrl={movie.imgUrl}
                        title={movie.title}
                        isLastOne={isLastOne}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
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
                          imgUrl={movie.imgUrl}
                          //title={movie.title}
                          isLastOne={isLastOne}
                          list={list}
                        />
                        <div className="flex">
                          <div className="flex flex-col pl-[3vw]">
                            {/* Movie info here */}
                            <h2 className="text-[2vw] font-bold">
                              {movie.title}
                            </h2>
                            <div className="text-center">
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
                            <div>
                              <p className="mt-[1.5vh] text-white text-base md:text-[1vw]  max-w-[23rem] md:max-w-[33vw] line-clamp-4 leading-[2] md:leading-[2]">
                                While scavenging the deep ends of a derelict
                                space station, a group of young space colonists
                                come face to face with the most terrifying life
                                form in the universe. While scavenging the deep
                                ends of a derelict space station, a group of
                                young space
                              </p>
                            </div>

                            <div className="flex items-center justify-center md:justify-start mt-[2rem] md:mt-[3vh] md:mb-[2.5vh]">
                              <Link href="/singlemovie">
                                <Button className="h-10 w-28 md:w-[8vw] md:h-[6vh] md:mr-[1vw] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500">
                                  View
                                  <SlArrowRight className="w-[2vw] h-[2vh] ml-6 md:ml-[2vw]" />
                                </Button>
                              </Link>

                              <Button
                                onClick={() => handleAdded(movie.id)}
                                className={`h-10 w-28 md:w-[8vw] md:h-[6vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500 ${
                                  isAdded[movie.id]
                                    ? "bg-white/90 text-black font-bold"
                                    : ""
                                }`}
                              >
                                Watchlist
                                {isAdded[movie.id] ? (
                                  <IoCheckmark className="w-[2.5vw] h-[2.5vh] md:ml-[1vw]" />
                                ) : (
                                  <LuPlus className="w-[2.5vw] h-[2.5vh] md:ml-[1vw]" />
                                )}
                              </Button>

                              <Button
                                onClick={() => setIsTrailer(!isTrailer)}
                                className={``}
                              >
                                <Dialog>
                                  <DialogTrigger className="flex justify-center items-center h-10 w-28 md:w-[8vw] md:h-[6vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500">
                                    Trailer
                                    <FaPlay className="w-[2.5vw] h-[2.5vh] md:ml-[1vw]" />
                                  </DialogTrigger>
                                  <DialogContent className="md:w-[70vw] md:h-[40vw]">
                                    <YoutubeTrailerPlayer
                                      //VideoEnd={handleVideoEnd}
                                      videoKey={videoKey3}
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
                                {/* {isTrailer ? (
                                  <Dialog>
                                    <DialogTrigger>Open</DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>
                                          Are you absolutely sure?
                                        </DialogTitle>
                                        <DialogDescription>
                                          This action cannot be undone. This
                                          will permanently delete your account
                                          and remove your data from our servers.
                                        </DialogDescription>
                                      </DialogHeader>
                                    </DialogContent>
                                  </Dialog>
                                ) : (
                                  <FaPlay className="w-[2.5vw] h-[2.5vh] md:ml-[1vw]" />
                                )} */}
                              </Button>

                              <Button
                                onClick={() => handleLike(movie.id)}
                                className={`h-10 w-28 md:w-[8vw] md:h-[6vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500 ${
                                  isLiked[movie.id] ? "bg-white/90 text-black font-bold" : ""
                                }`}
                              >
                                Like
                                {isLiked[movie.id] ? (
                                  <AiFillLike className="w-[2.5vw] h-[2.5vh] ml-[2vw]" />
                                ) : (
                                  <AiOutlineLike className="w-[2.5vw] h-[2.5vh] ml-[2vw]" />
                                )}
                              </Button>
                            </div>
                            {/* Box for Ratings */}
                            <div className="w-[22vw]">
                              <div className="w-full mt-[2vw] hidden md:block">
                                <h1 className="text-white text-base md:text-[1vw]">
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
                          {/* <div className="flex-1 p-[1vw] ml-[20vw]">
                            <h2 className="text-lg font-bold">{movie.title}</h2>
                            <p className="text-sm">
                              Additional movie info here.
                            </p>
                          </div> */}
                        </div>
                      </div>
                      {/* Divider line */}
                      <div className="w-full h-[0.1vh] mt-[2vh] bg-white/20"></div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
