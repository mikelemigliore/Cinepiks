import React from "react";
import MovieCard from "../cards/MovieCard";
import { Skeleton } from "@/components/ui/skeleton";

interface Media {
  id: number;
  title?: string;
  poster_path: string;
  media_type: string;
  backdrop_path: string;
  name?: string;
  genre_ids?: number[];
}

interface GridViewProp {
  filter?: boolean;
  mediaSearch: Media[];
  watchlist?: boolean;
  watched?: boolean;
  isLoadingContent: boolean;
}

function GridView({
  filter,
  mediaSearch,
  watchlist,
  watched,
  isLoadingContent,
}: GridViewProp) {
  return (
    <div
      className={`${
        isLoadingContent || mediaSearch.length > 0
          ? `grid gap-y-[5vh] mt-[2vh] mb-[5vh] transition-all duration-700 ease-in-out`
          : ``
      } ${
        filter ? "grid-cols-2 md:grid-cols-6" : "grid-cols-2 md:grid-cols-7"
      }`}
    >
      {isLoadingContent === true ? (
        <>
          {Array.from({ length: 21 }).map((_, index) => {
            return (
              <div
                key={index}
                className={`m-[1vw] transition-transform duration-700 md:ml-[-0.2vw] ml-[-2vw]`}
              >
                <Skeleton className="w-[46vw] h-[33vh] bg-backgroundButton md:h-[40vh] md:w-[12.6vw] rounded-2xl ml-[3vw] md:ml-[0vw]" />
              </div>
            );
          })}
        </>
      ) : mediaSearch.length > 0 && isLoadingContent === false ? (
        <>
          {mediaSearch?.map((media, index) => {
            const numColumns = filter ? 6 : 7;
            const isLastOne = (index + 1) % numColumns === 0;

            //console.log(media);

            return (
              <div
                key={index}
                className={`m-[1vw] transition-transform duration-700 md:ml-[-0.2vw]`}
              >
                <MovieCard
                  watched={watched}
                  watchlist={watchlist}
                  type={media.media_type}
                  imgUrl={media.poster_path}
                  title={media.title}
                  name={media.name}
                  isLastOne={isLastOne}
                  id={media.id}
                  genre={media.genre_ids}
                  imgBackdrop={media.backdrop_path}
                />
              </div>
            );
          })}
        </>
      ) : (
        <div className="md:ml-[30vw] ml-[20vw]">
          <img
            src="/noResultsFound7.png"
            alt="No content found"
            className="md:w-[30vw] w-[50vw]"
          />
        </div>
      )}
    </div>
  );
}

export default GridView;
