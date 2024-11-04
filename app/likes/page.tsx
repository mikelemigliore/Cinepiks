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
import GridView from "@/components/gridview/GridView";
import ListView from "@/components/listview/ListView";
import { usePathname, useSearchParams } from 'next/navigation'

const WatchlistItemSearch = [
  {
    id: 1,
    type: "movie",
    title: "Deadpool & Wolverine",
    imgUrl:
      "https://image.tmdb.org/t/p/original/jbwYaoYWZwxtPP76AZnfYKQjCEB.jpg",
  },
  {
    id: 2,
    type: "movie",
    title: "Spider-Man",
    imgUrl:
      "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
  },
  {
    id: 3,
    type: "movie",
    title: "Avengers",
    imgUrl:
      "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
  },
  {
    id: 4,
    type: "movie",
    title: "Batman",
    imgUrl:
      "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
  },
  {
    id: 5,
    type: "movie",
    title: "Avatar: The Way of Water",
    imgUrl:
      "https://image.tmdb.org/t/p/original/5ScPNT6fHtfYJeWBajZciPV3hEL.jpg",
  },
  {
    id: 6,
    type: "movie",
    title: "Spider-Man",
    imgUrl:
      "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
  },
  {
    id: 7,
    type: "movie",
    title: "Avengers",
    imgUrl:
      "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
  },
  {
    id: 8,
    type: "movie",
    title: "Batman",
    imgUrl:
      "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
  },
  {
    id: 9,
    type: "movie",
    title: "Deadpool & Wolverine",
    imgUrl:
      "https://image.tmdb.org/t/p/original/jbwYaoYWZwxtPP76AZnfYKQjCEB.jpg",
  },
  {
    id: 10,
    type: "movie",
    title: "Spider-Man",
    imgUrl:
      "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
  },
  {
    id: 11,
    type: "movie",
    title: "Avengers",
    imgUrl:
      "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
  },
  {
    id: 12,
    type: "movie",
    title: "Batman",
    imgUrl:
      "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
  },
  {
    id: 13,
    type: "movie",
    title: "Batman",
    imgUrl:
      "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
  },
  {
    id: 14,
    type: "movie",
    title: "Avatar: The Way of Water",
    imgUrl:
      "https://image.tmdb.org/t/p/original/5ScPNT6fHtfYJeWBajZciPV3hEL.jpg",
  },
  {
    id: 15,
    type: "movie",
    title: "Deadpool & Wolverine",
    imgUrl:
      "https://image.tmdb.org/t/p/original/jbwYaoYWZwxtPP76AZnfYKQjCEB.jpg",
  },
  {
    id: 16,
    type: "movie",
    title: "Spider-Man",
    imgUrl:
      "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
  },
  {
    id: 17,
    type: "movie",
    title: "Avengers",
    imgUrl:
      "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
  },
  {
    id: 18,
    type: "movie",
    title: "Batman",
    imgUrl:
      "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
  },
  {
    id: 19,
    type: "movie",
    title: "Avatar: The Way of Water",
    imgUrl:
      "https://image.tmdb.org/t/p/original/5ScPNT6fHtfYJeWBajZciPV3hEL.jpg",
  },
  {
    id: 20,
    type: "movie",
    title: "Spider-Man",
    imgUrl:
      "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
  },
  {
    id: 21,
    type: "movie",
    title: "Avengers",
    imgUrl:
      "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
  },
  {
    id: 22,
    type: "movie",
    title: "Batman",
    imgUrl:
      "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
  },
  {
    id: 23,
    type: "movie",
    title: "Deadpool & Wolverine",
    imgUrl:
      "https://image.tmdb.org/t/p/original/jbwYaoYWZwxtPP76AZnfYKQjCEB.jpg",
  },
  {
    id: 24,
    type: "movie",
    title: "Spider-Man",
    imgUrl:
      "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
  },
  {
    id: 25,
    type: "movie",
    title: "Avengers",
    imgUrl:
      "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
  },
  {
    id: 26,
    type: "movie",
    title: "Batman",
    imgUrl:
      "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
  },
  {
    id: 27,
    type: "movie",
    title: "Batman",
    imgUrl:
      "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
  },
  {
    id: 28,
    type: "movie",
    title: "Avatar: The Way of Water",
    imgUrl:
      "https://image.tmdb.org/t/p/original/5ScPNT6fHtfYJeWBajZciPV3hEL.jpg",
  },
  {
    id: 29,
    title: "The Penguin",
    imgUrl:
      "https://image.tmdb.org/t/p/original/a2fqompEWB2GFp9GOdlqLcfEFfw.jpg",
    type: "series",
  },
  {
    id: 30,
    title: "Breaking Bad",
    imgUrl:
      "https://image.tmdb.org/t/p/original/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
    type: "series",
  },
  {
    id: 31,
    title: "The Office",
    imgUrl:
      "https://image.tmdb.org/t/p/original/dg9e5fPRRId8PoBE0F6jl5y85Eu.jpg",
    type: "series",
  },
  {
    id: 32,
    title: "Dragon Ball Super",
    imgUrl:
      "https://image.tmdb.org/t/p/original/8xc6QcxN8ZOCW4lo4IpVNm3VqKt.jpg",
    type: "series",
  },
  {
    id: 33,
    title: "The Last Of Us",
    imgUrl:
      "https://image.tmdb.org/t/p/original/sADB9n2KwhQNsRLfzeuTj8BsqeB.jpg",
    type: "series",
  },
  {
    id: 34,
    title: "Loki",
    imgUrl:
      "https://image.tmdb.org/t/p/original/oJdVHUYrjdS2IqiNztVIP4GPB1p.jpg",
    type: "series",
  },
  {
    id: 35,
    title: "Better Call Saul",
    imgUrl:
      "https://image.tmdb.org/t/p/original/fC2HDm5t0kHl7mTm7jxMR31b7by.jpg",
    type: "series",
  },
  {
    id: 36,
    title: "Invincible",
    imgUrl:
      "https://image.tmdb.org/t/p/original/dMOpdkrDC5dQxqNydgKxXjBKyAc.jpg",
    type: "series",
  },
  {
    id: 37,
    title: "The Boys",
    imgUrl:
      "https://image.tmdb.org/t/p/original/2zmTngn1tYC1AvfnrFLhxeD82hz.jpg",
    type: "series",
  },
  {
    id: 38,
    title: "Shougun",
    imgUrl:
      "https://image.tmdb.org/t/p/original/7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg",
    type: "series",
  },
  {
    id: 39,
    title: "Baki",
    imgUrl:
      "https://image.tmdb.org/t/p/original/x145FSI9xJ6UbkxfabUsY2SFbu3.jpg",
    type: "series",
  },
  {
    id: 40,
    title: "The Sopranos",
    imgUrl:
      "https://image.tmdb.org/t/p/original/rTc7ZXdroqjkKivFPvCPX0Ru7uw.jpg",
    type: "series",
  },
  {
    id: 41,
    title: "Peaky Blinders",
    imgUrl:
      "https://image.tmdb.org/t/p/original/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg",
    type: "series",
  },
  {
    id: 42,
    title: "Rick and Morty",
    imgUrl:
      "https://image.tmdb.org/t/p/original/gdIrmf2DdY5mgN6ycVP0XlzKzbE.jpg",
    type: "series",
  },
  {
    id: 43,
    title: "Drake and Josh",
    imgUrl:
      "https://image.tmdb.org/t/p/original/udCvGctktHvvf8w51XyTPfcmzDa.jpg",
    type: "series",
  },
  {
    id: 44,
    title: "Moon Knight",
    imgUrl:
      "https://image.tmdb.org/t/p/original/YksR65as1ppF2N48TJAh2PLamX.jpg",
    type: "series",
  },
  {
    id: 45,
    title: "The Penguin",
    imgUrl:
      "https://image.tmdb.org/t/p/original/a2fqompEWB2GFp9GOdlqLcfEFfw.jpg",
    type: "series",
  },
  {
    id: 46,
    title: "Breaking Bad",
    imgUrl:
      "https://image.tmdb.org/t/p/original/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
    type: "series",
  },
  {
    id: 47,
    title: "The Office",
    imgUrl:
      "https://image.tmdb.org/t/p/original/dg9e5fPRRId8PoBE0F6jl5y85Eu.jpg",
    type: "series",
  },
  {
    id: 48,
    title: "Dragon Ball Super",
    imgUrl:
      "https://image.tmdb.org/t/p/original/8xc6QcxN8ZOCW4lo4IpVNm3VqKt.jpg",
    type: "series",
  },
  {
    id: 49,
    title: "The Last Of Us",
    imgUrl:
      "https://image.tmdb.org/t/p/original/sADB9n2KwhQNsRLfzeuTj8BsqeB.jpg",
    type: "series",
  },
  {
    id: 50,
    title: "Loki",
    imgUrl:
      "https://image.tmdb.org/t/p/original/oJdVHUYrjdS2IqiNztVIP4GPB1p.jpg",
    type: "series",
  },
  {
    id: 51,
    title: "Better Call Saul",
    imgUrl:
      "https://image.tmdb.org/t/p/original/fC2HDm5t0kHl7mTm7jxMR31b7by.jpg",
    type: "series",
  },
  {
    id: 52,
    title: "Invincible",
    imgUrl:
      "https://image.tmdb.org/t/p/original/dMOpdkrDC5dQxqNydgKxXjBKyAc.jpg",
    type: "series",
  },
  {
    id: 53,
    title: "The Boys",
    imgUrl:
      "https://image.tmdb.org/t/p/original/2zmTngn1tYC1AvfnrFLhxeD82hz.jpg",
    type: "series",
  },
  {
    id: 54,
    title: "Shougun",
    imgUrl:
      "https://image.tmdb.org/t/p/original/7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg",
    type: "series",
  },
  {
    id: 55,
    title: "Baki",
    imgUrl:
      "https://image.tmdb.org/t/p/original/x145FSI9xJ6UbkxfabUsY2SFbu3.jpg",
    type: "series",
  },
  {
    id: 56,
    title: "The Sopranos",
    imgUrl:
      "https://image.tmdb.org/t/p/original/rTc7ZXdroqjkKivFPvCPX0Ru7uw.jpg",
    type: "series",
  },
];

const moviesItemSearch = WatchlistItemSearch.filter((item) => item.type === "movie");
const seriesItemSearch = WatchlistItemSearch.filter((item) => item.type === "series");







function LikesPage() {
    //const searchParams = useSearchParams()
  const [filter, setFilterd] = useState(false);
  const [all, setAll] = useState(true);
  const [movies, setMovies] = useState(false);
  const [series, setSeries] = useState(false);
  //const [documentary, setDocumentary] = useState(false);
  const [grid, setGrid] = useState(true);
  const [list, setList] = useState(false);
  const [watchlist, setWatchlist] = useState(true);


  
  const handleFilter = () => {
    setFilterd(!filter);
  };

  const handleAll = () => {
    setAll((prev) => !prev);
    setMovies(false);
    setSeries(false);
    //setDocumentary(false);
  };

  const handleMovies = () => {
    setMovies((prev) => !prev);
    setSeries(false);
    //if (!movies) setAll(false);
  };

  // const handleDocumentary = () => {
  //   setDocumentary((prev) => !prev);
  //   // setSeries(false);
  //   // setMovies(false);
  //   if (!documentary) setAll(false);
  // };

  const handleSeries = () => {
    setSeries((prev) => !prev);
    setMovies(false);
    //if (!series) setAll(false);
  };

  // Logic to check if both Movies and Series are selected
  // if (movies && series) {
  //   handleAll(); // Re-enable "All" and disable both movies and series
  // }

  // Set 'All' to true when none of the other categories are selected
  useEffect(() => {
    if (!movies && !series) {
      setAll(true);
    } else {
      setAll(false);
    }
  }, [movies, series]);

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
          <div className="text-[2.5vw] font-bold">Likes</div>
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
              {/* <Button
                onClick={handleDocumentary}
                className={`w-[10vw] h-[5.5vh] bg-customServicesColor rounded-full flex justify-center items-center mr-[1vw] text-[1vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
                  documentary ? "bg-white/90 text-black font-bold" : ""
                }`}
              >
                Documentary
              </Button> */}
            </div>
            {/* {grid ? (
              <GridView
                //mediaType={"movie"}
                filter={filter}
                moviesSearch={moviesItemSearch}
              ></GridView>
            ) : (
              <ListView
                //mediaType={"movie"}
                filter={filter}
                moviesSearch={moviesItemSearch}
                list={list}
              ></ListView>
            )} */}

            {movies && !series ? (
              <div>
                {grid ? (
                  <GridView
                  //mediaType={"movie"}
                    filter={filter}
                    mediaSearch={moviesItemSearch}
                    watchlist={watchlist}
                  ></GridView>
                ) : (
                  <ListView
                  //mediaType={"movie"}
                    filter={filter}
                    mediaSearch={moviesItemSearch}
                    list={list}
                    watchlist={watchlist}
                  ></ListView>
                )}
              </div>
            ) 
            : series && !movies ? (
              <div>
                {grid ? (
                  <GridView
                  //mediaType={"series"}
                    filter={filter}
                    mediaSearch={seriesItemSearch}
                    watchlist={watchlist}
                  ></GridView>
                ) : (
                  <ListView
                  //mediaType={"series"}
                    filter={filter}
                    mediaSearch={seriesItemSearch}
                    list={list}
                    watchlist={watchlist}
                  ></ListView>
                )}
              </div>
            ): !series && !movies ?(
              <div>
              {grid ? (
                <GridView
                //mediaType={type}
                  filter={filter}
                  mediaSearch={WatchlistItemSearch}
                  watchlist={watchlist}
                ></GridView>
              ) : (
                <ListView
                //mediaType={type}
                  filter={filter}
                  mediaSearch={WatchlistItemSearch}
                  list={list}
                  watchlist={watchlist}
                ></ListView>
              )}
            </div>
            ):(
              <div>Not found</div>
            )
            }
          </div>
        </div>
      </div>
    </div>
    )
  }
  
  export default LikesPage