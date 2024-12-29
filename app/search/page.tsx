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
  //const [page, setPage] = useState(1);
  //const [ContentSearch, setContent] = useState<any[]>([]);
  //const [type, setType] = useState(typeQuery || "all"); // Current selected tag
  const [loading, setLoading] = useState(true);
  //const [sortBy, setSortby] = useState<string>("popularity.desc");
  //const [withFilterGenre, setFilterGenre] = useState<number[]>();
  //const [withFilterPlatform, setFilterPlatform] = useState<number[]>();

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
    newPlatformFilters: number[],
    newAvailability: string[],
    newRuntime: number[]
  ) => {
    // console.log("New Genre Filters:", newGenreFilters);
    // console.log("New Platform Filters:", newPlatformFilters);
    dispatch(setPage(1)); // Reset page
    dispatch(setContent([]));
    dispatch(setFilterGenre(newGenreFilters)); // Update genre filters
    dispatch(setFilterPlatform(newPlatformFilters)); // Update platform filters
    dispatch(setAvailability(newAvailability));
    dispatch(setRuntime(newRuntime));
  };

  const handleFilterClear = (
    newFilter: number[],
    newFilterPlatfrom: number[]
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
  } = useGetContentQuery({
    type,
    page,
    sortBy,
    withFilterGenre,
    withFilterPlatform,
    withAvailability,
    withRuntime,
  });

  //console.log("Response: ",contentSearch);

  useEffect(() => {
    if (isSuccess && contentSearch) {
      //console.log(contentSearch);

      //setContent([...prev, ...contentSearch]);
      // Compute the new content
      const updatedContent = [...ContentSearch, ...contentSearch];

      // Dispatch the updated content
      dispatch(setContent(updatedContent));
    }
  }, [contentSearch]);

  //   useEffect(() => {
  //     console.log("Current Page:", page);
  //     console.log("Fetched Content:", contentSearch);
  // }, [page, contentSearch]);

  //   useEffect(() => {
  //     if (isSuccess && contentSearch) {
  //         const updatedContent = page === 1 ? contentSearch : [...ContentSearch, ...contentSearch];
  //         dispatch(setContent(updatedContent));
  //     }
  // }, [contentSearch, page, dispatch]);

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
          <Sort handleSortBy={handleSortBy} type={type} />
        </div>
      </div>

      <div className="flex flex-col">
        <div
          className={`flex justify-start mt-[-2vh] ${filter ? "mr-[2vw]" : ""}`}
        >
          {/* Filter component */}
          <Filter
            handleFilter={handleFilter}
            filter={filter}
            handleFilterParams={handleFilterParams}
            handleFilterClear={handleFilterClear}
            typeQuery={typeQuery}
          />

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
                ContentSearch.map((media, index) =>
                  //typeQuery === "movie" ? (
                    <ListView
                      id={media.id}
                      key={index}
                      filter={filter}
                      media_type={media.media_type}
                      poster_path={media.poster_path}
                      title={media.title || media.name}
                      //name={media.name ? media.name : ""}
                      overview={media.overview}
                      list={list}
                      value={value}
                      handleValue={handleValue}
                    />
                  //) 
                  // : (
                  //   <ListView
                  //     id={media.id}
                  //     key={index}
                  //     filter={filter}
                  //     media_type={media.media_type}
                  //     poster_path={media.poster_path}
                  //     name={media.name}
                  //     overview={media.overview}
                  //     list={list}
                  //     value={value}
                  //     handleValue={handleValue}
                  //   />
                  // )
                )
                // <ListView
                //   key={index}
                //   filter={filter}
                //   mediaSearch={ContentSearch}
                //   list={list}
                //   value={value}
                //   handleValue={handleValue}
                // />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
