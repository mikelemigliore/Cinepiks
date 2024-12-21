import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const time = 600;

export const movieDetailsApi = createApi({
  reducerPath: "movieDetailsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `https://api.themoviedb.org/3/` }),
  endpoints: (builder) => ({
    getMovieDetails: builder.query({
      query: (id: number) => `movie/${id}?api_key=${apiKey}`,
      // Cache the data for 10 minutes
      keepUnusedDataFor: time,
    }),
    getMovieCertification: builder.query({
      query: (id: number) => `movie/${id}/release_dates?api_key=${apiKey}`,
      // Cache the data for 10 minutes
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        const usRelease = response?.results?.find(
          (item: any) => item.iso_3166_1 === "US"
        );

        if (usRelease) {
          const usCertification =
            usRelease.release_dates[0].certification || "Not Rated";
          return usCertification;
        } else {
          return "Not rated";
        }
      },
    }),
    getSocials: builder.query({
      query: (id: number) => `movie/${id}/external_ids?api_key=${apiKey}`,
      // Cache the data for 10 minutes
      keepUnusedDataFor: time,
    }),
    getDirector: builder.query({
      query: (id: number) => `movie/${id}/credits?api_key=${apiKey}`,
      // Cache the data for 10 minutes
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        const director = response.crew.filter(
          (item: any) => item.job === "Director"
        );

        return director[0].name;
      },
    }),
    getMovieTrailer: builder.query({
      query: (id: number) => `movie/${id}/videos?api_key=${apiKey}`,
      // Cache the data for 10 minutes
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        const trailers = response.results.filter(
          (item: any) => item.type === "Trailer" && item.official === true
        );

        // Sort by published_at date in ascending order
        const sortedTrailer = trailers.sort(
          (a: any, b: any) =>
            new Date(a.published_at).getTime() -
            new Date(b.published_at).getTime()
        );

        // Get the first trailer released
        const firstTrailer = sortedTrailer.length > 0 ? sortedTrailer[0] : null;

        return firstTrailer;
      },
    }),
    getMovieCast: builder.query({
      query: (id: number) => `movie/${id}/credits?api_key=${apiKey}`,
      // Cache the data for 10 minutes
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        const formattedCast = response.cast
          .slice(0, 20)
          .map(
            (member: {
              id: any;
              name: any;
              character: any;
              profile_path: any;
            }) => ({
              id: member.id,
              name: member.name,
              character: member.character,
              picture: `https://image.tmdb.org/t/p/w500${member.profile_path}`,
            })
          );

        return formattedCast;
      },
    }),
    getMovieCollection: builder.query({
      query: (id: number) => `collection/${id}?api_key=${apiKey}`,
      // Cache the data for 10 minutes
      keepUnusedDataFor: time,
      transformResponse: (id: number, response: any) => {
        const updatedCollection = response.parts.filter(
          (item: any) => item.id !== id
        );
        return updatedCollection;
      },
    }),
    getMovieSimilar: builder.query({
      query: (genres: any[]) => {
        // Extract genre IDs and join them
        const genreIds = genres
          .slice(0, 2) // Adjust slice based on your logic
          .map((genre) => genre.id)
          .join(",");

        return `discover/movie?api_key=${apiKey}&language=en-US&region=US&vote_count.gte=100&vote_average.gte=7&sort_by=popularity.desc&with_genres=${genreIds}`;
      },
      // Cache the data for 10 minutes
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        const data = response.results;
        return data;
      },
    }),
  }),
});

export const {
  useGetMovieDetailsQuery,
  useGetMovieCertificationQuery,
  useGetSocialsQuery,
  useGetDirectorQuery,
  useGetMovieTrailerQuery,
  useGetMovieCastQuery,
  useGetMovieCollectionQuery,
  useGetMovieSimilarQuery,
} = movieDetailsApi;
