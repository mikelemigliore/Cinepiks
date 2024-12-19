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

export const seriesApi = createApi({
  reducerPath: "seriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: `https://api.themoviedb.org/3/` }),
  endpoints: (builder) => ({
    getTrendingSeries: builder.query<ItemsBigCardsProp[], void>({
      query: () => `trending/tv/week?api_key=${apiKey}&region=US`,
      // Cache the data for 10 minutes
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        const filteredData = response.results.filter(
          (movie: any) => movie.original_language === "en"
        );

        return filteredData;
      },
    }),
    getNewSeriesReleases: builder.query<MediaProp[], void>({
      query: () =>
        `discover/tv?api_key=${apiKey}&region=US&sort_by=popularity.desc&vote_count.gte=100&vote_average.gte=7`,
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        const results = response.results;

        return results;
      },
    }),
  }),
});

export const { useGetTrendingSeriesQuery, useGetNewSeriesReleasesQuery } = seriesApi;
