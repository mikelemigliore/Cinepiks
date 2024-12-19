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

interface MediaProp{
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
  //getGenreNames: () => void;
}

function MainCarousel({
  medias = [],
  title,
  logInPage,
  itemsGenres = [],
}: //image = [],
//tmdbId = []
// mediaRapid = [],
Props) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isCarouselPlaying, setIsCarouselPlaying] = useState(true);
  //const [videoKey, setVideoKey] = useState<string[]>([]);
  const [unmute, setUnmute] = useState(false);
  const [pause, setPause] = useState(false);
  const [reload, setReload] = useState(false);
  const [started, setStarted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false); // Track if the view is desktop
  const [isAdded, setIsAdded] = useState(false);

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

  const handleStarted = () => {
    setStarted(true);
  };

  // Handle when video starts playing
  const handleReload = () => {
    setReload(false);
    setPause(false);
  };

  // Handle when video starts playing
  const handleVideoEnd = () => {
    setIsCarouselPlaying(false); // Set the video to start playing
    setUnmute(false);
    setStarted(false);
  };

  const handleAdded = (added: boolean) => {
    setIsAdded((prevAdded) => !prevAdded);
  };

  // Ensure video restarts when slide changes (for both next and prev)
  useEffect(() => {
    // Stop the current video immediately on slide change
    setIsCarouselPlaying(false);
    //Re-set the mute buttom to false when traveling in the slides
    setUnmute(false);
    setPause(false);
    setStarted(false);

    // Short delay to ensure the slide transition is complete before starting the video
    const videoRestartTimeout = setTimeout(() => {
      setIsCarouselPlaying(true); // Start the video after the transition
    }, 2000); // Adjust the delay as needed, you may try smaller delays like 500ms

    // Clean up the timeout when component unmounts or when activeSlide changes
    return () => clearTimeout(videoRestartTimeout);
  }, [activeSlide]);

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

  useEffect(() => {
    console.log("Current activeSlide:", activeSlide);
  }, [activeSlide]);

  useEffect(() => {
    // Only run this effect when isCarouselPlaying becomes false (after video ends)
    if (!isCarouselPlaying) {
      const timeoutId = setTimeout(() => {
        handleNext(); // Move to the next slide after 5 seconds
      }, 5000); // 5 seconds delay after video ends

      return () => clearTimeout(timeoutId); // Clear timeout if effect runs again or component unmounts
    }
  }, [isCarouselPlaying, handleNext]); // Depend on isCarouselPlaying and handleNext

  const formatDate = (date: string | undefined) => {
    if (date) {
      const [year, month, day] = date.split("-");
      const formattedDate = `${month}/${day}/${year}`;
      return formattedDate;
    } else {
      return "Not Available";
    }
  };

  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";

  return (
    <div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-customColor h-[5vh] top-[25vh] z-20 md:h-[15vh] md:top-[90vh] md:z-40" />
      {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-customColor h-[2rem] top-[19rem] z-10 md:h-[10rem] md:top-[53.5rem] md:z-30" /> */}
      {/* // In the MainCarousel component, we pass the activeSlide, setActiveSlide, and totalSlides to the Carousel. This allows the Carousel component 
      to use and modify the state (activeSlide) that tracks which slide is currently active. 
      This link ensures that when the carousel scrolls, the dots and the slides are in sync */}
      <Carousel
        activeSlide={activeSlide} //activeSlide: Keeps track of which slide is currently shown
        setActiveSlide={setActiveSlide} //setActiveSlide: Allows the carousel to update the active slide state
        totalSlides={totalSlides} //Provides the number of slides in the carousel.
      >
        <CarouselContent>
          {medias.slice(0, 10).map((media, index) => (
            <CarouselItem className="relative w-full h-screen flex justify-center items-center px-0 md:px-0">
              {/* Background Image as an absolutely positioned div */}
              <div className="absolute inset-0 bg-cover bg-center md:bg-top bg-no-repeat h-[25rem] md:w-screen md:h-screen mt-[4rem] md:mt-0">
                {activeSlide === index && isCarouselPlaying && isDesktop ? (
                  <YoutubePlayerMainCaroisel
                    isCarouselPlaying={isCarouselPlaying}
                    VideoEnd={handleVideoEnd}
                    videoKey={media.videoKey}
                    unmute={unmute}
                    pause={pause}
                    reload={reload}
                    handleReload={handleReload}
                    handleStarted={handleStarted}
                    src={`${BASE_IMAGE_URL}${media.backdrop_path}`}
                    // "https://image.tmdb.org/t/p/original/v2c7jHSvgXj0BYZ10MYUe9ugTHx.jpg"
                    // {`${BASE_IMAGE_URL}${medias[0].backdrop_path}`}
                  />
                ) : (
                  <img
                    src={`${BASE_IMAGE_URL}${media.backdrop_path}`}
                    className="absolute inset-0 bg-cover bg-center md:bg-top bg-no-repeat h-[30vh] md:h-[120vh] w-full"
                  />
                )}
              </div>

              {/* Try and add video here */}

              <div className="absolute inset-y-0 left-0 bg-gradient-to-tr from-customColor to-transparent w-full h-full" />
              {started && (
                <div className="ml-[77vw] mt-[50vh] z-50">
                  <Button
                    onClick={() => setUnmute(!unmute)}
                    className="mr-3 w-[4.5vw] h-[4.5vw] rounded-full border-2 border-white bg-slate-300 bg-transparent hover:bg-slate-300 hover:bg-opacity-5"
                  >
                    {unmute ? (
                      <GoUnmute className="w-[2vw] h-[2vw]" />
                    ) : (
                      <div>
                        <GoMute className="w-[2vw] h-[2vw]" />
                      </div>
                    )}
                  </Button>
                  <Button
                    onClick={() => setPause(!pause)}
                    className="mr-3 w-[4.5vw] h-[4.5vw] rounded-full border-2 border-white bg-slate-300 bg-transparent hover:bg-slate-300 hover:bg-opacity-5"
                  >
                    {pause ? (
                      <CiPlay1 className="w-[2vw] h-[2vw]" />
                    ) : (
                      <div>
                        <CiPause1 className="w-[2vw] h-[2vw]" />
                      </div>
                    )}
                  </Button>
                  <Button
                    onClick={() => setReload(true)}
                    className="w-[4.5vw] h-[4.5vw] rounded-full border-2 border-white bg-slate-300 bg-transparent hover:bg-slate-300 hover:bg-opacity-5"
                  >
                    <MdOutlineReplay className="w-[2vw] h-[2vw]" />
                  </Button>
                </div>
              )}

              <div>
                <h1 className="absolute top-[20vh] md:top-[30vh] left-[5%] md:left-[4%] z-50 text-white font-bold text-sm md:text-lg">
                  Release Date: {formatDate(media.release_date)}
                </h1>
                <h1 className="absolute top-[22vh] md:top-[33vh] left-[5%] md:left-[4%] z-50 text-white text-[3vw] font-semibold overflow-hidden overflow-ellipsis line-clamp-1">
                  {media.title}
                </h1>
                <div className="absolute top-[30vh] md:top-[42vh] left-[5%] md:left-[4%] z-50 max-w-[90%] md:max-w-[35vw] mt-[0.4vw]">
                  <h1 className="hidden text-white text-[1vw] overflow-hidden overflow-ellipsis md:line-clamp-4">
                    {media.overview}
                  </h1>
                </div>

                <div className="absolute top-[30vh] md:top-[57vh] left-[5%] md:left-[4%] z-50 flex justify-center md:flex-row">
                  <div className="mb-4 md:mb-0">
                    <Link href={`/singlemovie/${media.id}`}>
                      <Button className="h-[7vh] w-[25vw] max-w-[10rem] md:w-[8vw] md:h-[6vh] max-w-[15rem] rounded-full mr-3 text-[1vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500">
                        View
                        <SlArrowRight className="w-5 h-5 md:w-5 md:h-5 ml-[2vw]" />
                      </Button>
                    </Link>
                  </div>
                  <div>
                    <Button
                      onClick={() => handleAdded(isAdded)}
                      className={`h-[7vh] w-[25vw] max-w-[10rem] md:w-[8vw] md:h-[6vh] max-w-[15rem] rounded-full text-[1vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500 ${
                        isAdded ? "bg-white/90 text-black" : ""
                      }`}
                    >
                      Watchlist
                      {isAdded ? (
                        <IoCheckmark className="w-5 h-5 md:w-6 md:h-6 ml-[1vw]" />
                      ) : (
                        <LuPlus className="w-5 h-5 md:w-6 md:h-6 ml-[1vw]" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Position the dots at the bottom center of the carousel */}
        <div className="absolute bottom-[20vh] md:bottom-[17vh] left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <div
              key={index}
              className={`h-[1vh] md:h-[1.5vh] rounded-full transition-all duration-300 ${
                index === activeSlide
                  ? "w-[5vw] md:w-[4vw] bg-white"
                  : "w-[1vw] md:w-[0.75vw] bg-gray-500"
              }`}
            />
          ))}
          <CarouselPrevious
            className="hidden md:block mx-[4vw] !bg-transparent hover:text-white text-white/70 border-none z-50 w-[1vw]"
            onClick={handlePrev}
          />
          <CarouselNext
            className="hidden md:block mx-[4vw] !bg-transparent hover:text-white text-white/70 border-none z-50 w-[2vw]"
            onClick={handleNext}
          />
        </div>
      </Carousel>
    </div>
  );
}

export default MainCarousel;
