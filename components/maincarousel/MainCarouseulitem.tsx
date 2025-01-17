// import React, { useState, useCallback, useEffect } from "react";
// import YoutubePlayerMainCaroisel from "./YoutubePlayerMainCaroisel";
// import { GoMute, GoUnmute } from "react-icons/go";
// import { CiPlay1, CiPause1 } from "react-icons/ci";
// import { IoCheckmark, IoReloadSharp } from "react-icons/io5";
// import { MdOutlineReplay } from "react-icons/md";

// // Import the necessary components
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { Button } from "../ui/button";
// import { SlArrowRight } from "react-icons/sl";
// import { LuPlus } from "react-icons/lu";
// import Link from "next/link";
// import handleWatchlistBtn from "@/utils/handleWatchlistBtn";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/app/features/store";

// interface MediaProp {
//   id: number;
//   title: string;
//   poster_path: string;
//   backdrop_path: string;
//   genre_ids: number[];
//   videoKey?: string;
//   release_date?: string;
//   overview?: string;
// }

// interface MainCarouselItemProps {
//   media: MediaProp;
//   index: number;
//   activeSlide: number;
//   setActiveSlide: (index: number) => void;
//   isCarouselPlaying: boolean;
//   unmute: boolean;
//  // pause: boolean;
//   //reload: boolean;
//   started: boolean;
//   //handleVideoEnd: () => void;
//   //handleStarted: () => void;
//   //handleReload: () => void;
//   handleNext: () => void;
//   handlePrev: () => void;
//   //isAdded: boolean[];
//   //setIsAdded: React.Dispatch<React.SetStateAction<boolean[]>>;
//   //handleAdded: (index: number) => void;
//   isDesktop: boolean;
//   formatDate: (date: string | undefined) => string;
//   setUnmute: any;
//   //setPause: any;
//   //setReload: any;
//   watchlistdb: any[];
// }

// function MainCarouseulitem({
//   media,
//   index,
//   activeSlide,
//   isCarouselPlaying,
//   unmute,
//   //pause,
//   //reload,
//   started,
//  // handleStarted,
//   //handleReload,
//   handleNext,
//   handlePrev,
//   // isAdded,
//   // setIsAdded,
//   //handleAdded,
//   isDesktop,
//   formatDate,
//  // handleVideoEnd,
//   setUnmute,
//   //setPause,
//   //setReload,
//   watchlistdb,
// }: MainCarouselItemProps) {
//   const [isAdded, setIsAdded] = useState(false);
//     const [pause, setPause] = useState(false);
//     const [reload, setReload] = useState(false);

//   const dispatch = useDispatch();

//   // const watchlistdb = useSelector(
//   //   (state: RootState) => state.content.watchlist
//   // );

//   useEffect(() => {
//     const Watchlisted = watchlistdb
//       .map((watchlist) => watchlist.id)
//       .includes(media.id);

//     if (Watchlisted) {
//       setIsAdded(true);
//     } else {
//       setIsAdded(false);
//     }
//   }, [media.id, watchlistdb]); // Run only once when the component mounts or id changes

//   // Ensure video restarts when slide changes (for both next and prev)
//   useEffect(() => {
//     // Stop the current video immediately on slide change
//     setIsCarouselPlaying(false);
//     //Re-set the mute buttom to false when traveling in the slides
//     setUnmute(false);
//     //setPause(false);
//     setStarted(false);

//     // Short delay to ensure the slide transition is complete before starting the video
//     const videoRestartTimeout = setTimeout(() => {
//       setIsCarouselPlaying(true); // Start the video after the transition
//     }, 2000); // Adjust the delay as needed, you may try smaller delays like 500ms

//     // Clean up the timeout when component unmounts or when activeSlide changes
//     return () => clearTimeout(videoRestartTimeout);
//   }, [activeSlide]);
//   const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";

//   const handleStarted = () => {
//     setStarted(true);
//   };

//   // Handle when video starts playing
//   const handleVideoEnd = () => {
//     setIsCarouselPlaying(false); // Set the video to start playing
//     setUnmute(false);
//     setStarted(false);
//   };

//   const handleAdded = async () => {
//     handleWatchlistBtn(dispatch, setIsAdded, isAdded, media.id);
//   };

//   return (
//     <div>
//       <div className="absolute inset-0 bg-cover bg-center md:bg-top bg-no-repeat h-[25rem] md:w-screen md:h-screen mt-[4rem] md:mt-0">
//         {activeSlide === index && isCarouselPlaying && isDesktop ? (
//           <YoutubePlayerMainCaroisel
//             isCarouselPlaying={isCarouselPlaying}
//             VideoEnd={handleVideoEnd}
//             videoKey={media.videoKey}
//             unmute={unmute}
//             pause={pause}
//             reload={reload}
//             handleReload={handleReload}
//             handleStarted={handleStarted}
//             src={`${BASE_IMAGE_URL}${media.backdrop_path}`}
//             // "https://image.tmdb.org/t/p/original/v2c7jHSvgXj0BYZ10MYUe9ugTHx.jpg"
//             // {`${BASE_IMAGE_URL}${medias[0].backdrop_path}`}
//           />
//         ) : (
//           <img
//             src={`${BASE_IMAGE_URL}${media.backdrop_path}`}
//             className="absolute inset-0 bg-cover bg-center md:bg-top bg-no-repeat h-[30vh] md:h-[120vh] w-full"
//           />
//         )}
//       </div>

//       <div className="absolute inset-y-0 left-0 bg-gradient-to-tr from-customColor to-transparent w-full h-full" />
//       {started && (
//         <div className="ml-[77vw] mt-[50vh] z-50">
//           <Button
//             onClick={() => setUnmute(!unmute)}
//             className="mr-3 w-[4.5vw] h-[4.5vw] rounded-full border-2 border-white bg-slate-300 bg-transparent hover:bg-slate-300 hover:bg-opacity-5"
//           >
//             {unmute ? (
//               <GoUnmute className="w-[2vw] h-[2vw]" />
//             ) : (
//               <div>
//                 <GoMute className="w-[2vw] h-[2vw]" />
//               </div>
//             )}
//           </Button>
//           <Button
//             onClick={() => setPause(!pause)}
//             className="mr-3 w-[4.5vw] h-[4.5vw] rounded-full border-2 border-white bg-slate-300 bg-transparent hover:bg-slate-300 hover:bg-opacity-5"
//           >
//             {pause ? (
//               <CiPlay1 className="w-[2vw] h-[2vw]" />
//             ) : (
//               <div>
//                 <CiPause1 className="w-[2vw] h-[2vw]" />
//               </div>
//             )}
//           </Button>
//           <Button
//             onClick={() => setReload(true)}
//             className="w-[4.5vw] h-[4.5vw] rounded-full border-2 border-white bg-slate-300 bg-transparent hover:bg-slate-300 hover:bg-opacity-5"
//           >
//             <MdOutlineReplay className="w-[2vw] h-[2vw]" />
//           </Button>
//         </div>
//       )}

//       <div>
//         <h1 className="absolute top-[20vh] md:top-[30vh] left-[5%] md:left-[4%] z-50 text-white font-bold text-sm md:text-lg">
//           Release Date: {formatDate(media.release_date)}
//         </h1>
//         <h1 className="absolute top-[22vh] md:top-[33vh] left-[5%] md:left-[4%] z-50 text-white text-[3vw] font-semibold overflow-hidden overflow-ellipsis line-clamp-1">
//           {media.title}
//         </h1>
//         <div className="absolute top-[30vh] md:top-[42vh] left-[5%] md:left-[4%] z-50 max-w-[90%] md:max-w-[35vw] mt-[0.4vw]">
//           <h1 className="hidden text-white text-[1vw] overflow-hidden overflow-ellipsis md:line-clamp-4">
//             {media.overview}
//           </h1>
//         </div>

//         <div className="absolute top-[30vh] md:top-[57vh] left-[5%] md:left-[4%] z-50 flex justify-center md:flex-row">
//           <div className="mb-4 md:mb-0">
//             <Link href={`/singlemovie/${media.id}`}>
//               <Button className="h-[7vh] w-[25vw] max-w-[10rem] md:w-[8vw] md:h-[6vh] max-w-[15rem] rounded-full mr-3 text-[1vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500">
//                 View
//                 <SlArrowRight className="w-5 h-5 md:w-5 md:h-5 ml-[2vw]" />
//               </Button>
//             </Link>
//           </div>
//           <div>
//             <Button
//               onClick={() => handleAdded()}
//               className={`h-[7vh] w-[25vw] max-w-[10rem] md:w-[8vw] md:h-[6vh] max-w-[15rem] rounded-full text-[1vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500 ${
//                 isAdded ? "bg-white/90 text-black" : ""
//               }`}
//             >
//               Watchlist
//               {isAdded ? (
//                 <IoCheckmark className="w-5 h-5 md:w-6 md:h-6 ml-[1vw]" />
//               ) : (
//                 <LuPlus className="w-5 h-5 md:w-6 md:h-6 ml-[1vw]" />
//               )}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MainCarouseulitem;

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
import { signOut, useSession } from "next-auth/react";

interface MediaProp {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  genre_ids: number[];
  videoKey?: string;
  release_date?: string;
  overview?: string;
}

interface MainCarouselItemProps {
  media: MediaProp;
  index: number;
  activeSlide: number;
  setActiveSlide: (index: number) => void;
  handleNext: () => void;
  handlePrev: () => void;
  isDesktop: boolean;
  formatDate: (date: string | undefined) => string;
  //watchlistdb: any[];
  mediaType: string;
}

function MainCarouseulitem({
  media,
  index,
  activeSlide,
  handleNext,
  handlePrev,
  isDesktop,
  formatDate,
  //watchlistdb,
  setActiveSlide,
  mediaType,
}: MainCarouselItemProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [pause, setPause] = useState(false);
  const [reload, setReload] = useState(false);
  const [started, setStarted] = useState(false);
  const [unmute, setUnmute] = useState(false);
  const [isCarouselPlaying, setIsCarouselPlaying] = useState(true);

  const { data: session }: any = useSession();

  const dispatch = useDispatch();
  const watchlistdb = useSelector(
    (state: RootState) => state.content.watchlist
  );

  useEffect(() => {
    console.log(" started:", started);
  }, [started]);

  useEffect(() => {
    const Watchlisted = watchlistdb
      .map((watchlist) => watchlist.id)
      .includes(media.id);

    if (Watchlisted) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }
  }, [media.id, watchlistdb]); // Run only once when the component mounts or id changes

  // Ensure video restarts when slide changes (for both next and prev)
  useEffect(() => {
    setIsCarouselPlaying(false);
    setUnmute(false);
    setPause(false);
    setStarted(false);

    const videoRestartTimeout = setTimeout(() => {
      setIsCarouselPlaying(true); // Start the video after the transition
    }, 2000); // Adjust the delay as needed, you may try smaller delays like 500ms

    return () => clearTimeout(videoRestartTimeout);
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

  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";

  const handleStarted = () => {
    setStarted(true);
  };

  // // Handle when video starts playing
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

  const handleAdded = async () => {
    handleWatchlistBtn(dispatch, setIsAdded, isAdded, media.id, mediaType);
  };

  return (
    <div>
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
            className="absolute inset-0 bg-cover bg-center md:bg-top bg-no-repeat h-[50vh] object-cover md:h-[120vh] w-full"
          />
        )}
      </div>

      <div className="absolute inset-y-0 left-0 bg-gradient-to-tr from-customColor to-transparent w-full h-full" />
      {started && (
        <div className="ml-[60vw] mt-[50vh] flex z-50">
          {/* Mute Button */}
          <Button
            onClick={() => setUnmute(!unmute)}
            className="absolute z-50  w-[4.5vw] h-[4.5vw] rounded-full border-2 border-white bg-transparent hover:bg-opacity-50 ml-[2vw]"
          >
            {unmute ? (
              <GoUnmute className="w-[2vw] h-[2vw]" />
            ) : (
              <GoMute className="w-[2vw] h-[2vw]" />
            )}
          </Button>

          {/* Pause Button */}
          <Button
            onClick={() => setPause(!pause)}
            className="absolute z-50 w-[4.5vw] h-[4.5vw] rounded-full border-2 border-white bg-transparent hover:bg-opacity-50 ml-[7vw]"
          >
            {pause ? (
              <CiPlay1 className="w-[2vw] h-[2vw]" />
            ) : (
              <CiPause1 className="w-[2vw] h-[2vw]" />
            )}
          </Button>

          {/* Reload Button */}
          <Button
            onClick={() => setReload(true)}
            className="absolute z-50 w-[4.5vw] h-[4.5vw] rounded-full border-2 border-white bg-transparent hover:bg-opacity-50 ml-[12vw]"
          >
            <MdOutlineReplay className="w-[2vw] h-[2vw]" />
          </Button>
        </div>
      )}

      <div className=''>
        <h1 className="ml-[4vw] md:ml-[0vw] absolute top-[38vh] md:top-[30vh] left-[5%] md:left-[4%] z-50 text-white font-bold text-[4vw] md:text-lg">
          Release Date: {formatDate(media.release_date)}
        </h1>
        <h1 className="ml-[4vw] md:ml-[0vw] absolute top-[41vh] md:top-[33vh] left-[5%] md:left-[4%] z-50 text-white text-[5vw] md:text-[3vw] font-semibold overflow-hidden overflow-ellipsis line-clamp-1">
          {media.title}
        </h1>
        <div className="absolute top-[30vh] md:top-[42vh] left-[5%] md:left-[4%] z-50 max-w-[90%] md:max-w-[35vw] mt-[0.4vw]">
          <h1 className="hidden text-white text-[1vw] overflow-hidden overflow-ellipsis md:line-clamp-4">
            {media.overview}
          </h1>
        </div>

        <div className="ml-[4vw] md:ml-[0vw] absolute top-[47vh] md:top-[57vh] left-[5%] md:left-[4%] z-50 flex justify-center md:flex-row">
          <div className="mb-4 md:mb-0">
            <Link href={`/singlemovie/${media.id}`}>
              <Button className="h-[6vh] w-[30vw] max-w-[10rem] md:w-[8vw] md:h-[6vh] max-w-[15rem] rounded-full mr-3 md:text-[1vw] text-[4vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500">
                View
                <SlArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-[2vw]" />
              </Button>
            </Link>
          </div>
          <div>
            <Button
              onClick={() => handleAdded()}
              disabled={session === null}
              className={`h-[6vh] w-[35vw] max-w-[10rem] md:w-[8vw] md:h-[6vh] max-w-[15rem] rounded-full md:text-[1vw] text-[4vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500 ${
                isAdded ? "bg-white/90 text-black" : ""
              }`}
            >
              Watchlist
              {isAdded ? (
                <IoCheckmark className="w-4 h-4 md:w-6 md:h-6 ml-[1vw]" />
              ) : (
                <LuPlus className="w-4 h-4 md:w-6 md:h-6 ml-[1vw]" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainCarouseulitem;
