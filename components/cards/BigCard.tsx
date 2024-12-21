import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { Button } from "../ui/button";
import { SlArrowRight } from "react-icons/sl";
import { LuPlus } from "react-icons/lu";
import { IoCheckmark } from "react-icons/io5";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import {
  getGenres,
  getMovieCertification,
  getMovieDetails,
} from "@/app/pages/api/loginPage";
import { getRatings } from "@/app/pages/api/homePage";
import { useGetRatingsQuery } from "@/app/features/ratingsSlice";
import {
  useGetMovieCertificationQuery,
  useGetMovieDetailsQuery,
} from "@/app/features/homepage/movies/moviedetailsSlice";

interface Genre {
  id: number;
  name: string;
}

interface BigCardProps {
  id: number;
  //image: string;
  //title: string;
  rated?: string;
  time?: string;
  //description: string;
  isPartialSlide: boolean;
  isLastOne: boolean;
  mediaType: string;
  href: string;
  //genres: Genre[];
}

function BigCard({
  //image,
  //title,
  rated,
  time,
  //description,
  isPartialSlide,
  isLastOne,
  id,
  mediaType,
  href,
}: BigCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [title, setTitle] = useState();
  const [image, setImage] = useState();
  const [runtime, setRuntime] = useState();
  const [description, setDescription] = useState();
  const [imdbId, setImdbId] = useState();
  const [certification, setCertification] = useState();
  const [rottenTomatoesAudience, setRottenTomatoesAudience] = useState<
    number | null
  >(null);
  const [rottenTomatoesCritics, setRottenTomatoesCritics] = useState<
    number | null
  >(null);
  const [imdb, setIMDb] = useState<number | null>(null);
  const [tmdbScore, setTMDbScore] = useState<number | null>(null);


  
  const { data: movieDetails } = useGetMovieDetailsQuery(id || 0);

  const { data: rating } = useGetRatingsQuery(imdbId || "");

  const { data: movieCertification } = useGetMovieCertificationQuery(id || 0);



  useEffect(() => {
    if (movieDetails) {
      setGenres(movieDetails?.genres || []);
      setRuntime(movieDetails?.runtime || "N/A");
      setDescription(movieDetails?.overview || "No description available");
      setTMDbScore(movieDetails?.vote_average || null);
      setImdbId(movieDetails.imdb_id || null);
      setTitle(movieDetails.original_title || movieDetails.name || "Unknown Title");
      setImage(movieDetails.backdrop_path || null);
    }

    if (movieCertification) {
      setCertification(movieCertification);
    }

    if (rating) {
      setRottenTomatoesAudience(
        rating?.result?.ratings?.["Rotten Tomatoes"]?.audience?.rating || null
      );
      setRottenTomatoesCritics(
        rating?.result?.ratings?.["Rotten Tomatoes"]?.critics?.rating || null
      );
      setIMDb(rating?.result?.ratings?.["IMDb"]?.audience?.rating || null);
    }
  }, [rating, movieDetails]);



  const formatRuntime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60); 
    const remainingMinutes = minutes % 60; 
    return `${hours}h ${remainingMinutes}m`;
  };




  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";

  return (
    <div className="ml-2 md:ml-[3.5vw] bg-gradient-to-b md:bg-gradient-to-r from-customServicesColor via-customServicesColor/96 to-customColorBigCard w-[80vw] md:w-[90vw] h-[80vh] md:h-[71vh] rounded-3xl shadow-2xl">
      <div className="flex flex-col md:flex-row md:h-full h-[38rem]">
        {/* Left Side: Image */}
        <img
          className={`rounded-tl-3xl rounded-tr-3xl rounded-br-customMobile rounded-bl-customMobile md:rounded-tl-3xl md:rounded-bl-3xl md:rounded-tr-custom md:rounded-br-custom h-[18rem] md:h-full object-cover ${
            isPartialSlide ? "opacity-30 pointer-events-none" : ""
          }`}
          src={`${BASE_IMAGE_URL}${image}`}
        />

        {/* Right Side: Movie Info */}
        <div className="flex flex-col justify-center items-center ml-[1vw]">
          <div className=" w-[27vw] text-4xl md:text-[2.5vw] font-semibold text-center line-clamp-1">
            {title}
          </div>

          {/* Add more info below the title */}
          <div className="mt-[2vh] text-center">
            <div className="flex justify-start items-center text-customTextColor font-bold md:text-[0.8vw]">
              <span>{genres[0]?.name || "Undefined"}</span>
              <GoDotFill className="bg-customTextColor w-1.5 h-1.5 mx-[0.4vw] rounded-full" />
              <span>{genres[1]?.name || "Undefined"}</span>
              <GoDotFill className="bg-customTextColor w-1.5 h-1.5 mx-[0.4vw] rounded-full" />
              <span className="pr-[0.6vw]">
                {genres[2]?.name || "Undefined"}
              </span>
              <span className="mx-[0.6vw] text-customTextColor font-bold">
                {certification}
              </span>
              <span className="mx-[0.6vw] text-customTextColor font-bold">
                {runtime !== undefined ? formatRuntime(runtime) : "N/A"}
              </span>
            </div>
          </div>

          <div className="relative">
            <p className="mt-[1.5vh] text-white text-base md:text-[1vw] text-center max-w-[23rem] md:max-w-[23vw] line-clamp-4 leading-[2] md:leading-[2]">
              {description}
            </p>
          </div>

          {/* Box for Ratings */}
          <div className="w-[22vw]">
            <div className="w-full mt-[2vw] hidden md:block">
              <h1 className="text-white text-base md:text-[1vw]">Ratings</h1>
            </div>

            {/* Box for Three Titles */}
            <div className="w-full flex justify-between items-start mt-[1vh] hidden md:block">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="text-customTextColor text-sm md:text-[0.9vw]">
                  <span>Rotten&nbsp;Tomatoes</span>
                  <div className="flex items-center space-x-[2.5vw]">
                    {/* <div className="flex items-center mt-[1.5vh]"> */}
                    <div className="flex flex-col">
                      <div className="flex items-center mt-[1.5vh]">
                        {rottenTomatoesCritics && (
                          <img
                            className="w-[3vw] h-[3vh]"
                            src={`/genresIcons/${
                              rottenTomatoesCritics >= 60
                                ? "Rotten_Tomatoes_Critics_Positive.svg"
                                : "icons8-rotten-tomatoes.svg"
                            }`}
                            alt="Rotten Tomatoes Icon"
                          />
                        )}
                        <span className="ml-[0.5vw] text-[0.9vw] text-white text-bold">
                          {rottenTomatoesCritics !== null
                            ? `${rottenTomatoesCritics}%`
                            : "N/A"}
                        </span>
                      </div>
                      <h1 className="text-[0.7vw] mt-[0.5vw]">Critics</h1>
                    </div>
                    {/* </div> */}
                    {/* <div className="flex items-center mt-[1.5vh]"> */}
                    <div className="flex flex-col">
                      <div className="flex items-center mt-[1.5vh]">
                        {rottenTomatoesAudience && (
                          <img
                            className="w-[3vw] h-[3vh]"
                            src={`/genresIcons/${
                              rottenTomatoesAudience >= 60
                                ? "Rotten_Tomatoes_positive_audience.svg"
                                : "Rotten_Tomatoes_negative_audience.svg"
                            }`}
                            alt="Rotten Tomatoes Icon"
                          />
                        )}
                        <span className="ml-[0.5vw] text-[0.9vw] text-white text-bold pr-[2.5vw]">
                          {rottenTomatoesAudience !== null
                            ? `${rottenTomatoesAudience}%`
                            : "N/A"}
                        </span>
                      </div>

                      <h1 className="text-[0.7vw] mt-[0.5vw]">Audience</h1>
                    </div>
                    {/* </div> */}
                  </div>
                </div>
                <div className="text-customTextColor mt-5 md:mt-0 text-sm md:text-[0.9vw] md:ml-[1vw]">
                  iMDB
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <img
                        className="w-[2.4vw]"
                        src="/genresIcons/icons8-imdb.svg"
                        alt="Rotten Tomatoes Icon"
                      />
                      <span className="ml-[0.5vw] text-[0.9vw] text-white text-bold">
                        {imdb !== null ? imdb : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-customTextColor mt-5 md:mt-0 text-sm md:text-[0.9vw] md:ml-[5vw]">
                  Popularity
                  <div className="flex items-center mt-[0.8vh]">
                    <div className="flex items-center">
                      <img
                        className="w-[3vw] h-[3vh]"
                        src="/genresIcons/5c2d24739a206a1df3d19e60c801c494 1.svg"
                        alt="Popularity"
                      />
                      <span className="ml-[0.5vw] text-[0.9vw] text-white text-bold pr-[1vw]">
                        {tmdbScore
                          ? Math.round(tmdbScore * 10) / 10
                          : "Undefined"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-start mt-[2rem] md:mt-[6vh]">
            <Link href={`/${href}/${id}`}>
              <Button className="h-10 w-28 md:w-[8vw] md:h-[6vh] md:mr-[1vw] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500">
                View
                <SlArrowRight className="w-[2vw] h-[2vh] ml-6 md:ml-[2vw]" />
              </Button>
            </Link>

            <Button
              onClick={() => setIsAdded(!isAdded)}
              className={`h-10 w-28 md:w-[8vw] md:h-[6vh] md:mr-[1vw] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500 ${
                isAdded ? "bg-white/90 text-black" : ""
              }`}
            >
              Watchlist
              {isAdded ? (
                <IoCheckmark className="w-[2.5vw] h-[2.5vh] md:ml-[1vw]" />
              ) : (
                <LuPlus className="w-[2.5vw] h-[2.5vh] md:ml-[1vw]" />
              )}
            </Button>

            <Button
              onClick={() => setIsLiked(!isLiked)}
              className={`h-10 w-28 md:w-[8vw] md:h-[6vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500 ${
                isLiked ? "bg-white/90 text-black" : ""
              }`}
            >
              Like
              {isLiked ? (
                <AiFillLike className="w-[2.5vw] h-[2.5vh] ml-[2vw]" />
              ) : (
                <AiOutlineLike className="w-[2.5vw] h-[2.5vh] ml-[2vw]" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BigCard;
