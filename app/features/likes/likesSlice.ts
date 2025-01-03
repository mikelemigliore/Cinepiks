import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const time = 600;

export const likesApi = createApi({
  reducerPath: "likesApi",
  baseQuery: fetchBaseQuery({ baseUrl: `https://api.themoviedb.org/3/` }),
  endpoints: (builder) => ({
    getContent: builder.query({
        query: (id: number) => `movie/${id}?api_key=${apiKey}`,
        // Cache the data for 10 minutes
        keepUnusedDataFor: time,
      }),
  }),
});

export const { useGetContentQuery } = likesApi;
