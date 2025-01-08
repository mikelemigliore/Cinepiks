import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import EpisodeCard from "../cards/EpisodeCard";
import handleSeasonBtn from "@/utils/handleSeasonBtn";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/features/store";
import { useGetSeasonQuery } from "@/app/features/season/seasonSlice";
import { setSeasonData } from "@/app/features/dbSlice";

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

interface SwiperEpisodeProps {
  episodes: Episode[];
  watchedEpisodes: number[];
  onEpisodeWatched: (episodeNumber: number) => void;
  selectedSeason: number;
  Id:number
}

function CarouselEpisode({
  episodes,
  watchedEpisodes,
  onEpisodeWatched,
  selectedSeason,
  Id
}: SwiperEpisodeProps) {
  // const dispatch = useDispatch();

  // const seasondb = useSelector((state: RootState) => state.content.season);

  // const { data: seasonDB, isSuccess: seasonSucces } = useGetSeasonQuery({});

  // // Fetch movie details when IDs are available
  // useEffect(() => {
  //   const fetchMovieDetails = async () => {
  //     if (seasonSucces && seasonDB.length > 0) {
  //       try {
  //         //console.log("seasonDB", seasonDB);

  //         const data = seasonDB.filter((item: any) => item.seriesId === Id);

  //         if (data.length > 0) {
  //           const res = data
  //             .filter((item: any) => item.seasonNumber === selectedSeason)
  //             .map((item: any) => item.episodes);

  //           //console.log("res", res[0]);

  //           dispatch(setSeasonData(seasonDB));
  //           onEpisodeWatched(res[0] || []); // ✅ Ensuring an empty object as fallback
  //         }
  //       } catch (error) {
  //         console.error("Error fetching movie details:", error);
  //       }
  //     }
  //   };

  //   fetchMovieDetails();
  // }, [Id, selectedSeason]); // Trigger only when the movie IDs are fetched
  

  return (
    <div>
      <div className="">
        <Carousel
          opts={{
            align: "start",
          }}
        >
          <CarouselContent>
            {episodes.map((episodesItem) => (
              <CarouselItem
                key={episodesItem.id}
                className="basis-1/4 md:basis-1/4"
              >
                <EpisodeCard
                  watched={watchedEpisodes.includes(episodesItem.episode)}//This line ensures the value is always a boolean.
                  onWatch={() => onEpisodeWatched(episodesItem.episode)} // is called with episodesItem.episode as an argument. This function presumably toggles the watched status of the specified episode.
                  episodeNumber={episodesItem.episode}
                  img={episodesItem.img}
                  title={episodesItem.title}
                  duration={episodesItem.duration}
                  score={episodesItem.score}
                  description={episodesItem.description}
                  date={episodesItem.date}
                  //handleSeason={handleSeason}
                  selectedSeason={selectedSeason}
                  Id={Id}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-transparent border-none hover:bg-transparent hover:text-white" />
          <CarouselNext className="bg-transparent border-none hover:bg-transparent hover:text-white" />
        </Carousel>
      </div>
    </div>
  );
}

export default CarouselEpisode;
