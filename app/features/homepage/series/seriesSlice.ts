import { getTrailerMovieVideo } from "@/app/pages/api/homePage";
import { getImdbId } from "@/app/pages/api/singleSeriesPage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

interface MediaProp {
  id: number;
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
  title: string;
  name?: string;
  poster_path: string;
  showType: string;
  backdrop_path: string;
  genre_ids: number[];
  description: string;
}

const time = 600;

function formatDate(date: any) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); 
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const today = new Date();
const min_date = formatDate(today);

export const seriesApi = createApi({
  reducerPath: "seriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: `https://api.themoviedb.org/3/` }),
  endpoints: (builder) => ({
    getTrendingSeries: builder.query<ItemsBigCardsProp[], void>({
      query: () => `trending/tv/week?api_key=${apiKey}&region=US`,
      keepUnusedDataFor: time,
      transformResponse: async (response: any) => {
        const filteredData = response.results.filter(
          (movie: any) => movie.original_language === "en"
        );
        const normalizedItems = await Promise.all(
          filteredData?.map(async (item: any) => {
            try {
              const id = item.id;
              const response = await getImdbId(id);
              const data = await response?.json();
              //console.log("data", data);
            
              return {
                ...item,
                imdb_id: data || null,
              };
            } catch (error) {
              console.error(`Error normalizing item ${item.tmdbId}:`, error);
              return null; 
            }
          })
        );

        return normalizedItems;
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
      keepUnusedDataFor: time,
    }),
    getSeriesDetails: builder.query({
      query: (id: number) => `tv/${id}?api_key=${apiKey}`,
      keepUnusedDataFor: time,
    }),
    getTrailerSeriesVideo: builder.query({
      query: (id: number) => `tv/${id}/videos?api_key=${apiKey}`,
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        const trailers = response.results.filter(
          (item: any) => item.type === "Trailer" && item.official === true
        );

        const sortedTrailer = trailers.sort(
          (a: any, b: any) =>
            new Date(a.published_at).getTime() -
            new Date(b.published_at).getTime()
        );

        const firstTrailer = sortedTrailer.length > 0 ? sortedTrailer[0] : null;

        return firstTrailer;
      },
    }),
    getSeriesCast: builder.query({
      query: (id: number) => `tv/${id}/credits?api_key=${apiKey}`,
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
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        const data = response.imdb_id;

        return data;
      },
    }),
    getSeriesCertification: builder.query({
      query: (id: number) => `tv/${id}/content_ratings?api_key=${apiKey}`,
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        const filteredCertification = response.results.filter((item: any) => {
          return item.iso_3166_1 === "US";
        });

        return filteredCertification[0]?.rating;
      },
    }),
    getSeriesRuntime: builder.query({
      query: (id: number) => `tv/${id}/season/1?api_key=${apiKey}`,
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        const runtime = response.episodes.map((item: any) => {
          return item.runtime;
        });

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
      keepUnusedDataFor: time,
    }),
    getSeriesEpisodes: builder.query({
      query: ({ Id, selectedSeason }: { Id: number; selectedSeason: number }) =>
        `tv/${Id}/season/${selectedSeason}?api_key=${apiKey}`,
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {

        return response.episodes;
      },
    }),
    getHowToWatchSeries: builder.query({
      query: (id: number) => `tv/${id}/watch/providers?api_key=${apiKey}`,
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        const data = response.results.US;

        return data;
      },
    }),
    getSeriesReview: builder.query({
      query: (id: number) => `tv/${id}/reviews?api_key=${apiKey}`,
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        const data = response.results;

        return data;
      },
    }),
    getSeriesCollection: builder.query({
      query: (id: number) => `collection/${id}?api_key=${apiKey}`,
      keepUnusedDataFor: time,
    }),
    getSeriesSimilar: builder.query({
      query: (genres: any[]) => {
        const genreIds = genres
          .slice(0, 2) 
          .map((genre) => genre.id)
          .join(",");

        return `discover/tv?api_key=${apiKey}&language=en-US&region=US&vote_count.gte=100&vote_average.gte=7&sort_by=popularity.desc&with_genres=${genreIds}`;
      },
      keepUnusedDataFor: time,
    }),
    getSeriesRecommendation: builder.query({
      query: (id: number) =>
        `tv/${id}/recommendations?api_key=${apiKey}&language=en-US&page=1&region=US&sort_by=primary_release_date.desc`,
      keepUnusedDataFor: time,
    }),
    getSeriesRecommendationFallBack: builder.query({
      query: () => `tv/now_playing?api_key=${apiKey}&region=US`,
      keepUnusedDataFor: time,
    }),
        getNewSeriesOnNetflix: builder.query<MediaProp[], { page: number }>({
          query: ({ page }: { page: number }) =>
            `discover/tv?api_key=${apiKey}&page=${page}&include_adult=false&include_video=false&language=en-US&first_air_date.lte=${min_date}&sort_by=first_air_date.desc&watch_region=US&with_original_language=en&with_watch_monetization_types=flatrate&with_watch_providers=8`,

          keepUnusedDataFor: time,
          transformResponse: async (
            response: any,
          ) => {
    
            const filteredPoster = response.results.filter((item: any) => {
              return !!item.poster_path; 
            });
            
            
            const updatedResults = await Promise.all(
              filteredPoster.map(async (media: any) => {
                try {
                  const responseTrailer = await getTrailerMovieVideo(media.id); // Fetch the trailer
                  const dataTrailer = await responseTrailer.json();
                  return { ...media, videoKey: dataTrailer?.key || "defaultKey" };
                } catch (error) {
                  console.error(
                    `Error fetching trailer for media ID ${media.id}:`,
                    error
                  );
                  return { ...media, videoKey: "6ZfuNTqbHE8" }; // Fallback video key
                }
              })
            );
    
            return updatedResults;
          },
        }),
        getNewSeriesOnHulu: builder.query<MediaProp[], { page: number }>({
          query: ({ page }: { page: number }) =>
            `discover/tv?api_key=${apiKey}&page=${page}&include_adult=false&include_video=false&language=en-US&first_air_date.lte=${min_date}&sort_by=first_air_date.desc&watch_region=US&with_original_language=en&with_watch_monetization_types=flatrate&with_watch_providers=15`,

          keepUnusedDataFor: time,
          transformResponse: async (
            response: any,
          ) => {
    
            const filteredPoster = response.results.filter((item: any) => {
              return !!item.poster_path; 
            });
            
            
            const updatedResults = await Promise.all(
              filteredPoster.map(async (media: any) => {
                try {
                  const responseTrailer = await getTrailerMovieVideo(media.id); 
                  const dataTrailer = await responseTrailer.json();
                  return { ...media, videoKey: dataTrailer?.key || "defaultKey" };
                } catch (error) {
                  console.error(
                    `Error fetching trailer for media ID ${media.id}:`,
                    error
                  );
                  return { ...media, videoKey: "6ZfuNTqbHE8" }; 
                }
              })
            );
    
            return updatedResults;
          },
        }),
        getNewSeriesOnPrime: builder.query<MediaProp[], { page: number }>({
          query: ({ page }: { page: number }) =>
            `discover/tv?api_key=${apiKey}&page=${page}&include_adult=false&include_null_first_air_dates=false&language=en-US&first_air_date.lte=${min_date}&sort_by=popularity.desc&with_origin_country=US&with_original_language=en&with_watch_providers=119`,
          keepUnusedDataFor: time,
          transformResponse: async (
            response: any,
          ) => {
    
            const filteredPoster = response.results.filter((item: any) => {
              return !!item.poster_path;
            });
            
            
            const updatedResults = await Promise.all(
              filteredPoster.map(async (media: any) => {
                try {
                  const responseTrailer = await getTrailerMovieVideo(media.id); 
                  const dataTrailer = await responseTrailer.json();
                  return { ...media, videoKey: dataTrailer?.key || "defaultKey" };
                } catch (error) {
                  console.error(
                    `Error fetching trailer for media ID ${media.id}:`,
                    error
                  );
                  return { ...media, videoKey: "6ZfuNTqbHE8" };
                }
              })
            );
    
            return updatedResults;
          },
        }),
        getNewSeriesOnParamount: builder.query<MediaProp[], { page: number }>({
          query: ({ page }: { page: number }) =>
            `discover/tv?api_key=${apiKey}&page=${page}&include_adult=false&include_video=false&language=en-US&first_air_date.lte=${min_date}&sort_by=first_air_date.desc&watch_region=US&with_original_language=en&with_watch_monetization_types=flatrate&with_watch_providers=531`,

          keepUnusedDataFor: time,
          transformResponse: async (
            response: any,
          ) => {
            const filteredPoster = response.results.filter((item: any) => {
              return !!item.poster_path; 
            });
            
            
            const updatedResults = await Promise.all(
              filteredPoster.map(async (media: any) => {
                try {
                  const responseTrailer = await getTrailerMovieVideo(media.id); 
                  const dataTrailer = await responseTrailer.json();
                  return { ...media, videoKey: dataTrailer?.key || "defaultKey" };
                } catch (error) {
                  console.error(
                    `Error fetching trailer for media ID ${media.id}:`,
                    error
                  );
                  return { ...media, videoKey: "6ZfuNTqbHE8" }; 
                }
              })
            );
    
            return updatedResults;
          },
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
  useGetSeriesSocialsQuery,
  useGetSeriesEpisodesQuery,
  useGetHowToWatchSeriesQuery,
  useGetSeriesReviewQuery,
  useGetSeriesCollectionQuery,
  useGetSeriesSimilarQuery,
  useGetSeriesRecommendationQuery,
  useGetSeriesRecommendationFallBackQuery,
  useGetNewSeriesOnNetflixQuery,
  useGetNewSeriesOnHuluQuery,
  useGetNewSeriesOnPrimeQuery,
  useGetNewSeriesOnParamountQuery
} = seriesApi;
