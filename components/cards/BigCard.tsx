import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { Button } from "../ui/button";
import { SlArrowRight } from "react-icons/sl";
import { LuPlus } from "react-icons/lu";
import { IoCheckmark } from "react-icons/io5";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useGetRatingsQuery } from "@/app/features/ratingsSlice";
import {
  useGetMovieCertificationQuery,
  useGetMovieDetailsQuery,
} from "@/app/features/homepage/movies/moviedetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/features/store";
import handleLikeBtn from "@/utils/handleLikeBtn";
import handleWatchlistBtn from "@/utils/handleWatchlistBtn";
import { signOut, useSession } from "next-auth/react";
import { useGetSeriesDetailsQuery } from "@/app/features/homepage/series/seriesSlice";

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
  seriesImdbId?: string;
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
  seriesImdbId,
}: BigCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [title, setTitle] = useState();
  const [image, setImage] = useState();
  const [runtime, setRuntime] = useState();
  const [description, setDescription] = useState();
  const [imdbId, setImdbId] = useState<string | null>(null);
  const [certification, setCertification] = useState();
  const [rottenTomatoesAudience, setRottenTomatoesAudience] = useState<
    number | null
  >(null);
  const [rottenTomatoesCritics, setRottenTomatoesCritics] = useState<
    number | null
  >(null);
  const [imdb, setIMDb] = useState<number | null>(null);
  const [tmdbScore, setTMDbScore] = useState<number | null>(null);
  const [likes, setLikes] = useState<number[]>([]);

  const { data: session }: any = useSession();

  const { data: movieDetails } = useGetMovieDetailsQuery(id || 0);

  const { data: seriesDetails } = useGetSeriesDetailsQuery(id || 0);

  const { data: rating } = useGetRatingsQuery(imdbId || "");

  const { data: movieCertification } = useGetMovieCertificationQuery(id || 0);

  const dispatch = useDispatch();
  const likesdb = useSelector((state: RootState) => state.content.likes);

  const watchlistdb = useSelector(
    (state: RootState) => state.content.watchlist
  );

  //Temporarly commented because it was causing an error
  useEffect(() => {
    //console.log(likesdb[0].id);

    const Liked = likesdb.map((like) => like.id).includes(id);
    if (Liked) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [id, likesdb]);

  useEffect(() => {
    const Watchlisted = watchlistdb
      .map((watchlist) => watchlist.id)
      .includes(id);
    //console.log("Liked", Liked);

    if (Watchlisted) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }
  }, [id, watchlistdb]); // Run only once when the component mounts or id changes

  useEffect(() => {
    if (mediaType === "movie") {
      if (movieDetails) {
        setGenres(movieDetails?.genres || []);
        setRuntime(movieDetails?.runtime || "N/A");
        setDescription(movieDetails?.overview || "No description available");
        setTMDbScore(movieDetails?.vote_average || null);
        setImdbId(movieDetails.imdb_id || null);
        setTitle(
          movieDetails.original_title || movieDetails.name || "Unknown Title"
        );
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
    } else {
      if (seriesDetails) {
        setGenres(seriesDetails?.genres || []);
        setRuntime(seriesDetails?.runtime || "N/A");
        setDescription(seriesDetails?.overview || "No description available");
        setTMDbScore(seriesDetails?.vote_average || null);
        setImdbId(seriesImdbId || null);
        setTitle(
          seriesDetails.original_title || seriesDetails.name || "Unknown Title"
        );
        setImage(seriesDetails.backdrop_path || null);
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
    }
  }, [rating, movieDetails, seriesDetails]);

  const formatRuntime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";

  const handleLike = async () => {
    handleLikeBtn(dispatch, setIsLiked, isLiked, id, mediaType);
  };

  const handleAdded = async () => {
    handleWatchlistBtn(dispatch, setIsAdded, isAdded, id, mediaType);
  };

  return (
    <div className="ml-2 md:ml-[3.5vw] bg-gradient-to-b md:bg-gradient-to-r from-customServicesColor via-customServicesColor/96 to-customColorBigCard w-[96vw] md:w-[90vw] h-[74vh] md:h-[71vh] rounded-3xl shadow-2xl">
      <div className="flex flex-col md:flex-row md:h-full h-[38rem]">
        {/* Left Side: Image */}
        <img
          className={`rounded-tl-3xl rounded-tr-3xl rounded-br-customMobile rounded-bl-customMobile md:rounded-tl-3xl md:rounded-bl-3xl md:rounded-tr-custom md:rounded-br-custom h-[18rem] md:h-full object-cover ${
            isPartialSlide ? "opacity-30 pointer-events-none" : ""
          }`}
          src={`${image ? `${BASE_IMAGE_URL}${image}` : `/placeHolder.jpg`}`}
        />

        {/* Right Side: Movie Info */}
        <div className="flex flex-col justify-center items-center ml-[1vw]">
          <div className="w-full md:w-[27vw] text-2xl md:text-[2.5vw] font-semibold text-center line-clamp-1 md:mt-[0vh] mt-[2vh]">
            {title}
          </div>

          {/* Add more info below the title */}
          <div className="md:mt-[2vh] text-center">
            <div className="flex justify-start items-center text-customTextColor font-bold md:text-[0.8vw] text-[3vw] md:space-x-[0.5vw] space-x-[2vw]">
              <span>{genres[0]?.name || "Undefined"}</span>
              <GoDotFill className="bg-customTextColor w-1.5 h-1.5 mx-[0.4vw] rounded-full" />
              <span>{genres[1]?.name || "Undefined"}</span>
              <GoDotFill className="bg-customTextColor w-1.5 h-1.5 mx-[0.4vw] rounded-full" />
              <span className="pr-[0.6vw]">
                {genres[2]?.name || "Undefined"}
              </span>
              {mediaType === "movie" && (
                <>
                  <span className="mx-[0.6vw] text-customTextColor font-bold">
                    {certification}
                  </span>
                  <span className="mx-[0.6vw] text-customTextColor font-bold">
                    {runtime !== undefined ? formatRuntime(runtime) : "N/A"}
                  </span>
                </>
              )}
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

          <div className="flex justify-center md:justify-start mt-[2rem] md:mt-[6vh] md:space-x-[1vw] space-x-[2vw]">
            <Link href={`/${href}/${id}`}>
              <Button className="h-12 w-28 md:w-[8vw] md:h-[6vh]  rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500">
                View
                <SlArrowRight className="w-[4vw] h-[4vh] md:w-[2vw] md:h-[2vh] ml-6 md:ml-[2vw]" />
              </Button>
            </Link>

            <Button
              onClick={() => handleAdded()}
              disabled={session === null}
              className={`h-12 w-28 md:w-[8vw] md:h-[6vh]  rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500 ${
                isAdded ? "bg-white/90 text-black" : ""
              }`}
            >
              Watchlist
              {isAdded ? (
                <IoCheckmark className="w-[4vw] h-[4vh] md:w-[2.5vw] md:h-[2.5vh] md:ml-[1vw]" />
              ) : (
                <LuPlus className="w-[4vw] h-[4vh] md:w-[2.5vw] md:h-[2.5vh] md:ml-[1vw]" />
              )}
            </Button>

            <Button
              onClick={() => handleLike()}
              disabled={session === null}
              className={`h-12 w-28 md:w-[8vw] md:h-[6vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500 ${
                isLiked ? "bg-white/90 text-black" : ""
              }`}
            >
              Like
              {isLiked ? (
                <AiFillLike className="w-[4vw] h-[4vh] md:w-[2.5vw] md:h-[2.5vh] ml-[2vw]" />
              ) : (
                <AiOutlineLike className="w-[4vw] h-[4vh] md:w-[2.5vw] md:h-[2.5vh] ml-[2vw]" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BigCard;

