import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const time = 600;

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: () => `movie/now_playing?api_key=${apiKey}`,
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        const results = response.results;

        // Append a new section with "type: movie"
        const modifiedResults = results.map((item: any) => ({
          ...item,
          media_type: "movie",
        }));

        return modifiedResults;
      },
    }),
    getSeries: builder.query({
      query: () =>
        `discover/tv?api_key=${apiKey}&region=US&sort_by=popularity.desc&vote_count.gte=100&vote_average.gte=7`,
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        const results = response.results;

        // Append a new section with "type: movie"
        const modifiedResults = results.map((item: any) => ({
          ...item,
          media_type: "tv",
        }));

        return modifiedResults;
      },
    }),
    getAll: builder.query({
      query: () =>
        // `trending/all/day?api_key=${apiKey}&region=US&sort_by=popularity.desc&vote_count.gte=100&vote_average.gte=7`
        `trending/all/day?api_key=${apiKey}`,
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        const results = response.results;

        // Append a new section with "type: movie"
        // const modifiedResults = results.map((item: any) => ({
        //   ...item,
        //   type: "all",
        // }));

        return results;
      },
    }),
  }),
});

export const { useGetMoviesQuery, useGetSeriesQuery, useGetAllQuery } =
  searchApi;
