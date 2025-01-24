"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CarouselEpisode from "@/components/carousel/CarouselEpisode";
import { Progress } from "@/components/ui/progress";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
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
  isDesktop: boolean;
}

function SeriesTracker({
  handleOnValueChange,
  selectedSeason,
  seasons,
  episodes,
  watchedEpisodes,
  onEpisodeWatched,
  Id,
  isDesktop,
}: SeriesTrackerProp) {
  const [progress, setProgress] = useState(0);

  const seasondb = useSelector((state: RootState) => state.content.season);

  useEffect(() => {
    const data = seasondb
      .filter((item) => item.seriesId == Id)
      .filter((item) => item.seasonNumber === selectedSeason);

    setProgress(data[0]?.episodes.length ?? 0);
  }, [selectedSeason, seasondb, Id]);

  const percentage = (progress / episodes.length) * 100;

  return (
    <div className="ml-[13vw] max-w-[75vw] md:mt-[4vw] mt-[10vw] mb-[2vw]">
      <div className="flex md:flex-row flex-col justify-between mb-[1.5vw]">
        <div>
          <Select
            onValueChange={(value: any) => {
              handleOnValueChange(value);
            }}
          >
            <SelectTrigger className="md:ml-[0vw] ml-[-10vw] md:w-[10vw] w-[33vw] md:h-[2.6vw] h-[6vh] border-none focus:ring-0 focus:border-transparent text-[4vw] md:text-[1vw] rounded-full pl-[3vh] bg-customServicesColor ">
              <span>
                <SelectValue placeholder={`Season ${selectedSeason}`} />
              </span>
            </SelectTrigger>
            <SelectContent className="bg-customServicesColor border-none text-[1vw] text-white mt-[0.2vh] md:rounded-[1vw] rounded-2xl p-[0.5vh] hover:cursor-pointer">
              {seasons.map((season) => (
                <SelectItem
                  key={season.season}
                  value={season.season.toString()}
                  className="md:text-[1vw] text-[4vw] rounded-full md:pl-[1vw] pl-[3vw] hover:cursor-pointer"
                >
                  Season {season.season}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col md:items-center justify-end md:ml-0 ml-[-8vw] md:mt-[0vw] mt-[4vw]">
          <div>
            <div className="mb-[1vw]">{Math.round(percentage)}% Completed</div>
            <Progress
              className="[&>*]:bg-white/90 bg-buttonColor md:w-[45vw] w-[92vw]"
              value={percentage}
              max={100}
            />
          </div>
        </div>
      </div>
      <div className="md:mt-0 mt-[4vh]">
        <CarouselEpisode
          Id={Id}
          selectedSeason={selectedSeason}
          episodes={episodes}
          watchedEpisodes={watchedEpisodes}
          onEpisodeWatched={onEpisodeWatched}
          isDesktop={isDesktop}
        />
      </div>
    </div>
  );
}

export default SeriesTracker;
