
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const time = 600;

export const watchlistDBApi = createApi({
  reducerPath: "watchlistDBApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }), 
  endpoints: (builder) => ({
    getWatchlist: builder.query({
      query: () => `watchlist`, 
      keepUnusedDataFor: time, 
      transformResponse: (response:any) => {
        
        return response.watchlist
      },
    }),
  }),
});

export const { useGetWatchlistQuery } = watchlistDBApi;