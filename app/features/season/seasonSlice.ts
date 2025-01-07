import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const time = 600;

export const seasonDBApi = createApi({
  reducerPath: "seasonDBApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }), // Base URL for your app's backend
  endpoints: (builder) => ({
    getSeason: builder.query({
      query: () => `season`, // Fetches from /api/likes endpoint in your app
      keepUnusedDataFor: time, // Cache the data for 10 minutes
      transformResponse: (response: any) => {
        //console.log(response.watchlist);

        return response.season;
      }, // Transform the response to just the data
    }),
  }),
});

export const { useGetSeasonQuery } = seasonDBApi;

