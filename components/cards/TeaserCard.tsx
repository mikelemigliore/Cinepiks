import { useEffect, useRef, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { Button } from "../ui/button";
import { LuPlus } from "react-icons/lu";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import Link from "next/link";
import { SlArrowRight } from "react-icons/sl";
import { IoCheckmark } from "react-icons/io5";
import YoutubePlayer from "./YoutubePlayer";
import { GoMute, GoUnmute } from "react-icons/go";

interface TeaserCardProps {
  //image?:string
  title?: string;
  imgUrl: string;
  isLastThreeSlides?: boolean;
  isLastOne?: boolean;
  expandCard?: boolean;
  isDesktop?: boolean;
  href: string;
  type?: string; // Define possible values
}

function TeaserCard({
  title,
  imgUrl,
  isLastThreeSlides,
  isLastOne,
  expandCard,
  isDesktop,
  href,
  type,
  //image
}: TeaserCardProps) {
  //const [showContent, setShowContent] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [videoKey, setVideoKey] = useState("TcMBFSGVi1c");
  const [unmute, setUnmute] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null); // To manage hover delay
  // const [isDesktop, setIsDesktop] = useState(false); // Track if the view is desktop
  const [touchTimeout, setTouchTimeout] = useState<NodeJS.Timeout | null>(null);

  //const activeCardRef = useRef<string | null>(null); // To track the currently active card

  const handleTouchStart = () => {
    // Set a timeout for detecting long press
    const timeout = setTimeout(() => {
      console.log("Long press detected");
      // Implement any logic for preventing effects on long press
    }, 500); // 500ms long press detection
    setTouchTimeout(timeout);
  };

  const handleTouchEnd = () => {
    // Clear the timeout if touch ends before long press duration
    if (touchTimeout) {
      clearTimeout(touchTimeout);
      setTouchTimeout(null);
    }
  };

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsDesktop(window.innerWidth >= 768); // Set true for desktop view
  //   };

  //   handleResize(); // Check the initial screen size

  //   // Add event listener to update on window resize
  //   window.addEventListener("resize", handleResize);

  //   // Clean up the event listener on unmount
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMouseEnter = () => {
    //if (isDesktop) {
    // Only trigger hover effects if it's a desktop view
    // Delay the video playback by a short time
    hoverTimeoutRef.current = setTimeout(() => {
      setIsPlaying(true);
      //setShowContent(true);
    }, 300); // 300ms delay to stabilize hover
    //}
  };

  const handleMouseLeave = () => {
    // Only reset states on hover leave if it's a desktop view
    // Clear the hover timeout when the user leaves early
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsPlaying(false);
    setUnmute(false);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  if (!isClient) {
    return null; // Don't render anything during SSR
  }

  return (
    <div>
      {expandCard && (
        <div
          // className="relative group md:w-[16.5rem] md:h-[25rem] transition-all duration-500 ease-in-out transform hidden md:block"
          className="relative group transition-all duration-500 ease-in-out transform hidden md:block"
          onMouseEnter={isDesktop ? handleMouseEnter : undefined} // Only add hover on desktop
          onMouseLeave={isDesktop ? handleMouseLeave : undefined} // Only add hover on desktop
          onContextMenu={(e) => e.preventDefault()} // Disable right-click and long-press context menu
          onTouchStart={handleTouchStart} // Start touch detection
          onTouchEnd={handleTouchEnd} // End touch detection
        >
          <div
            className={`transition-all duration-500 ease-in-out transform ${
              expandCard && isDesktop
                ? "md:w-[22vw] md:h-[43vh] relative bg-customColorCard w-full h-full shadow-xl md:rounded-3xl group-hover:scale-105 md:group-hover:z-10"
                : "md:w-[22vw] md:h-[44vh]"
            }  ${
              isLastThreeSlides || isLastOne
                ? "md:group-hover:transform-origin-left md:group-hover:-translate-x-[10vw]"
                : "" //"md:group-hover:transform-origin-left md:group-hover:translate-x-0"
            }`}
            // className={`relative bg-customColorCard w-full h-full shadow-xl md:rounded-3xl transition-all duration-500 ease-in-out transform ${
            //   showContent && isDesktop
            //     ? "md:w-[22vw] md:h-[44vh]"
            //     : "md:w-[22vw] md:h-[44vh]"
            // } group-hover:scale-105 md:group-hover:z-10 ${
            //   isLastThreeSlides || isLastOne
            //     ? "md:group-hover:transform-origin-left md:group-hover:-translate-x-[10vw]"
            //     : "md:group-hover:transform-origin-left md:group-hover:translate-x-0"
            // }`}
          >
            {/* Poster / Video */}
            <div>
              {expandCard && isPlaying && isDesktop ? (
                <div className="relative w-full h-full pb-[56.25%] overflow-hidden rounded-t-3xl">
                  <YoutubePlayer
                    isPlaying={isPlaying}
                    fadeOut={fadeOut}
                    videoKey={videoKey}
                    unmute={unmute}
                    VideoEnd={handleVideoEnd}
                  />
                </div>
              ) : (
                <img
                  src="https://image.tmdb.org/t/p/original/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg"
                  alt={title}
                  className={`md:rounded-t-3xl w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-100 noselect`}
                />
              )}
            </div>

            {/* Mute Button (conditionally shown for desktop) */}
            {isDesktop && (
              <div className="absolute top-0 left-0 md:ml-[1rem] md:mt-[1rem] z-[1010]">
                <Button
                  onClick={() => setUnmute(!unmute)}
                  className="flex items-center justify-center w-[3vw] h-[3vw] rounded-full border-2 border-white bg-slate-300 bg-transparent hover:bg-slate-300 hover:bg-opacity-5"
                >
                  {unmute ? (
                    <GoUnmute className="w-[4vw] h-[4vw] min-w-[17px] min-h-[17px]" />
                  ) : (
                    <GoMute className="w-[4vw] h-[4vw] min-w-[17px] min-h-[17px]" />
                  )}
                </Button>
              </div>
            )}

            {/* Card Content */}
            <div
              className={`absolute bottom-0 w-full p-[1vw] transition-opacity duration-250 ease-in-out ${
                expandCard && isDesktop ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex justify-between">
                {type === "movie" ? (
                                 <div>
                  <h1 className="font-bold text-[1vw] m-[0.5vh]">{title}</h1>
                  <h2 className="m-[1vh] text-customTextColor font-bold pt-[1.5vh] text-[0.7vw]">
                    2h 3m
                  </h2>
                  <h2 className="flex justify-start m-[1vh] text-customTextColor font-bold text-[0.7vw]">
                    Action
                    <GoDotFill className="bg-customTextColor w-[0.3vw] h-[0.3vw] m-[0.7vh] rounded-full" />
                    Sci-fi
                    <GoDotFill className="bg-customTextColor w-[0.3vw] h-[0.3vw] m-[0.7vh] rounded-full" />
                    Comedy
                  </h2>
                </div> 
                ):(
                  <div>
                  <h1 className="font-bold text-[1vw] m-[0.5vh]">{title}</h1>
                  <h2 className="m-[1vh] text-customTextColor font-bold text-[0.7vw]">
                    Seasons: 3
                  </h2>
                  <h2 className="flex justify-start m-[1vh] text-customTextColor font-bold text-[0.7vw]">
                    Action
                    <GoDotFill className="bg-customTextColor w-[0.3vw] h-[0.3vw] m-[0.7vh] rounded-full" />
                    Sci-fi
                    <GoDotFill className="bg-customTextColor w-[0.3vw] h-[0.3vw] m-[0.7vh] rounded-full" />
                    Comedy
                  </h2>
                </div>
                )}


                <div className="">
                  <div className="space-x-[0.5vw]">
                    <Button
                      onClick={() => setIsAdded(!isAdded)}
                      className={`w-[2.8vw] h-[2.8vw] rounded-full bg-slate-300 bg-opacity-10 backdrop-blur-3xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 ${
                        isAdded ? "bg-white/90 text-black font-bold" : ""
                      }`}
                    >
                      {isAdded ? (
                        <IoCheckmark className="w-[3vw] h-[3vw] min-w-[17px] min-h-[17px]" />
                      ) : (
                        <LuPlus className="w-[3vw] h-[3vw] min-w-[17px] min-h-[17px]" />
                      )}
                    </Button>
                    <Button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`w-[2.8vw] h-[2.8vw] rounded-full bg-slate-300 bg-opacity-10 backdrop-blur-3xl hover:bg-white/90 hover:text-black hover:font-bold transition-transform duration-300 ease-in-out active:bg-white active:scale-95 ${
                        isLiked ? "bg-white/90 text-black" : ""
                      }`}
                    >
                      {isLiked ? (
                        <AiFillLike className="w-[3vw] h-[3vw] min-w-[17px] min-h-[17px]" />
                      ) : (
                        <AiOutlineLike className="w-[3vw] h-[3vw] min-w-[17px] min-h-[17px]" />
                      )}
                    </Button>
                  </div>

                  <div>
                    {href === `/singlemovie` ? (
                      <Link href={`/singlemovie`}>
                        <Button className="w-[6.2vw] h-[2.5vw] rounded-full text-[1.7vh] bg-slate-300 bg-opacity-10 backdrop-blur-3xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 transition-transform duration-300">
                          View
                          <SlArrowRight className="ml-[2vw] w-[1vw] h-[1vw] min-w-[10px] min-h-[10px]" />
                        </Button>
                      </Link>
                    ) : (
                      <Link href={`/singleseries`}>
                        <Button className="w-[6.2vw] h-[2.5vw] rounded-full text-[1.7vh] bg-slate-300 bg-opacity-10 backdrop-blur-3xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 transition-transform duration-300">
                          View
                          <SlArrowRight className="ml-[2vw] w-[1vw] h-[1vw] min-w-[10px] min-h-[10px]" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeaserCard;
