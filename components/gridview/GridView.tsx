import React from "react";
import MovieCard from "../cards/MovieCard";
import Link from "next/link";

interface Media {
  id: number;
  title?: string;
  poster_path: string;
  //media_type: string; // Add type here to indicate the media type
  backdrop_path: string;
  name?: string;
  genre_ids?: number[];
}

interface GridViewProp {
  filter?: boolean;
  mediaSearch: Media[];
  watchlist?: boolean;
  watched?: boolean;
  mediaType?: string; // Indicates the type of content
}

function GridView({
  filter,
  mediaSearch,
  watchlist,
  watched,
  mediaType,
}: GridViewProp) {
  return (
    <div
      className={`grid gap-y-[5vh] mt-[2vh] mb-[5vh] transition-all duration-700 ease-in-out ${
        filter ? "grid-cols-2 md:grid-cols-6" : "grid-cols-2 md:grid-cols-7"
      }`}
    >
      {mediaSearch?.map((media, index) => {
        const numColumns = filter ? 6 : 7;
        //const isLastOne = filter ? index === 5 : index === 6;
        const isLastOne = (index + 1) % numColumns === 0;

        //console.log("Is there any?", mediaType);

        return (
          <div
            key={media.id}
            className={`m-[1vw] transition-transform duration-700 ml-[-0.2vw]`}
            //style={{ width: "12.6vw", height: "40vh" }}
          >
            {/* <Link
              href={{
                pathname: `/singlemovie/${media.id}`, // Navigate to the single movie page
                query: { mediaType: media.media_type }, // Optional: Include additional query params
              }}
            > */}
            <MovieCard
              watched={watched}
              watchlist={watchlist}
              type={mediaType === "movie" ? "movie" : "tv"}
              // type={media.media_type}
              imgUrl={media.poster_path}
              title={media.title}
              name={media.name}
              isLastOne={isLastOne}
              id={media.id}
              genre={media.genre_ids}
              imgBackdrop={media.backdrop_path}
            />
            {/* <MovieCard
                    logInPage={logInPage}
                    type={mediaType}
                    imgBackdrop={media.backdrop_path}
                    imgUrl={media.poster_path}
                    genre={media.genre_ids}
                    title={media.title}
                    name={media.name}
                    itemsGenres={itemsGenres}
                    id={media.id}
                    isPartialSlide={isPartialSlide}
                    isLastThreeSlides={isLastThreeSlides}
                    isLastOne={isLastOne}
                    className="" 
                  /> */}
            {/* </Link> */}
          </div>
        );
      })}
    </div>
  );
}

export default GridView;
