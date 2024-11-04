import React from "react";
import MovieCard from "../cards/MovieCard";

interface Movie {
  id: number;
  title: string;
  imgUrl: string;
  type: string; // Add type here to indicate the media type
}

interface GridViewProp {
  filter?: boolean;
  mediaSearch: Movie[];
  watchlist?: boolean;
  watched?: boolean;
  //mediaType?: string; // Indicates the type of content
}

function GridView({ filter, mediaSearch, watchlist,watched }: GridViewProp) {
  return (
    <div
      className={`grid gap-y-[5vh] mt-[2vh] mb-[5vh] transition-all duration-700 ease-in-out ${
        filter ? "grid-cols-2 md:grid-cols-6" : "grid-cols-2 md:grid-cols-7"
      }`}
    >
      {mediaSearch.map((media, index) => {
        const isLastOne = filter ? index === 5 : index === 6;

        return (
          <div
            key={media.id}
            className={`m-[1vw] transition-transform duration-700 ml-[-0.2vw]`}
            //style={{ width: "12.6vw", height: "40vh" }}
          >
            <MovieCard
            watched={watched}
              watchlist={watchlist}
              type={media.type}
              imgUrl={media.imgUrl}
              title={media.title}
              isLastOne={isLastOne}
            />
          </div>
        );
      })}
    </div>
  );
}

export default GridView;
