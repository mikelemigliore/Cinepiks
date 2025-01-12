import { getTmdbInfo } from "@/app/pages/api/homePage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY;

if (!apiKey) {
  throw new Error(
    "NEXT_PUBLIC_RAPID_API_KEY is not defined in the environment variables."
  );
}

const time = 600;

export const StreamingServicesApi = createApi({
  reducerPath: "StreamingServiceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://streaming-availability.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set("x-rapidapi-key", apiKey);
      headers.set("x-rapidapi-host", "streaming-availability.p.rapidapi.com");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getNetflixMovies: builder.query({
      query: () => //&year_min=2024&show_original_language=en&rating_min=60&show_type=movie
        `shows/search/filters?country=us&order_direction=desc&order_by=release_date&output_language=en&catalogs=netflix&rating_min=60`,
      keepUnusedDataFor: time, // Cache data for 10 minutes
      transformResponse: async (response: any) => {
        const items = response.shows;

        //console.log(items);

        // Fetch and normalize image data
        const normalizedItems = await Promise.all(
          items.map(async (item: any) => {
            try {
              const id = parseInt(item.tmdbId.split("/")[1], 10);
              const responseImage = await getTmdbInfo(id);
              const dataImage = await responseImage.json();
              //console.log("dataImage", dataImage);
              
              return dataImage
              // const poster = dataImage.find((img: any) => img.file_path) || {};
              // return {
              //   ...item,
              //   poster_path: poster.file_path || null,
              // };
            } catch (error) {
              console.error(`Error normalizing item ${item.tmdbId}:`, error);
              return null; // Or handle as needed
            }
          })
        );

        const validItems = normalizedItems.filter(
          (media) => media !== null && media !== undefined
        );

        return validItems;
      },
    }),
    getHuluMovies: builder.query({
      query: () =>//&year_min=2024&show_original_language=en&rating_min=60
        `shows/search/filters?country=us&order_direction=desc&order_by=release_date&output_language=en&show_type=movie&catalogs=hulu&rating_min=60`,
      keepUnusedDataFor: time, // Cache data for 10 minutes
      transformResponse: async (response: any) => {
        const items = response.shows;


        // Fetch and normalize image data
        const normalizedItems = await Promise.all(
          items.map(async (item: any) => {
            try {
              const id = parseInt(item.tmdbId.split("/")[1], 10);
              const responseImage = await getTmdbInfo(id);
              const dataImage = await responseImage.json();

              return dataImage
              // const poster = dataImage.find((img: any) => img.file_path) || {};
              // return {
              //   ...item,
              //   poster_path: poster.file_path || null,
              // };
            } catch (error) {
              console.error(`Error normalizing item ${item.tmdbId}:`, error);
              return null; // Or handle as needed
            }
          })
        );

        const validItems = normalizedItems.filter(
          (media) => media !== null && media !== undefined
        );

        return validItems;
      },
    }),
    getPrimeMovies: builder.query({
      query: () =>
        `shows/search/filters?country=us&order_direction=desc&order_by=release_date&output_language=en&show_type=movie&catalogs=prime&rating_min=60`,
      keepUnusedDataFor: time, // Cache data for 10 minutes
      transformResponse: async (response: any) => {
        const items = response.shows;


        // Fetch and normalize image data
        const normalizedItems = await Promise.all(
          items.map(async (item: any) => {
            try {
              const id = parseInt(item.tmdbId.split("/")[1], 10);
              const responseImage = await getTmdbInfo(id);
              const dataImage = await responseImage.json();

              return dataImage
              // const poster = dataImage.find((img: any) => img.file_path) || {};
              // return {
              //   ...item,
              //   poster_path: poster.file_path || null,
              // };
            } catch (error) {
              console.error(`Error normalizing item ${item.tmdbId}:`, error);
              return null; // Or handle as needed
            }
          })
        );

        const validItems = normalizedItems.filter(
          (media) => media !== null && media !== undefined
        );

        return validItems;
      },
    }),
  }),
});

export const { useGetNetflixMoviesQuery, useGetHuluMoviesQuery, useGetPrimeMoviesQuery } = StreamingServicesApi;
