import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const time = 600;

export const watchedDBApi = createApi({
  reducerPath: "watchedDBApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }), 
  endpoints: (builder) => ({
    getWatched: builder.query({
      query: () => `watched`, 
      keepUnusedDataFor: time, 
      transformResponse: (response:any) => {
        
        return response.watched
      }, 
    }),
  }),
});

export const { useGetWatchedQuery } = watchedDBApi;