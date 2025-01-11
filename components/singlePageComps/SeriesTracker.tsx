"use client";
import { useMemo, useState } from "react";
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
import SinglePageMainTrailer from "@/components/singlePageComps/SinglePageMainTrailer";
import MainDetails from "@/components/singlePageComps/MainDetails";
import { setSeasonData } from "@/app/features/dbSlice";
import { useGetSeasonQuery } from "@/app/features/season/seasonSlice";
import { useDispatch, useSelector } from "react-redux";
import handleSeasonBtn from "@/utils/handleSeasonBtn";
import { RootState } from "@/app/features/store";

interface Episode {
  id: string;
  episode: number;
  title: string;
  duration: string;
  score: string;
  img: string;
  description: string;
  date: string;
}

interface SeasonsProp {
  season: number;
  episodes: Episode[];
}

interface SeriesTrackerProp {
  handleOnValueChange: (value: number) => void;
  selectedSeason: number;
  seasons: SeasonsProp[];
  //progressValue: number;
  episodes: Episode[];
  watchedEpisodes: number[];
  onEpisodeWatched: (episodeNumber: number) => void;
  Id: number;
}

function SeriesTracker({
  handleOnValueChange,
  selectedSeason,
  seasons,
  //progressValue,
  episodes,
  watchedEpisodes,
  onEpisodeWatched,
  Id,
}: SeriesTrackerProp) {
  const [progress, setProgress] = useState(0);

  const seasondb = useSelector((state: RootState) => state.content.season);

  useEffect(() => {
    //console.log("watchedEpisodes", watchedEpisodes.length);
    const data = seasondb
      .filter((item) => item.seriesId == Id)
      .filter((item) => item.seasonNumber === selectedSeason);
    //console.log(data);

    setProgress(data[0]?.episodes.length ?? 0);
  }, [selectedSeason, seasondb, Id]);

  const percentage = (progress / episodes.length) * 100;

  return (
    <div className="ml-[13vw] max-w-[75vw] mt-[4vw] mb-[2vw]">
      <div className="flex justify-between mb-[1.5vw]">
        <div>
          <Select
            //defaultValue={selectedSeason.toString()}
            onValueChange={(value: any) => {
              handleOnValueChange(value);
            }}
          >
            <SelectTrigger className="w-[10vw] h-[2.6vw] border-none focus:ring-0 focus:border-transparent text-[1vw] rounded-full pl-[3vh] bg-customServicesColor ">
              <span>
                <SelectValue placeholder={`Season ${selectedSeason}`} />
              </span>
            </SelectTrigger>
            <SelectContent className="bg-customServicesColor border-none text-[1vw] text-white mt-[0.2vh] rounded-[1vw] p-[0.5vh] hover:cursor-pointer">
              {seasons.map((season) => (
                <SelectItem
                  key={season.season}
                  value={season.season.toString()}
                  className="text-[1vw] rounded-full pl-[1vw] hover:cursor-pointer"
                >
                  Season {season.season}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col items-center">
          <div>
            <div className="mb-[1vw]">{Math.round(percentage)}% Completed</div>
            <Progress
              className="[&>*]:bg-white/90 bg-buttonColor w-[45vw]"
              value={percentage}
              max={100}
            />
          </div>
        </div>
      </div>
      <div className="">
        <CarouselEpisode
          Id={Id}
          selectedSeason={selectedSeason}
          episodes={episodes}
          watchedEpisodes={watchedEpisodes}
          onEpisodeWatched={onEpisodeWatched}
          //progressValue={progressValue}
        />
      </div>
    </div>
  );
}

export default SeriesTracker;
