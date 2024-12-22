"use client";
import { useState } from "react";
import React from "react";
import { useEffect } from "react";
import SinglePageMainTrailer from "@/components/singlePageComps/SinglePageMainTrailer";
import MainDetails from "@/components/singlePageComps/MainDetails";
import SeriesTracker from "@/components/singlePageComps/SeriesTracker";
import { useParams } from "next/navigation";
// import {
//   getCast,
//   getImdbId,
//   getSeriesDetails,
//   getTrailerSeriesVideo,
// } from "@/app/pages/api/singleSeriesPage";
import {
  useGetSeriesDetailsQuery,
  useGetTrailerSeriesVideoQuery,
  useGetSeriesCastQuery,
  useGetImdbIdQuery,
} from "@/app/features/homepage/series/seriesSlice";

const seasons = [
  {
    season: 1,
    episodes: [
      {
        id: "s1e1",
        episode: 1,
        title:
          "How Dare You Do That to My Bulma! Vegeta's Metamorphosis of Fury!?",
        duration: "58 min",
        score: "96%",
        img: "https://image.tmdb.org/t/p/original/6BFIhumOY0SGhyHLFOiiowSKrAZ.jpg",
      },
      {
        id: "s1e2",
        episode: 2,
        title: "Goku Makes an Entrance! A Last Chance from Lord Beerus?",
        duration: "48 min",
        score: "88%",
        img: "https://image.tmdb.org/t/p/original/yjNrQ5SuNrrlIBQZ1ZG0qsOrFX5.jpg",
      },
      {
        id: "s1e3",
        episode: 3,
        title:
          "Thanks for Waiting, Lord Beerus! A Super Saiyan God is Born at Last! ",
        duration: "48 min",
        score: "90%",
        img: "https://image.tmdb.org/t/p/original/dtPbhwpbZcjLOahkKj2QXkeaUyd.jpg",
      },
      {
        id: "s1e4",
        episode: 4,
        title: "Show Us, Goku! The Power of a Super Saiyan God!",
        duration: "47 min",
        score: "86%",
        img: "https://image.tmdb.org/t/p/original/cyAEMV5X4N6cp5PTlqvAI8CBBrW.jpg",
      },
      {
        id: "s1e5",
        episode: 5,
        title: "Let's Keep Going, Lord Beerus! The Battle of Gods!",
        duration: "48 min",
        score: "87%",
        img: "https://image.tmdb.org/t/p/original/icjxZcyrPmDBcdO7jZWzLluxvzE.jpg",
      },
      {
        id: "s1e6",
        episode: 6,
        title:
          "The Universe Will Shatter? Clash! Destroyer vs. Super Saiyan God! ",
        duration: "48 min",
        score: "94%",
        img: "https://image.tmdb.org/t/p/original/9lpPjLqQFIzPyH0s1YFFOdCCRhZ.jpg",
      },
      {
        id: "s1e7",
        episode: 7,
        title: "Goku, Surpass Super Saiyan God!",
        duration: "47 min",
        score: "91%",
        img: "https://image.tmdb.org/t/p/original/fm8QV94N0JZajClb6AFli6N43vZ.jpg",
      },
    ],
  },
  {
    season: 2,
    episodes: [
      {
        id: "s2e1",
        episode: 1,
        title: "Revenge 'F'! A Cunning Trap is Set?",
        duration: "47 min",
        score: "92%",
        img: "https://image.tmdb.org/t/p/original/5Gc7Ood1kqq0eyGy4tPLziTTOAp.jpg",
      },
      {
        id: "s2e2",
        episode: 2,
        title: "Frieza and Frost! A Mutual Malevolence? ",
        duration: "47 min",
        score: "94%",
        img: "https://image.tmdb.org/t/p/original/qIEksVI5MxE594r0WCvPYeZiZW8.jpg",
      },
      {
        id: "s2e3",
        episode: 3,
        title:
          "The Mightiest Enemy Zeroes in on Goku! Launch the Knockout Spirit Bomb Now!",
        duration: "47 min",
        score: "89%",
        img: "https://image.tmdb.org/t/p/original/wFzggt1QbQz4R40kUc9G1d1fzPP.jpg",
      },
      {
        id: "s2e4",
        episode: 4,
        title: "Goku Enkindled! The Awakened One's New Ultra Instinct!",
        duration: "47 min",
        score: "88%",
        img: "https://image.tmdb.org/t/p/original/3Ztdp4838lSsJcpeY09SLH0IOnE.jpg",
      },
      {
        id: "s2e5",
        episode: 5,
        title: "An Extra-Dimensional Ultimate Battle! Hit vs. Jiren!",
        duration: "47 min",
        score: "89%",
        img: "https://image.tmdb.org/t/p/original/dNHs7L1tjpchqzg5k9scd45BDM4.jpg",
      },
      {
        id: "s2e6",
        episode: 6,
        title: "A Saiyan Oath! Vegeta's Resolve!",
        duration: "47 min",
        score: "95%",
        img: "https://image.tmdb.org/t/p/original/cLRUObQtJlgaVfkkZzDExxWWLmJ.jpg",
      },
      {
        id: "s2e7",
        episode: 7,
        title: "With Great Joy! The Fighting Freak Saiyans' Battle Rejoined! ",
        duration: "47 min",
        score: "92%",
        img: "https://image.tmdb.org/t/p/original/uUHMCt0zYCR6fvEWD9gtVX69cxc.jpg",
      },
      {
        id: "s2e8",
        episode: 8,
        title: "Bloodcurdling! The Explosive Birth of a New Super Warrior!",
        duration: "47 min",
        score: "97%",
        img: "https://image.tmdb.org/t/p/original/dRapGRLPhmYbRngHVwjFKe9h6Bj.jpg",
      },
      {
        id: "s2e9",
        episode: 9,
        title: "Goku vs. Kefla! Super Saiyan Blue Beaten?",
        duration: "47 min",
        score: "96%",
        img: "https://image.tmdb.org/t/p/original/pRGvQP4Q96Sk8c46gloVQuB1jkD.jpg",
      },
      {
        id: "s2e10",
        episode: 10,
        title:
          "A Perfect Survival Strategy! The 3rd Universe's Menacing Assassin!",
        duration: "47 min",
        score: "91%",
        img: "https://image.tmdb.org/t/p/original/ucQOHxMVheMrfbL5eYYZNU52kam.jpg",
      },
      {
        id: "s2e11",
        episode: 11,
        title:
          "All-Out War! The Ultimate Four-Fold Union vs. the 7th Universe's Total Offensive! ",
        duration: "47 min",
        score: "94%",
        img: "https://image.tmdb.org/t/p/original/jpaZjRxvJztKqjasRSrT4qgwd0T.jpg",
      },
      {
        id: "s2e12",
        episode: 12,
        title: "Body, Soul and Power Unleashed! Goku and Vegeta!",
        duration: "47 min",
        score: "94%",
        img: "https://image.tmdb.org/t/p/original/AnB9kXVVTyhVEwsadU5jOf1iPN5.jpg",
      },
      {
        id: "s2e13",
        episode: 13,
        title:
          "The Greatest Showdown of All Time! The Ultimate Survival Battle!",
        duration: "47 min",
        score: "95%",
        img: "https://image.tmdb.org/t/p/original/6DOEwWxgMUkrgEcZEC2HNba73CQ.jpg",
      },
    ],
  },
];

const series = [
  {
    id: 1,
    title: "Dragon Ball Super",
    imgUrl:
      "https://image.tmdb.org/t/p/original/8xc6QcxN8ZOCW4lo4IpVNm3VqKt.jpg",
  },
];

function SingleSeriesPage() {
  const [selectedSeason, setSelectedSeason] = useState<number>(1); // Start with season 1
  const [watchedEpisodes, setWatchedEpisodes] = useState<{
    [episodeNumber: number]: boolean; //defines the type of the state, which is an object with numeric keys (episodeNumber) and boolean values.
    //The initial state is set to an empty object {}, meaning no episodes are marked as watched initially.
  }>({});

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
  //const [imdbIdSeries, setImdbIdSeries] = useState("");


  // Fetch call to TMDB to get the data I need for cast section, excellent example
  //const [cast, setCast] = useState([]);
  //const seriesId = 580489; // Example movie ID for Venom

  const params = useParams();
  const { id } = params;
  const Id = Number(id);

  const { data: seriesDetails } = useGetSeriesDetailsQuery(Id);

  const { data: seriesTrailer } = useGetTrailerSeriesVideoQuery(Id);

  const { data: seriesCast } = useGetSeriesCastQuery(Id);

  const { data: seriesId } = useGetImdbIdQuery(Id);

  useEffect(() => {

    if(seriesDetails){
      console.log(seriesDetails?.backdrop_path);
      
      setBackdrop(seriesDetails?.backdrop_path);
      setTitle(seriesDetails?.name);
    }

    if(seriesTrailer){
      setVideoKey(seriesTrailer?.key);
    }

    if(seriesId){
      setImdbId(seriesId);
    }

    if(seriesCast){
      setCast(seriesCast);
    }

  }, [Id, seriesDetails, seriesTrailer, seriesId, seriesCast]);


  // useEffect(() => {
  //   if (Id) {
  //     const fetchData = async () => {
  //       try {
  //         const response = await getSeriesDetails(Id);
  //         const responseTrailer = await getTrailerSeriesVideo(Id);
  //         const responseCast = await getCast(Id);
  //         const responseImdbId = await getImdbId(Id);
  //         const data = await response.json();
  //         const dataTrailer = await responseTrailer.json();
  //         const dataCast = await responseCast.json();
  //         const dataImdbId = await responseImdbId.json();

  //         // console.log(data.backdrop_path);
  //         // console.log(data.name);
  //         // console.log(dataTrailer.key);
  //         // console.log(dataImdbId);
  //         // console.log(dataCast);

  //         //console.log(dataImdbId);

  //         //setImdbIdSeries(dataImdbId || null);
  //         setBackdrop(data.backdrop_path);
  //         setTitle(data.name);
  //         setVideoKey(dataTrailer.key);
  //         setImdbId(dataImdbId || null);
  //         setCast(dataCast);
  //       } catch (error) {
  //         console.error("Failed to fetch:", error);
  //       }
  //     };
  //     fetchData();
  //   }
  // }, [Id]);


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

  const handleEpisodeWatched = (episodeNumber: number) => {
    setWatchedEpisodes((prevWatched) => ({
      //Calls setWatchedEpisodes, the function that updates the watchedEpisodes state.
      //The function takes prevWatched as an argument, which represents the previous state of watchedEpisodes.
      ...prevWatched, //Uses the spread operator ... to copy all previous entries in prevWatched to the new object. This ensures any existing data in the state is retained.
      [episodeNumber]: !prevWatched[episodeNumber], //Adds or updates the entry for episodeNumber in watchedEpisodes.
      // !prevWatched[episodeNumber] toggles the current value for this episode:
      // If it was true (watched), it becomes false.
      // If it was false or undefined (not watched), it becomes true
    }));
  };

  const handleOnValueChange = (value: any) => {
    setSelectedSeason(Number(value));
    setWatchedEpisodes({});
  };

  const seasonEpisodes = seasons[selectedSeason - 1].episodes;
  const progressValue = //retrieves an array of all the values in the watchedEpisodes object. Since watchedEpisodes stores episodes as keys with boolean values
    //(true for watched, false for not watched), this array contains only true and false values
    (Object.values(watchedEpisodes).filter(Boolean).length / //filters the array, keeping only true values. This effectively creates an array of episodes that have been watched.
      seasonEpisodes.length) * //counts the number of true values, which represents the total number of watched episodes.
    100;

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
      <div className="min-h-screen mb-[135vw] ">
        <div
          // className={`flex justify-center w-full mt-[-6vw] z-[50] absolute transition-transform duration-700 ease-in-out ${
          //   play ? "translate-y-[7vw]" : ""
          // }`}
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
              //single={singleseries}
              //handleAdded={handleAdded}
              //handleLike={handleLike}
              //isAdded={isAdded}
              handlePlay={handlePlay}
              videoKey={videoKey}
              setIsLoading={setIsLoading}
              handleReload={handleReload}
              handleEnd={handleEnd}
              //isListView={isListView}
              //value={value}
              //handleValue={handleValue}
              //isLiked={isLiked}
            />
            {/* <SeriesTracker
              handleOnValueChange={handleOnValueChange}
              selectedSeason={selectedSeason}
              seasons={seasons}
              progressValue={progressValue}
              episodes={seasonEpisodes}
              watchedEpisodes={watchedEpisodes}
              onEpisodeWatched={handleEpisodeWatched}
            /> */}
            {/* <div className="flex gap-[6vw] mt-[3vw] h-[22vw] w-full justify-center ml-[2vw]">
              <div className="h-[2vw]">
                <div className="text-[1vw]">How To Watch</div>
                <div className="mb-[2vh] mt-[1vh]">
                  <Tags />
                </div>
                <div className="w-full">
                  <HowToWatchCard />
                </div>
              </div>
              <div className="h-[2vw]">
                <div className="text-[1vw]">Reviews</div>
                <div className="my-[1vh] mb-[2vh]">
                  <Tags reviews={reviews} />
                </div>
                <div className="w-full h-[22vw]">
                  <Reviews />
                </div>
              </div>
            </div> */}
            {/* <div className="h-[6vw] mt-[10vw] bg-buttonColor rounded-[1vw] max-w-[76vw] ml-[13vw]">
              <div className="text-[1vw] mt-[-2vw]">More Info</div>
              <MoreInfo />
            </div>
            <div className="mt-[4vw] max-w-[75vw] ml-[13vw]">
              <CastSwiper cast={cast} />
            </div>
            <div className="max-w-[75vw] ml-[13vw] h-[0.1vh] mt-[4vh] bg-white/20"></div>
            <div className="mt-[6vw]">
              <MoreLikeThisSwiper />
            </div>
            <div>
              <RecommendationSwiper />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleSeriesPage;
