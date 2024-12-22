import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTrailerMovieVideo } from "../../../pages/api/homePage";

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

interface MediaProp {
  id: number;
  //image: string;
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
  //image: string;
  title: string;
  name?: string;
  poster_path: string;
  showType: string;
  backdrop_path: string;
  genre_ids: number[];
  // rated: string;
  // time: string;
  description: string;
}

const time = 600;
const actionGenreCode = 28;
const adventureGenreCode = 12;
const horrorGenreCode = 27;
const animationGenreCode = 16;
const thrillerGenreCode = 53;

// Function to format a Date object as 'YYYY-MM-DD'
function formatDate(date: any) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Calculate min_date (current date)
const today = new Date();
const min_date = formatDate(today);

// Calculate max_date (e.g., 30 days from today)
const daysToAdd = 60;
const max_date = formatDate(
  new Date(today.getTime() + daysToAdd * 24 * 60 * 60 * 1000)
);

// console.log(min_date);
// console.log(max_date);

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({ baseUrl: `https://api.themoviedb.org/3/` }),
  endpoints: (builder) => ({
    getUpcoming: builder.query<MediaProp[], void>({
      query: () =>
        `discover/movie?api_key=${apiKey}&region=US&language=en-US&sort_by=popularity.desc&release_date.gte=${min_date}&release_date.lte=${max_date}&with_release_type=2|3`,
      // Cache the data for 10 minutes
      keepUnusedDataFor: time,
      transformResponse: async (response: any) => {
        // Enhance the data with video keys
        const updatedResults = await Promise.all(
          response.results.map(async (media: any) => {
            try {
              const responseTrailer = await getTrailerMovieVideo(media.id); // Fetch the trailer
              const dataTrailer = await responseTrailer.json();
              return { ...media, videoKey: dataTrailer?.key || "defaultKey" };
            } catch (error) {
              console.error(
                `Error fetching trailer for media ID ${media.id}:`,
                error
              );
              return { ...media, videoKey: "6ZfuNTqbHE8" }; // Fallback video key
            }
          })
        );

        return updatedResults;
      },
    }),
    getPopular: builder.query<ItemsBigCardsProp[], void>({
      query: () =>
        `movie/popular?api_key=${apiKey}&language=en-US&region=US&sort_by=popularity.desc&vote_count.gte=100&vote_average.gte=7`,
      // Cache the data for 10 minutes
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        // Enhance the data with video keys
        // Filter results to ensure the original language is English
        const filteredData = response.results.filter(
          (movie: any) => movie.original_language === "en"
        );

        return filteredData;
      },
    }),
    getNowPlaying: builder.query<MediaProp[], void>({
      //movie/now_playing?api_key=${apiKey}&region=US
      
      query: () => `discover/movie?api_key=${apiKey}&region=US&language=en-US&sort_by=popularity.desc`,
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        const results = response.results;

        return results;
      },
    }),
    getTrending: builder.query<MediaProp[], void>({
      query: () => `trending/movie/week?api_key=${apiKey}&region=US`,
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
          page: 1, // Default to page 1 initially
        },
      }),
      keepUnusedDataFor: 60, // Adjust as needed (time in seconds)
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
        // Filter teasers
        let teasers = response.results.filter(
          (item: any) => item.type === "Teaser" && item.official === true
        );

        // If no Teasers, fallback to Trailers
        if (teasers.length === 0) {
          teasers = response.results.filter(
            (item: any) => item.type === "Trailer" && item.official === true
          );
        }

        // Sort by published_at date in ascending order
        const sortedTeasers = teasers.sort(
          (a: any, b: any) =>
            new Date(a.published_at).getTime() -
            new Date(b.published_at).getTime()
        );

        // Get the first teaser released
        const firstTeaser = sortedTeasers.length > 0 ? sortedTeasers[0] : null;

        return firstTeaser;
      },
    }),
    getTeaserSeriesVideo: builder.query({
      query: (id: number) => `tv/${id}/videos?api_key=${apiKey}`,
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        // Filter teasers
        const trailers = response.results.filter(
          (item: any) => item.type === "Trailer" && item.official === true
        );

        // Sort by published_at date in ascending order
        const sortedTeasers = trailers.sort(
          (a: any, b: any) =>
            new Date(a.published_at).getTime() -
            new Date(b.published_at).getTime()
        );

        // Get the first teaser released
        const firstTeaser = sortedTeasers.length > 0 ? sortedTeasers[0] : null;
        //console.log(firstTeaser);

        return firstTeaser;
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
  useGetTeaserSeriesVideoQuery
} = movieApi;
