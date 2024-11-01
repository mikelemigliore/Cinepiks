import React from "react";
import MovieCard from "../cards/MovieCard";

interface Movie {
    id: number;
    title: string;
    imgUrl: string;
}

interface GridViewProp {
    filter?: boolean;
    moviesSearch: Movie[];
}

function GridView({filter,moviesSearch}: GridViewProp) {
  return (
    <div
      className={`grid gap-y-[5vh] mt-[2vh] mb-[5vh] transition-all duration-700 ease-in-out ${
        filter ? "grid-cols-2 md:grid-cols-6" : "grid-cols-2 md:grid-cols-7"
      }`}
    >
      {moviesSearch.map((movie, index) => {
        const isLastOne = filter ? index === 5 : index === 6;

        return (
          <div
            key={movie.id}
            className={`m-[1vw] transition-transform duration-700 ml-[-0.2vw]`}
            //style={{ width: "12.6vw", height: "40vh" }}
          >
            <MovieCard
              imgUrl={movie.imgUrl}
              title={movie.title}
              isLastOne={isLastOne}
            />
          </div>
        );
      })}
    </div>
  );
}

export default GridView;
