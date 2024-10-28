import React, { useState, useCallback, useEffect } from "react";
import YoutubePlayerMainCaroisel from "./YoutubePlayerMainCaroisel";
import { GoMute, GoUnmute } from "react-icons/go";
import { CiPlay1, CiPause1 } from "react-icons/ci";
import { IoReloadSharp } from "react-icons/io5";
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

function MainCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isCarouselPlaying, setIsCarouselPlaying] = useState(true);
  const [videoKey, setVideoKey] = useState("6ZfuNTqbHE8"); // infinity war
  const [videoKey2, setVideoKey2] = useState("a8Gx8wiNbs8"); // avatar
  const [unmute, setUnmute] = useState(false);
  const [pause, setPause] = useState(false);
  const [reload, setReload] = useState(false);
  const [started, setStarted] = useState(false);
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
  // customColor
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
        <CarouselContent className="transition-transform duration-75">
          <CarouselItem className="relative w-full h-screen flex justify-center items-center px-0 md:px-0">
            {/* Background Image as an absolutely positioned div */}
            <div className="absolute inset-0 bg-cover bg-center md:bg-top bg-no-repeat h-[25rem] md:w-screen md:h-screen mt-[4rem] md:mt-0">
              {activeSlide === 0 && isCarouselPlaying && isDesktop ? (
                <YoutubePlayerMainCaroisel
                  isCarouselPlaying={isCarouselPlaying}
                  VideoEnd={handleVideoEnd}
                  videoKey={videoKey}
                  unmute={unmute}
                  pause={pause}
                  reload={reload}
                  handleReload={handleReload}
                  handleStarted={handleStarted}
                  src={
                    "https://image.tmdb.org/t/p/original/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg"
                  }
                />
              ) : (
                <img
                  src="https://image.tmdb.org/t/p/original/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg"
                  className="absolute inset-0 bg-cover bg-center md:bg-top bg-no-repeat h-[30vh] md:h-[110vh] w-full"
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
                Release Date: 12/09/2024
              </h1>
              <h1 className="absolute top-[22vh] md:top-[33vh] left-[5%] md:left-[4%] z-50 text-white text-[3vw] font-semibold overflow-hidden overflow-ellipsis line-clamp-1">
                Alien: Romulus
              </h1>
              <div className="absolute top-[30vh] md:top-[42vh] left-[5%] md:left-[4%] z-50 max-w-[90%] md:max-w-[35vw]">
                <h1 className="hidden md:block text-white text-[1vw] overflow-hidden overflow-ellipsis md:line-clamp-4">
                  While scavenging the deep ends of a derelict space station, a
                  group of young space colonists come face to face with the most
                  terrifying life form in the universe. While scavenging the
                  deep ends of a derelict space station, a group of young space
                  colonists come face.
                </h1>
              </div>

              <div className="absolute top-[30vh] md:top-[57vh] left-[5%] md:left-[4%] z-50 flex justify-center md:flex-row">
                <div className="mb-4 md:mb-0">
                  <Link href="/singlemovie">
                    <Button className="h-[7vh] w-[25vw] max-w-[10rem] md:w-[8vw] md:h-[6vh] max-w-[15rem] rounded-full mr-3 text-[1vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500">
                      View
                      <SlArrowRight className="w-5 h-5 md:w-5 md:h-5 ml-[2vw]" />
                    </Button>
                  </Link>
                </div>
                <div>
                  <Link href="/watchlist">
                    <Button className="h-[7vh] w-[25vw] max-w-[10rem] md:w-[8vw] md:h-[6vh] max-w-[15rem] rounded-full text-[1vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500">
                      Watchlist
                      <LuPlus className="w-5 h-5 md:w-6 md:h-6 ml-[1vw]" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="relative w-full h-screen flex justify-center items-center px-0 md:px-0">
            {/* Background Image as an absolutely positioned div */}
            <div className="absolute inset-0 bg-cover bg-center md:bg-top bg-no-repeat h-[25rem] md:w-screen md:h-screen mt-[4rem] md:mt-0">
              {activeSlide === 1 && isCarouselPlaying && isDesktop ? (
                <YoutubePlayerMainCaroisel
                  isCarouselPlaying={isCarouselPlaying}
                  VideoEnd={handleVideoEnd}
                  videoKey={videoKey2}
                  unmute={unmute}
                  pause={pause}
                  reload={reload}
                  handleReload={handleReload}
                  handleStarted={handleStarted}
                  src={
                    "https://image.tmdb.org/t/p/original/f8JTWmelQEDUqujwCeVeS7Jn10b.jpg"
                  }
                />
              ) : (
                <img
                  src="https://image.tmdb.org/t/p/original/f8JTWmelQEDUqujwCeVeS7Jn10b.jpg"
                  className="absolute inset-0 bg-cover bg-center md:bg-top bg-no-repeat h-[30vh] md:h-[110vh] w-full"
                />
              )}
            </div>

            {/* Try and add video here */}

            <div className="absolute inset-y-0 left-0 bg-gradient-to-tr from-customColor to-transparent w-full h-full" />
            {started && (
              <div className="ml-[77vw] mt-[50vh] z-50">
                <Button
                  onClick={() => setUnmute(!unmute)}
                  className="mr-3 w-[10vw] h-[10vw] max-w-[5rem] max-h-[5rem] rounded-full border-2 border-white bg-slate-300 bg-transparent hover:bg-slate-300 hover:bg-opacity-5"
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
                  className="mr-3 w-[10vw] h-[10vw] max-w-[5rem] max-h-[5rem] rounded-full border-2 border-white bg-slate-300 bg-transparent hover:bg-slate-300 hover:bg-opacity-5"
                >
                  {pause ? (
                    <CiPlay1 className="w-[2vw] h-[2vw] max-w-8 max-h-8" />
                  ) : (
                    <div>
                      <CiPause1 className="w-[2vw] h-[2vw] max-w-8 max-h-8" />
                    </div>
                  )}
                </Button>
                <Button
                  onClick={() => setReload(true)}
                  className="w-[10vw] h-[10vw] max-w-[5rem] max-h-[5rem] rounded-full border-2 border-white bg-slate-300 bg-transparent hover:bg-slate-300 hover:bg-opacity-5"
                >
                  <MdOutlineReplay className="w-[2vw] h-[2vw] max-w-9 max-h-9" />
                </Button>
              </div>
            )}

            <div>
              <h1 className="absolute top-[20vh] md:top-[30vh] left-[5%] md:left-[4%] z-50 text-white font-bold text-[1vw]">
                Release Date: 12/09/2024
              </h1>
              <h1 className="absolute top-[22vh] md:top-[33vh] left-[5%] md:left-[4%] z-50 text-white text-[3vw] font-semibold overflow-hidden overflow-ellipsis line-clamp-1">
                Alien: Romulus
              </h1>
              <div className="absolute top-[30vh] md:top-[42vh] left-[5%] md:left-[4%] z-50 max-w-[90%] md:max-w-[35vw]">
                <h1 className="hidden md:block text-white text-[1vw] overflow-hidden overflow-ellipsis md:line-clamp-4">
                  While scavenging the deep ends of a derelict space station, a
                  group of young space colonists come face to face with the most
                  terrifying life form in the universe. While scavenging the
                  deep ends of a derelict space station, a group of young space
                  colonists come face.
                </h1>
              </div>

              <div className="absolute top-[30vh] md:top-[57vh] left-[5%] md:left-[4%] z-50 flex justify-center md:flex-row">
                <div className="mb-4 md:mb-0">
                  <Link href="/singlemovie">
                    <Button className="h-[7vh] w-[25vw] max-w-[10rem] md:w-[8vw] md:h-[6vh] max-w-[15rem] rounded-full mr-3 text-[1vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500">
                      View
                      <SlArrowRight className="w-5 h-5 md:w-5 md:h-5 ml-[2vw]" />
                    </Button>
                  </Link>
                </div>
                <div>
                  <Link href="/watchlist">
                    <Button className="h-[7vh] w-[25vw] max-w-[10rem] md:w-[8vw] md:h-[6vh] max-w-[15rem] rounded-full text-[1vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500">
                      Watchlist
                      <LuPlus className="w-5 h-5 md:w-6 md:h-6 ml-[1vw]" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="flex justify-center">3</CarouselItem>
          <CarouselItem className="flex justify-center">4</CarouselItem>
          <CarouselItem className="flex justify-center">5</CarouselItem>
          <CarouselItem className="flex justify-center">6</CarouselItem>
          <CarouselItem className="flex justify-center">7</CarouselItem>
          <CarouselItem className="flex justify-center">8</CarouselItem>
          <CarouselItem className="flex justify-center">9</CarouselItem>
          <CarouselItem className="flex justify-center">10</CarouselItem>
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
