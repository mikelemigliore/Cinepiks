import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const time = 600;

export const accountDBApi = createApi({
  reducerPath: "accountDBApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }), // Base URL for your app's backend
  endpoints: (builder) => ({
    getAccount: builder.query({
      query: () => `account`, // Fetches from /api/likes endpoint in your app
      keepUnusedDataFor: time, // Cache the data for 10 minutes
      transformResponse: (response: any) => {
        //console.log("response",response);

        return response.user
      }, // Transform the response to just the data
    }),
  }),
});

export const { useGetAccountQuery } = accountDBApi;

