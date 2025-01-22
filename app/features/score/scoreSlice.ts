import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const time = 600;

export const scoreDBApi = createApi({
  reducerPath: "scoreDBApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }), 
  endpoints: (builder) => ({
    getScore: builder.query({
      query: () => `score`, 
      keepUnusedDataFor: time, 
      transformResponse: (response: any) => {

        return response.score;
      }, 
    }),
  }),
});

export const { useGetScoreQuery } = scoreDBApi;

