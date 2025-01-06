
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const time = 600;

export const watchlistDBApi = createApi({
  reducerPath: "watchlistDBApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }), // Base URL for your app's backend
  endpoints: (builder) => ({
    getWatchlist: builder.query({
      query: () => `watchlist`, // Fetches from /api/likes endpoint in your app
      keepUnusedDataFor: time, // Cache the data for 10 minutes
      transformResponse: (response:any) => {
        //console.log(response.watchlist);
        
        return response.watchlist
      }, // Transform the response to just the data
    }),
  }),
});

export const { useGetWatchlistQuery } = watchlistDBApi;