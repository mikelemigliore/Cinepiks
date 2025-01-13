"use client";
import { useState } from "react";
import React from "react";
import { useEffect } from "react";
import SinglePageMainTrailer from "@/components/singlePageComps/SinglePageMainTrailer";
import MainDetails from "@/components/singlePageComps/MainDetails";
import SeriesTracker from "@/components/singlePageComps/SeriesTracker";
import { useParams, useSearchParams } from "next/navigation";
import {
  useGetSeriesDetailsQuery,
  useGetTrailerSeriesVideoQuery,
  useGetSeriesCastQuery,
  useGetImdbIdQuery,
  useGetSeriesEpisodesQuery,
} from "@/app/features/homepage/series/seriesSlice";
import TagsHowToWatch from "@/components/tags/TagsHowToWatch";
import HowToWatchCard from "@/components/cards/HowToWatchCard";
import TagsHighToLow from "@/components/tags/TagsHighToLow";
import Reviews from "@/components/reviews/Reviews";
import MoreInfo from "@/components/moreinfo/MoreInfo";
import CastSwiper from "@/components/carousel/CastSwiper";
import MoreLikeThisSwiper from "@/components/carousel/MoreLikeThisSwiper";
import RecommendationSwiper from "@/components/carousel/RecommendationSwiper";
import { useGetSeasonQuery } from "@/app/features/season/seasonSlice";
import { useDispatch, useSelector } from "react-redux";
import { setSeasonData } from "@/app/features/dbSlice";
import handleSeasonBtn from "@/utils/handleSeasonBtn";
import { RootState } from "@/app/features/store";

const series = [
  {
    id: 1,
    title: "Dragon Ball Super",
    imgUrl:
      "https://image.tmdb.org/t/p/original/8xc6QcxN8ZOCW4lo4IpVNm3VqKt.jpg",
  },
];

interface Episode {
  id: string;
  episode: number;
  title: string;
  duration: string;
  score: string;
  img: string;
  description: string;
  date: string;
}

interface Season {
  season: number;
  name: string;
  poster: string;
  voteAverage: number;
  episodes: Episode[];
}

type FilterKey = "all" | "buy" | "rent" | "subscription";

function SingleSeriesPage() {
  const [selectedSeason, setSelectedSeason] = useState<number>(1); // Start with season 1

  const [watchedEpisodes, setWatchedEpisodes] = useState<number[]>([]);

  //const [videoKey4, setVideoKey4] = useState("BAQvCB3Fnm0");
  const [autoplay, setAutoplay] = useState(true);
  const [play, setPlay] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [unmute, setUnmute] = useState(false);
  const [pause, setPause] = useState(false);
  const [reload, setReload] = useState(false);
  const [isAdded, setIsAdded] = useState<Record<number, boolean>>({});
  const [isTrailer, setIsTrailer] = useState(false);
  const [isLiked, setIsLiked] = useState<Record<number, boolean>>({});
  const [singleseries, setSingleseries] = useState(true);
  const [isListView, setIsListView] = useState(true);
  const [reviews, setReviews] = useState(true);
  const [value, setValue] = React.useState<number | null>(0);
  const type = "series";
  const [videoKey, setVideoKey] = useState("");
  const [backdrop, setBackdrop] = useState();
  const [title, setTitle] = useState("");
  const [imdbId, setImdbId] = useState("");
  const [cast, setCast] = useState([]);
  const [seasons, setSeason] = useState<Season[]>([]);
  const [seasonsReal, setSeasonReal] = useState([]);
  const [seasonEp, setSeasonEp] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    all: true,
    buy: false,
    rent: false,
    subscription: false,
  });
  const [hightolow, setHightolow] = useState(true);
  const [lowtohigh, setLowtohigh] = useState(false);
  const [missingSection, setMissingSetion] = useState(false);

  const dispatch = useDispatch();

  const toggleFilter = (filter: FilterKey) => {
    setSelectedFilters((prev) => ({
      all: filter === "all",
      buy: filter === "buy", //If filter === "buy", the logic in the toggleFilter function will set buy to true while ensuring all other filters (all, rent, subscription) are set to false
      rent: filter === "rent",
      subscription: filter === "subscription",
    }));
  };

  const params = useParams();
  const { id } = params;
  const Id = Number(id);

  const { data: seriesDetails } = useGetSeriesDetailsQuery(Id);

  const { data: seriesTrailer } = useGetTrailerSeriesVideoQuery(Id);

  const { data: seriesCast } = useGetSeriesCastQuery(Id);

  const { data: seriesId } = useGetImdbIdQuery(Id);

  const { data: seasonsData } = useGetSeriesEpisodesQuery({
    Id,
    selectedSeason,
  });

  //console.log("watchedEpisodes", watchedEpisodes);

  //const seasondb = useSelector((state: RootState) => state.content.season);

  const { data: seasonDB, isSuccess: seasonSucces } = useGetSeasonQuery({});

  // Fetch movie details when IDs are available
  useEffect(() => {
    //console.log("SeasonDB", seasonDB);

    const fetchMovieDetails = async () => {
      try {
        const data = seasonDB.filter((item: any) => item.seriesId === Id);
        //console.log("data",data);
        if (data.length > 0) {
          const res = data
            .filter((item: any) => item.seasonNumber === selectedSeason)
            .map((item: any) => item.episodes);

          //console.log("res", res[0]);
          //setProgress(seasonDB[0].progress);
          dispatch(setSeasonData(seasonDB));
          handleEpisodeWatched(res[0] || []); // ✅ Ensuring an empty object as fallback
          // setWatchedEpisodes(res[0]);
          //console.log("watchedEpisodes", watchedEpisodes.length);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [seasonDB]); // Trigger only when the movie IDs are fetched

  useEffect(() => {
    if (seriesDetails) {
      setBackdrop(seriesDetails?.backdrop_path);
      setTitle(seriesDetails?.name);

      const filteredSeasons = seriesDetails?.seasons.filter((season: any) => {
        return season.season_number > 0;
      });
      setSeasonReal(filteredSeasons);
    }

    if (seriesTrailer) {
      setVideoKey(seriesTrailer?.key);
    }

    if (seriesId) {
      setImdbId(seriesId);
    }

    if (seriesCast) {
      setCast(seriesCast);
    }

    if (seasonsData) {
      setSeasonEp(seasonsData);
    }
  }, [Id, seriesDetails, seriesTrailer, seriesId, seriesCast, seasonsData]);

  useEffect(() => {
    if (seasonsReal && seasonEp && selectedSeason) {
      // Combine the data dynamically
      const combinedSeasons = seasonsReal.map((season: any) => ({
        season: season.season_number,
        name: season.name,
        poster: `https://image.tmdb.org/t/p/original${season.poster_path}`,
        voteAverage: season.vote_average,
        episodes: seasonEp.map((episode: any) => ({
          id: `s${season.season_number}e${episode.episode_number}`,
          episode: episode.episode_number,
          title: episode.name,
          duration: `${episode.runtime} min`,
          score: `${Math.round(episode.vote_average * 10)}%`,
          img: `https://image.tmdb.org/t/p/original${episode.still_path}`,
          description: episode.overview,
          date: episode.air_date,
        })),
      }));
      //console.log(combinedSeasons);

      setSeason(combinedSeasons);
    }
  }, [seasonsReal, seasonEp, selectedSeason]);

  const handleValue = (newValue: number | null) => {
    if (newValue !== null) {
      setValue(newValue);
    } else {
      setValue(0);
    }
  };

  const handleAdded = (movieId: number) => {
    setIsAdded((prevAdded) => ({
      ...prevAdded,
      [movieId]: !prevAdded[movieId],
    }));
  };

  const handleLike = (movieId: number) => {
    setIsLiked((prevLiked) => ({
      ...prevLiked,
      [movieId]: !prevLiked[movieId], // Toggle the like state for the specific movie
    }));
  };

  const handlePlay = () => {
    setPlay(true);
    setIsLoading(false); // Stop showing loading spinner once the video plays
    setPause(!pause);
  };

  const handlePause = () => {
    setPlay(false);
  };

  const handleEnd = () => {
    setPlay(false);
  };

  // Handle when video starts playing
  const handleReload = () => {
    setReload(false);
    setPause(false);
  };

  const handleUnmute = () => {
    setUnmute(!unmute);
  };

  const handleSetRelaod = () => {
    setUnmute(!unmute);
  };

  const handleHightolow = () => {
    setHightolow(true);
    setLowtohigh(false);
  };

  const handleLowtohigh = () => {
    setLowtohigh(true);
    setHightolow(false);
  };

  const handleEpisodeWatched = (episodeNumber: number) => {
    //setWatchedEpisodes(episodeNumber);
    setWatchedEpisodes(
      (prev) =>
        prev.includes(episodeNumber)
          ? prev.filter((ep) => ep !== episodeNumber) // If already watched, remove it
          : [...prev, episodeNumber] // If not watched, add it
    );
  };

  const handleOnValueChange = (value: any) => {
    setSelectedSeason(Number(value));
    setWatchedEpisodes([]);
  };

  const seasonEpisodes = seasons[selectedSeason - 1]?.episodes || []; // Use an empty array as a fallback
  // const progressValue =
  //   watchedEpisodes.length > 0 && seasonEpisodes.length > 0
  //     ? (watchedEpisodes.length / seasonEpisodes.length) * 100
  //     : 0;

  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";

  return (
    <div>
      <SinglePageMainTrailer
        handlePlay={handlePlay}
        play={play}
        unmute={unmute}
        pause={pause}
        reload={reload}
        handleReload={handleReload}
        handleEnd={handleEnd}
        autoplay={autoplay}
        videoKey={videoKey}
        setIsLoading={setIsLoading}
        src={`${BASE_IMAGE_URL}${backdrop}`}
        isLoading={isLoading}
        handleUnmute={handleUnmute}
        handlePause={handlePause}
        handleSetRelaod={handleSetRelaod}
      />
      <div
        className={`min-h-screen ${
          missingSection ? `mb-[100vw]` : `mb-[125vw]`
        }`}
      >
        <div
          className={`w-full mt-[-6vw] z-[50] absolute transition-transform duration-700 ease-in-out ${
            play ? "translate-y-[7vw]" : ""
          }`}
        >
          <div className="flex flex-col">
            <MainDetails
              id={Id}
              title={title}
              media={series}
              type={type}
              imdbId={imdbId}
              cast={cast}
              handlePlay={handlePlay}
              videoKey={videoKey}
              setIsLoading={setIsLoading}
              handleReload={handleReload}
              handleEnd={handleEnd}
            />
            <SeriesTracker
              handleOnValueChange={handleOnValueChange}
              selectedSeason={selectedSeason}
              seasons={seasons}
              //progressValue={progressValue}
              episodes={seasonEpisodes}
              watchedEpisodes={watchedEpisodes}
              onEpisodeWatched={handleEpisodeWatched}
              Id={Id}
            />
            <div className="flex gap-[6vw] mt-[3vw] h-[22vw] w-full justify-center ml-[2vw]">
              <div className="h-[2vw]">
                <div className="text-[1vw]">How To Watch</div>
                <div className="mb-[2vh] mt-[1vh]">
                  <TagsHowToWatch
                    selectedFilters={selectedFilters}
                    toggleFilter={toggleFilter}
                  />
                </div>
                <div className="w-full">
                  <HowToWatchCard
                    id={Id}
                    selectedFilters={selectedFilters}
                    type={type}
                  />
                </div>
              </div>
              <div className="h-[2vw]">
                <div className="text-[1vw]">Reviews</div>
                <div className="my-[1vh] mb-[2vh]">
                  <TagsHighToLow
                    hightolow={hightolow}
                    lowtohigh={lowtohigh}
                    handleHightolow={handleHightolow}
                    handleLowtohigh={handleLowtohigh}
                  />
                </div>
                <div className="w-full h-[22vw]">
                  <Reviews
                    id={Id}
                    hightolow={hightolow}
                    lowtohigh={lowtohigh}
                    type={type}
                  />
                </div>
              </div>
            </div>
            <div className="h-[6vw] mt-[10vw] bg-buttonColor rounded-[1vw] max-w-[76vw] ml-[13vw]">
              <div className="text-[1vw] mt-[-2vw]">More Info</div>
              <MoreInfo id={Id} type={type} />
            </div>
            <div className="mt-[4vw] max-w-[75vw] ml-[13vw]">
              <CastSwiper cast={cast} />
            </div>
            <div className="max-w-[75vw] ml-[13vw] h-[0.1vh] mt-[4vh] bg-white/20"></div>
            <div className="mt-[6vw]">
              <MoreLikeThisSwiper
                //collection={wholeCollection}
                id={Id}
                mediaType={"series"}
              />
            </div>
            <div>
              <RecommendationSwiper
                id={Id}
                mediaType={"series"}
                setMissingSetion={setMissingSetion}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleSeriesPage;
