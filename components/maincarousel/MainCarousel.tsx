import React, { useState, useCallback, useEffect } from "react";
import YoutubePlayerMainCaroisel from "./YoutubePlayerMainCaroisel";
import { GoMute, GoUnmute } from "react-icons/go";
import { CiPlay1, CiPause1 } from "react-icons/ci";
import { IoCheckmark, IoReloadSharp } from "react-icons/io5";
import { MdOutlineReplay } from "react-icons/md";

// Import the necessary components
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { SlArrowRight } from "react-icons/sl";
import { LuPlus } from "react-icons/lu";
import Link from "next/link";
import handleWatchlistBtn from "@/utils/handleWatchlistBtn";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/features/store";
import MainCarouseulitem from "./MainCarouseulitem";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton from Shadcn/UI

interface MediaProp {
  id: number;
  //image: string;
  title: string;
  name?: string;
  poster_path: string;
  showType: string;
  backdrop_path: string;
  genre_ids: number[];
  videoKey?: string;
  release_date?: string;
  overview?: string;
}

interface Props {
  //tmdbId?:number[];
  //image?: string[];
  medias: MediaProp[];
  //mediaRapid?: MediaRapid[];
  title?: string;
  logInPage?: boolean;
  itemsGenres?: Array<{
    id: number;
    name: string;
  }>;
  mediaType: string;
  inTheatersLoading: boolean;
  //getGenreNames: () => void;
}

function MainCarousel({
  medias = [],
  title,
  logInPage,
  itemsGenres = [],
  mediaType,
  inTheatersLoading,
}: //image = [],
//tmdbId = []
// mediaRapid = [],
Props) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false); // Track if the view is desktop

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

  const totalSlides = 10; // Set the total number of slides
  const [isTransitioning, setIsTransitioning] = useState(false); // Debounce transition

  // Handle the next slide action
  //These functions are wrapped with useCallback to ensure they are only re-created if totalSlides changes.
  //This can help with performance optimization
  // Handle the next slide action
  const handleNext = useCallback(() => {
    if (isTransitioning) return; // Debounce next transition
    setIsTransitioning(true); // Set transition state

    setActiveSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 500); // Reset after 500ms (matches transition duration)
  }, [totalSlides, isTransitioning]);

  // Handle the previous slide action
  const handlePrev = useCallback(() => {
    if (isTransitioning) return; // Debounce previous transition
    setIsTransitioning(true);

    setActiveSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 500); // Reset after 500ms
  }, [totalSlides, isTransitioning]);

  // useEffect(() => {
  //   console.log("Current activeSlide:", activeSlide);
  // }, [activeSlide]);

  const formatDate = (date: string | undefined) => {
    if (date) {
      const [year, month, day] = date.split("-");
      const formattedDate = `${month}/${day}/${year}`;
      return formattedDate;
    } else {
      return "Not Available";
    }
  };

  // const handleAdded = async (index: number) => {
  //   handleWatchlistBtn(dispatch, setIsAdded, isAdded[index], medias[index].id);
  // };

  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";

  return (
    <div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-customColor h-[5vh] top-[53.1vh] z-20 md:h-[15vh] md:top-[90vh] md:z-40" />
      {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-customColor h-[2rem] top-[19rem] z-10 md:h-[10rem] md:top-[53.5rem] md:z-30" /> */}
      {/* // In the MainCarousel component, we pass the activeSlide, setActiveSlide, and totalSlides to the Carousel. This allows the Carousel component 
      to use and modify the state (activeSlide) that tracks which slide is currently active. 
      This link ensures that when the carousel scrolls, the dots and the slides are in sync */}
      {inTheatersLoading ? (
        // Skeleton Loading State
        <div className="relative w-full h-screen flex justify-center items-center rounded-2xl">
          <Skeleton className="md:w-[10vw] md:h-[4vh] w-[40vw] h-[3vh] bg-backgroundButton rounded-2xl ml-[4vw] md:ml-[0vw] absolute top-[37vh] md:top-[30vh] left-[5%] md:left-[4%]" />
          <Skeleton className="md:w-[20vw] md:h-[6vh] w-[30vw] h-[4vh] bg-backgroundButton rounded-2xl ml-[4vw] md:ml-[0vw] absolute top-[41vh] md:top-[35vh] left-[5%] md:left-[4%]" />
          <Skeleton
            className={`${
              isDesktop
                ? `w-[35vw] h-[15vh] bg-backgroundButton rounded-2xl ml-[4vw] md:ml-[0vw] absolute top-[41vh] md:top-[42vh] left-[5%] md:left-[4%]`
                : ``
            }`}
          />
          <div className="ml-[4vw] md:ml-[0vw] absolute top-[47vh] md:top-[58vh] left-[5%] md:left-[4%] z-50 flex justify-center md:flex-row">
            <div className="mb-4 md:mb-0">
              <Skeleton className="h-[6vh] w-[30vw] bg-backgroundButton max-w-[10rem] md:w-[8vw] md:h-[6vh] max-w-[15rem] rounded-full mr-3" />
            </div>
            <div>
              <Skeleton
                className={`h-[6vh] w-[35vw] bg-backgroundButton max-w-[10rem] md:w-[8vw] md:h-[6vh] max-w-[15rem] rounded-full`}
              />
            </div>
          </div>
          <div>
            <Skeleton className="md:w-[20vw] md:h-[6vh] w-[60vw] h-[4vh] absolute bg-backgroundButton bottom-[40vh] md:bottom-[15vh] left-1/2 transform -translate-x-1/2 z-50 flex space-x-2 rounded-2xl" />
          </div>
        </div>
      ) : (
        <Carousel
          activeSlide={activeSlide} //activeSlide: Keeps track of which slide is currently shown
          setActiveSlide={setActiveSlide} //setActiveSlide: Allows the carousel to update the active slide state
          totalSlides={totalSlides} //Provides the number of slides in the carousel.
        >
          <CarouselContent>
            {medias.slice(0, 10).map((media, index) => (
              <CarouselItem 
              key={media.id}
              className="relative w-full h-screen flex justify-center items-center px-0 md:px-0">
                {/* Background Image as an absolutely positioned div */}
                <div>
                  <MainCarouseulitem
                    //watchlistdb={watchlistdb}
                    media={media} // Passing the entire media object
                    index={index}
                    activeSlide={activeSlide}
                    setActiveSlide={setActiveSlide}
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    isDesktop={isDesktop}
                    formatDate={formatDate}
                    mediaType={mediaType}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Position the dots at the bottom center of the carousel */}

          <div className="absolute bottom-[40vh] md:bottom-[17vh] left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <div
                key={index}
                className={`h-[1vh] md:h-[1.5vh] rounded-full transition-all duration-300 ${
                  index === activeSlide
                    ? "w-[5vw] md:w-[4vw] bg-white"
                    : "w-[2vw] md:w-[0.75vw] bg-gray-500"
                }`}
              />
            ))}
            <CarouselPrevious
              className=" mx-[4vw] !bg-transparent hover:text-white text-white/70 border-none z-50 md:w-[2vw] w-[6vw]"
              onClick={handlePrev}
            />
            <CarouselNext
              className=" mx-[4vw] !bg-transparent hover:text-white text-white/70 border-none z-50 md:w-[2vw] w-[6vw]"
              onClick={handleNext}
            />
          </div>
        </Carousel>
      )}
    </div>
  );
}

export default MainCarousel;
