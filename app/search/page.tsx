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
import GridView from "@/components/gridview/GridView";
import ListView from "@/components/listview/ListView";

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
  const [fullscreen, setFullscreen]=useState(false)



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
              <GridView filter={filter} moviesSearch={moviesSearch}></GridView>
            ) : (
              <ListView filter={filter} moviesSearch={moviesSearch} list={list}></ListView>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
