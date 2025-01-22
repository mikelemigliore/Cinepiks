import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const time = 600;

export const pictureDBApi = createApi({
  reducerPath: "pictureDBApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }), 
  endpoints: (builder) => ({
    getPicture: builder.query({
      query: () => `updateProfilePicture`, 
      keepUnusedDataFor: time, 
      transformResponse: (response: any) => {
        console.log(response);

        return response;
      }, 
    }),
  }),
});

export const { useGetPictureQuery } = pictureDBApi;
