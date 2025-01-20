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
import { usePathname, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import { useGetWatchlistQuery } from "../features/watchlist/watchlistSlice";
import { getWatchlists } from "../pages/api/watchlistPage";


function WatchlistPage() {
  //const searchParams = useSearchParams()
  const [filter, setFilterd] = useState(false);
  const [all, setAll] = useState(true);
  const [movies, setMovies] = useState(false);
  const [series, setSeries] = useState(false);
  //const [documentary, setDocumentary] = useState(false);
  const [grid, setGrid] = useState(true);
  const [list, setList] = useState(false);
  const [watchlist, setWatchlist] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  //const[watchlistdb,setWatchlistdb] = useState<any[]>([])


  // useEffect(() => {
  //   async function fetchWatchlist() {
  //     const res = await fetch("/api/watchlist");
  //     const data = await res.json();
  //     //console.log(data.watchlist);
  //     const response = await getWatchlists(data.watchlist);
  //     const list = await response.json();
  //     console.log(list);

  //     setWatchlistdb(list);
  //   }
  //   fetchWatchlist();
  // }, []);  // Fetches only once when the component loads

  const watchlistdb = useSelector((state: RootState) => state.content.watchlist);

      useEffect(() => {
        if (window.innerWidth >= 1024) {
          setIsDesktop(true);
        } else {
          setIsDesktop(false);
        }
      }, []);
  

    // const { data: watchlistDB, isSuccess: watchlistSucces } =
    //   useGetWatchlistQuery({});
  
    // // Fetch movie details when IDs are available
    // useEffect(() => {
    //   const fetchMovieDetails = async () => {
    //     if (watchlistSucces && watchlistDB.length > 0) {
    //       try {
    //         // Fetch full movie details for the given IDs
    //         const res = await getWatchlists(watchlistDB); // Fetch movie data by IDs
    //         const watchlistedContent = await res.json();
    //         // Store the full movie details in Redux
    //         dispatch(setWatchlists(watchlistedContent));
    //       } catch (error) {
    //         console.error("Error fetching movie details:", error);
    //       }
    //     }
    //   };
  
    //   fetchMovieDetails();
    // }, [ watchlistDB]); // Trigger only when the movie IDs are fetched


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
    <div className=" md:mt-[20vh] mt-[10vh] mb-[5vh]">
      <div className="flex justify-between ml-[5vw]">
        <div
          className={`transition-transform duration-700 ease-in-out`}
        >
          <div className="md:text-[2.5vw] text-[10vw] font-bold">Watchlist</div>
          {/* <div className="h-[5vh] text-[4vw] md:text-[0.9vw] text-gray-300 md:w-[20vw]">
            Use filter on the left to refine your search
          </div> */}
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
                className={`md:w-[1.4vw] md:h-[1.4vw] w-[6vw] h-[6vw] ${grid ? "text-black" : ""}`}
              />
            </Button>
            <Button
              onClick={handleList}
              className={`p-0 md:w-[2.5vw] md:h-[2.5vw] w-[10vw] h-[10vw] bg-customServicesColor md:rounded-[0.4vw] rounded-lg md:mr-[1vw] mr-[2vw] flex justify-center items-center hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 duration-100 ${
                list ? "bg-white/90" : ""
              }`}
            >
              <FaList
                className={`md:w-[1.4vw] md:h-[1.4vw] w-[6vw] h-[6vw] ${list ? "text-black" : ""}`}
              />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div
          className={`flex justify-start mt-[-2vh]`}
        >
          {/* Apply the transition to the entire buttons and cards container */}
          <div
            className={`transition-transform duration-700 ease-in-out flex flex-col md:ml-[5vw] ml-[2vw]`}
          >
            <div>
              {watchlistdb.length === 0 ? (
                <div>No results found.</div>
              ) : grid ? (
                <GridView filter={filter} mediaSearch={watchlistdb} watchlist={watchlist}/>
              ) : (
                watchlistdb.map((media, index) => (
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
                    //likes={likes}
                    // value={value}
                    // handleValue={handleValue}
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

export default WatchlistPage;
