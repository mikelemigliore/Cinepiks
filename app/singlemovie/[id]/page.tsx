"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import HowToWatchCard from "@/components/cards/HowToWatchCard";
import TagsHowToWatch from "@/components/tags/TagsHowToWatch";
import Reviews from "@/components/reviews/Reviews";
import MoreInfo from "@/components/moreinfo/MoreInfo";
import CastSwiper from "@/components/carousel/CastSwiper";
import MoreLikeThisSwiper from "@/components/carousel/MoreLikeThisSwiper";
import RecommendationSwiper from "@/components/carousel/RecommendationSwiper";
import React from "react";
import SinglePageMainTrailer from "@/components/singlePageComps/SinglePageMainTrailer";
import MainDetails from "@/components/singlePageComps/MainDetails";
import Link from "next/link";
import TagsHighToLow from "@/components/tags/TagsHighToLow";
import {
  useGetMovieDetailsQuery,
  useGetMovieTrailerQuery,
  useGetMovieCastQuery,
} from "@/app/features/homepage/movies/moviedetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/features/store";
import { useRouter } from "next/navigation";

const movie = [
  {
    id: 1,
    title: "Venom: The Last Dance",
    imgUrl:
      "https://image.tmdb.org/t/p/original/k42Owka8v91trK1qMYwCQCNwJKr.jpg",
  },
];

type FilterKey = "all" | "buy" | "rent" | "subscription";
//type SortedKey = "hightolow" | "lowtohigh";

function SingleMoviePage() {
  const [videoKey, setVideoKey] = useState("");
  const [backdrop, setBackdrop] = useState();
  const [title, setTitle] = useState("");
  const [imdbId, setImdbId] = useState("");
  const [cast, setCast] = useState([]);
  const [autoplay, setAutoplay] = useState(true);
  const [play, setPlay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [unmute, setUnmute] = useState(false);
  const [pause, setPause] = useState(false);
  const [reload, setReload] = useState(false);
  const [isTrailer, setIsTrailer] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  //const [reviews, setReviews] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    all: true,
    buy: false,
    rent: false,
    subscription: false,
  });
  const [hightolow, setHightolow] = useState(true);
  const [lowtohigh, setLowtohigh] = useState(false);
  const [missingSection, setMissingSetion] = useState(false);
  const type = "movie";

  //const router = useRouter();

  const toggleFilter = (filter: FilterKey) => {
    setSelectedFilters((prev) => ({
      all: filter === "all",
      buy: filter === "buy", //If filter === "buy", the logic in the toggleFilter function will set buy to true while ensuring all other filters (all, rent, subscription) are set to false
      rent: filter === "rent",
      subscription: filter === "subscription",
    }));
  };

  const params = useParams();
  const searchParams = useSearchParams();
  const mediaType = searchParams.get("mediaType");
  const { id } = params;
  const Id = Number(id);

  // console.log("ID:", Id);
  // console.log("Media Type:", mediaType);

  const { data: movieDetails } = useGetMovieDetailsQuery(Id || 0);

  const { data: movieTrailer } = useGetMovieTrailerQuery(Id || 0);

  const { data: movieCast } = useGetMovieCastQuery(Id || 0);

  // useEffect(() => {
  //   router.refresh(); // Forces a full page reload
  // }, []);

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }
  }, []);

  useEffect(() => {
    if (movieDetails) {
      setBackdrop(movieDetails.backdrop_path);
      setTitle(movieDetails.title);
      setImdbId(movieDetails.imdb_id || null);
    }

    if (movieTrailer) {
      setVideoKey(movieTrailer.key);
    }

    if (movieCast) {
      setCast(movieCast);
    }
  }, [Id, movieDetails, movieTrailer, movieCast]);



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

  const handleHightolow = () => {
    setHightolow(true);
    setLowtohigh(false);
  };

  const handleLowtohigh = () => {
    setLowtohigh(true);
    setHightolow(false);
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
        isDesktop={isDesktop}
      />
      <div
        className={`min-h-screen ${
          missingSection ? `mb-[85vw]` : `mb-[105vw]`
        }`}
      >
        <div
          className={`w-full mt-[-6vw] z-[50] ${
            isDesktop ? `absolute` : ``
          } transition-transform duration-700 ease-in-out ${
            play ? "translate-y-[7vw]" : ""
          }`}
        >
          <div className="flex flex-col">
            <MainDetails
              id={Id}
              media={movie}
              type={type}
              title={title}
              imdbId={imdbId}
              cast={cast}
              handlePlay={handlePlay}
              videoKey={videoKey}
              setIsLoading={setIsLoading}
              handleReload={handleReload}
              handleEnd={handleEnd}
              isDesktop={isDesktop}
            />
            <div className="flex md:flex-row flex-col  md:gap-[4vw] gap-[5vh] md:mt-[3vw] md:h-[22vw] w-full justify-center md:ml-[1vw] ml-[3vw]">
              <div className=" md:h-[2vw] md:mt-[0vh] mt-[6vh]">
                <div className="md:text-[1vw] text-[4vw]">How To Watch</div>
                <div className="mb-[2vh] mt-[1vh]">
                  <TagsHowToWatch
                    selectedFilters={selectedFilters}
                    toggleFilter={toggleFilter}
                  />
                </div>
                <div className="w-full">
                  <HowToWatchCard
                    id={Id}
                    selectedFilters={selectedFilters}
                    type={type}
                  />
                </div>
              </div>
              <div className="md:h-[2vw]">
                <div className="md:text-[1vw] text-[4vw]">Reviews</div>
                <div className="my-[1vh] mb-[2vh]">
                  <TagsHighToLow
                    hightolow={hightolow}
                    lowtohigh={lowtohigh}
                    handleHightolow={handleHightolow}
                    handleLowtohigh={handleLowtohigh}
                  />
                </div>
                <div className="w-full md:h-[22vw] h-[110vw]">
                  <Reviews
                    id={Id}
                    hightolow={hightolow}
                    lowtohigh={lowtohigh}
                    type={type}
                  />
                </div>
              </div>
            </div>
            <div className="h-[6vw] mt-[10vw] bg-buttonColor rounded-[1vw] max-w-[75vw] ml-[13vw]">
              <div className="text-[1vw] mt-[-2vw]">More Info</div>
              <MoreInfo id={Id} type={type} />
            </div>
            {/* <div className="mt-[6vw] max-w-[50vw]"> */}
            <div className="mt-[4vw] max-w-[75vw] ml-[13vw]">
              <CastSwiper cast={cast} />
            </div>
            {/* Divider line */}
            <div className="max-w-[75vw] ml-[14vw] h-[0.1vh] mt-[4vh] bg-white/20"></div>
            <div className="mt-[6vw]">
              {/* mx-auto max-w-full */}
              <MoreLikeThisSwiper
                //collection={wholeCollection}
                id={Id}
                mediaType={"movie"}
              />
            </div>
            <div>
              {/* mx-auto max-w-full */}
              <RecommendationSwiper
                id={Id}
                mediaType={"movie"}
                setMissingSetion={setMissingSetion}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleMoviePage;
