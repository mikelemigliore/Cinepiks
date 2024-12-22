import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

export const  loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({ baseUrl: `https://api.themoviedb.org/3/` }),
  endpoints: (builder) => ({
    getNowPlaying: builder.query<MediaProp[], void>({
      query: () =>
        `movie/now_playing?api_key=${apiKey}`,
      // Cache the data for 10 minutes
      keepUnusedDataFor: time,
    }),
    getGenres: builder.query({
        query: () =>
          `genre/movie/list?api_key=${apiKey}`,
        // Cache the data for 10 minutes
        keepUnusedDataFor: time,
      }),
      getUpcoming: builder.query({
        query: () =>
          `movie/upcoming?api_key=${apiKey}&region=US`,
        // Cache the data for 10 minutes
        keepUnusedDataFor: time,
      }),
      getPopular: builder.query({
        query: () =>
          `movie/popular?api_key=${apiKey}&region=US`,
        // Cache the data for 10 minutes
        keepUnusedDataFor: time,
      }),
  }),
});

export const {
  useGetNowPlayingQuery,
  useGetGenresQuery,
  useGetUpcomingQuery,
  useGetPopularQuery
} = loginApi;
