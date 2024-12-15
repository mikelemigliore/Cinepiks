import { useState } from "react";
import EpisodeCard from "@/components/cards/EpisodeCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CarouselEpisode from "@/components/carousel/CarouselEpisode";
import { Progress } from "@/components/ui/progress";
import YoutubeTrailerPlayer from "@/components/trailer/YoutubeTrailerPlayer";
import React from "react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import { FaExpand, FaFacebook, FaLink, FaPlay } from "react-icons/fa";
import { Rings } from "react-loader-spinner";
import { FiMinimize } from "react-icons/fi";
import { GoDotFill, GoMute, GoUnmute } from "react-icons/go";
import { MdOutlineReplay } from "react-icons/md";
import MovieCard from "@/components/cards/MovieCard";
import { IoCheckmark } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AiFillInstagram, AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import HowToWatchCard from "@/components/cards/HowToWatchCard";
import Tags from "@/components/tags/TagsHowToWatch";
import Reviews from "@/components/reviews/Reviews";
import MoreInfo from "@/components/moreinfo/MoreInfo";
import CastSwiper from "@/components/carousel/CastSwiper";
import MoreLikeThisSwiper from "@/components/carousel/MoreLikeThisSwiper";
import RecomendationSwiper from "@/components/carousel/RecommendationSwiper";
import RecommendationSwiper from "@/components/carousel/RecommendationSwiper";
import StarRating from "@/components/starRating/StarRating";

interface SinglePageMainTrailerProp {
  videoKey: string;
  src: string;
  autoplay?: boolean;
  play?: boolean;
  handlePlay: () => void;
  setIsLoading: (loading: boolean) => void; // Add prop to manage loading state
  pause?: boolean;
  reload?: boolean;
  handleReload: () => void;
  handleEnd: () => void;
  unmute?: boolean;
  isListView?: boolean;
  isLoading?: boolean;
  handleUnmute: () => void;
  handlePause: () => void;
  handleSetRelaod: () => void;
}

function SinglePageMainTrailer({
  handlePlay,
  play,
  unmute,
  pause,
  reload,
  handleReload,
  handleEnd,
  autoplay,
  videoKey,
  setIsLoading,
  src,
  isLoading,
  handleUnmute,
  handlePause,
  handleSetRelaod,
}: SinglePageMainTrailerProp) {
  return (
    <div className={`w-full h-[47.5vw] relative`}>
      <YoutubeTrailerPlayer
        handlePlay={handlePlay}
        //handleFullscreen={handleFullscreen}
        //handleExpand={handleExpand}
        //expand={expand}
        unmute={unmute}
        pause={pause}
        reload={reload}
        handleReload={handleReload}
        handleEnd={handleEnd}
        //handleStarted={handleStarted}
        play={play}
        autoplay={autoplay}
        videoKey={videoKey}
        src={src}
        setIsLoading={setIsLoading} // Pass the loading state handler
      />
      <div
        className={`${
          play ? "opacity-0" : "opacity-100"
        } z-40 absolute inset-0 bg-gradient-to-t from-customColor to-transparent w-full h-full transition-opacity duration-500 ease-in-out`}
      />

      <Button
        onClick={handlePlay}
        className={`active:scale-95 duration-500 z-40 absolute top-1/2 left-1/2 w-[4.5vw] h-[4.5vw] rounded-full border-2 border-white bg-slate-300 bg-transparent hover:bg-slate-300 hover:bg-opacity-5 -translate-x-1/2 -translate-y-1/2 ${
          play ? "hidden" : ""
        }`}
      >
        {isLoading ? (
          <Rings color="#ffffff" height={40} width={40} />
        ) : (
          <CiPlay1 className="w-[2vw] h-[2vw]" />
        )}
      </Button>
      {/* Display the appropriate icon based on fullscreen state */}
      {play && (
        <div className="ml-[80vw] mt-[-10vw]  z-[100] absolute">
          <Button
            onClick={handleUnmute}
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
            onClick={handlePause}
            className="mr-3 w-[4.5vw] h-[4.5vw] rounded-full border-2 border-white bg-slate-300 bg-transparent hover:bg-slate-300 hover:bg-opacity-5"
          >
            <CiPause1 className="w-[2vw] h-[2vw]" />
          </Button>
          <Button
            onClick={handleSetRelaod}
            className="w-[4.5vw] h-[4.5vw] rounded-full border-2 border-white bg-slate-300 bg-transparent hover:bg-slate-300 hover:bg-opacity-5"
          >
            <MdOutlineReplay className="w-[2vw] h-[2vw]" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default SinglePageMainTrailer;
