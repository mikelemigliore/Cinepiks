// "use client";

// import MainCarousel from "@/components/maincarousel/MainCarousel";
// import React, { useEffect, useState } from "react";
// import MovieSwiper from "@/components/carousel/MovieSwiper";
// import ServicesSwiper from "@/components/carousel/ServicesSwiper";
// import GenresSwiper from "@/components/carousel/GenresSwiper";
// import BigCardSwiper from "@/components/carousel/BigCardSwiper";
// //import {
// //getAction,
// //getAdventure,
// //getHorror,
// //getNewOnHulu,
// //getNewOnNetflix,
// //getNewOnPrime,
// //getNewReleases,
// //getNowPlaying,
// //getPopular,
// //getThriller,
// //getTrailerMovieVideo,
// //getTrending,
// //getTrendingSeries,
// //getUpcoming,
// //} from "../pages/api/homePage";
// import {
//   useGetUpcomingQuery,
//   useGetPopularQuery,
//   useGetNowPlayingQuery,
//   useGetTrendingQuery,
//   //useGetNewReleasesQuery,
//   useGetActionMoviesQuery,
//   useGetAdventureMoviesQuery,
//   useGetHorrorMoviesQuery,
//   useGetThrillerMoviesQuery,
// } from "../features/homepage/movies/movieSlice";

// import {
//   useGetTrendingSeriesQuery,
//   useGetNewSeriesReleasesQuery,
// } from "../features/homepage/series/seriesSlice";
// import {
//   useGetNetflixMoviesQuery,
//   useGetHuluMoviesQuery,
//   useGetPrimeMoviesQuery,
// } from "../features/homepage/movies/moviesStreamServiceSlice";
// //import { useGetLikesQuery } from "../features/likes/likesSlice";
// //import { setLikes, setType } from "../features/dbSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../features/store";
// import { getLikes } from "../pages/api/likesPage";

// const services = [
//   { id: 8, title: "Netflix", img: "/genresIcons/netflix-3.svg" },
//   { id: 15, title: "Hulu", img: "/genresIcons/Hulu-Logo.wine.svg" },
//   {
//     id: 119,
//     title: "Prime Video",
//     img: "/genresIcons/Amazon_Prime_Video_logo.svg.png",
//   },
//   {
//     id: 350,
//     title: "Apple Tv",
//     img: "/genresIcons/apple-tv-plus-seeklogo.svg",
//   },
//   { id: 337, title: "Disney+", img: "/genresIcons/Disney+_2024.svg.png" },
//   { id: 384, title: "Max", img: "/genresIcons/20230413031451!Max_logo.svg" },
//   {
//     id: 387,
//     title: "Peacock",
//     img: "/genresIcons/NBCUniversal_Peacock_Logo.svg",
//   },
//   { id: 531, title: "Paramount+", img: "/genresIcons/paramount-seeklogo.svg" },
//   //{ id: 9, title: "Fandango", img: "/genresIcons/Fandango_logo14.png" },
// ];

// const swiperTitle = [
//   { id: 1, title: "Upcoming" },
//   { id: 2, title: "What's Popular" },
//   { id: 3, title: "Now Playing" },
//   { id: 4, title: "Trending Movies" },
//   { id: 5, title: "What's New Series" },
//   { id: 6, title: "Trending Series" },
//   { id: 7, title: "New On Netflix" },
//   { id: 8, title: "New On Hulu" },
//   { id: 9, title: "New On PrimeVideo" },
//   { id: 10, title: "Action" },
//   { id: 11, title: "Adventure" },
//   { id: 12, title: "Horror" },
//   { id: 13, title: "Thriller" },
//   { id: 14, title: "Crime Series" },
// ];

// const genres = [
//   {
//     id: 28,
//     title: "Action",
//     iconBlack: "/genresIcons/icons8-greek-helmet.svg",
//     iconWhite: "/genresIcons/icons8-greek-helmet-white.svg",
//   },
//   {
//     id: 12,
//     title: "Adventure",
//     iconBlack: "/genresIcons/icons8-worldwide-location.svg",
//     iconWhite: "/genresIcons/icons8-worldwide-location-white.svg",
//   },
//   {
//     id: 16,
//     title: "Animated",
//     iconBlack: "/genresIcons/icons8-animation.svg",
//     iconWhite: "/genresIcons/icons8-animation-white.svg",
//   },
//   {
//     id: 35,
//     title: "Comedy",
//     iconBlack: "/genresIcons/icons8-joker.svg",
//     iconWhite: "/genresIcons/icons8-joker-white.svg",
//   },
//   {
//     id: 80,
//     title: "Crime",
//     iconBlack: "/genresIcons/icons8-horror.svg",
//     iconWhite: "/genresIcons/icons8-horror-white.svg",
//   },
//   {
//     id: 10751,
//     title: "Family",
//     iconBlack: "/genresIcons/icons8-family.svg",
//     iconWhite: "/genresIcons/icons8-family-white.svg",
//   },
//   {
//     id: 14,
//     title: "Fantasy",
//     iconBlack: "/genresIcons/icons8-witch's-hat.svg",
//     iconWhite: "/genresIcons/icons8-witch's-hat-white.svg",
//   },
//   {
//     id: 878,
//     title: "Sci-fi",
//     iconBlack: "/genresIcons/icons8-superman.svg",
//     iconWhite: "/genresIcons/icons8-superman-white.svg",
//   },
//   {
//     id: 18,
//     title: "Drama",
//     iconBlack: "/genresIcons/icons8-venetian-mask.svg",
//     iconWhite: "/genresIcons/icons8-venetian-mask-white.svg",
//   },
//   {
//     id: 27,
//     title: "Horror",
//     iconBlack: "/genresIcons/icons8-scream.svg",
//     iconWhite: "/genresIcons/icons8-scream-white.svg",
//   },
//   {
//     id: 53,
//     title: "Thriller",
//     iconBlack: "/genresIcons/icons8-spy.svg",
//     iconWhite: "/genresIcons/icons8-spy-white.svg",
//   },
//   {
//     id: 10749,
//     title: "Romance",
//     iconBlack: "/genresIcons/icons8-rose.svg",
//     iconWhite: "/genresIcons/icons8-rose-white.svg",
//   },
//   {
//     id: 36,
//     title: "History",
//     iconBlack: "/genresIcons/icons8-colosseum.svg",
//     iconWhite: "/genresIcons/icons8-colosseum-white.svg",
//   },
//   {
//     id: 9648,
//     title: "Mystery",
//     iconBlack: "/genresIcons/icons8-anonymous-mask.svg",
//     iconWhite: "/genresIcons/icons8-anonymous-mask-white.svg",
//   },
//   {
//     id: 10752,
//     title: "War",
//     iconBlack: "/genresIcons/icons8-cannon.svg",
//     iconWhite: "/genresIcons/icons8-cannon-white.svg",
//   },
//   {
//     id: 37,
//     title: "Western",
//     iconBlack: "/genresIcons/icons8-cow-skull.svg",
//     iconWhite: "/genresIcons/icons8-cow-skull-white.svg",
//   },
//   {
//     id: 99,
//     title: "Documentary",
//     iconBlack: "/genresIcons/icons8-documentary.svg",
//     iconWhite: "/genresIcons/icons8-documentary-white.svg",
//   },
//   {
//     id: 10402,
//     title: "Music",
//     iconBlack: "/genresIcons/icons8-music.svg",
//     iconWhite: "/genresIcons/icons8-music-white.svg",
//   },
// ];

// function HomePage() {

//   const {
//     data: inTheaters,
//     isLoading: inTheatersLoading,
//     isError: inTheatersError,
//     isFetching: inTheatersFetching,
//   } = useGetUpcomingQuery({ page: 1 });

//   const { data: popularMovies } = useGetPopularQuery({ page: 1 });

//   const { data: nowPlaying } = useGetNowPlayingQuery();

//   const { data: trending } = useGetTrendingQuery({ page: 1 });

//   const { data: newReleases } = useGetNewSeriesReleasesQuery();

//   const { data: trendingSeries } = useGetTrendingSeriesQuery();

//   // const { data: newMoviesOnNetflix } = useGetNetflixMoviesQuery({});

//   // const { data: newMoviesOnHulu } = useGetHuluMoviesQuery({});

//   // const { data: newMoviesOnPrime } = useGetPrimeMoviesQuery({});

//   const { data: actionMovies } = useGetActionMoviesQuery();

//   const { data: adventureMovies } = useGetAdventureMoviesQuery();

//   const { data: horrorMovies } = useGetHorrorMoviesQuery();

//   const { data: thrillerMovies } = useGetThrillerMoviesQuery();

//   return (
//     <div className="relative">
//       <div>
//         <MainCarousel medias={inTheaters || []} />
//         <div className="relative -mt-[26rem] md:-mt-[9rem]">
//           <div className="relative left-0 my-12 right-0 z-40">
//             <MovieSwiper
//               //itemsGenres={itemsGenres}
//               medias={inTheaters}
//               title={swiperTitle[0].title}
//               mediaType={"movie"}
//               description={"upcoming"}
//             />

//             <MovieSwiper
//               medias={popularMovies}
//               title={swiperTitle[1].title}
//               mediaType={"movie"}
//               description={"popularMovies"}
//             />

//             <div className="relative left-0 right-0 my-16 z-40">
//               <BigCardSwiper
//                 itemBigCards={popularMovies || []}
//                 mediaType={"movie"}
//               />
//             </div>

//             <MovieSwiper
//               medias={nowPlaying}
//               title={swiperTitle[2].title}
//               mediaType={"movie"}
//               description={"nowPlaying"}
//             />

//             <MovieSwiper
//               medias={trending}
//               title={swiperTitle[3].title}
//               mediaType={"movie"}
//               description={"trendingMovies"}
//             />
//             <div className="relative  left-0 right-0 my-16 z-40">
//               <ServicesSwiper
//                 services={services}
//                 description={"services"}
//                 mediaType={"movie"}
//               />
//             </div>

//             <MovieSwiper
//               medias={newReleases}
//               title={swiperTitle[4].title}
//               mediaType={"series"}
//               description={"newSeries"}
//             />

//             <MovieSwiper
//               medias={trendingSeries}
//               title={swiperTitle[5].title}
//               mediaType={"series"}
//               description={"trendingSeries"}
//             />

//             <div className="relative left-0 right-0 my-16 z-40">
//               <GenresSwiper
//                 genres={genres}
//                 description={"services"}
//                 mediaType={"movie"}
//               />
//             </div>

//             <MovieSwiper
//               //medias={newMoviesOnNetflix}
//               title={swiperTitle[6].title}
//               mediaType={"movie"}
//               description={"newMoviesOnNetflix"}
//             />

//             <MovieSwiper
//               //medias={newMoviesOnHulu}
//               title={swiperTitle[7].title}
//               mediaType={"movie"}
//               description={"newMoviesOnHulu"}
//             />

//             <MovieSwiper
//               //medias={newMoviesOnPrime}
//               title={swiperTitle[8].title}
//               mediaType={"movie"}
//               description={"newMoviesOnPrime"}
//             />

//             {/* <div className="relative left-0 right-0 my-16 z-40">
//               <BigCardSwiper
//                 itemBigCards={trendingSeries || []}
//                 mediaType={"series"}
//               />
//             </div> */}

//             <MovieSwiper
//               medias={actionMovies}
//               title={swiperTitle[9].title}
//               mediaType={"movie"}
//               description={"actionMovies"}
//             />

//             <MovieSwiper
//               medias={adventureMovies}
//               title={swiperTitle[10].title}
//               mediaType={"movie"}
//               description={"adventureMovies"}
//             />

//             <MovieSwiper
//               medias={horrorMovies}
//               title={swiperTitle[11].title}
//               mediaType={"movie"}
//               description={"horrorMovies"}
//             />

//             <MovieSwiper
//               medias={thrillerMovies}
//               title={swiperTitle[12].title}
//               mediaType={"movie"}
//               description={"thrillerMovies"}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomePage;

"use client";

import MainCarousel from "@/components/maincarousel/MainCarousel";
import React, { useEffect, useState } from "react";
import MovieSwiper from "@/components/carousel/MovieSwiper";
import ServicesSwiper from "@/components/carousel/ServicesSwiper";
import GenresSwiper from "@/components/carousel/GenresSwiper";
import BigCardSwiper from "@/components/carousel/BigCardSwiper";
import {
  useGetUpcomingQuery,
  useGetPopularQuery,
  useGetNowPlayingQuery,
  useGetTrendingQuery,
  //useGetNewReleasesQuery,
  useGetActionMoviesQuery,
  useGetAdventureMoviesQuery,
  useGetHorrorMoviesQuery,
  useGetThrillerMoviesQuery,
} from "../features/homepage/movies/movieSlice";

import {
  useGetTrendingSeriesQuery,
  useGetNewSeriesReleasesQuery,
} from "../features/homepage/series/seriesSlice";
import {
  useGetNetflixMoviesQuery,
  useGetHuluMoviesQuery,
  useGetPrimeMoviesQuery,
} from "../features/homepage/movies/moviesStreamServiceSlice";
import { useGetLikesQuery } from "../features/likes/likesSlice";
import {
  setLikes,
  setPicture,
  setScore,
  setWatched,
  setWatchlists,
} from "../features/dbSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../features/store";
import { getLikes } from "../pages/api/likesPage";
import { useGetWatchlistQuery } from "../features/watchlist/watchlistSlice";
import { getWatchlists } from "../pages/api/watchlistPage";
import { useGetWatchedQuery } from "../features/watched/watchedSlice";
import { getWatchedList } from "../pages/api/watchedPage";
import { useGetScoreQuery } from "../features/score/scoreSlice";
import { useGetPictureQuery } from "../features/picture/pictureSlice";
import { useGetAccountQuery } from "../features/account/accountSlice";

const services = [
  { id: 8, title: "Netflix", img: "/genresIcons/netflix-3.svg" },
  { id: 15, title: "Hulu", img: "/genresIcons/Hulu-Logo.wine.svg" },
  {
    id: 119,
    title: "Prime Video",
    img: "/genresIcons/Amazon_Prime_Video_logo.svg.png",
  },
  {
    id: 350,
    title: "Apple Tv",
    img: "/genresIcons/apple-tv-plus-seeklogo.svg",
  },
  { id: 337, title: "Disney+", img: "/genresIcons/Disney+_2024.svg.png" },
  { id: 384, title: "Max", img: "/genresIcons/20230413031451!Max_logo.svg" },
  {
    id: 387,
    title: "Peacock",
    img: "/genresIcons/NBCUniversal_Peacock_Logo.svg",
  },
  { id: 531, title: "Paramount+", img: "/genresIcons/paramount-seeklogo.svg" },
  //{ id: 9, title: "Fandango", img: "/genresIcons/Fandango_logo14.png" },
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
    id: 28,
    title: "Action",
    iconBlack: "/genresIcons/icons8-greek-helmet.svg",
    iconWhite: "/genresIcons/icons8-greek-helmet-white.svg",
  },
  {
    id: 12,
    title: "Adventure",
    iconBlack: "/genresIcons/icons8-worldwide-location.svg",
    iconWhite: "/genresIcons/icons8-worldwide-location-white.svg",
  },
  {
    id: 16,
    title: "Animated",
    iconBlack: "/genresIcons/icons8-animation.svg",
    iconWhite: "/genresIcons/icons8-animation-white.svg",
  },
  {
    id: 35,
    title: "Comedy",
    iconBlack: "/genresIcons/icons8-joker.svg",
    iconWhite: "/genresIcons/icons8-joker-white.svg",
  },
  {
    id: 80,
    title: "Crime",
    iconBlack: "/genresIcons/icons8-horror.svg",
    iconWhite: "/genresIcons/icons8-horror-white.svg",
  },
  {
    id: 10751,
    title: "Family",
    iconBlack: "/genresIcons/icons8-family.svg",
    iconWhite: "/genresIcons/icons8-family-white.svg",
  },
  {
    id: 14,
    title: "Fantasy",
    iconBlack: "/genresIcons/icons8-witch's-hat.svg",
    iconWhite: "/genresIcons/icons8-witch's-hat-white.svg",
  },
  {
    id: 878,
    title: "Sci-fi",
    iconBlack: "/genresIcons/icons8-superman.svg",
    iconWhite: "/genresIcons/icons8-superman-white.svg",
  },
  {
    id: 18,
    title: "Drama",
    iconBlack: "/genresIcons/icons8-venetian-mask.svg",
    iconWhite: "/genresIcons/icons8-venetian-mask-white.svg",
  },
  {
    id: 27,
    title: "Horror",
    iconBlack: "/genresIcons/icons8-scream.svg",
    iconWhite: "/genresIcons/icons8-scream-white.svg",
  },
  {
    id: 53,
    title: "Thriller",
    iconBlack: "/genresIcons/icons8-spy.svg",
    iconWhite: "/genresIcons/icons8-spy-white.svg",
  },
  {
    id: 10749,
    title: "Romance",
    iconBlack: "/genresIcons/icons8-rose.svg",
    iconWhite: "/genresIcons/icons8-rose-white.svg",
  },
  {
    id: 36,
    title: "History",
    iconBlack: "/genresIcons/icons8-colosseum.svg",
    iconWhite: "/genresIcons/icons8-colosseum-white.svg",
  },
  {
    id: 9648,
    title: "Mystery",
    iconBlack: "/genresIcons/icons8-anonymous-mask.svg",
    iconWhite: "/genresIcons/icons8-anonymous-mask-white.svg",
  },
  {
    id: 10752,
    title: "War",
    iconBlack: "/genresIcons/icons8-cannon.svg",
    iconWhite: "/genresIcons/icons8-cannon-white.svg",
  },
  {
    id: 37,
    title: "Western",
    iconBlack: "/genresIcons/icons8-cow-skull.svg",
    iconWhite: "/genresIcons/icons8-cow-skull-white.svg",
  },
  {
    id: 99,
    title: "Documentary",
    iconBlack: "/genresIcons/icons8-documentary.svg",
    iconWhite: "/genresIcons/icons8-documentary-white.svg",
  },
  {
    id: 10402,
    title: "Music",
    iconBlack: "/genresIcons/icons8-music.svg",
    iconWhite: "/genresIcons/icons8-music-white.svg",
  },
];

function HomePage() {
  const dispatch = useDispatch();
  //const type = useSelector((state: RootState) => state.likes.type);
  const likesdb = useSelector((state: RootState) => state.content.likes);

  // Fetch data using RTK Query
  const { data: likesDB, isLoading, error, isSuccess } = useGetLikesQuery({});

  const { data: watchlistDB, isSuccess: watchlistSucces } =
    useGetWatchlistQuery({});

  const { data: watchedtDB, isSuccess: watchedSucces } = useGetWatchedQuery({});

  const { data: scoreDB, isSuccess: scoreSucces } = useGetScoreQuery({});

  //const { data: pictureDB, isSuccess: pictureSucces } = useGetPictureQuery({});
  //const { data: accountDb, isSuccess:imageSuccess } = useGetAccountQuery({});

  // Fetch movie details when IDs are available
  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (isSuccess && likesDB.length > 0) {
        try {
          // Fetch full movie details for the given IDs

          //const likesId = likesDB.map((item:any)=> item.id);

          const res = await getLikes(likesDB); // Fetch movie data by IDs
          const likedContent = await res.json();
          // Store the full movie details in Redux
          dispatch(setLikes(likedContent));
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      }

      if (watchlistSucces && watchlistDB.length > 0) {
        try {
          // Fetch full movie details for the given IDs
          const res = await getWatchlists(watchlistDB); // Fetch movie data by IDs
          const watchlistedContent = await res.json();
          // Store the full movie details in Redux
          dispatch(setWatchlists(watchlistedContent));
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      }

      if (watchedSucces && watchedtDB.length > 0) {
        try {
          // Fetch full movie details for the given IDs
          const res = await getWatchedList(watchedtDB); // Fetch movie data by IDs
          const watchedContent = await res.json();
          // Store the full movie details in Redux
          dispatch(setWatched(watchedContent));
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      }

      if (scoreSucces && scoreDB.length > 0) {
        try {
          // const res = await getWatchedList(watchedtDB);
          // const watchedContent = await res.json();

          dispatch(setScore(scoreDB));
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      }

      // if (imageSuccess && accountDb) {
      //   //console.log(accountDb);
      //   dispatch(setPicture(accountDb?.picture))
      // }
    };

    fetchMovieDetails();
  }, [likesDB, watchlistDB, watchedtDB, scoreDB]); // Trigger only when the movie IDs are fetched

  // // Fetch movie details when IDs are available
  // useEffect(() => {
  //   const fetchMovieDetails = async () => {
  //     if (watchlistSucces && watchlistDB.length > 0) {
  //       try {
  //         // Fetch full movie details for the given IDs
  //         const res = await getWatchlists(watchlistDB); // Fetch movie data by IDs
  //         const watchlistedContent = await res.json();
  //         // Store the full movie details in Redux
  //         dispatch(setWatchlists(watchlistedContent));
  //       } catch (error) {
  //         console.error("Error fetching movie details:", error);
  //       }
  //     }
  //   };

  //   fetchMovieDetails();
  // }, [watchlistDB]); // Trigger only when the movie IDs are fetched

  const {
    data: inTheaters,
    isLoading: inTheatersLoading,
    isError: inTheatersError,
    isFetching: inTheatersFetching,
  } = useGetUpcomingQuery({ page: 1 });

  const { data: popularMovies } = useGetPopularQuery({ page: 1 });

  const { data: nowPlaying } = useGetNowPlayingQuery();

  const { data: trending } = useGetTrendingQuery({ page: 1 });

  const { data: newReleases } = useGetNewSeriesReleasesQuery();

  const { data: trendingSeries } = useGetTrendingSeriesQuery();

  // const { data: newMoviesOnNetflix } = useGetNetflixMoviesQuery({});

  // const { data: newMoviesOnHulu } = useGetHuluMoviesQuery({});

  // const { data: newMoviesOnPrime } = useGetPrimeMoviesQuery({});

  const { data: actionMovies } = useGetActionMoviesQuery();

  const { data: adventureMovies } = useGetAdventureMoviesQuery();

  const { data: horrorMovies } = useGetHorrorMoviesQuery();

  const { data: thrillerMovies } = useGetThrillerMoviesQuery();

  return (
    <div className="relative">
      <div>
        <MainCarousel medias={inTheaters || []} mediaType={"movie"} />
        <div className="relative -mt-[26rem] md:-mt-[9rem]">
          <div className="relative left-0 my-12 right-0 z-40">
            <MovieSwiper
              //itemsGenres={itemsGenres}
              medias={inTheaters}
              title={swiperTitle[0].title}
              mediaType={"movie"}
              description={"upcoming"}
            />

            <MovieSwiper
              medias={popularMovies}
              title={swiperTitle[1].title}
              mediaType={"movie"}
              description={"popularMovies"}
            />

            <div className="relative left-0 right-0 my-16 z-40">
              <BigCardSwiper
                itemBigCards={popularMovies || []}
                mediaType={"movie"}
              />
            </div>

            <MovieSwiper
              medias={nowPlaying}
              title={swiperTitle[2].title}
              mediaType={"movie"}
              description={"nowPlaying"}
            />

            <MovieSwiper
              medias={trending}
              title={swiperTitle[3].title}
              mediaType={"movie"}
              description={"trendingMovies"}
            />
            <div className="relative  left-0 right-0 my-16 z-40">
              <ServicesSwiper
                services={services}
                description={"services"}
                mediaType={"movie"}
              />
            </div>

            <MovieSwiper
              medias={newReleases}
              title={swiperTitle[4].title}
              mediaType={"series"}
              description={"newSeries"}
            />

            <MovieSwiper
              medias={trendingSeries}
              title={swiperTitle[5].title}
              mediaType={"series"}
              description={"trendingSeries"}
            />

            <div className="relative left-0 right-0 my-16 z-40">
              <GenresSwiper
                genres={genres}
                description={"services"}
                mediaType={"movie"}
              />
            </div>

            <MovieSwiper
              //medias={newMoviesOnNetflix}
              title={swiperTitle[6].title}
              mediaType={"movie"}
              description={"newMoviesOnNetflix"}
            />

            <MovieSwiper
              //medias={newMoviesOnHulu}
              title={swiperTitle[7].title}
              mediaType={"movie"}
              description={"newMoviesOnHulu"}
            />

            <MovieSwiper
              //medias={newMoviesOnPrime}
              title={swiperTitle[8].title}
              mediaType={"movie"}
              description={"newMoviesOnPrime"}
            />

            {/* <div className="relative left-0 right-0 my-16 z-40">
              <BigCardSwiper
                itemBigCards={trendingSeries || []}
                mediaType={"series"}
              />
            </div> */}

            <MovieSwiper
              medias={actionMovies}
              title={swiperTitle[9].title}
              mediaType={"movie"}
              description={"actionMovies"}
            />

            <MovieSwiper
              medias={adventureMovies}
              title={swiperTitle[10].title}
              mediaType={"movie"}
              description={"adventureMovies"}
            />

            <MovieSwiper
              medias={horrorMovies}
              title={swiperTitle[11].title}
              mediaType={"movie"}
              description={"horrorMovies"}
            />

            <MovieSwiper
              medias={thrillerMovies}
              title={swiperTitle[12].title}
              mediaType={"movie"}
              description={"thrillerMovies"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
