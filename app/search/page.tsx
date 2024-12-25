//If you have a form or a button that requires user interaction and changes the UI based on the user's input,
//you need to mark that component as a client component using "use client"
"use client";
import React, { useEffect, useRef, useState } from "react";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaList } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import Filter from "@/components/filter/Filter";
import Sort from "@/components/sort/Sort";
import GridView from "@/components/gridview/GridView";
import ListView from "@/components/listview/ListView";
import { useSearchParams } from "next/navigation";
import { useGetContentQuery } from "../features/search/searchSlice";
import Link from "next/link";

function SearchPage() {
  const searchParams = useSearchParams();
  const typeQuery = searchParams.get("type");

  const [filter, setFilterd] = useState(false);
  const [all, setAll] = useState(false);
  const [movies, setMovies] = useState(typeQuery === "movie" ? true : false);
  const [series, setSeries] = useState(typeQuery === "series" ? true : false);
  const [grid, setGrid] = useState(true);
  const [list, setList] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [value, setValue] = React.useState<number | null>(0);
  const [page, setPage] = useState(1);
  const [ContentSearch, setContent] = useState<any[]>([]);
  const [type, setType] = useState(typeQuery || "all"); // Current selected tag
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortby] = useState<string>("popularity.desc");

  const handleSortBy = (newSort: string) => {
    console.log(newSort);
    setPage(1)
    setContent([]);
    console.log(newSort);
    
    setSortby(newSort);
  };

  const {
    data: contentSearch,
    isFetching,
    isSuccess,
  } = useGetContentQuery({ type, page, sortBy });

  useEffect(() => {
    if (isSuccess && contentSearch) {
      console.log(contentSearch);
      
      setContent((prev) => [...prev, ...contentSearch]);
    }
  }, [contentSearch]);

  const debounce = (func: any, delay: any) => {
    let timeout: string | number | NodeJS.Timeout | undefined;
    return (...args: any) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = debounce(() => {
    const thresholdPercentage = 40; // Trigger when user is within 40% of the bottom
    const totalHeight = document.documentElement.offsetHeight;
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      totalHeight - (totalHeight * thresholdPercentage) / 100
    ) {
      setPage((prev) => prev + 1);
    }
  }, 300);

  const handleValue = (newValue: number | null) => {
    if (newValue !== null) {
      setValue(newValue);
    } else {
      setValue(0);
    }
  };

  const handleFilter = () => {
    setFilterd(!filter);
  };

  const handleAll = (newType: string) => {
    if (!movies && !series && all) {
      return;
    } else {
      setAll((prev) => !prev);
      setMovies(false);
      setSeries(false);
      setType(newType);
      setPage(1); // Reset page when tag changes
      setContent([]); // Clear previous movies
    }
  };

  const handleMovies = (newType: string) => {
    if (movies && !series && !all) {
      return;
    } else {
      setMovies((prev) => !prev);
      setSeries(false);
      setType(newType);
      setPage(1); // Reset page when tag changes
      setContent([]); // Clear previous movies
    }
  };

  const handleSeries = (newType: string) => {
    if (!movies && series && !all) {
      return;
    } else {
      setSeries((prev) => !prev);
      setMovies(false);
      setType(newType);
      setPage(1); // Reset page when tag changes
      setContent([]); // Clear previous movies
    }
  };

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
          <Sort handleSortBy={handleSortBy} type={type}/>
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
              <Link href={{ pathname: "/search", query: { type: "all" } }}>
                <Button
                  //key="all"
                  onClick={() => handleAll("all")}
                  className={`w-[3vw] h-[5.5vh] bg-customServicesColor rounded-full flex justify-center items-center mr-[0.5vw] text-[1vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
                    all ? "bg-white/90 text-black font-bold" : ""
                  }`}
                >
                  All
                </Button>
              </Link>
              <Link href={{ pathname: "/search", query: { type: "movie" } }}>
                <Button
                  //key="movie"
                  onClick={() => handleMovies("movie")}
                  className={`w-[7vw] h-[5.5vh] bg-customServicesColor rounded-full flex justify-center items-center mr-[0.5vw] text-[1vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
                    movies ? "bg-white/90 text-black font-bold" : ""
                  }`}
                >
                  Movies
                </Button>
              </Link>
              <Link href={{ pathname: "/search", query: { type: "series" } }}>
                <Button
                  //key="series"
                  onClick={() => handleSeries("series")}
                  className={`w-[7vw] h-[5.5vh] bg-customServicesColor rounded-full flex justify-center items-center mr-[0.5vw] text-[1vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
                    series ? "bg-white/90 text-black font-bold" : ""
                  }`}
                >
                  Series
                </Button>
              </Link>
            </div>
            <div>
              {grid ? (
                <GridView
                  //mediaType={"movie"}
                  filter={filter}
                  mediaSearch={ContentSearch}
                ></GridView>
              ) : (
                <ListView
                  //mediaType={"movie"}
                  filter={filter}
                  mediaSearch={ContentSearch}
                  list={list}
                  value={value}
                  handleValue={handleValue}
                ></ListView>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
