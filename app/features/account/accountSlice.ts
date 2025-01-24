import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const time = 600;

export const accountDBApi = createApi({
  reducerPath: "accountDBApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }), 
  endpoints: (builder) => ({
    getAccount: builder.query({
      query: () => `account`, 
      keepUnusedDataFor: time, 
      transformResponse: (response: any) => {
        //console.log("response",response);

        return response.user
      }, 
    }),
  }),
});

export const { useGetAccountQuery } = accountDBApi;

