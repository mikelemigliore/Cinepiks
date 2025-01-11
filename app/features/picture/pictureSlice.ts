import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const time = 600;

export const pictureDBApi = createApi({
  reducerPath: "pictureDBApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }), // Base URL for your app's backend
  endpoints: (builder) => ({
    getPicture: builder.query({
      query: () => `updateProfilePicture`, // Fetches from /api/likes endpoint in your app
      keepUnusedDataFor: time, // Cache the data for 10 minutes
      transformResponse: (response: any) => {
        console.log(response);

        return response;
      }, // Transform the response to just the data
    }),
  }),
});

export const { useGetPictureQuery } = pictureDBApi;
