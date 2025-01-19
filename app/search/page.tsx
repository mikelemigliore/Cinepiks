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
import {
  useGetContentQuery,
  useGetSearchItemQuery,
} from "../features/search/searchSlice";
import Link from "next/link";
//import { useDispatch } from "react-redux";
//import { RootState } from "../features/store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../features/store";
import {
  setType,
  setPage,
  setSortby,
  setFilterGenre,
  setFilterPlatform,
  setContent,
  setAvailability,
  setRuntime,
} from "../features/querySlice";
import _ from "lodash";
import {
  useGetPopularQuery,
  useGetTrendingQuery,
  useGetUpcomingQuery,
} from "../features/homepage/movies/movieSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { useMemo } from "react";
interface Availability {
  id: string;
  tag: string;
}

function SearchPage() {
  const searchParams = useSearchParams();
  const typeQuery = searchParams.get("type");
  const typeContent = searchParams.get("customParam");
  const typeService = searchParams.get("servicesParam");
  const typeGenres = searchParams.get("genresParam");
  const typeSearch = searchParams.get("queryParam");

  //console.log("typeSerch", typeSearch);

  const parsedTypeSearch = typeSearch
    ? JSON.parse(typeSearch.replace(/""/g, '"')) // For JSON-like strings, e.g., "[8,15]"
    : null; // Fallback if null or undefined

  //console.log("parsedTypeSearch", parsedTypeSearch);

  //console.log("Beginning typeGenres", typeGenres);

  const parsedTypeService = typeService
    ? JSON.parse(typeService.replace(/'/g, '"')) // For JSON-like strings, e.g., "[8,15]"
    : []; // Fallback if null or undefined

  // Memoize parsedTypeGenres
  const parsedTypeGenres = useMemo(() => {
    return typeGenres
      ? JSON.parse(typeGenres.replace(/'/g, '"')) // For JSON-like strings, e.g., "[8,15]"
      : []; // Fallback if null or undefined
  }, [typeGenres]);

  //console.log("parsedTypeGenres", parsedTypeGenres);

  const [filter, setFilterd] = useState(false);
  const [all, setAll] = useState(typeQuery === "all" ? true : false);
  const [movies, setMovies] = useState(typeQuery === "movie" ? true : false);
  const [series, setSeries] = useState(typeQuery === "series" ? true : false);
  //const [series, setSeries] = useState(typeQuery === "series" ? true : false);
  const [grid, setGrid] = useState(true);
  const [list, setList] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  // const [value, setValue] = React.useState<number | null>(0);
  const [loading, setLoading] = useState(true);
  // Inside your component
  const dispatch = useDispatch();

  const type = useSelector((state: RootState) => state.query.type);
  const page = useSelector((state: RootState) => state.query.page);
  const sortBy = useSelector((state: RootState) => state.query.sortBy);
  const withFilterGenre = useSelector(
    (state: RootState) => state.query.withFilterGenre
  );
  const withFilterPlatform = useSelector(
    (state: RootState) => state.query.withFilterPlatform
  );
  const ContentSearch = useSelector(
    (state: RootState) => state.query.ContentSearch
  );
  const withAvailability = useSelector(
    (state: RootState) => state.query.withAvailability
  );
  const withRuntime = useSelector(
    (state: RootState) => state.query.withRuntime
  );

  // console.log("Type", type);
  // console.log("Page", page);
  // console.log("Sort", sortBy);
  // console.log("Genre", withFilterGenre);
  // console.log("Platform", withFilterPlatform);
  //console.log("Content Search", ContentSearch);

  // useEffect(() => {
  //   if (typeContent === "upcoming") {
  //     //dispatch(setType(typeQuery)); // Update the Redux state with the `typeQuery` value
  //     //dispatch(setFilterGenre([])); // Update genre filters
  //   }
  // }, [typeContent]);

    useEffect(() => {
      if (window.innerWidth >= 1024) {
        setIsDesktop(true);
      } else {
        setIsDesktop(false);
      }
    }, []);


  useEffect(() => {
    if (typeQuery) {
      dispatch(setType(typeQuery)); // Update the Redux state with the `typeQuery` value
      dispatch(setFilterGenre([])); // Update genre filters
    } else {
      dispatch(setType("all")); // Fallback to default if `typeQuery` is null
    }
  }, [typeQuery]);

  const handleSortBy = (newSort: string) => {
    dispatch(setPage(1)); // Reset page
    dispatch(setContent([]));
    dispatch(setSortby(newSort)); // Update sortBy
  };

  const handleFilterParams = (
    newGenreFilters: number[],
    newPlatformFilters: string[],
    //newAvailability: string[],
    newAvailability: Availability[],
    newRuntime: number[]
  ) => {
    // console.log("New Genre Filters:", newGenreFilters);
    //console.log("newAvailability:", newAvailability);
    dispatch(setPage(1)); // Reset page
    dispatch(setContent([]));
    console.log(newGenreFilters);

    dispatch(setFilterGenre(newGenreFilters)); // Update genre filters
    dispatch(setFilterPlatform(newPlatformFilters)); // Update platform filters
    dispatch(setAvailability(newAvailability));
    dispatch(setRuntime(newRuntime));
  };

  const handleFilterClear = (
    newFilter: number[],
    newFilterPlatfrom: string[]
  ) => {
    dispatch(setPage(1));
    dispatch(setSortby("popularity.desc"));
    dispatch(setContent([ContentSearch]));
    dispatch(setFilterGenre([]));
    dispatch(setFilterPlatform([]));
    dispatch(setAvailability([]));
    dispatch(setRuntime([]));
  };

  const {
    data: contentSearch,
    isFetching,
    isSuccess,
  } = useGetContentQuery(
    typeContent === "trendingMovies" || parsedTypeSearch !== null
      ? skipToken
      : {
          type,
          page,
          sortBy,
          withFilterGenre,
          withFilterPlatform,
          withAvailability,
          withRuntime,
        }
  );

  const { data: trending } = useGetTrendingQuery(
    typeContent === "trendingMovies" ? { page } : skipToken
  );

  const { data: search, isSuccess: searchSuccess } = useGetSearchItemQuery(
    parsedTypeSearch !== null ? { page, query: parsedTypeSearch } : skipToken
  );

  // useEffect(() => {
  //   if (search) {
  //     console.log("Fetched Search Data:", search);
  //   }
  //   console.log("Redux ContentSearch State:", ContentSearch);
  // }, [search, ContentSearch]);

  useEffect(() => {
    if (
      (isSuccess && contentSearch && parsedTypeSearch === null) ||
      (contentSearch &&
        parsedTypeSearch === null &&
        typeContent === "popularMovies")
    ) {
      //console.log("contentSearch");
      const updateDate = [...ContentSearch, ...contentSearch];
      dispatch(setContent(updateDate));
    } else if (trending && typeContent === "trendingMovies") {
      //console.log("trending");
      const updateDate = [...ContentSearch, ...trending];
      dispatch(setContent(updateDate));
    } else if (typeContent === "upcoming") {
      //console.log("upcoming");
      handleFilterParams([], [], [{ id: "2|3", tag: "upcoming" }], []);
    } else if (typeContent === "nowPlaying") {
      //console.log("nowPlaying");
      handleFilterParams([], [], [{ id: "2|3", tag: "inTheaters" }], []);
    } else if (parsedTypeService.length > 0 && parsedTypeSearch === null) {
      //console.log("parsedTypeService");
      handleFilterParams([], parsedTypeService, [], []);
    } else if (search && parsedTypeSearch !== null) {
      const updateDate = [...ContentSearch, ...search];
      dispatch(setContent(updateDate));
    } else if (parsedTypeGenres.length > 0 && parsedTypeSearch === null) {
      //console.log("parsedTypeGenres", parsedTypeGenres);
      handleFilterParams(parsedTypeGenres, [], [], []);
    }
  }, [trending, contentSearch, typeContent, search, typeQuery]); //search

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
  }, [page]);

  const handleScroll = debounce(() => {
    const thresholdPercentage = 40; // Trigger when user is within 40% of the bottom
    const totalHeight = document.documentElement.offsetHeight;
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      totalHeight - (totalHeight * thresholdPercentage) / 100
    ) {
      // setPage((prev:number) => prev + 1);
      dispatch(setPage(page + 1));
    }
  }, 300);

  // const handleValue = (newValue: number) => {
  //   if (newValue !== null) {
  //     setValue(newValue);
  //   } else {
  //     setValue(0);
  //   }
  // };

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
      dispatch(setType(newType));
      dispatch(setPage(1)); // Reset page when tag changes
      dispatch(setContent([])); // Clear previous movies
    }
  };

  const handleMovies = (newType: string) => {
    if (movies && !series && !all) {
      return;
    } else {
      setMovies((prev) => !prev);
      setSeries(false);
      dispatch(setType(newType));
      dispatch(setPage(1)); // Reset page when tag changes
      dispatch(setContent([])); // Clear previous movies
    }
  };

  const handleSeries = (newType: string) => {
    if (!movies && series && !all) {
      return;
    } else {
      setSeries((prev) => !prev);
      setMovies(false);
      dispatch(setType(newType));
      dispatch(setPage(1)); // Reset page when tag changes
      dispatch(setContent([])); // Clear previous movies
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
    <div
      className={` md:mt-[20vh] mt-[10vh] mb-[5vh]`}
    >
      <div className="flex justify-between md:ml-[5vw] ml-[3vw]">
        <div
          className={`${
            filter ? "md:translate-x-[15vw]" : ""
          } md:transition-transform md:duration-700 md:ease-in-out`}
        >
          <div className="md:text-[2.5vw] text-[10vw] font-bold">Search</div>
          <div className="absolute h-[5vh] text-[4vw] md:text-[0.9vw] text-gray-300 md:w-[20vw]">
            Use filter on the left to refine your search
          </div>
        </div>

        <div className="relative flex flex-col mr-[2vw]" style={{ top: "3vh" }}>
          <div className="flex justify-end md:mb-[2vh] mb-[7vh] md:mt-[2vh] mt-[-2vh]">
            <Button
              onClick={handleGrid}
              className={`p-0 md:w-[2.5vw] md:h-[2.5vw] w-[10vw] h-[10vw] bg-customServicesColor md:rounded-[0.4vw] rounded-lg md:mr-[1vw] mr-[2vw] flex justify-center items-center hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 duration-100 ${
                grid ? "bg-white/90" : ""
              }`}
            >
              <BsFillGrid3X3GapFill
                className={`md:w-[1.4vw] md:h-[1.4vw] w-[6vw] h-[6vw] ${
                  grid ? "text-black" : ""
                }`}
              />
            </Button>
            <Button
              onClick={handleList}
              className={`p-0 md:w-[2.5vw] md:h-[2.5vw] w-[10vw] h-[10vw] bg-customServicesColor md:rounded-[0.4vw] rounded-lg md:mr-[1vw] mr-[2vw] flex justify-center items-center hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 duration-100 ${
                list ? "bg-white/90" : ""
              }`}
            >
              <FaList
                className={`md:w-[1.4vw] md:h-[1.4vw] w-[6vw] h-[6vw] ${
                  list ? "text-black" : ""
                }`}
              />
            </Button>
          </div>
          {/* Sort component */}
          <Sort
            handleSortBy={handleSortBy}
            type={type}
            typeContent={typeContent}
            typeQuery={typeQuery}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <div
          className={`flex justify-start mt-[-2vh] ${
            filter ? "md:mr-[2vw]" : ""
          }`}
        >
          {/* Filter component */}
          <Filter
            handleFilter={handleFilter}
            filter={filter}
            handleFilterParams={handleFilterParams}
            handleFilterClear={handleFilterClear}
            typeQuery={typeQuery}
            typeContent={typeContent}
            typeService={parsedTypeService}
            typeGenres={parsedTypeGenres}
            isDesktop={isDesktop}
          />

          {/* Apply the transition to the entire buttons and cards container */}
          <div
            className={`md:transition-transform md:duration-700 md:ease-in-out flex flex-col ${
              filter ? "md:translate-x-[1vw]" : ""
            }`}
          >
            <div className="flex z-50  transition-transform duration-700 ease-in-out mt-[-10vh] md:mt-[0vh] mb-[10vh] md:mb-[0vh] md:space-x-[0vw] space-x-[1.5vw]">
              <Link href={{ pathname: "/search", query: { type: "all" } }}>
                <Button
                  //key="all"
                  onClick={() => handleAll("all")}
                  className={` h-[6vh] w-24 md:w-[3vw] md:h-[5.5vh] bg-customServicesColor rounded-full flex justify-center items-center md:mr-[0.5vw] text-[4vw] md:text-[1vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
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
                  className={`h-[6vh] w-24 md:w-[7vw] md:h-[5.5vh] bg-customServicesColor rounded-full flex justify-center items-center md:mr-[0.5vw] text-[4vw] md:text-[1vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
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
                  className={`h-[6vh] w-24 md:w-[7vw] md:h-[5.5vh] bg-customServicesColor rounded-full flex justify-center items-center md:mr-[0.5vw] text-[4vw] md:text-[1vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
                    series ? "bg-white/90 text-black font-bold" : ""
                  }`}
                >
                  Series
                </Button>
              </Link>
            </div>
            <div>
              {ContentSearch.length === 0 ? (
                <div>No results found.</div>
              ) : grid ? (
                <GridView filter={filter} mediaSearch={ContentSearch} />
              ) : (
                ContentSearch.map((media, index) => (
                  <ListView
                    id={media.id}
                    key={index}
                    filter={filter}
                    media_type={media.media_type}
                    poster_path={media.poster_path}
                    title={media.title || media.name}
                    backdrop_path={media.backdrop_path}
                    overview={media.overview}
                    list={list}
                    isDesktop={isDesktop}
                    //value={value}
                    //handleValue={handleValue}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
