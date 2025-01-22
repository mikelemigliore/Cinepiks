import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { getTrailerMovieVideo } from "../../../pages/api/homePage";

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

interface MediaProp {
  id: number;
  title: string;
  name?: string;
  poster_path: string;
  showType: string;
  backdrop_path: string;
  genre_ids: number[];
  videoKey?: string;
  release_date?: string;
  overview?: string;
}

interface ItemsBigCardsProp {
  id: number;
  type?: string;
  title: string;
  name?: string;
  poster_path: string;
  showType: string;
  backdrop_path: string;
  genre_ids: number[];
  description: string;
}

const time = 600;
const actionGenreCode = 28;
const adventureGenreCode = 12;
const horrorGenreCode = 27;
const animationGenreCode = 16;
const thrillerGenreCode = 53;

// Function to format a Date object to 'YYYY-MM-DD'
function formatDate(date: any) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); 
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const today = new Date();
const min_date = formatDate(today);

// Calculating max_date 30 days from today
const daysToAdd = 60;
const max_date = formatDate(
  new Date(today.getTime() + daysToAdd * 24 * 60 * 60 * 1000)
);

// Calculating max_date 14 days  back from today
const daysToSub = 14;
const max_date_back = formatDate(
  new Date(today.getTime() - daysToSub * 24 * 60 * 60 * 1000)
);

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({ baseUrl: `https://api.themoviedb.org/3/` }),
  endpoints: (builder) => ({
    getUpcoming: builder.query<MediaProp[], { page: number }>({
      query: ({ page }: { page: number }) =>
        `discover/movie?api_key=${apiKey}&page=${page}&region=US&language=en-US&sort_by=popularity.desc&release_date.gte=${min_date}&release_date.lte=${max_date}&with_release_type=2|3`,
      // Cache the data for 10 minutes
      keepUnusedDataFor: time,
      transformResponse: async (
        response: any
      ) => {

        const filteredPoster = response.results.filter((item: any) => {
          return !!item.poster_path; 
        });

        const updatedResults = await Promise.all(
          filteredPoster.map(async (media: any) => {
            try {
              const responseTrailer = await getTrailerMovieVideo(media.id);
              const dataTrailer = await responseTrailer.json();
              return { ...media, videoKey: dataTrailer?.key || "defaultKey" };
            } catch (error) {
              console.error(
                `Error fetching trailer for media ID ${media.id}:`,
                error
              );
              return { ...media, videoKey: "6ZfuNTqbHE8" }; 
            }
          })
        );

        return updatedResults;
      },
    }),
    getPopular: builder.query<ItemsBigCardsProp[], { page: number }>({
      query: ({ page }: { page: number }) =>
        `movie/popular?api_key=${apiKey}&page=${page}&language=en-US&region=US&sort_by=popularity.desc&vote_count.gte=100&vote_average.gte=7`,
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        const filteredData = response.results.filter(
          (movie: any) =>
            movie.original_language === "en" && !!movie.poster_path
        );

        console.log("filteredData", filteredData);

        return filteredData;
      },
    }),
    getNowPlaying: builder.query<MediaProp[], void>({

      query: () =>
        `discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${max_date_back}&release_date.lte=${max_date}`,
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        const results = response.results;

        return results;
      },
    }),
    getTrending: builder.query<MediaProp[], { page: number }>({
      query: ({ page }: { page: number }) =>
        `trending/movie/week?api_key=${apiKey}&region=US&page=${page}`,
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        const results = response.results;

        return results;
      },
    }),
    getActionMovies: builder.query<MediaProp[], void>({
      query: () =>
        `discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=${actionGenreCode}`,
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        const results = response.results;

        return results;
      },
    }),
    getAdventureMovies: builder.query<MediaProp[], void>({
      query: () =>
        `discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=${adventureGenreCode}`,
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        const results = response.results;

        return results;
      },
    }),
    getHorrorMovies: builder.query<MediaProp[], void>({
      query: () => ({
        url: `discover/movie`,
        params: {
          api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
          language: "en-US",
          sort_by: "popularity.desc",
          with_genres: 27, // Horror genre code
          without_genres: 16, // Animation genre code
          page: 1, 
        },
      }),
      keepUnusedDataFor: 60, 
      transformResponse: async (response: any) => {
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const allPagesData: any[] = [];

        // Manually handle multiple pages
        for (let page = 1; page <= 2; page++) {
          const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=27&page=${page}&without_genres=16`;
          const response = await fetch(url);
          const data = await response.json();

          // Filter results for original_language
          const filteredData = data.results.filter(
            (movie: any) => movie.original_language === "en"
          );

          allPagesData.push(...filteredData);
        }

        return allPagesData;
      },
    }),
    getThrillerMovies: builder.query<MediaProp[], void>({
      query: () =>
        `discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=${thrillerGenreCode}&without_genres=${animationGenreCode}`,
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        const results = response.results;

        return results;
      },
    }),
    getTeaserMovieVideo: builder.query({
      query: (id: number) => `movie/${id}/videos?api_key=${apiKey}`,
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        let teasers = response.results.filter(
          (item: any) => item.type === "Teaser" && item.official === true
        );

        if (teasers.length === 0) {
          teasers = response.results.filter(
            (item: any) => item.type === "Trailer" && item.official === true
          );
        }

        const sortedTeasers = teasers.sort(
          (a: any, b: any) =>
            new Date(a.published_at).getTime() -
            new Date(b.published_at).getTime()
        );

        const firstTeaser = sortedTeasers.length > 0 ? sortedTeasers[0] : null;

        return firstTeaser;
      },
    }),
    getTeaserSeriesVideo: builder.query({
      query: (id: number) => `tv/${id}/videos?api_key=${apiKey}`,
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {

        const trailers = response.results.filter(
          (item: any) => item.type === "Trailer" && item.official === true
        );

        const sortedTeasers = trailers.sort(
          (a: any, b: any) =>
            new Date(a.published_at).getTime() -
            new Date(b.published_at).getTime()
        );

        const firstTeaser = sortedTeasers.length > 0 ? sortedTeasers[0] : null;

        return firstTeaser;
      },
    }),
    getNewMoviesOnNetflix: builder.query<MediaProp[], { page: number }>({
      query: ({ page }: { page: number }) =>
        `discover/movie?api_key=${apiKey}&page=${page}&include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.lte=${min_date}&sort_by=popularity.desc&watch_region=US&with_original_language=en&with_watch_monetization_types=flatrate&with_watch_providers=8`,
      keepUnusedDataFor: time,
      transformResponse: async (
        response: any
      ) => {

        const filteredPoster = response.results.filter((item: any) => {
          return !!item.poster_path; 
        });

        const updatedResults = await Promise.all(
          filteredPoster.map(async (media: any) => {
            try {
              const responseTrailer = await getTrailerMovieVideo(media.id); 
              const dataTrailer = await responseTrailer.json();
              return { ...media, videoKey: dataTrailer?.key || "defaultKey" };
            } catch (error) {
              console.error(
                `Error fetching trailer for media ID ${media.id}:`,
                error
              );
              return { ...media, videoKey: "6ZfuNTqbHE8" }; 
            }
          })
        );

        return updatedResults;
      },
    }),
    getNewMoviesOnHulu: builder.query<MediaProp[], { page: number }>({
      query: ({ page }: { page: number }) =>
        `discover/movie?api_key=${apiKey}&page=${page}&include_adult=false&include_video=false&language=en-US&primary_release_date.lte=${min_date}&sort_by=popularity.desc&watch_region=US&with_original_language=en&with_watch_monetization_types=flatrate&with_watch_providers=15`,
      keepUnusedDataFor: time,
      transformResponse: async (
        response: any
      ) => {

        const filteredPoster = response.results.filter((item: any) => {
          return !!item.poster_path; 
        });

        const updatedResults = await Promise.all(
          filteredPoster.map(async (media: any) => {
            try {
              const responseTrailer = await getTrailerMovieVideo(media.id); 
              const dataTrailer = await responseTrailer.json();
              return { ...media, videoKey: dataTrailer?.key || "defaultKey" };
            } catch (error) {
              console.error(
                `Error fetching trailer for media ID ${media.id}:`,
                error
              );
              return { ...media, videoKey: "6ZfuNTqbHE8" }; 
            }
          })
        );

        return updatedResults;
      },
    }),
    getNewMoviesOnPrime: builder.query<MediaProp[], { page: number }>({
      query: ({ page }: { page: number }) =>
        `discover/movie?api_key=${apiKey}&page=${page}&include_adult=false&include_video=false&language=en-US&primary_release_date.lte=${min_date}&sort_by=popularity.desc&with_original_language=en&with_watch_monetization_types=flatrate&with_watch_providers=119`,
      keepUnusedDataFor: time,
      transformResponse: async (
        response: any
      ) => {
        const filteredPoster = response.results.filter((item: any) => {
          return !!item.poster_path; 
        });

        const updatedResults = await Promise.all(
          filteredPoster.map(async (media: any) => {
            try {
              const responseTrailer = await getTrailerMovieVideo(media.id); 
              const dataTrailer = await responseTrailer.json();
              return { ...media, videoKey: dataTrailer?.key || "defaultKey" };
            } catch (error) {
              console.error(
                `Error fetching trailer for media ID ${media.id}:`,
                error
              );
              return { ...media, videoKey: "6ZfuNTqbHE8" }; 
            }
          })
        );

        return updatedResults;
      },
    }),
  }),
});

export const {
  useGetUpcomingQuery,
  useGetPopularQuery,
  useGetNowPlayingQuery,
  useGetTrendingQuery,
  useGetActionMoviesQuery,
  useGetAdventureMoviesQuery,
  useGetHorrorMoviesQuery,
  useGetThrillerMoviesQuery,
  useGetTeaserMovieVideoQuery,
  useGetTeaserSeriesVideoQuery,
  useGetNewMoviesOnNetflixQuery,
  useGetNewMoviesOnHuluQuery,
  useGetNewMoviesOnPrimeQuery,
} = movieApi;
