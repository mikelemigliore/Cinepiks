import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const time = 600;

export const seasonDBApi = createApi({
  reducerPath: "seasonDBApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }), 
  endpoints: (builder) => ({
    getSeason: builder.query({
      query: () => `season`,
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {

        return response.season;
      }, 
    }),
  }),
});

export const { useGetSeasonQuery } = seasonDBApi;

