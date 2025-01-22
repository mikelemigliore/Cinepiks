import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const apiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY;

if (!apiKey) {
  throw new Error("NEXT_PUBLIC_RAPID_API_KEY is not defined in the environment variables.");
}


const time = 600


export const ratingsApi = createApi({
    reducerPath: "ratingsApi",
    baseQuery: fetchBaseQuery({
      baseUrl: "https://film-show-ratings.p.rapidapi.com/",
      prepareHeaders: (headers) => {
        headers.set("x-rapidapi-key", apiKey);
        headers.set("x-rapidapi-host", "film-show-ratings.p.rapidapi.com");
        return headers;
      },
    }),
    endpoints: (builder) => ({
      getRatings: builder.query({
        query: (id: string ) => `item/?id=${id}`,
        keepUnusedDataFor: time, 
      }),
    }),
  });
  
  export const { useGetRatingsQuery } = ratingsApi;