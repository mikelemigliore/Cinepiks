import React, { useEffect, useState } from "react";
import MovieCard from "../cards/MovieCard";
import { GoDotFill } from "react-icons/go";
import Link from "next/link";
import { Button } from "../ui/button";
import { SlArrowRight } from "react-icons/sl";
import { IoCheckmark } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaPlay } from "react-icons/fa";
import YoutubeTrailerPlayer from "../trailer/YoutubeTrailerPlayer";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import StarRating from "../starRating/StarRating";
import {
  useGetDirectorQuery,
  useGetMovieCastQuery,
  useGetMovieCertificationQuery,
  useGetMovieDetailsQuery,
  useGetMovieTrailerQuery,
} from "@/app/features/homepage/movies/moviedetailsSlice";
import { useGetRatingsQuery } from "@/app/features/ratingsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/features/store";
import handleLikeBtn from "@/utils/handleLikeBtn";
import handleWatchlistBtn from "@/utils/handleWatchlistBtn";
import { useSession } from "next-auth/react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useGetScoreQuery } from "@/app/features/score/scoreSlice";

interface GenresType {
  id: number;
  tag: string;
}

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  title?: string;
  poster_path: string;
  media_type: string;
  backdrop_path: string;
  name?: string;
  overview?: string;
  genre_ids?: number[];
}

interface ListViewProp {
  filter?: boolean;
  media_type: string;
  poster_path: string;
  title?: string;
  overview: string;
  backdrop_path: string;
  list?: boolean;
  watchlist?: boolean;
  watched?: boolean;
  mediaType?: string;
  id: number;
  isDesktop: boolean;
  isLoadingContent: boolean;
}

interface CastMember {
  name: string;
}

function ListView({
  filter,
  list,
  watchlist,
  watched,
  id,
  media_type,
  poster_path,
  title,
  overview,
  backdrop_path,
  mediaType,
  isDesktop,
  isLoadingContent,
}: ListViewProp) {
  const [isAdded, setIsAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [scores, setScores] = useState<Record<number, number | null>>({});
  const [isTrailer, setIsTrailer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isListView, setIsListView] = useState(true);
  const [genres, setGenres] = useState<Genre[]>([]);
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
  const [runtime, setRuntime] = useState();
  const [director, setDirector] = useState();
  const [cast, setCast] = useState<CastMember[]>([]);
  const [videoKey, setVideoKey] = useState("");

  const [value, setValue] = React.useState<number>(0);

  const { data: session }: any = useSession();

  const href = media_type === "movie" ? `/singlemovie` : `/singleseries`;

  const { data: movieDetails } = useGetMovieDetailsQuery(id || 0);

  const { data: rating } = useGetRatingsQuery(imdbId || "");

  const { data: movieCertification } = useGetMovieCertificationQuery(id || 0);
  const { data: movieDirector } = useGetDirectorQuery(id || 0);

  const { data: movieCast } = useGetMovieCastQuery(id || 0);

  const { data: movieTrailer } = useGetMovieTrailerQuery(id || 0);

  const dispatch = useDispatch();
  const likesdb = useSelector((state: RootState) => state.content.likes);

  const watchlistdb = useSelector(
    (state: RootState) => state.content.watchlist
  );

  //const scoredb = useSelector((state: RootState) => state.content.score);
  const { data: scoreDB, isSuccess: scoreSucces } = useGetScoreQuery({});

  useEffect(() => {
    const Liked = likesdb.map((like) => like.id).includes(id);

    const Watchlisted = watchlistdb
      .map((watchlist) => watchlist.id)
      .includes(id);

    const Score = scoreDB?.map((score: any) => score.id).includes(id);

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
      const res = scoreDB.filter((item: any) => {
        return item.id === id;
      });

      setValue(res[0].score);
    } else {
      setValue(0);
    }
  }, [id, scoreDB]);

  useEffect(() => {
    if (movieDetails) {
      setGenres(movieDetails?.genres || []);
      setRuntime(movieDetails?.runtime || "N/A");
      setTMDbScore(movieDetails?.vote_average || null);
      setImdbId(movieDetails.imdb_id || null);
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

    if (movieDirector) {
      setDirector(movieDirector || {});
    }

    if (movieTrailer) {
      setVideoKey(movieTrailer.key);
    }

    if (movieCast) {
      setCast(movieCast);
    }
  }, [movieDetails, rating, movieDirector, movieCast]);

  const handleReload = () => {};

  const handleEnd = () => {};

  const handleExpand = () => {};

  const handleFullscreen = () => {};

  const handlePlay = () => {};

  const handleLike = async () => {
    handleLikeBtn(dispatch, setIsLiked, isLiked, id, media_type);
  };

  const handleAdded = async () => {
    handleWatchlistBtn(dispatch, setIsAdded, isAdded, id, media_type);
  };

  const handleScoreChange = (movieId: number, newValue: number | null) => {
    setScores((prevScores) => ({
      ...prevScores,
      [movieId]: newValue,
    }));
  };

  const handleValue = (newValue: number) => {
    if (newValue !== null) {
      setValue(newValue);
    } else {
      setValue(0);
    }
  };
  const formatRuntime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div
      className={`flex flex-col gap-y-[5vh] mt-[2vh] mb-[5vh] transition-all duration-700 ease-in-out ${
        filter ? "" : ""
      }`}
    >
      <div className="flex flex-col w-full">
        <div
          className={`md:flex w-full m-[1vw] transition-transform duration-700`}
        >
          {!isDesktop ? (
            <div className="flex">
              <MovieCard
                type={media_type}
                imgUrl={poster_path}
                list={list}
                id={id}
              />

              <div className="flex flex-col justify-center gap-[3vh] content-between p-[1vw] ml-[10vw]">
                <div>
                  <div className="">
                    <div className="flex">
                      <div className=" text-[3.5vw]">Your Score</div>
                      <StarRating
                        title={title}
                        value={value}
                        handleValue={handleValue}
                        id={id}
                        mediaType={media_type}
                        session={session}
                      />
                    </div>

                    <div className="flex items-end text-[4vw] mt-[1vh]">
                      <img
                        className="mr-[0.5vw] w-[6vw] h-[6vw]"
                        src="genresIcons/icons8-star.svg"
                      />{" "}
                      <div className="z-[50]">{value ? value : "--"} / 5</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-[3.5vw]">Director</h2>
                  <span className="text-[3.5vw] text-customTextColor">
                    {director}
                  </span>
                </div>
                <div>
                  <h2 className="text-[3.5vw]">Starring</h2>
                  <span className="text-[3.5vw] text-customTextColor">
                    {cast[0]?.name},
                    <br />
                    {cast[1]?.name},
                    <br />
                    {cast[2]?.name}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <MovieCard
              type={media_type}
              imgUrl={poster_path}
              list={list}
              id={id}
            />
          )}

          <div className="flex">
            <div className="flex flex-col pl-[3vw]">
              {/* Movie info here */}
              <h2 className="md:text-[1.5vw] text-[5vw] font-bold">{title}</h2>
              <div className="text-center">
                <div className="flex justify-start items-center text-customTextColor font-bold md:text-[0.7vw] text-[3vw] ">
                  <span> {genres[0]?.name || "Undefined"}</span>
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
                    {runtime !== undefined ? formatRuntime(runtime) : "N/A"}
                  </span>
                </div>
              </div>
              <div>
                <p className="mt-[1vh] text-white text-[3.5vw] md:text-[0.9vw]  max-w-[23rem] md:max-w-[33vw] line-clamp-4 leading-[2] md:leading-[2]">
                  {overview}
                </p>
              </div>

              <div className="flex items-center justify-center md:justify-start mt-[2rem] md:mt-[2vh] md:mb-[2vh] md:space-x-[0.5vw] space-x-[3vw]">
                <Link href={`${href}/${id}`}>
                  <Button
                    className={`h-[6vh] w-28 md:w-[6vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500 ${
                      watched ? "" : "md:mr-[0vw]"
                    }`}
                  >
                    View
                    <SlArrowRight className="md:w-[2vw] md:h-[2vh] ml-6 md:ml-[1vw]" />
                  </Button>
                </Link>

                {watched ? (
                  ""
                ) : (
                  <Button
                    onClick={() => handleAdded()}
                    disabled={session === null}
                    className={`h-[6vh] w-28 md:w-[7vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500 ${
                      isAdded ? "bg-white/90 text-black font-bold" : ""
                    }`}
                  >
                    Watchlist
                    {isAdded ? (
                      <IoCheckmark className="md:w-[2vw] md:h-[2vh] w-[4vw] h-[4vh] ml-2 md:ml-[0.4vw]" />
                    ) : (
                      <LuPlus className="md:w-[2vw] md:h-[2vh] w-[4vw] h-[4vh] ml-2 md:ml-[0.4vw]" />
                    )}
                  </Button>
                )}

                <Dialog>
                  <DialogTrigger
                    onClick={() => setIsTrailer(!isTrailer)}
                    className={`${
                      !isDesktop ? `hidden` : ``
                    }  flex justify-center items-center h-10 w-28 md:pl-[0.4vw] md:w-[6vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500`}
                  >
                    Trailer
                    <FaPlay className="w-[2vw] h-[2vh] md:ml-[0.4vw]" />
                  </DialogTrigger>
                  <DialogContent className="md:w-[70vw] md:h-[40vw]">
                    <VisuallyHidden>
                      <DialogTitle></DialogTitle>
                    </VisuallyHidden>
                    <YoutubeTrailerPlayer
                      handlePlay={handlePlay}
                      videoKey={videoKey}
                      setIsLoading={setIsLoading}
                      handleReload={handleReload}
                      handleEnd={handleEnd}
                      isListView={isListView}
                      src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
                      isDesktop={isDesktop}
                    />
                  </DialogContent>
                </Dialog>

                <Button
                  type="submit"
                  onClick={() => handleLike()}
                  disabled={session === null}
                  className={`flex justify-center items-center h-[6vh] w-28  md:pl-[1vw] md:w-[6vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500 ${
                    isLiked ? "bg-white/90 text-black font-bold" : ""
                  }`}
                >
                  Like
                  {isLiked ? (
                    <AiFillLike className="md:w-[2vw] md:h-[2vh] w-[4vw] h-[4vh] ml-2 md:ml-[0.4vw]" />
                  ) : (
                    <AiOutlineLike className="md:w-[2vw] md:h-[2vh] w-[4vw] h-[4vh] ml-2 md:ml-[0.4vw]" />
                  )}
                </Button>
              </div>
              <div className="w-[22vw]">
                <div className="w-full mt-[1vw] hidden md:block">
                  <h1 className="text-white text-base md:text-[0.9vw]">
                    Ratings
                  </h1>
                </div>

                <div className="w-full flex justify-between items-start mt-[1vh] hidden md:block">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="text-customTextColor text-sm md:text-[0.9vw]">
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
                          <h1 className="text-[0.7vw] mt-[0.5vw]">Critics</h1>
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

                          <h1 className="text-[0.7vw] mt-[0.5vw]">Audience</h1>
                        </div>
                      </div>
                    </div>
                    <div className="text-customTextColor mt-5 md:mt-0 text-sm md:text-[0.9vw] md:ml-[2vw]">
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
            </div>
            {isDesktop && (
              <div className="flex flex-col gap-[9vh] content-between p-[1vw] ml-[10vw]">
                <div>
                  <div className="">
                    <div className="flex">
                      <div className=" text-[1vw]">Your Score</div>
                      <StarRating
                        title={title}
                        value={value}
                        handleValue={handleValue}
                        id={id}
                        mediaType={media_type}
                        session={session}
                      />
                    </div>

                    <div className="flex items-end text-[1vw] mt-[1vh]">
                      <img
                        className="mr-[0.5vw] w-[1.7vw] h-[1.7vw]"
                        src="genresIcons/icons8-star.svg"
                      />{" "}
                      {value ? value : "--"} / 5<div></div>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-[0.9vw]">Director</h2>
                  <span className="text-[0.9vw] text-customTextColor">
                    {director}
                  </span>
                </div>
                <div>
                  <h2 className="text-[0.9vw]">Starring</h2>
                  <span className="text-[0.9vw] text-customTextColor">
                    {cast[0]?.name},
                    <br />
                    {cast[1]?.name},
                    <br />
                    {cast[2]?.name}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full h-[0.1vh] mt-[2vh] bg-white/20"></div>
      </div>
    </div>
  );
}

export default ListView;
