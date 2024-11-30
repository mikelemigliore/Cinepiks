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
import {
  getMovieCertification,
  getMovieDetails,
} from "@/app/pages/api/loginPage";

interface MovieCardProps {
  imgUrl: string;
  title?: string;
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
  genre: number[];
  itemsGenres: Array<{
    id: number;
    name: string;
  }>;
  id: number;

  //getGenreNames: () => void;
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
}: //getGenreNames,
MovieCardProps) {
  const [runtime, setRuntime] = useState();
  const [description, setDescription] = useState();
  const [certification, setCertification] = useState();
  const [genres, setGenres] = useState<Genre[]>([]); // Explicit type for genres
  const [expandCard, setExpandCard] = useState(false);
  //const [showContent, setShowContent] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false); // Track if the view is desktop
  const [watchlistOptions, setWatchlistOptions] = useState(false); // Track if the view is desktop
  const [watchedOptions, setWatchedOptions] = useState(false); // Track if the view is desktop
  //const [hovered, setHovered] = useState(false);
  const hoveredRef = useRef(false);
  //const [activeCard, setActiveCard] = useState<string | null>(null); // Track active card

  // const handleActiveCard = () =>{
  //   setActiveCard(true)
  // }
  const href = type === "movie" ? `/singlemovie` : `/singleseries`;

  // const getGenreNames = (genreId: number, Genres: any[]) => {
  //   const genre = Genres.find((g) => g.id === genreId); //The find() method searches the Genres array for an element matching the given condition (g.id === genreId).

  //   return genre ? genre.name : "Unknown Genre";
  //   //Without the check, the code assumes that find() will always return an object. When it doesn't (i.e.,
  //   //the genreId isn't found in Genres), the code tries to access undefined.name.
  //   //This results in the TypeError: Cannot read properties of undefined (reading 'name').
  // };

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
  };

  const formatRuntime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60); // Get the hours
    const remainingMinutes = minutes % 60; // Get the remaining minutes
    return `${hours}h ${remainingMinutes}m`;
  };

  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMovieDetails(id);
        const responseCetification = await getMovieCertification(id);
        const dataCertification = await responseCetification.json();
        const data = await response.json();

        // Find the US release dates and certification
        const usRelease = dataCertification.results.find(
          (item: any) => item.iso_3166_1 === "US"
        );

        console.log(data);
        setRuntime(data.runtime);
        setGenres(data.genres);
        setDescription(data.overview);

        if (usRelease) {
          const usCertification =
            usRelease.release_dates[0].certification || "Not Rated";
          setCertification(usCertification);
        }
      } catch (error) {
        console.error("Error fetching carousel items:", error);
      }
    };

    fetchData();
  }, []);

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
                  className="w-[30vw] md:w-[12.6vw] md:rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
                />
                <h1 className="pt-[1vw] pl-[0.5vw] text-[0.8vw] font-semibold overflow-hidden overflow-ellipsis line-clamp-1">
                  {title}
                </h1>
              </div>
            </DialogTrigger>
            <DialogContent className=" md:w-[35vw] md:h-[33vw] bg-customColorCard rounded-full">
              <img
                className="w-full rounded-3xl"
                src={`${BASE_IMAGE_URL}${imgBackdrop}`}
              />
              <div
                className={`z-[10] absolute inset-0 bg-gradient-to-t from-customColorCard to-transparent w-full h-[15vw] mt-[5vw]`}
              />
              <div
                className={`z-[10] absolute inset-0 bg-gradient-to-t from-customColorCard to-transparent w-full h-[15vw] mt-[5vw]`}
              />

              <div className="ml-[1.5vw] mt-[-1.5vw]">
                <div className="flex justify-between relative z-[100]">
                  <div>
                    <div className="flex mt-[1vh]">
                      <div className="text-[1.3vw] line-clamp-1">{title}</div>
                    </div>
                    <div className="text-[0.8vw] text-customTextColor flex">
                      <span>{genres[0]?.name || ""}</span>
                      <GoDotFill className="bg-customTextColor w-1.5 h-1.5 mx-[0.4vw] rounded-full mt-[0.5vw]" />
                      <span>{genres[1]?.name || ""}</span>
                      {genres[2]?.name ? (
                        <GoDotFill className="bg-customTextColor w-1.5 h-1.5 mx-[0.4vw] rounded-full mt-[0.5vw]" />
                      ) : (
                        <div></div>
                      )}
                      <span className="pr-[0.6vw]">
                        {genres[2]?.name || ""}
                      </span>
                      <span className="mx-[0.6vw] text-customTextColor font-bold">
                        {certification}
                      </span>
                      <span>
                        {runtime !== undefined ? formatRuntime(runtime) : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                <ScrollArea className="h-[5.5vw] mr-[1vw] mt-[1vw]">
                  <div className=" text-white text-base md:text-[0.9vw] text-start max-w-[23rem] md:max-w-[65vw] leading-[2] md:leading-[1.5]">
                    {description}
                  </div>
                </ScrollArea>
                <div className="flex justify-end mt-[1.5vw] mr-[1vw] space-x-[0.5vw]">
                  <Link
                    href="/homepage"
                    className="flex justify-center items-center active:scale-95 md:w-[9vw] md:h-[4.5vh] rounded-full text-sm md:text-[0.8vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-slate-300 hover:bg-opacity-20"
                  >
                    Continue As Guest
                  </Link>
                  <Link
                    href="/singup"
                    className="flex justify-center items-center active:scale-95 md:w-[6vw] md:h-[4.5vh] rounded-full text-sm md:text-[0.8vw] bg-white/70 hover:bg-white/90 text-black font-bold"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          // <Link href="" passHref>
          //   <div
          //     className="relative"
          //     onClick={handleClick}
          //   >
          //     <img
          //       src={imgUrl}
          //       className={`w-[30vw] md:w-[12.6vw] md:rounded-2xl shadow-lg transition-opacity duration-500 ease-in-out ${
          //         expandCard ? "opacity-0" : "opacity-100"
          //       }`}
          //     />
          //   </div>
          //   <h1 className="pt-4 text-[0.8vw] font-semibold overflow-hidden overflow-ellipsis line-clamp-1">
          //     {title}
          //   </h1>
          // </Link>
          <Link href={href} passHref>
            <div
              className="relative"
              onClick={handleClick} // Handle click event for conditional navigation
              // onMouseEnter={handleMouseEnter}
              // onMouseLeave={handleMouseLeave}
            >
              {/* Poster Image */}
              {list ? (
                <img
                src={`${BASE_IMAGE_URL}${imgUrl}`}
                  className={`w-[30vw] md:w-[14vw] md:rounded-2xl shadow-lg transition-opacity duration-500 ease-in-out`}
                />
              ) : watchlist ? (
                <WatchListOpt
                src={`${BASE_IMAGE_URL}${imgUrl}`}
                  watchlistOptions={watchlistOptions}
                  type={type}
                />
              ) : watched ? (
                <WatchedOpt
                src={`${BASE_IMAGE_URL}${imgUrl}`}
                  watchedOptions={watchedOptions}
                  type={type}
                />
              ) : single ? (
                <img
                src={`${BASE_IMAGE_URL}${imgUrl}`}
                  className={`w-[30vw] md:w-[16.8vw] md:rounded-2xl shadow-lg transition-opacity duration-500 ease-in-out ${
                    watchlistOptions ? "opacity-25" : ""
                  }`}
                />
              ) : (
                <img
                src={`${BASE_IMAGE_URL}${imgUrl}`}
                  className={`w-[30vw] md:w-[12.6vw] md:rounded-2xl shadow-lg transition-opacity duration-500 ease-in-out ${
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
                    imgUrl={imgUrl}
                    isLastThreeSlides={isLastThreeSlides}
                    isLastOne={isLastOne}
                    expandCard={expandCard}
                    //showContent={showContent}
                    isDesktop={isDesktop}
                  />
                </div>
              </div>
            </div>
            <h1 className="pt-4 text-[0.8vw] font-semibold overflow-hidden overflow-ellipsis line-clamp-1">
              {title}
            </h1>
          </Link>
        )}
      </Container>
    </div>
  );
}

export default MovieCard;
