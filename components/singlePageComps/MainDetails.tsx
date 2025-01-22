
"use client";
import { useState } from "react";
import YoutubeTrailerPlayer from "@/components/trailer/YoutubeTrailerPlayer";
import React from "react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { FaFacebook, FaLink, FaPlay } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import MovieCard from "@/components/cards/MovieCard";
import { IoCheckmark } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AiFillInstagram, AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import StarRating from "@/components/starRating/StarRating";
import { useGetRatingsQuery } from "@/app/features/ratingsSlice";
import {
  useGetMovieDetailsQuery,
  useGetMovieCertificationQuery,
  useGetSocialsQuery,
  useGetDirectorQuery,
} from "@/app/features/homepage/movies/moviedetailsSlice";
import {
  useGetImdbIdQuery,
  useGetSeriesCertificationQuery,
  useGetSeriesDetailsQuery,
  useGetSeriesRuntimeQuery,
  useGetSeriesSocialsQuery,
} from "@/app/features/homepage/series/seriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/features/store";
import handleLikeBtn from "@/utils/handleLikeBtn";
import handleWatchlistBtn from "@/utils/handleWatchlistBtn";
import handleScoreBtn from "@/utils/handleScoreBtn";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton from Shadcn/UI

interface SeriesProp {
  id: number;
  title: string;
  imgUrl: string;
}

interface GenresProp {
  id: number;
  name: string;
}

interface SocialsProp {
  id: number;
  imdb_id: string;
  wikidata_id: string;
  facebook_id: string;
  instagram_id: string;
  twitter_id: string;
}

interface CastProp {
  character: string;
  id: number;
  name: string;
  picture: string;
}

interface MainDetailsProps {
  id: number;
  title: string;
  className?: string; // Optional className prop
  isPartialSlide?: boolean; // Optional prop to indicate if it's a partial slide
  isLastThreeSlides?: boolean;
  isLastOne?: boolean;
  list?: boolean;
  handlePlay: () => void;
  videoKey: string;
  handleReload: () => void;
  handleEnd: () => void;
  setIsLoading: (loading: boolean) => void;
  imdbId?: string;
  cast?: CastProp[];
  type: string;
  isDesktop: boolean;
  isLoading: boolean;
}

interface ImdbIdProp {
  rating: number;
}

function MainDetails({
  id,
  videoKey,
  handlePlay,
  handleReload,
  handleEnd,
  setIsLoading,
  title,
  imdbId,
  cast = [],
  type,
  isDesktop,
  isLoading,
}: //single
MainDetailsProps) {
  const [rottenTomatoesAudience, setRottenTomatoesAudience] = useState();
  const [rottenTomatoesCritics, setRottenTomatoesCritics] = useState();
  const [imdb, setIMDb] = useState();
  const [poster, setPoster] = useState<string>("");
  const [genres, setGenres] = useState<GenresProp[]>([]);
  const [certification, setCertification] = useState("");
  const [runtime, setRuntime] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [tmdbScore, setTMDbScore] = useState();
  const [socials, setSocials] = useState<SocialsProp>();
  const [homepage, setHomePage] = useState<string | null>(null);
  const [director, setDirector] = useState();
  const [single, setSingleMedia] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isListView, setIsListView] = useState(true);
  const [value, setValue] = React.useState<number>(0);
  const [imdbIdSeries, setImdbIdSeries] = useState("");

  const { data: rating } = useGetRatingsQuery(imdbId || "");

  const { data: movieDetails } = useGetMovieDetailsQuery(id || 0);

  const { data: movieCertification } = useGetMovieCertificationQuery(id || 0);

  const { data: movieSocials } = useGetSocialsQuery(id || 0);

  const { data: movieDirector } = useGetDirectorQuery(id || 0);

  //const { data: seriesImdbId } = useGetImdbIdQuery(id || 0);

  const { data: seriesDetails } = useGetSeriesDetailsQuery(id || 0);

  const { data: seriesCertification } = useGetSeriesCertificationQuery(id || 0);

  const { data: seriesRuntime } = useGetSeriesRuntimeQuery(id || 0);

  const { data: seriesSocials } = useGetSeriesSocialsQuery(id || 0);

  const dispatch = useDispatch();
  const likesdb = useSelector((state: RootState) => state.content.likes);

  const watchlistdb = useSelector(
    (state: RootState) => state.content.watchlist
  );

  const scoredb = useSelector((state: RootState) => state.content.score);

  useEffect(() => {
    const Liked = likesdb.map((like) => like.id).includes(id);
    //console.log("Liked", Liked);

    const Watchlisted = watchlistdb
      .map((watchlist) => watchlist.id)
      .includes(id);
    //console.log("Liked", Liked);

    const Score = scoredb.map((score) => score.id).includes(id);

    // console.log("SCPRE", Score);

    // console.log("scoredb", scoredb);

    if (Liked) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }

    if (Watchlisted) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }

    if (Score) {
      const res = scoredb.filter((item: any) => {
        return item.id === id;
      });
      console.log("RES", res);

      setValue(res[0].score);
    } else {
      setValue(0);
    }
  }, [id]); // Run only once when the component mounts or id changes

  useEffect(() => {
    if (type === "movie") {
      if (movieDetails) {
        setPoster(movieDetails?.poster_path || "");
        setGenres(movieDetails?.genres || []);
        setRuntime(movieDetails?.runtime || "N/A");
        setDescription(movieDetails?.overview || "No description available");
        setTMDbScore(movieDetails?.vote_average || null);
        setHomePage(movieDetails?.homepage || "");
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

      if (movieSocials) {
        setSocials(movieSocials || {});
      }

      if (movieDirector) {
        setDirector(movieDirector || {});
      }
    } else {
      if (seriesDetails) {
        setPoster(seriesDetails?.poster_path || "");
        setGenres(seriesDetails?.genres || []);
        setDescription(seriesDetails?.overview || "No description available");
        setTMDbScore(seriesDetails?.vote_average || null);
        setHomePage(seriesDetails?.homepage || "");
        setDirector(seriesDetails?.created_by?.[0]?.name || "N/A");
      }

      if (seriesCertification) {
        setCertification(seriesCertification || "Not Rated");
      }

      if (seriesRuntime) {
        setRuntime(seriesRuntime || null);
      }

      if (seriesSocials) {
        setSocials(seriesSocials || {});
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
  }, [
    movieDetails,
    rating,
    seriesDetails,
    seriesCertification,
    seriesRuntime,
    seriesSocials,
  ]);

  const handleLike = async () => {
    handleLikeBtn(dispatch, setIsLiked, isLiked, id, type);
  };

  const handleAdded = async () => {
    handleWatchlistBtn(dispatch, setIsAdded, isAdded, id, type);
  };

  const handleValue = (newValue: number) => {
    if (newValue !== null) {
      setValue(newValue);
    } else {
      setValue(0);
    }
  };

  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";

  const formatRuntime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60); // Get the hours
    const remainingMinutes = minutes % 60; // Get the remaining minutes
    return hours ? `${hours}h ${remainingMinutes}m` : `${remainingMinutes}m`;
  };

  const formatTitle = (title: string): string => {
    return title
      .toLowerCase() // Convert to lowercase
      .replace(/[^a-z0-9\s]/g, "") // Remove special characters (non-alphanumeric except spaces)
      .replace(/\s+/g, "_"); // Replace spaces with underscores
  };

  return (
    <div
      className={`md:flex w-full transition-transform duration-700 justify-center`}
      //style={{ width: "12.6vw", height: "40vh" }}
    >
      {!isDesktop ? (
        <div className="flex ml-[3vw]">
          {isLoading ? (
            <>
              <Skeleton className="w-[52vw] h-[38vh] bg-backgroundButton md:h-[40vh] md:w-[16.8vw] rounded-3xl" />
              <Skeleton className="w-[35vw] h-[38vh] bg-backgroundButton md:h-[40vh] md:w-[16.8vw] rounded-3xl md:ml-[0vw] ml-[5vw]" />
            </>
          ) : (
            <>
              <MovieCard
                type={type}
                imgUrl={`${BASE_IMAGE_URL}${poster}`}
                single={single}
                id={id}
              />
              <div className="flex flex-col gap-[3vh] content-between  ml-[11vw]">
                <div>
                  <div className="">
                    <div className="flex">
                      <div className=" md:text-[1vw] text-[1vw] text-[3.5vw] z-[50]">
                        Your Score
                      </div>
                      <StarRating
                        title={title}
                        value={value}
                        handleValue={handleValue}
                        id={id}
                        mediaType={type}
                      />
                    </div>

                    <div className="flex items-end md:text-[1vw] text-[4vw] mt-[1vh]">
                      <img
                        className="mr-[0.5vw] md:w-[1.7vw] md:h-[1.7vw] w-[6vw] h-[6vw] z-[50]"
                        src="/genresIcons/icons8-star.svg"
                      />{" "}
                      <div className="md:text-[1vw] z-[50]">
                        {value ? value : "--"} / 5
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="md:text-[1vw] text-[3.5vw]">Director</h2>
                  <span className="md:text-[1vw] text-[3.5vw] text-customTextColor">
                    {director}
                  </span>
                </div>
                <div>
                  <h2 className="md:text-[1vw] text-[3.5vw]">Starring</h2>
                  <span className="md:text-[1vw] text-[3.5vw] text-customTextColor">
                    {cast[0]?.name},
                    <br />
                    {cast[1]?.name},
                    <br />
                    {cast[2]?.name}
                  </span>
                </div>
                <div>
                  <h2 className="md:text-[1vw] text-[3.5vw] mb-[1vh]">
                    Socials
                  </h2>
                  <div className="text-customTextColor flex space-x-[2vw]">
                    <Link
                      href={homepage ? homepage : "N/A"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLink className="md:w-[1.5vw] md:h-[1.5vw] w-[6vw] h-[6vw] mr-[0.5vw]" />
                    </Link>
                    <Link
                      href={`${
                        socials
                          ? `https://www.facebook.com/${socials.facebook_id}`
                          : `N/A`
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebook className="md:w-[1.5vw] md:h-[1.5vw] w-[6vw] h-[6vw] mr-[0.5vw]" />
                    </Link>
                    <Link
                      href={`${
                        socials ? `https://x.com/${socials.twitter_id}` : `N/A`
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaXTwitter className="md:w-[1.5vw] md:h-[1.5vw] w-[6vw] h-[6vw] mr-[0.5vw]" />
                    </Link>
                    <Link
                      href={`${
                        socials
                          ? `https://www.instagram.com/${socials.instagram_id}`
                          : `N/A`
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <AiFillInstagram className="md:w-[1.5vw] md:h-[1.5vw] w-[6vw] h-[6vw]" />
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          {isLoading ? (
            <Skeleton className="w-[52vw] h-[33vh] bg-backgroundButton md:h-[40vh] md:w-[16.8vw] rounded-3xl" />
          ) : (
            <MovieCard
              type={type}
              imgUrl={`${BASE_IMAGE_URL}${poster}`}
              single={single}
              id={id}
            />
          )}
        </>
      )}

      <div className="flex">
        <div className="flex flex-col pl-[3vw] z-[50]">
          {/* Movie info here */}
          {isLoading ? (
            <Skeleton className="w-[65vw] h-[9vh] bg-backgroundButton md:h-[10vh] md:w-[25vw] rounded-3xl md:my-[0vw] my-[2vw]" />
          ) : (
            <>
              <h2 className="md:w-[34vw] w-[93vw]   md:text-[2vw] text-[5vw] font-bold line-clamp-1">
                {title}
              </h2>
              <div className="text-center">
                <div className="flex flex-wrap justify-start items-center text-customTextColor font-bold md:text-[0.9vw] text-[3vw]">
                  <span>{genres[0]?.name || "Undefined"}</span>
                  <GoDotFill className="bg-customTextColor w-1.5 h-1.5 md:mx-[0.4vw] mx-[1vw] rounded-full" />
                  <span>{genres[1]?.name || "Undefined"}</span>
                  <GoDotFill className="bg-customTextColor w-1.5 h-1.5 md:mx-[0.4vw] mx-[1vw] rounded-full" />
                  <span className="md:pr-[0.6vw] pr-[3vw]">
                    {genres[2]?.name || "Undefined"}
                  </span>
                  <span className="md:mx-[0.6vw] mx-[2vw] text-customTextColor font-bold">
                    {certification}
                  </span>
                  <span className="mx-[0.6vw] text-customTextColor font-bold">
                    {type === "series"
                      ? runtime
                        ? `Average per episode: ${formatRuntime(runtime)}`
                        : "N/A"
                      : runtime
                      ? formatRuntime(runtime)
                      : "N/A"}
                  </span>
                </div>
              </div>
            </>
          )}
          {isLoading ? (
            <Skeleton className="w-[90vw] h-[23vh] bg-backgroundButton md:h-[15vh] md:w-[34vw] rounded-3xl md:mt-[1vw]" />
          ) : (
            <div>
              <p className="mt-[1vh] text-white text-base md:text-[1vw]  max-w-[23rem] md:max-w-[33vw] line-clamp-4 leading-[2] md:leading-[2]">
                {description}
              </p>
            </div>
          )}

          {!isDesktop && (
            <div className="w-full">
              <div className="w-full mt-[6vw]">
                <h1 className="text-white md:text-[1vw] text-[4vw] font-bold">
                  Ratings
                </h1>
              </div>

              {/* Box for Three Titles */}
              <div className="w-full flex justify-between items-start mt-[1.7vh]">
                <div className="flex justify-between">
                  <div className="text-customTextColor md:text-[1vw] text-[4vw]">
                    <Link
                      href={`https://www.rottentomatoes.com/m/${formatTitle(
                        title
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Rotten&nbsp;Tomatoes</span>
                      <div className="flex items-center space-x-[2.5vw] md:space-x-[0vw]">
                        <div className="flex flex-col">
                          <div className="flex items-center mt-[1.5vh]">
                            {rottenTomatoesCritics && (
                              <img
                                className="md:w-[3vw] md:h-[3vh] w-[7vw] h-[7vh]"
                                src={`/genresIcons/${
                                  rottenTomatoesCritics >= 60
                                    ? "Rotten_Tomatoes_Critics_Positive.svg"
                                    : "icons8-rotten-tomatoes.svg"
                                }`}
                                alt="Rotten Tomatoes Icon"
                              />
                            )}
                            <span className="ml-[2vw] md:text-[1vw] text-[4vw] text-white text-bold">
                              {rottenTomatoesCritics !== null
                                ? `${rottenTomatoesCritics}%`
                                : "N/A"}
                            </span>
                          </div>
                          <h1
                            className={`md:text-[1vw] text-[3.5vw] ${
                              rottenTomatoesCritics === null
                                ? "mb-[-0.5vw] mt-[0.5vw]"
                                : "mt-[0.5vw]"
                            }`}
                          >
                            Critics
                          </h1>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center mt-[1.5vh]">
                            {rottenTomatoesAudience && (
                              <img
                                className="md:w-[3vw] md:h-[3vh] w-[7vw] h-[7vh]"
                                src={`/genresIcons/${
                                  rottenTomatoesAudience >= 60
                                    ? "Rotten_Tomatoes_positive_audience.svg"
                                    : "Rotten_Tomatoes_negative_audience.svg"
                                }`}
                                alt="Rotten Tomatoes Icon"
                              />
                            )}
                            <span className="ml-[2vw] md:text-[1vw] text-[4vw] text-white text-bold pr-[2.5vw]">
                              {rottenTomatoesAudience !== null
                                ? `${rottenTomatoesAudience}%`
                                : "N/A"}
                            </span>
                          </div>

                          <h1
                            className={`md:text-[1vw] text-[3.5vw] ${
                              rottenTomatoesAudience === null
                                ? "mb-[-0.5vw] mt-[0.5vw]"
                                : "mt-[0.5vw]"
                            }`}
                          >
                            Audience
                          </h1>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <Link
                    href={`https://www.imdb.com/title/${imdbId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="text-customTextColor mt-0 md:text-[1vw] text-[4vw] md:ml-[0vw] ml-[4vw]">
                      iMDB
                      <div className="flex items-center mt-[2.8vh]">
                        <img
                          className=" md:w-[4vw] w-[10vw]"
                          src="/genresIcons/icons8-imdb.svg"
                          alt="Rotten Tomatoes Icon"
                        />
                        <span className="ml-[2vw] md:text-[1vw] text-[4vw] text-white text-bold">
                          {imdb !== null ? imdb : "N/A"}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="text-customTextColor mt-0 md:text-[1vw] text-[4vw] ml-[8vw] md:ml-[0vw]">
                    <Link
                      href={`https://www.themoviedb.org/movie/${id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Popularity
                      <div className="flex items-center mt-[1.5vh]">
                        <div className="flex items-center">
                          <img
                            className="md:w-[3vw] md:h-[3vh] w-[8vw] h-[8vh]"
                            src="/genresIcons/5c2d24739a206a1df3d19e60c801c494 1.svg"
                            alt="Popularity"
                          />
                          <span className="ml-[2vw] md:text-[1vw] text-[4vw] text-white text-bold pr-[1vw]">
                            {tmdbScore
                              ? Math.round(tmdbScore * 10) / 10
                              : "Undefined"}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="ml-[0vw]  flex items-center justify-center md:justify-start mt-[2rem] md:mt-[3vh] md:mb-[2vh] md:space-x-[0.5vw] space-x-[2vw]">
            <Button
              onClick={() => handleAdded()}
              className={` h-[7vh] w-48 md:w-[7vw] md:h-[5vh] rounded-full text-[4vw] md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500 ${
                isAdded ? "bg-white/90 text-black font-bold" : ""
              }`}
            >
              Watchlist
              {isAdded ? (
                <IoCheckmark className="md:w-[2.5vw] md:h-[2.5vh] w-[6vw] h-[6vh] md:ml-[0.4vw] ml-[4vw]" />
              ) : (
                <LuPlus className="md:w-[2.5vw] md:h-[2.5vh] w-[6vw] h-[6vh] md:ml-[0.4vw] ml-[4vw]" />
              )}
            </Button>

            <Dialog>
              <DialogTrigger
                className={`${
                  !isDesktop ? `hidden` : ``
                } flex justify-center items-center h-10 w-28 md:pl-[0.4vw] md:w-[6vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500`}
              >
                Trailer
                <FaPlay className="w-[2vw] h-[2vh] md:ml-[0.4vw]" />
              </DialogTrigger>
              <DialogContent className="md:w-[70vw] md:h-[40vw]">
                <YoutubeTrailerPlayer
                  //VideoEnd={handleVideoEnd}
                  handlePlay={handlePlay}
                  videoKey={videoKey}
                  setIsLoading={setIsLoading}
                  handleReload={handleReload}
                  handleEnd={handleEnd}
                  isListView={isListView}
                  src={
                    "https://image.tmdb.org/t/p/original/f8JTWmelQEDUqujwCeVeS7Jn10b.jpg"
                  }
                  isDesktop={isDesktop}
                />
              </DialogContent>
            </Dialog>

            <Button
              onClick={() => handleLike()}
              className={`flex justify-center items-center h-[7vh] w-48  md:pl-[1vw] md:w-[6vw] md:h-[5vh] rounded-full text-[4vw] md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500 ${
                isLiked ? "bg-white/90 text-black font-bold" : ""
              }`}
            >
              Like
              {isLiked ? (
                <AiFillLike className="md:w-[2.5vw] md:h-[2.5vh] w-[6vw] h-[6vh] md:ml-[0.4vw] ml-[4vw]" />
              ) : (
                <AiOutlineLike className="md:w-[2.5vw] md:h-[2.5vh] w-[6vw] h-[6vh] md:ml-[0.4vw] ml-[4vw]" />
              )}
            </Button>
          </div>
          {/* Box for Ratings */}
          {isDesktop && (
            <div className="w-[22vw]">
              {isLoading ? (
                <Skeleton className="w-[52vw] h-[33vh] bg-backgroundButton md:h-[15vh] md:w-[34vw] rounded-3xl md:mt-[1vw]" />
              ) : (
                <>
                  <div className="w-full mt-[2vw] hidden md:block">
                    <h1 className="text-white text-base md:text-[1vw]">
                      Ratings
                    </h1>
                  </div>

                  {/* Box for Three Titles */}
                  <div className="w-full flex justify-between items-start mt-[1.7vh] hidden md:block">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="text-customTextColor text-sm md:text-[1vw]">
                        <Link
                          href={`https://www.rottentomatoes.com/m/${formatTitle(
                            title
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>Rotten&nbsp;Tomatoes</span>
                          <div className="flex items-center space-x-[2.5vw]">
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
                              <h1
                                className={`text-[0.7vw] ${
                                  rottenTomatoesCritics === null
                                    ? "mb-[-0.5vw] mt-[0.5vw]"
                                    : "mt-[0.5vw]"
                                }`}
                              >
                                Critics
                              </h1>
                            </div>
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

                              <h1
                                className={`text-[0.7vw] ${
                                  rottenTomatoesAudience === null
                                    ? "mb-[-0.5vw] mt-[0.5vw]"
                                    : "mt-[0.5vw]"
                                }`}
                              >
                                Audience
                              </h1>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <Link
                        href={`https://www.imdb.com/title/${imdbId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="text-customTextColor mt-5 md:mt-0 text-sm md:text-[1vw] md:ml-[1vw]">
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
                      </Link>
                      <div className="text-customTextColor mt-5 md:mt-0 text-sm md:text-[1vw] md:ml-[5vw]">
                        <Link
                          href={`https://www.themoviedb.org/movie/${id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Popularity
                          <div className="flex items-center mt-[0.8vh]">
                            <div className="flex items-center">
                              <img
                                className="w-[3vw] h-[3vh]"
                                src="/genresIcons/5c2d24739a206a1df3d19e60c801c494 1.svg"
                                alt="Popularity"
                              />
                              <span className="ml-[0.5vw] text-[1vw] text-white text-bold pr-[1vw]">
                                {tmdbScore
                                  ? Math.round(tmdbScore * 10) / 10
                                  : "Undefined"}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {isDesktop && (
          <div className="flex flex-col gap-[6vh] content-between  ml-[11vw]">
            {isLoading ? (
              <Skeleton className="w-[52vw] h-[33vh] bg-backgroundButton md:h-[55vh] md:w-[10vw] rounded-3xl md:mt-[1vw]" />
            ) : (
              <>
                <div>
                  <div className="">
                    <div className="flex">
                      <div className=" text-[1vw] z-[50]">Your Score</div>
                      <StarRating
                        title={title}
                        value={value}
                        handleValue={handleValue}
                        id={id}
                        mediaType={type}
                      />
                    </div>

                    <div className="flex items-end text-[1vw] mt-[1vh]">
                      <img
                        className="mr-[0.5vw] w-[1.7vw] h-[1.7vw] z-[50]"
                        src="/genresIcons/icons8-star.svg"
                      />{" "}
                      <div className="z-[50]">{value ? value : "--"} / 5</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-[1vw]">Director</h2>
                  <span className="text-[1vw] text-customTextColor">
                    {director}
                  </span>
                </div>
                <div>
                  <h2 className="text-[1vw]">Starring</h2>
                  <span className="text-[1vw] text-customTextColor">
                    {cast[0]?.name},
                    <br />
                    {cast[1]?.name},
                    <br />
                    {cast[2]?.name}
                  </span>
                </div>
                <div>
                  <h2 className="text-[1vw] mb-[1vh]">Socials</h2>
                  <div className="text-customTextColor flex">
                    <Link
                      href={homepage ? homepage : "N/A"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLink className="w-[1.5vw] h-[1.5vw] mr-[0.5vw]" />
                    </Link>
                    <Link
                      href={`${
                        socials
                          ? `https://www.facebook.com/${socials.facebook_id}`
                          : `N/A`
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebook className="w-[1.5vw] h-[1.5vw] mr-[0.5vw]" />
                    </Link>
                    <Link
                      href={`${
                        socials ? `https://x.com/${socials.twitter_id}` : `N/A`
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaXTwitter className="w-[1.5vw] h-[1.5vw] mr-[0.5vw]" />
                    </Link>
                    <Link
                      href={`${
                        socials
                          ? `https://www.instagram.com/${socials.instagram_id}`
                          : `N/A`
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <AiFillInstagram className="w-[1.5vw] h-[1.5vw]" />
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MainDetails;
