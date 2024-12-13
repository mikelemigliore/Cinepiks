"use client";

import MainCarousel from "@/components/maincarousel/MainCarousel";
import React, { useEffect, useState } from "react";
import MovieSwiper from "@/components/carousel/MovieSwiper";
import ServicesSwiper from "@/components/carousel/ServicesSwiper";
import GenresSwiper from "@/components/carousel/GenresSwiper";
import BigCardSwiper from "@/components/carousel/BigCardSwiper";
import {
  getAction,
  getAdventure,
  getHorror,
  getNewOnHulu,
  getNewOnNetflix,
  getNewOnPrime,
  getNewReleases,
  getNowPlaying,
  getPopular,
  getThriller,
  getTrailerMovieVideo,
  getTrending,
  getTrendingSeries,
  getUpcoming,
} from "../pages/api/homePage";

function HomePage() {
  // Define an array of movies with their title and poster URLs
  const [bigCard, setBigCard] = useState(true);
  const [inTheaters, setInTheaters] = useState<any>([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [trending, setTrending] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [trendingSeries, setTrendingSeries] = useState([]);
  const [newOnNetflix, setNewOnNetflix] = useState([]);
  const [newOnHulu, setNewOnHulu] = useState([]);
  const [newOnPrime, setNewOnPrime] = useState([]);
  const [action, setAction] = useState([]);
  const [adventure, setAdventure] = useState([]);
  const [horror, setHorror] = useState([]);
  const [thriller, setThriller] = useState([]);
  const [tmdbId, setTmdbId] = useState([]);
  const [video, setVideo] = useState<number[]>([]); // Explicitly define the type

  const services = [
    { id: 1, title: "Netflix", img: "/genresIcons/netflix-3.svg" },
    { id: 2, title: "Hulu", img: "/genresIcons/Hulu-Logo.wine.svg" },
    {
      id: 3,
      title: "Prime Video",
      img: "/genresIcons/Amazon_Prime_Video_logo.svg.png",
    },
    {
      id: 4,
      title: "Apple Tv",
      img: "/genresIcons/apple-tv-plus-seeklogo.svg",
    },
    { id: 5, title: "Disney+", img: "/genresIcons/Disney+_2024.svg.png" },
    { id: 6, title: "Max", img: "/genresIcons/20230413031451!Max_logo.svg" },
    {
      id: 7,
      title: "Peacock",
      img: "/genresIcons/NBCUniversal_Peacock_Logo.svg",
    },
    { id: 8, title: "Paramount+", img: "/genresIcons/paramount-seeklogo.svg" },
    { id: 9, title: "Fandango", img: "/genresIcons/Fandango_logo14.png" },
  ];

  const swiperTitle = [
    { id: 1, title: "Upcoming" },
    { id: 2, title: "What's Popular" },
    { id: 3, title: "Now Playing" },
    { id: 4, title: "Trending Movies" },
    { id: 5, title: "What's New Series" },
    { id: 6, title: "Trending Series" },
    { id: 7, title: "New On Netflix" },
    { id: 8, title: "New On Hulu" },
    { id: 9, title: "New On PrimeVideo" },
    { id: 10, title: "Action" },
    { id: 11, title: "Adventure" },
    { id: 12, title: "Horror" },
    { id: 13, title: "Thriller" },
    { id: 14, title: "Crime Series" },
  ];

  const genres = [
    {
      id: 1,
      title: "Action",
      iconBlack: "/genresIcons/icons8-greek-helmet.svg",
      iconWhite: "/genresIcons/icons8-greek-helmet-white.svg",
    },
    {
      id: 2,
      title: "Adventure",
      iconBlack: "/genresIcons/icons8-worldwide-location.svg",
      iconWhite: "/genresIcons/icons8-worldwide-location-white.svg",
    },
    {
      id: 3,
      title: "Animated",
      iconBlack: "/genresIcons/icons8-animation.svg",
      iconWhite: "/genresIcons/icons8-animation-white.svg",
    },
    {
      id: 20,
      title: "Award Winner",
      iconBlack: "/genresIcons/icons8-award.svg",
      iconWhite: "/genresIcons/icons8-award-white.svg",
    },
    {
      id: 4,
      title: "Comedy",
      iconBlack: "/genresIcons/icons8-joker.svg",
      iconWhite: "/genresIcons/icons8-joker-white.svg",
    },
    {
      id: 5,
      title: "Crime",
      iconBlack: "/genresIcons/icons8-horror.svg",
      iconWhite: "/genresIcons/icons8-horror-white.svg",
    },
    {
      id: 6,
      title: "Family",
      iconBlack: "/genresIcons/icons8-family.svg",
      iconWhite: "/genresIcons/icons8-family-white.svg",
    },
    {
      id: 7,
      title: "Fantasy",
      iconBlack: "/genresIcons/icons8-witch's-hat.svg",
      iconWhite: "/genresIcons/icons8-witch's-hat-white.svg",
    },
    {
      id: 8,
      title: "Sci-fi",
      iconBlack: "/genresIcons/icons8-superman.svg",
      iconWhite: "/genresIcons/icons8-superman-white.svg",
    },
    {
      id: 9,
      title: "Drama",
      iconBlack: "/genresIcons/icons8-venetian-mask.svg",
      iconWhite: "/genresIcons/icons8-venetian-mask-white.svg",
    },
    {
      id: 10,
      title: "Horror",
      iconBlack: "/genresIcons/icons8-scream.svg",
      iconWhite: "/genresIcons/icons8-scream-white.svg",
    },
    {
      id: 11,
      title: "Thriller",
      iconBlack: "/genresIcons/icons8-spy.svg",
      iconWhite: "/genresIcons/icons8-spy-white.svg",
    },
    {
      id: 12,
      title: "Romance",
      iconBlack: "/genresIcons/icons8-rose.svg",
      iconWhite: "/genresIcons/icons8-rose-white.svg",
    },
    {
      id: 13,
      title: "History",
      iconBlack: "/genresIcons/icons8-colosseum.svg",
      iconWhite: "/genresIcons/icons8-colosseum-white.svg",
    },
    {
      id: 14,
      title: "Mystery",
      iconBlack: "/genresIcons/icons8-anonymous-mask.svg",
      iconWhite: "/genresIcons/icons8-anonymous-mask-white.svg",
    },
    {
      id: 15,
      title: "War",
      iconBlack: "/genresIcons/icons8-cannon.svg",
      iconWhite: "/genresIcons/icons8-cannon-white.svg",
    },
    {
      id: 16,
      title: "Western",
      iconBlack: "/genresIcons/icons8-cow-skull.svg",
      iconWhite: "/genresIcons/icons8-cow-skull-white.svg",
    },
    {
      id: 17,
      title: "Documentary",
      iconBlack: "/genresIcons/icons8-documentary.svg",
      iconWhite: "/genresIcons/icons8-documentary-white.svg",
    },
    {
      id: 18,
      title: "Music",
      iconBlack: "/genresIcons/icons8-music.svg",
      iconWhite: "/genresIcons/icons8-music-white.svg",
    },
    {
      id: 19,
      title: "Sport",
      iconBlack: "/genresIcons/icons8-soccer-ball.svg",
      iconWhite: "/genresIcons/icons8-soccer-ball-white.svg",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const responseGenres = await getGenres();
        const responsePopular = await getPopular();
        const responseInTheaters = await getUpcoming();
        const responseNowPlaying = await getNowPlaying();
        const responseTrending = await getTrending();
        const responseNewReleases = await getNewReleases();
        const responseTrendingSeries = await getTrendingSeries();
        const responseNewOnNetflix = await getNewOnNetflix();
        const responseNewOnHulu = await getNewOnHulu();
        const responseNewOnPrime = await getNewOnPrime();
        const responseAction = await getAction();
        const responseAdventure = await getAdventure();
        const responseHorror = await getHorror();
        const responseThriller = await getThriller();

        const dataPopular = await responsePopular.json();
        const dataInTheaters = await responseInTheaters.json();
        const dataNowPlaying = await responseNowPlaying.json();
        const dataTrending = await responseTrending.json();
        const dataNewReleases = await responseNewReleases.json();
        const dataTrendingSeries = await responseTrendingSeries.json();
        const dataNewOnNetflix = await responseNewOnNetflix.json();
        const dataNewOnHulu = await responseNewOnHulu.json();
        const dataNewOnPrime = await responseNewOnPrime.json();
        const dataAction = await responseAction.json();
        const dataAdventure = await responseAdventure.json();
        const dataHorror = await responseHorror.json();
        const dataThriller = await responseThriller.json();

        //IMPORTANT
        // Map over inTheaters and fetch the videoKey for each movie
        const updatedInTheaters = await Promise.all(
          dataInTheaters.results.map(async (media: any) => {
            try {
              const responseTrailer = await getTrailerMovieVideo(media.id);
              const dataTrailer = await responseTrailer.json();

              // Append the videoKey to the media object
              return { ...media, videoKey: dataTrailer?.key || "defaultKey" };
            } catch (error) {
              console.error(
                `Error fetching trailer for media ID ${media.id}:`,
                error
              );
              return { ...media, videoKey: "6ZfuNTqbHE8" }; // Add a fallback videoKey
            }
          })
        );
        console.log(updatedInTheaters);
        
        setInTheaters(updatedInTheaters);

        setPopularMovies(dataPopular);
        setNowPlaying(dataNowPlaying.results);
        setTrending(dataTrending.results);
        setNewReleases(dataNewReleases.results);
        setTrendingSeries(dataTrendingSeries);
        setNewOnNetflix(dataNewOnNetflix);
        setNewOnHulu(dataNewOnHulu);
        setNewOnPrime(dataNewOnPrime);
        setAction(dataAction.results);
        setAdventure(dataAdventure.results);
        setHorror(dataHorror);
        setThriller(dataThriller.results);
      } catch (error) {
        console.error("Error fetching carousel items:", error);
      }
    };

    fetchData(); // Call the async function
  }, []);

  return (
    <div className="relative">
      <div>
        <MainCarousel medias={inTheaters} />
        <div className="relative -mt-[26rem] md:-mt-[9rem]">
          <div className="relative left-0 my-12 right-0 z-40">
            <MovieSwiper
              //itemsGenres={itemsGenres}
              medias={inTheaters}
              title={swiperTitle[0].title}
              mediaType={"movie"}
            />

            <MovieSwiper
              //itemsGenres={itemsGenres}
              medias={popularMovies}
              title={swiperTitle[1].title}
              mediaType={"movie"}
            />

            <div className="relative left-0 right-0 my-16 z-40">
              <BigCardSwiper itemBigCards={popularMovies} mediaType={"movie"} />
            </div>

            <MovieSwiper
              //itemsGenres={itemsGenres}
              medias={nowPlaying}
              title={swiperTitle[2].title}
              mediaType={"movie"}
            />

            <MovieSwiper
              //itemsGenres={itemsGenres}
              medias={trending}
              title={swiperTitle[3].title}
              mediaType={"movie"}
            />
            <div className="relative  left-0 right-0 my-16 z-40">
              <ServicesSwiper services={services} />
            </div>

            <MovieSwiper
              //itemsGenres={itemsGenres}
              medias={newReleases}
              title={swiperTitle[4].title}
              mediaType={"series"}
            />

            <MovieSwiper
              medias={trendingSeries}
              title={swiperTitle[5].title}
              mediaType={"series"}
            />

            <div className="relative left-0 right-0 my-16 z-40">
              <GenresSwiper genres={genres} />
            </div>

            <MovieSwiper
              //itemsGenres={itemsGenres}
              medias={newOnNetflix}
              title={swiperTitle[6].title}
              mediaType={"movie"}
            />

            <MovieSwiper
              //itemsGenres={itemsGenres}
              medias={newOnHulu}
              title={swiperTitle[7].title}
              mediaType={"movie"}
            />

            <MovieSwiper
              //itemsGenres={itemsGenres}
              medias={newOnPrime}
              title={swiperTitle[8].title}
              mediaType={"movie"}
            />

            {/* <div className="relative left-0 right-0 my-16 z-40">
              <BigCardSwiper itemBigCards={moviesBigCard} />
            </div> */}

            <MovieSwiper
              //itemsGenres={itemsGenres}
              medias={action}
              title={swiperTitle[9].title}
              mediaType={"movie"}
            />

            <MovieSwiper
              //itemsGenres={itemsGenres}
              medias={adventure}
              title={swiperTitle[10].title}
              mediaType={"movie"}
            />

            <MovieSwiper
              //itemsGenres={itemsGenres}
              medias={horror}
              title={swiperTitle[11].title}
              mediaType={"movie"}
            />

            <MovieSwiper
              //itemsGenres={itemsGenres}
              medias={thriller}
              title={swiperTitle[12].title}
              mediaType={"movie"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
