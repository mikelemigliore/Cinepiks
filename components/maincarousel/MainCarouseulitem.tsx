import React, { useState, useEffect } from "react";
import YoutubePlayerMainCaroisel from "./YoutubePlayerMainCaroisel";
import { GoMute, GoUnmute } from "react-icons/go";
import { CiPlay1, CiPause1 } from "react-icons/ci";
import { IoCheckmark } from "react-icons/io5";
import { MdOutlineReplay } from "react-icons/md";
import { Button } from "../ui/button";
import { SlArrowRight } from "react-icons/sl";
import { LuPlus } from "react-icons/lu";
import Link from "next/link";
import handleWatchlistBtn from "@/utils/handleWatchlistBtn";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/features/store";
import { useSession } from "next-auth/react";

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
  }, [media.id, watchlistdb]);

  useEffect(() => {
    setIsCarouselPlaying(false);
    setUnmute(false);
    setPause(false);
    setStarted(false);

    const videoRestartTimeout = setTimeout(() => {
      setIsCarouselPlaying(true);
    }, 2000);

    return () => clearTimeout(videoRestartTimeout);
  }, [activeSlide]);

  useEffect(() => {
    if (!isCarouselPlaying) {
      const timeoutId = setTimeout(() => {
        handleNext();
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [isCarouselPlaying, handleNext]);

  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";

  const handleStarted = () => {
    setStarted(true);
  };

  const handleReload = () => {
    setReload(false);
    setPause(false);
  };

  const handleVideoEnd = () => {
    setIsCarouselPlaying(false);
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

          <Button
            onClick={() => setReload(true)}
            className="absolute z-50 w-[4.5vw] h-[4.5vw] rounded-full border-2 border-white bg-transparent hover:bg-opacity-50 ml-[12vw]"
          >
            <MdOutlineReplay className="w-[2vw] h-[2vw]" />
          </Button>
        </div>
      )}

      <div className="">
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
