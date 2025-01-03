"use client";
import React, { useEffect, useState } from "react";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaList } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import GridView from "@/components/gridview/GridView";
import ListView from "@/components/listview/ListView";
import { getLikes } from "../pages/api/likesPage";

function LikesPage() {
  //const searchParams = useSearchParams()
  const [filter, setFilterd] = useState(false);
  const [grid, setGrid] = useState(true);
  const [list, setList] = useState(false);
  const [watchlist, setWatchlist] = useState(true);
  const [likes, setLikes] = useState([]);
  const [watchlistItemSearch, setWatchlistItemSearch] = useState<any[]>([]);

  // Fetch movie details for the IDs in `likes`
  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (likes.length > 0) {
        try {
          const res = await getLikes(likes);
          const data = await res.json();
          setWatchlistItemSearch(data); // Remove null entries
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      }
    };

    fetchMovieDetails();
  }, [likes]);

  useEffect(() => {
    const handleLike = async () => {
      try {
        const res = await fetch("/api/likes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.status === 400) {
          console.log("Error");
        }

        if (res.status === 200) {
          const data = await res.json(); // Parse the JSON response
          setLikes(data.likes);
        }
      } catch (error) {
        console.error("Error adding like:", error);
      }
    };

    handleLike();
  }, []);

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
        <div className={"transition-transform duration-700 ease-in-out"}>
          <div className="text-[2.5vw] font-bold">Likes</div>
          <div className="h-[5vh] text-[0.7vw] md:text-[0.9vw] text-gray-300">
            List of content you have liked
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
        </div>
      </div>

      <div className="flex flex-col">
        <div className={`flex justify-start mt-[-2vh]`}>
          <div
            className={`transition-transform duration-700 ease-in-out flex flex-col ml-[5vw]`}
          >
            <div>
              {watchlistItemSearch.length === 0 ? (
                <div>No results found.</div>
              ) : grid ? (
                <GridView filter={filter} mediaSearch={watchlistItemSearch} />
              ) : (
                watchlistItemSearch.map((media, index) => (
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

export default LikesPage;
