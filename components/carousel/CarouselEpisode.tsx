import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import EpisodeCard from "../cards/EpisodeCard";

interface Episode {
  id: string;
  episode: number;
  title: string;
  duration: string;
  score: string;
  img: string;
  description: string;
  date:string
}

interface SwiperEpisodeProps {
  episodes: Episode[];
  watchedEpisodes: { [episodeNumber: number]: boolean };
  onEpisodeWatched: (episodeNumber: number) => void;
}

function CarouselEpisode({
  episodes,
  watchedEpisodes,
  onEpisodeWatched,
}: SwiperEpisodeProps) {
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
                  watched={watchedEpisodes[episodesItem.episode] || false} //This line checks if the current episode (indicated by episodesItem.episode) is marked as watched in the watchedEpisodes state.
                  onWatch={() => onEpisodeWatched(episodesItem.episode)} // is called with episodesItem.episode as an argument. This function presumably toggles the watched status of the specified episode.
                  episodeNumber={episodesItem.episode}
                  img={episodesItem.img}
                  title={episodesItem.title}
                  duration={episodesItem.duration}
                  score={episodesItem.score}
                  description={episodesItem.description}
                  date={episodesItem.date}
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
