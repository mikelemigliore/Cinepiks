
"use client";
import { useEffect, useState } from "react";
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

const movie = [
  {
    id: 1,
    title: "Venom: The Last Dance",
    imgUrl:
      "https://image.tmdb.org/t/p/original/k42Owka8v91trK1qMYwCQCNwJKr.jpg",
  },
];

function SingleMoviePage() {
  const [videoKey4, setVideoKey4] = useState("__2bjWbetsA"); // Alien
  const [autoplay, setAutoplay] = useState(true);
  const [play, setPlay] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [unmute, setUnmute] = useState(false);
  const [pause, setPause] = useState(false);
  const [reload, setReload] = useState(false);
  const [isAdded, setIsAdded] = useState<Record<number, boolean>>({});
  const [isTrailer, setIsTrailer] = useState(false);
  const [isLiked, setIsLiked] = useState<Record<number, boolean>>({});
  const [singlemovie, setSinglemovie] = useState(true);
  const [isListView, setIsListView] = useState(true);
  const [reviews, setReviews] = useState(true);
  const [value, setValue] = React.useState<number | null>(0);
  const type = "movie";

  const handleValue = (newValue: number | null) => {
    if (newValue !== null) {
      setValue(newValue);
    } else {
      setValue(0);
    }
  };

  // Fetch call to TMDB to get the data I need for cast section, excellent example
  const [cast, setCast] = useState([]);
  const movieId = 580489; // Example movie ID for Venom

  useEffect(() => {
    const fetchCast = async () => {
      const API_KEY = "1fc54b7ab4fb46412074eec75b746280"; // Add your TMDb API key
      const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        const formattedCast = data.cast.map(
          (member: {
            id: any;
            name: any;
            character: any;
            profile_path: any;
          }) => ({
            id: member.id,
            name: member.name,
            character: member.character,
            picture: `https://image.tmdb.org/t/p/w500${member.profile_path}`,
          })
        );
        setCast(formattedCast);
      } catch (error) {
        console.error("Failed to fetch cast:", error);
      }
    };

    fetchCast();
  }, []);

  const handleAdded = (movieId: number) => {
    setIsAdded((prevAdded) => ({
      ...prevAdded,
      [movieId]: !prevAdded[movieId], // Toggle the like state for the specific movie
    }));
  };

  const handleLike = (movieId: number) => {
    setIsLiked((prevLiked) => ({
      ...prevLiked,
      [movieId]: !prevLiked[movieId], // Toggle the like state for the specific movie
    }));
  };

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
    setUnmute(!unmute)
  };

  const handleSetRelaod = () => {
    setReload(!reload)
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
        videoKey={videoKey4}
        setIsLoading={setIsLoading}
        src={
          "https://image.tmdb.org/t/p/original/legcV9yeL4i1HxPMrCn7FCEbrOW.jpg"
        }
        isLoading={isLoading}
        handleUnmute={handleUnmute}
        handlePause={handlePause}
        handleSetRelaod={handleSetRelaod}
      />
      {/* <div className="min-h-screen mb-[50vw] "> */}
      <div className="min-h-screen mb-[110vw] ">
        <div
          // className={`flex justify-center w-full mt-[-6vw] z-[50] absolute transition-transform duration-700 ease-in-out ${
          //   play ? "translate-y-[7vw]" : ""
          // }`}
          className={`w-full mt-[-6vw] z-[50] absolute transition-transform duration-700 ease-in-out ${
            play ? "translate-y-[7vw]" : ""
          }`}
        >
          <div className="flex flex-col">
          <MainDetails
              media={movie}
              type={type}
              single={singlemovie}
              handleAdded={handleAdded}
              handleLike={handleLike}
              isAdded={isAdded}
              handlePlay={handlePlay}
              videoKey={videoKey4}
              setIsLoading={setIsLoading}
              handleReload={handleReload}
              handleEnd={handleEnd}
              isListView={isListView}
              value={value}
              handleValue={handleValue}
              isLiked={isLiked}
            />
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
