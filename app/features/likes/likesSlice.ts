
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const time = 600;

export const likesDBApi = createApi({
  reducerPath: "likesDBApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }), 
  endpoints: (builder) => ({
    getLikes: builder.query({
      query: () => `likes`, 
      keepUnusedDataFor: time, 
      transformResponse: (response:any) => {
        
        return response.likes
      }, 
    }),
  }),
});

export const { useGetLikesQuery } = likesDBApi;