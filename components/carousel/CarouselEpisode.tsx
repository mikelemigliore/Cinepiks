import React from "react";
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
  date: string;
}

interface SwiperEpisodeProps {
  episodes: Episode[];
  watchedEpisodes: number[];
  onEpisodeWatched: (episodeNumber: number) => void;
  selectedSeason: number;
  Id: number;
  isDesktop: boolean;
}

function CarouselEpisode({
  episodes,
  watchedEpisodes,
  onEpisodeWatched,
  selectedSeason,
  Id,
  isDesktop,
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
                className="basis-1/1 md:basis-1/4"
              >
                <EpisodeCard
                  watched={watchedEpisodes.includes(episodesItem.episode)}
                  onWatch={() => onEpisodeWatched(episodesItem.episode)}
                  episodeNumber={episodesItem.episode}
                  img={episodesItem.img}
                  title={episodesItem.title}
                  duration={episodesItem.duration}
                  score={episodesItem.score}
                  description={episodesItem.description}
                  date={episodesItem.date}
                  selectedSeason={selectedSeason}
                  Id={Id}
                  isDesktop={isDesktop}
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
