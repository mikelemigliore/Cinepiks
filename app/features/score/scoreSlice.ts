import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const time = 600;

export const scoreDBApi = createApi({
  reducerPath: "scoreDBApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }), // Base URL for your app's backend
  endpoints: (builder) => ({
    getScore: builder.query({
      query: () => `score`, // Fetches from /api/likes endpoint in your app
      keepUnusedDataFor: time, // Cache the data for 10 minutes
      transformResponse: (response: any) => {
        //console.log(response.watchlist);

        return response.score;
      }, // Transform the response to just the data
    }),
  }),
});

export const { useGetScoreQuery } = scoreDBApi;

