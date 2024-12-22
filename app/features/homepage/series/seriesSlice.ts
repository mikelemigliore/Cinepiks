import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

interface MediaProp {
  id: number;
  //image: string;
  title: string;
  name?: string;
  poster_path: string;
  showType: string;
  backdrop_path: string;
  genre_ids: number[];
  videoKey?: string;
  release_date?: string;
  overview?: string;
}

interface ItemsBigCardsProp {
  id: number;
  type?: string;
  //image: string;
  title: string;
  name?: string;
  poster_path: string;
  showType: string;
  backdrop_path: string;
  genre_ids: number[];
  // rated: string;
  // time: string;
  description: string;
}

const time = 600;

export const seriesApi = createApi({
  reducerPath: "seriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: `https://api.themoviedb.org/3/` }),
  endpoints: (builder) => ({
    getTrendingSeries: builder.query<ItemsBigCardsProp[], void>({
      query: () => `trending/tv/week?api_key=${apiKey}&region=US`,
      // Cache the data for 10 minutes
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        const filteredData = response.results.filter(
          (movie: any) => movie.original_language === "en"
        );

        return filteredData;
      },
    }),
    getNewSeriesReleases: builder.query<MediaProp[], void>({
      query: () =>
        `discover/tv?api_key=${apiKey}&region=US&sort_by=popularity.desc&vote_count.gte=100&vote_average.gte=7`,
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        const results = response.results;

        return results;
      },
    }),
    getSeriesDetailsTeaserCard: builder.query({
      query: ({ id, media }: { id: number; media: "movie" | "tv" }) =>
        `${media}/${id}?api_key=${apiKey}`,
      // Cache the data for 10 minutes
      keepUnusedDataFor: time,
    }),
    getSeriesDetails: builder.query({
      query: (id: number) => `tv/${id}?api_key=${apiKey}`,
      // Cache the data for 10 minutes
      keepUnusedDataFor: time,
    }),
    getTrailerSeriesVideo: builder.query({
      query: (id: number) => `tv/${id}/videos?api_key=${apiKey}`,
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
    getSeriesCast: builder.query({
      query: (id: number) => `tv/${id}/credits?api_key=${apiKey}`,
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
    getImdbId: builder.query({
      query: (id: number) => `tv/${id}/external_ids?api_key=${apiKey}`,
      // Cache the data for 10 minutes
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        const data = response.imdb_id;

        return data;
      },
    }),
    getSeriesCertification: builder.query({
      query: (id: number) => `tv/${id}/content_ratings?api_key=${apiKey}`,
      // Cache the data for 10 minutes
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        const filteredCertification = response.results.filter((item: any) => {
          return item.iso_3166_1 === "US";
        });

        return filteredCertification[0].rating;
      },
    }),
    getSeriesRuntime: builder.query({
      query: (id: number) => `tv/${id}/season/1?api_key=${apiKey}`,
      // Cache the data for 10 minutes
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        //console.log(data.episodes);
        const runtime = response.episodes.map((item: any) => {
          return item.runtime;
        });

        //console.log(runtime);

        const totalRuntime = runtime.reduce(
          (sum: number, item: number) => sum + item,
          0
        );

        const averageRuntime =
          runtime.length > 0 ? Math.round(totalRuntime / runtime.length) : 0;

        return averageRuntime;
      },
    }),
    getSeriesSocials: builder.query({
      query: (id: number) => `tv/${id}/external_ids?api_key=${apiKey}`,
      // Cache the data for 10 minutes
      keepUnusedDataFor: time,
    }),
  }),
});

export const {
  useGetTrendingSeriesQuery,
  useGetNewSeriesReleasesQuery,
  useGetSeriesDetailsTeaserCardQuery,
  useGetSeriesDetailsQuery,
  useGetTrailerSeriesVideoQuery,
  useGetSeriesCastQuery,
  useGetImdbIdQuery,
  useGetSeriesCertificationQuery,
  useGetSeriesRuntimeQuery,
  useGetSeriesSocialsQuery
} = seriesApi;
