"use client";
import React, { useEffect, useState } from "react";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaList } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import GridView from "@/components/gridview/GridView";
import ListView from "@/components/listview/ListView";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";

function WatchlistPage() {
  const [filter, setFilterd] = useState(false);
  const [all, setAll] = useState(true);
  const [movies, setMovies] = useState(false);
  const [series, setSeries] = useState(false);
  const [grid, setGrid] = useState(true);
  const [list, setList] = useState(false);
  const [watchlist, setWatchlist] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  const isLoading = false;
  const watchlistdb = useSelector(
    (state: RootState) => state.content.watchlist
  );

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }
  }, []);

  const handleFilter = () => {
    setFilterd(!filter);
  };

  const handleAll = () => {
    setAll((prev) => !prev);
    setMovies(false);
    setSeries(false);
  };

  const handleMovies = () => {
    setMovies((prev) => !prev);
    setSeries(false);
  };

  const handleSeries = () => {
    setSeries((prev) => !prev);
    setMovies(false);
  };

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
      <div className="flex justify-between ml-[3vw]">
        <div className={`transition-transform duration-700 ease-in-out`}>
          <div className="md:text-[2.5vw] text-[10vw] font-bold">Watchlist</div>
        </div>

        <div className="relative flex flex-col mr-[2vw] md:mr-[0vw]" style={{ top: "3vh" }}>
          <div className="flex justify-end md:mb-[2vh] mb-[7vh] md:mt-[-2vh] mt-[-2vh]">
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
        </div>
      </div>

      <div className="flex flex-col">
        <div className={`flex justify-start mt-[-2vh]`}>
          <div
            className={`transition-transform duration-700 ease-in-out flex flex-col md:ml-[3vw] ml-[2vw]`}
          >
            <div>
              {watchlistdb.length === 0 ? (
                <div className="md:ml-[30vw] ml-[0vw] md:mt-[2vw] mt-[6vw]">
                  <img
                    src="/WatchlistEmpty.png"
                    alt="No content found"
                    className="md:w-[30vw] w-[100vw]"
                  />
                </div>
              ) : grid ? (
                <GridView
                  filter={filter}
                  mediaSearch={watchlistdb}
                  watchlist={watchlist}
                  isLoadingContent={isLoading}
                />
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
                    isLoadingContent={isLoading}
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
