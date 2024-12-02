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
  getTrending,
  getTrendingSeries,
  getUpcoming,
} from "../pages/api/homePage";

function HomePage() {
  // Define an array of movies with their title and poster URLs
  const [bigCard, setBigCard] = useState(true);
  const [inTheaters, setInTheaters] = useState([]);
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

  // const services = [
  //   { id: 1, title: "Netflix"},
  //   { id: 2, title: "Hulu"},
  //   { id: 3, title: "Prime Video"},
  //   { id: 4, title: "Apple Tv" },
  //   { id: 5, title: "Disney+"},
  //   { id: 6, title: "Max"},
  //   { id: 7, title: "Peacock"},
  //   { id: 8, title: "Paramount+" },
  //   { id: 11, title: "Fandango"},
  // ]

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
    // { id: 8, title: "Sci-fi", iconBlack: "/genresIcons/icons8-stormtrooper.svg" , iconWhite:"/genresIcons/icons8-stormtrooper-white.svg" },
    // { id: 9, title: "Drama", iconBlack: "/genresIcons/icons8-theatre-curtain.svg" , iconWhite:"/genresIcons/icons8-theatre-curtain-white.svg" },
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

  const itemBigCards = [
    {
      id: 1,
      type: "movie",
      title: "Alien",
      imgUrl:
        "https://image.tmdb.org/t/p/original/6vn6K9oX82i6E86ZiHVxqVEMQqP.jpg",
      genres1: "Action",
      genres2: "Comedy",
      genres3: "Drama",
      rated: "R",
      time: "2h 36m",
      description:
        "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
    },
    {
      id: 2,
      type: "movie",
      title: "Spider-Man 3",
      imgUrl:
        "https://image.tmdb.org/t/p/original/vQszsOCuIKQguZGWutjuxVDJpwh.jpg",
      genres1: "Action",
      genres2: "Comedy",
      genres3: "Drama",
      rated: "R",
      time: "2h 36m",
      description:
        "The seemingly invincible Spider-Man goes up against an all-new crop of villains—including the shape-shifting Sandman. While Spider-Man’s superpowers are altered by an alien organism, his alter ego, Peter Parker, deals with nemesis Eddie Brock and also gets caught up in a love triangle.",
    },
    {
      id: 3,
      type: "movie",
      title: "Avengers: Infinity War",
      imgUrl:
        "https://image.tmdb.org/t/p/original/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg",
      genres1: "Action",
      genres2: "Comedy",
      genres3: "Drama",
      rated: "R",
      time: "2h 36m",
      description:
        "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.",
    },
    {
      id: 4,
      type: "movie",
      title: "The Batman",
      imgUrl:
        "https://image.tmdb.org/t/p/original/tRS6jvPM9qPrrnx2KRp3ew96Yot.jpg",
      genres1: "Action",
      genres2: "Comedy",
      genres3: "Drama",
      rated: "R",
      time: "2h 36m",
      description:
        "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
    },
    {
      id: 5,
      type: "movie",
      title: "Avatar:The Way of Water",
      imgUrl:
        "https://image.tmdb.org/t/p/original/wMMyNUjyvy4U68nrrMkwLwg3GU3.jpg",
      genres1: "Action",
      genres2: "Comedy",
      genres3: "Drama",
      rated: "R",
      time: "2h 36m",
      description:
        "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
    },
    {
      id: 6,
      type: "series",
      title: "Breaking Bad",
      imgUrl:
        "https://image.tmdb.org/t/p/original/gc8PfyTqzqltKPW3X0cIVUGmagz.jpg",
      genres1: "Action",
      genres2: "Comedy",
      genres3: "Drama",
      rated: "R",
      time: "2h 36m",
      description:
        "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
    },
    {
      id: 7,
      type: "series",
      title: "The Penguin",
      imgUrl:
        "https://image.tmdb.org/t/p/original/56O2drADoJPtv9Z49jKZoBNyMc5.jpg",
      genres1: "Action",
      genres2: "Comedy",
      genres3: "Drama",
      rated: "R",
      time: "2h 36m",
      description:
        "The seemingly invincible Spider-Man goes up against an all-new crop of villains—including the shape-shifting Sandman. While Spider-Man’s superpowers are altered by an alien organism, his alter ego, Peter Parker, deals with nemesis Eddie Brock and also gets caught up in a love triangle.",
    },
    {
      id: 8,
      type: "series",
      title: "Dragon Ball Super",
      imgUrl:
        "https://image.tmdb.org/t/p/original/x0dLoNI0ce7GXIwGiMu0GrelxEv.jpg",
      genres1: "Action",
      genres2: "Comedy",
      genres3: "Drama",
      rated: "R",
      time: "2h 36m",
      description:
        "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.",
    },
    {
      id: 9,
      type: "series",
      title: "Loki",
      imgUrl:
        "https://image.tmdb.org/t/p/original/1pPcHpANG5mGtSYT7MA9QeYOKuK.jpg",
      genres1: "Action",
      genres2: "Comedy",
      genres3: "Drama",
      rated: "R",
      time: "2h 36m",
      description:
        "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
    },
    {
      id: 10,
      type: "series",
      title: "The Office",
      imgUrl:
        "https://image.tmdb.org/t/p/original/b7wyaeJGU2Q4ql7xZr52vdW5TKp.jpg",
      genres1: "Action",
      genres2: "Comedy",
      genres3: "Drama",
      rated: "R",
      time: "2h 36m",
      description:
        "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
    },
  ];

  const moviesBigCard = itemBigCards.filter((item) => item.type === "movie");
  const seriesBigSeries = itemBigCards.filter((item) => item.type === "series");

  //   const [isLogged, setIsLogged] = useState(false);

  //   const handleLoginIn = () =>{
  //     setIsLogged(true)
  //   }

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
        //console.log(dataTrendingSeries.shows[0].tmdbId);

        //setItemsGenres(dataGenres.genres);

        // console.log(dataNewReleases);
        // console.log(dataTrendingSeries);

        setPopularMovies(dataPopular);
        setInTheaters(dataInTheaters.results);
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

        // // Extract numeric tmdbId values
        // const ids = dataTrendingSeries.shows.map((item:any) => {
        //   return parseInt(item.tmdbId.split("/")[1], 10); // Convert to number
        // });
        // //console.log(ids);

        // setTmdbId(ids); // Save IDs in state
      } catch (error) {
        console.error("Error fetching carousel items:", error);
      }
    };

    fetchData(); // Call the async function
  }, []);

  // function normalizeMediaData(mediaArray, keyMapping) {
  //   return mediaArray.map((media) => {
  //     const normalizedMedia = { ...media };
  //     // Map `file_path` to `poster_path` if needed
  //     if (keyMapping.file_path && media[keyMapping.file_path]) {
  //       normalizedMedia.poster_path = media[keyMapping.file_path];
  //     }
  //     return normalizedMedia;
  //   });
  // }

  return (
    <div className="relative">
      {/* {isLogged ? ( */}
      <div>
        <MainCarousel />
        <div className="relative -mt-[26rem] md:-mt-[9rem]">
          {/* {swiperTitles.map((swiperTitle, index) => ( */}
          <div
            //key={swiperTitle.id}
            className="relative left-0 my-12 right-0 z-40"
          >
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
              <BigCardSwiper itemBigCards={moviesBigCard} />
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
              mediaType={"movie"}
            />

            <MovieSwiper
              medias={trendingSeries}
              title={swiperTitle[5].title}
              mediaType={"movie"}
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

            <div className="relative left-0 right-0 my-16 z-40">
              <BigCardSwiper itemBigCards={moviesBigCard} />
            </div>

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


            <MovieSwiper
              //itemsGenres={itemsGenres}
              medias={inTheaters}
              title={swiperTitle[13].title}
              mediaType={"movie"}
            />

            {/* <MovieSwiper
                medias={movies}
                title={swiperTitle.title}
                mediaType={"movie"}
              /> */}

            {/* {index === 3 && (
                <div className="relative  left-0 right-0 my-16 z-40">
                  <ServicesSwiper services={services} />
                </div>
              )}

              {index === 7 && (
                <div className="relative left-0 right-0 my-16 z-40">
                  <GenresSwiper genres={genres} />
                </div>
              )}

              {index === 0 && (
                <div className="relative left-0 right-0 my-16 z-40">
                  <MovieSwiper
                    //itemsGenres={itemsGenres}
                    medias={inTheaters}
                    title={swiperTitle.title}
                    mediaType={"movie"}
                  />
                  {/* <MovieSwiper
                    medias={series}
                    title={swiperTitle.title}
                    mediaType={"series"}
                  /> 
                </div>
              )}

              {index === 1 && (
                <div className="relative left-0 right-0 my-16 z-40">
                  <BigCardSwiper itemBigCards={moviesBigCard} />
                </div>
              )}

              {index === 11 && (
                <div className="relative left-0 right-0 my-16 z-40">
                  <BigCardSwiper itemBigCards={seriesBigSeries} />
                </div>
              )} */}
          </div>
          {/* ))} */}
        </div>
      </div>
      {/* ) : (
        <div>
          <LoginIn handleLoginIn={handleLoginIn} />
        </div>
      )} */}
    </div>
  );
}

export default HomePage;
