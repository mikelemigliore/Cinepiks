"use client";
import Container from "@/components/global/Container";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import TeaserCard from "./TeaserCard";
import WatchListOpt from "./WatchListOpt";
import WatchedOpt from "./WatchedOpt";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GoDotFill, GoStarFill } from "react-icons/go";
import { Button } from "../ui/button";
// import {
//   getMovieCertification,
//   getMovieDetails,
//   getSeriesDetails,
// } from "@/app/pages/api/loginPage";
import {
  useGetDetailsTeaserCardQuery,
  useGetMovieCertificationQuery,
} from "@/app/features/homepage/movies/moviedetailsSlice";

import { useGetSeriesDetailsTeaserCardQuery } from "@/app/features/homepage/series/seriesSlice";

interface MovieCardProps {
  imgUrl: string;
  title?: string;
  name?: string;
  className?: string; // Optional className prop
  isPartialSlide?: boolean; // Optional prop to indicate if it's a partial slide
  isLastThreeSlides?: boolean;
  isLastOne?: boolean;
  list?: boolean;
  single?: boolean;
  type?: string; // Define possible values
  watchlist?: boolean;
  watched?: boolean;
  logInPage?: boolean;
  imgBackdrop?: string;
  genre?: number[];
  itemsGenres?: Array<{
    id: number;
    name: string;
  }>;
  id: number;
  mediaType?: string;
}

interface Genre {
  id: number;
  name: string;
}

function MovieCard({
  imgUrl,
  imgBackdrop,
  title,
  isPartialSlide,
  isLastThreeSlides,
  isLastOne,
  list,
  single,
  type,
  watchlist,
  watched,
  logInPage,
  genre,
  itemsGenres,
  id,
  name,
}: MovieCardProps) {
  const [runtime, setRuntime] = useState();
  const [season, setSeasons] = useState();
  const [description, setDescription] = useState();
  const [certification, setCertification] = useState();
  const [genres, setGenres] = useState<Genre[]>([]); // Explicit type for genres
  const [expandCard, setExpandCard] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false); // Track if the view is desktop
  const [watchlistOptions, setWatchlistOptions] = useState(false); // Track if the view is desktop
  const [watchedOptions, setWatchedOptions] = useState(false); // Track if the view is desktop
  const hoveredRef = useRef(false);
  //console.log(type);

  const href = type === "movie" ? `/singlemovie` : `/singleseries`;

  const mediaType = type === "movie" ? "movie" : "tv";

  const { data: movieDetails } = useGetDetailsTeaserCardQuery({
    id,
    media: mediaType,
  });

  const { data: movieCertification } = useGetMovieCertificationQuery(id || 0);

  const { data: seriesDetails } = useGetSeriesDetailsTeaserCardQuery({
    id,
    media: mediaType,
  });

  //const { data: movieTrailer } = useGetMovieTrailerQuery(Id || 0);

  //const { data: movieCast } = useGetMovieCastQuery(Id || 0);

  useEffect(() => {
    if (mediaType === "movie") {
      if (movieDetails) {
        setRuntime(movieDetails.runtime);
        setGenres(movieDetails.genres);
        setDescription(movieDetails.overview);
      }

      if (movieCertification) {
        setCertification(movieCertification);
      }
    } else if (mediaType === "tv") {
      if (seriesDetails) {
        setSeasons(seriesDetails.number_of_seasons);
        setGenres(seriesDetails.genres);
        setDescription(seriesDetails.overview);
      }
    }
  }, [movieDetails, seriesDetails]);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768); // Set true for desktop view
    };

    handleResize(); // Check the initial screen size

    // Add event listener to update on window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = () => {
    if (isDesktop && !list && !single && !watchlist && !watched) {
      //setShowContent(true);
      hoveredRef.current = true;
      setTimeout(() => {
        if (hoveredRef.current) setExpandCard(true);
      }, 1500);
    } else if (isDesktop && !list && !single && watchlist) {
      setWatchlistOptions(true);
    } else if (isDesktop && !list && !single && !watchlist && watched) {
      setWatchedOptions(true);
    }
  };

  const handleMouseLeave = () => {
    if (isDesktop) {
      //setShowContent(false);
      hoveredRef.current = false;
      setExpandCard(false);
      setWatchlistOptions(false);
      setWatchedOptions(false);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    // Prevent navigation if the card is expanded or a button is clicked
    if (expandCard) {
      e.preventDefault();
    }
    //window.location.href = `${href}/${id}`; // Force page reload when traveling to singlepage, it works but too many reloads
  };

  const formatRuntime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60); // Get the hours
    const remainingMinutes = minutes % 60; // Get the remaining minutes
    return `${hours}h ${remainingMinutes}m`;
  };

  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";

  // const handleReload = () => {
  //   window.location.href = `${href}/${id}`; // Force page reload
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const mediaType = type === "movie" ? "movie" : "tv";

  //       if (mediaType === "movie") {
  //         const response = await getMovieDetails(id, mediaType);
  //         const data = await response.json();
  //         const responseCetification = await getMovieCertification(
  //           id,
  //           mediaType
  //         );
  //         const dataCertification = await responseCetification.json();

  //         // Find the US release dates and certification
  //         const usRelease = dataCertification.results.find(
  //           (item: any) => item.iso_3166_1 === "US"
  //         );

  //         //console.log(data.genres);

  //         //console.log(data);
  //         //console.log(data.runtime);
  //         setRuntime(data.runtime);
  //         setGenres(data.genres);
  //         setDescription(data.overview);

  //         if (usRelease) {
  //           const usCertification =
  //             usRelease.release_dates[0].certification || "Not Rated";
  //           setCertification(usCertification);
  //         }
  //       } else {
  //         const response = await getSeriesDetails(id, mediaType);
  //         const data = await response.json();

  //         //console.log(data.genres);

  //         //console.log(data);
  //         //console.log(data.number_of_seasons);

  //         setSeasons(data.number_of_seasons);
  //         setGenres(data.genres);
  //         setDescription(data.overview);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching carousel items:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <Container
        className={`flex justify-center items-center transition-opacity duration-700 ease-in-out ${
          isPartialSlide ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        {logInPage ? (
          <Dialog>
            <DialogTrigger className="focus:outline-none">
              <div className="flex flex-col justify-start items-start">
                <img
                  src={`${BASE_IMAGE_URL}${imgUrl}`}
                  className="w-[46vw] md:w-[12.6vw] md:rounded-2xl rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
                />
                <h1 className="md:pt-[1vw] pt-[2vw] pl-[0.5vw] md:text-[0.8vw] text-[3.5vw] font-semibold overflow-hidden overflow-ellipsis line-clamp-1">
                  {title}
                </h1>
              </div>
            </DialogTrigger>
            <DialogContent className="w-[93vw] md:w-[35vw] md:h-[33vw] h-[118vw] bg-customColorCard rounded-3xl">
              <img
                className="w-full rounded-3xl"
                src={`${BASE_IMAGE_URL}${imgBackdrop}`}
              />
              <div
                className={`z-[10] absolute inset-0 bg-gradient-to-t from-customColorCard to-transparent w-full md:h-[15vw] h-[60vw] md:mt-[5vw]`}
              />
              <div
                className={`z-[10] absolute inset-0 bg-gradient-to-t from-customColorCard to-transparent w-full md:h-[15vw] h-[60vw] md:mt-[5vw]`}
              />

              <div className="md:ml-[1.5vw] ml-[4vw] md:mt-[-1.5vw] mt-[-9vw]">
                <div className="flex justify-between relative z-[100]">
                  <div>
                    <div className="flex mt-[1vh]">
                      <div className="md:text-[1.3vw] text-[5vw] line-clamp-1">
                        {title}
                      </div>
                    </div>
                    <div className="md:text-[0.8vw] text-[3vw] text-customTextColor flex">
                      <span>{genres[0]?.name || ""}</span>
                      <GoDotFill className="bg-customTextColor w-1.5 h-1.5 md:mx-[0.4vw] mx-[2vw] rounded-full md:mt-[0.5vw] mt-[1.5vw]" />
                      <span>{genres[1]?.name || ""}</span>
                      {genres[2]?.name ? (
                        <GoDotFill className="bg-customTextColor w-1.5 h-1.5 md:mx-[0.4vw] mx-[2vw] rounded-full md:mt-[0.5vw] mt-[1.5vw]" />
                      ) : (
                        <div></div>
                      )}
                      <span className="md:pr-[0.6vw] pr-[2vw]">
                        {genres[2]?.name || ""}
                      </span>
                      <span className="md:mx-[0.6vw] mx-[2vw] text-customTextColor font-bold">
                        {certification}
                      </span>
                      <span>
                        {runtime !== undefined ? formatRuntime(runtime) : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                <ScrollArea className="md:h-[5.5vw] h-[36vw] md:mr-[1vw] md:mt-[1vw] mt-[3vw]">
                  <div className=" text-white text-[3.7vw] md:text-[0.9vw] text-start max-w-[22rem] md:max-w-[65vw] leading-[2] md:leading-[1.5]">
                    {description}
                  </div>
                </ScrollArea>
                <div className="flex justify-end md:mt-[1.5vw] mt-[5vw] md:mr-[1vw] mr-[6vw] md:space-x-[0.5vw] space-x-[6vw]">
                  <Link
                    href="/homepage"
                    className="flex justify-center items-center active:scale-95 md:w-[9vw] w-[40vw] md:h-[4.5vh] h-[6vh] rounded-full text-sm md:text-[0.8vw] text-[3.5vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-slate-300 hover:bg-opacity-20"
                  >
                    Continue As Guest
                  </Link>
                  <Link
                    href="/singup"
                    className="flex justify-center items-center active:scale-95 md:w-[6vw] w-[40vw] md:h-[4.5vh] h-[6vh] rounded-full text-sm md:text-[0.8vw] text-[3.5vw] bg-white/70 hover:bg-white/90 text-black font-bold"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          <Link href={`${href}/${id}`} passHref>
            {/* <div className="hover:cursor-pointer"> */}
            <div
              className="relative"
              onClick={handleClick} // Handle click event for conditional navigation
            >
              {/* Poster Image */}
              {list ? (
                <img
                  src={`${BASE_IMAGE_URL}${imgUrl}`}
                  className={`w-[50vw] md:w-[14vw] md:rounded-2xl rounded-2xl shadow-lg transition-opacity duration-500 ease-in-out`}
                />
              ) : watchlist ? (
                <WatchListOpt
                  src={`${BASE_IMAGE_URL}${imgUrl}`}
                  watchlistOptions={watchlistOptions}
                  mediaType={mediaType}
                  id={id}
                />
              ) : watched ? (
                <WatchedOpt
                  src={`${BASE_IMAGE_URL}${imgUrl}`}
                  watchedOptions={watchedOptions}
                  mediaType={mediaType}
                  //type={type}
                  id={id}
                />
              ) : single ? (
                <img
                  src={`${BASE_IMAGE_URL}${imgUrl}`}
                  className={`w-[52vw] md:w-[16.8vw] md:rounded-2xl rounded-2xl shadow-lg transition-opacity duration-500 ease-in-out ${
                    watchlistOptions ? "opacity-25" : ""
                  }`}
                />
              ) : (
                <img
                  src={`${BASE_IMAGE_URL}${imgUrl}`}
                  className={`w-[46vw] md:w-[12.6vw] md:rounded-2xl rounded-2xl shadow-lg transition-opacity duration-500 ease-in-out ${
                    expandCard ? "opacity-0" : "opacity-100"
                  }`}
                />
              )}
              <div>
                <div
                  className={`absolute inset-0 md:w-[16.5rem] transition-all duration-500 ease-in-out transform ${
                    expandCard
                      ? "opacity-100 z-10 cursor-default"
                      : "opacity-0 z-0"
                  }`}
                >
                  <TeaserCard
                    type={type}
                    href={href}
                    title={title}
                    name={name}
                    imgUrl={imgUrl}
                    imgBackdrop={imgBackdrop}
                    genres={genres}
                    runtime={runtime}
                    season={season}
                    isLastThreeSlides={isLastThreeSlides}
                    isLastOne={isLastOne}
                    expandCard={expandCard}
                    //showContent={showContent}
                    isDesktop={isDesktop}
                    id={id}
                  />
                </div>
              </div>
            </div>
            <h1 className="md:w-[12vw] w-[40vw] pt-4 md:text-[0.8vw] text-[3.5vw] font-semibold overflow-hidden overflow-ellipsis line-clamp-1">
              {title || name}
            </h1>

            {/* </div> */}
          </Link>
        )}
      </Container>
    </div>
  );
}

export default MovieCard;
