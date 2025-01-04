// likesApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const time = 600;

export const likesDBApi = createApi({
  reducerPath: "likesDBApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }), // Base URL for your app's backend
  endpoints: (builder) => ({
    getLikes: builder.query({
      query: () => `likes`, // Fetches from /api/likes endpoint in your app
      keepUnusedDataFor: time, // Cache the data for 10 minutes
      transformResponse: (response:any) => {
        return response.likes
      }, // Transform the response to just the data
    }),
  }),
});

export const { useGetLikesQuery } = likesDBApi;