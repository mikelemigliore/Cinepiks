import React from "react";
import MovieCard from "../cards/MovieCard";

interface Media {
  id: number;
  title?: string;
  poster_path: string;
  media_type: string; // Add type here to indicate the media type
  backdrop_path: string;
  name?:string
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
        const isLastOne = filter ? index === 5 : index === 6;
        //console.log("Type", media);

        return (
          <div
            key={media.id}
            className={`m-[1vw] transition-transform duration-700 ml-[-0.2vw]`}
            //style={{ width: "12.6vw", height: "40vh" }}
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
              imgBackdrop={media.backdrop_path}
              //mediaType={mediaType}
            />
          </div>
        );
      })}
    </div>
  );
}

export default GridView;
