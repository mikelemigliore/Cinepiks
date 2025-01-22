import React from "react";
import MovieCard from "../cards/MovieCard";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton from Shadcn/UI

interface Media {
  id: number;
  title?: string;
  poster_path: string;
  media_type: string; // Add type here to indicate the media type
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
  //mediaType?: string | null; // Indicates the type of content
}

function GridView({
  filter,
  mediaSearch,
  watchlist,
  watched,
  isLoadingContent,
}: //mediaType,
GridViewProp) {
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
      {isLoadingContent ? (
        <>
          {Array.from({ length: 21 }).map((_, index) => {
            return (
              <div
                className={`m-[1vw] transition-transform duration-700 md:ml-[-0.2vw] ml-[-2vw]`}
                //style={{ width: "12.6vw", height: "40vh" }}
              >
                <Skeleton className="w-[46vw] h-[33vh] bg-backgroundButton md:h-[40vh] md:w-[12.6vw] rounded-2xl ml-[3vw] md:ml-[0vw]" />
                {/* <Skeleton className="w-[46vw] h-[5vh] bg-backgroundButton md:h-[4vh] md:w-[12.6vw] rounded-full md:mt-[0.5vh] mt-[1vh] ml-[3vw] md:ml-[0vw]" /> */}
              </div>
            );
          })}
        </>
      ) : mediaSearch.length > 0 && !isLoadingContent ? (
        <>
          {mediaSearch?.map((media, index) => {
            const numColumns = filter ? 6 : 7;
            //const isLastOne = filter ? index === 5 : index === 6;
            const isLastOne = (index + 1) % numColumns === 0;

            //console.log(media);

            return (
              <div
                key={media.id}
                className={`m-[1vw] transition-transform duration-700 md:ml-[-0.2vw]`}
                //style={{ width: "12.6vw", height: "40vh" }}
              >
                <MovieCard
                  watched={watched}
                  watchlist={watchlist}
                  //type={mediaType === "movie" ? "movie" : "tv"}
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
          {/* <h1 className='text-center md:text-[1.3vw] text-[4vw]'>No Results Found</h1> */}
        </div>
      )}
    </div>
  );
}

export default GridView;
