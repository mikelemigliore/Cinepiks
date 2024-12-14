"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import HowToWatchCard from "@/components/cards/HowToWatchCard";
import Tags from "@/components/tags/Tags";
import Reviews from "@/components/reviews/Reviews";
import MoreInfo from "@/components/moreinfo/MoreInfo";
import CastSwiper from "@/components/carousel/CastSwiper";
import MoreLikeThisSwiper from "@/components/carousel/MoreLikeThisSwiper";
import RecommendationSwiper from "@/components/carousel/RecommendationSwiper";
import React from "react";
import SinglePageMainTrailer from "@/components/singlePageComps/SinglePageMainTrailer";
import MainDetails from "@/components/singlePageComps/MainDetails";
import {
  getCast,
  getMovieDetails,
  getTrailerMovieVideo,
} from "@/app/pages/api/singleMoviePage";
import Link from "next/link";

const movie = [
  {
    id: 1,
    title: "Venom: The Last Dance",
    imgUrl:
      "https://image.tmdb.org/t/p/original/k42Owka8v91trK1qMYwCQCNwJKr.jpg",
  },
];

function SingleMoviePage() {
  const [videoKey, setVideoKey] = useState(""); 
  const [backdrop, setBackdrop] = useState();
  const [title, setTitle] = useState("");
  const [imdbId, setImdbId] = useState();
  const [cast, setCast] = useState([]);
  const [autoplay, setAutoplay] = useState(true);
  const [play, setPlay] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const [unmute, setUnmute] = useState(false);
  const [pause, setPause] = useState(false);
  const [reload, setReload] = useState(false);
  const [isTrailer, setIsTrailer] = useState(false);
  const [reviews, setReviews] = useState(true);

  const params = useParams();
  const { id } = params;
  const Id = Number(id);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMovieDetails(Id);
        const responseTrailer = await getTrailerMovieVideo(Id);
        const responseCast = await getCast(Id);
        const data = await response.json();
        const dataTrailer = await responseTrailer.json();
        const dataCast = await responseCast.json();

        setBackdrop(data.backdrop_path);
        setTitle(data.title);
        setVideoKey(dataTrailer.key);
        setImdbId(data.imdb_id || null);
        setCast(dataCast);

      } catch (error) {
        console.error("Failed to fetch:", error);
      }
    };

    fetchData();
  }, []);


  const handlePlay = () => {
    setPlay(true);
    setIsLoading(false); // Stop showing loading spinner once the video plays
    setPause(!pause);
  };

  const handlePause = () => {
    setPlay(false);
  };

  const handleEnd = () => {
    setPlay(false);
  };

  // Handle when video starts playing
  const handleReload = () => {
    setReload(false);
    setPause(false);
  };

  const handleUnmute = () => {
    setUnmute(!unmute);
  };

  const handleSetRelaod = () => {
    setReload(!reload);
  };

  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";

  const formatTitle = (title: string): string => {
    return title
      .toLowerCase() // Convert to lowercase
      .replace(/[^a-z0-9\s]/g, "") // Remove special characters (non-alphanumeric except spaces)
      .replace(/\s+/g, "_"); // Replace spaces with underscores
  };

  return (
    <div>
      <SinglePageMainTrailer
        handlePlay={handlePlay}
        play={play}
        unmute={unmute}
        pause={pause}
        reload={reload}
        handleReload={handleReload}
        handleEnd={handleEnd}
        autoplay={autoplay}
        videoKey={videoKey}
        setIsLoading={setIsLoading}
        src={`${BASE_IMAGE_URL}${backdrop}`}
        isLoading={isLoading}
        handleUnmute={handleUnmute}
        handlePause={handlePause}
        handleSetRelaod={handleSetRelaod}
      />
      <div className="min-h-screen mb-[110vw] ">
        <div
          className={`w-full mt-[-6vw] z-[50] absolute transition-transform duration-700 ease-in-out ${
            play ? "translate-y-[7vw]" : ""
          }`}
        >
          <div className="flex flex-col">
            <MainDetails
              id={Id}
              media={movie}
              title={title}
              imdbId={imdbId}
              cast={cast}
              handlePlay={handlePlay}
              videoKey={videoKey}
              setIsLoading={setIsLoading}
              handleReload={handleReload}
              handleEnd={handleEnd}
            />
            <div className="flex gap-[4vw] mt-[3vw] h-[4vw] w-full justify-start ml-[14vw]">
              <div className="h-[2vw]">
                <div className="text-[1vw]">Ratings Websites</div>
                <div className="flex mb-[2vh] mt-[1vh]">
                  <Link
                    href={`https://www.rottentomatoes.com/m/${formatTitle(
                      title
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-[1vw] h-[4.5vh] bg-customServicesColor rounded-full flex justify-center items-center mr-[0.5vw] text-[0.9vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95"
                  >
                    Rotten Tomatoes
                  </Link>
                  <Link
                    href={`https://www.imdb.com/title/${imdbId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-[1vw] h-[4.5vh] bg-customServicesColor rounded-full flex justify-center items-center mr-[0.5vw] text-[0.9vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95"
                  >
                    IMDb
                  </Link>
                  <Link
                    href={`https://www.themoviedb.org/movie/${Id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-[1vw] h-[4.5vh] bg-customServicesColor rounded-full flex justify-center items-center mr-[0.5vw] text-[0.9vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95"
                  >
                    TMDb
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex gap-[4vw] mt-[3vw] h-[22vw] w-full justify-center ml-[2vw]">
              <div className="h-[2vw]">
                <div className="text-[1vw]">How To Watch</div>
                <div className="mb-[2vh] mt-[1vh]">
                  <Tags />
                </div>
                <div className="w-full">
                  <HowToWatchCard />
                </div>
              </div>
              <div className="h-[2vw]">
                <div className="text-[1vw]">Reviews</div>
                <div className="my-[1vh] mb-[2vh]">
                  <Tags reviews={reviews} />
                </div>
                <div className="w-full h-[22vw]">
                  <Reviews />
                </div>
              </div>
            </div>
            <div className="h-[6vw] mt-[10vw] bg-buttonColor rounded-[1vw] max-w-[75vw] ml-[14vw]">
              <div className="text-[1vw] mt-[-2vw]">More Info</div>
              <MoreInfo />
            </div>
            {/* <div className="mt-[6vw] max-w-[50vw]"> */}
            <div className="mt-[4vw] max-w-[75vw] ml-[14vw]">
              <CastSwiper cast={cast} />
            </div>
            {/* Divider line */}
            <div className="max-w-[75vw] ml-[15vw] h-[0.1vh] mt-[4vh] bg-white/20"></div>
            <div className="mt-[6vw]">
              {/* mx-auto max-w-full */}
              <MoreLikeThisSwiper />
            </div>
            <div>
              {/* mx-auto max-w-full */}
              <RecommendationSwiper />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleMoviePage;
