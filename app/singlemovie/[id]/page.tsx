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
import TagsHighToLow from "@/components/tags/TagsHighToLow";
import {
  useGetMovieDetailsQuery,
  useGetMovieTrailerQuery,
  useGetMovieCastQuery,
} from "@/app/features/homepage/movies/moviedetailsSlice";

type FilterKey = "all" | "buy" | "rent" | "subscription";

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

  const toggleFilter = (filter: FilterKey) => {
    setSelectedFilters((prev) => ({
      all: filter === "all",
      buy: filter === "buy",
      rent: filter === "rent",
      subscription: filter === "subscription",
    }));
  };

  const params = useParams();
  const searchParams = useSearchParams();
  const mediaType = searchParams.get("mediaType");
  const { id } = params;
  const Id = Number(id);

  const { data: movieDetails, isLoading: isMovieLoading } =
    useGetMovieDetailsQuery(Id || 0);

  const { data: movieTrailer } = useGetMovieTrailerQuery(Id || 0);

  const { data: movieCast } = useGetMovieCastQuery(Id || 0);

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
    setIsLoading(false);
    setPause(!pause);
  };

  const handlePause = () => {
    setPlay(false);
  };

  const handleEnd = () => {
    setPlay(false);
  };

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
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "_");
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
          missingSection ? `md:mb-[85vw]` : `md:mb-[105vw]`
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
              isLoading={isMovieLoading}
            />
            <div className="flex md:flex-row flex-col  md:gap-[4vw] gap-[5vh] md:mt-[3vw] md:h-[22vw] w-full justify-center md:ml-[1vw] ml-[2vw]">
              <div className=" md:h-[2vw] md:mt-[0vh] mt-[6vh]">
                <div className="md:text-[1vw] text-[5vw]">How To Watch</div>
                <div className="mb-[2vh] mt-[1vh]">
                  <TagsHowToWatch
                    selectedFilters={selectedFilters}
                    toggleFilter={toggleFilter}
                  />
                </div>
                <div className="md:w-full w-[96vw] bg-customColorCard rounded-2xl p-2 md:mr-[-1vw]">
                  <HowToWatchCard
                    id={Id}
                    selectedFilters={selectedFilters}
                    type={type}
                  />
                </div>
              </div>
              <div className="md:h-[2vw]">
                <div className="md:text-[1vw] text-[5vw]">Reviews</div>
                <div className="my-[1vh] mb-[2vh]">
                  <TagsHighToLow
                    hightolow={hightolow}
                    lowtohigh={lowtohigh}
                    handleHightolow={handleHightolow}
                    handleLowtohigh={handleLowtohigh}
                  />
                </div>
                <div className="md:w-full w-[96vw] md:h-[22.5vw] h-[114vw] bg-customColorCard rounded-2xl p-2 md:mr-[-1vw]">
                  <Reviews
                    id={Id}
                    hightolow={hightolow}
                    lowtohigh={lowtohigh}
                    type={type}
                  />
                </div>
              </div>
            </div>
            <div className="md:h-[6vw] md:mt-[10vw] h-[50vh] mt-[20vw] bg-buttonColor md:rounded-[1vw] rounded-2xl max-w-[75vw] md:ml-[13vw] ml-[3vw]">
              <div className="md:text-[1vw] text-[5vw] md:mt-[-2vw] mt-[-8vw]">
                More Info
              </div>
              <MoreInfo id={Id} type={type} />
            </div>
            <div className="md:mt-[4vw] mt-[6vw] max-w-[75vw] ml-[13vw]">
              <CastSwiper cast={cast} />
            </div>
            <div className="max-w-[75vw] ml-[14vw] h-[0.1vh] mt-[4vh] bg-white/20"></div>
            <div className="mt-[6vw]">
              <MoreLikeThisSwiper id={Id} mediaType={"movie"} />
            </div>
            <div>
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
