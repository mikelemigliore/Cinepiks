//If you have a form or a button that requires user interaction and changes the UI based on the user's input,
//you need to mark that component as a client component using "use client"
"use client";
import React, { useEffect, useState } from "react";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaList } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import Filter from "@/components/filter/Filter";
import Sort from "@/components/sort/Sort";
import GridView from "@/components/gridview/GridView";
import ListView from "@/components/listview/ListView";
import { useSearchParams } from "next/navigation";
import {
  useGetAllQuery,
  useGetMoviesQuery,
  useGetSeriesQuery,
} from "../features/search/searchSlice";
import Link from "next/link";

function SearchPage() {
  const searchParams = useSearchParams();
  const [filter, setFilterd] = useState(false);
  const [all, setAll] = useState(true);
  const [movies, setMovies] = useState(false);
  const [series, setSeries] = useState(false);
  //const [documentary, setDocumentary] = useState(false);
  const [grid, setGrid] = useState(true);
  const [list, setList] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [value, setValue] = React.useState<number | null>(0);
  const [moviesItemSearch, setMoviesItemSearch] = useState([]);
  const [seriesItemSearch, setSeriesItemSearch] = useState([]);
  const [itemSearch, setItemSearch] = useState<any[]>([]);

  const type = searchParams.get("type");

  const { data: movieSearch } = useGetMoviesQuery({});

  const { data: seriesSearch } = useGetSeriesQuery({});

  const { data: allSearch } = useGetAllQuery({});

  useEffect(() => {
    if (type === "movie") {
      setMovies(true);
      setSeries(false);
      setAll(false);
      //console.log(movieSearch);
      
      setMoviesItemSearch(movieSearch || []);
    } else if (type === "series") {
      setSeries(true);
      setMovies(false);
      setAll(false);
      console.log(seriesSearch);
      
      setSeriesItemSearch(seriesSearch || []);
    } else if (type === "all") {
      setAll(true);
      setMovies(false);
      setSeries(false);
      //console.log(allSearch);
      setItemSearch(allSearch || []);
    }
  }, [type, movieSearch, seriesSearch, allSearch]);



  const handleValue = (newValue: number | null) => {
    if (newValue !== null) {
      setValue(newValue);
    } else {
      setValue(0);
    }
  };

  // useEffect(() => {
  //   if (type === "movie") {
  //     setMovies(true);
  //     setSeries(false);
  //     setAll(false);
  //   } else if (type === "series") {
  //     setSeries(true);
  //     setMovies(false);
  //     setAll(false);
  //   }
  // }, [searchParams]);

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


  const handleSeries = () => {
    setSeries((prev) => !prev);
    setMovies(false);
    //if (!series) setAll(false);
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
              <Link href={{ pathname: "/search", query: { type: "all" } }}>
                <Button
                  onClick={handleAll}
                  className={`w-[3vw] h-[5.5vh] bg-customServicesColor rounded-full flex justify-center items-center mr-[0.5vw] text-[1vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
                    all ? "bg-white/90 text-black font-bold" : ""
                  }`}
                >
                  All
                </Button>
              </Link>
              <Link href={{ pathname: "/search", query: { type: "movie" } }}>
                <Button
                  onClick={handleMovies}
                  className={`w-[7vw] h-[5.5vh] bg-customServicesColor rounded-full flex justify-center items-center mr-[0.5vw] text-[1vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
                    movies ? "bg-white/90 text-black font-bold" : ""
                  }`}
                >
                  Movies
                </Button>
              </Link>
              <Link href={{ pathname: "/search", query: { type: "series" } }}>
                <Button
                  onClick={handleSeries}
                  className={`w-[7vw] h-[5.5vh] bg-customServicesColor rounded-full flex justify-center items-center mr-[0.5vw] text-[1vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
                    series ? "bg-white/90 text-black font-bold" : ""
                  }`}
                >
                  Series
                </Button>
              </Link>

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
                  ></GridView>
                ) : (
                  <ListView
                    //mediaType={"movie"}
                    filter={filter}
                    mediaSearch={moviesItemSearch}
                    list={list}
                    value={value}
                    handleValue={handleValue}
                  ></ListView>
                )}
              </div>
            ) : series && !movies ? (
              <div>
                {grid ? (
                  <GridView
                    //mediaType={"tv"}
                    filter={filter}
                    mediaSearch={seriesItemSearch}
                  ></GridView>
                ) : (
                  <ListView
                    //mediaType={"tv"}
                    filter={filter}
                    mediaSearch={seriesItemSearch}
                    list={list}
                    value={value}
                    handleValue={handleValue}
                  ></ListView>
                )}
              </div>
            ) : !series && !movies ? (
              <div>
                {grid ? (
                  <GridView
                    //mediaType={"all"}
                    filter={filter}
                    mediaSearch={itemSearch}
                  ></GridView>
                ) : (
                  <ListView
                    //mediaType={"all"}
                    filter={filter}
                    mediaSearch={itemSearch}
                    list={list}
                    value={value}
                    handleValue={handleValue}
                  ></ListView>
                )}
              </div>
            ) : (
              <div>Not found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
