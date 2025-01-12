import { getTrailerMovieVideo } from "@/app/pages/api/homePage";
import { getImdbId } from "@/app/pages/api/singleSeriesPage";
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

// Function to format a Date object as 'YYYY-MM-DD'
function formatDate(date: any) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Calculate min_date (current date)
const today = new Date();
const min_date = formatDate(today);

export const seriesApi = createApi({
  reducerPath: "seriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: `https://api.themoviedb.org/3/` }),
  endpoints: (builder) => ({
    getTrendingSeries: builder.query<ItemsBigCardsProp[], void>({
      query: () => `trending/tv/week?api_key=${apiKey}&region=US`,
      // Cache the data for 10 minutes
      keepUnusedDataFor: time,
      transformResponse: async (response: any) => {
        const filteredData = response.results.filter(
          (movie: any) => movie.original_language === "en"
        );
        const normalizedItems = await Promise.all(
          filteredData.map(async (item: any) => {
            try {
              const id = item.id;
              const response = await getImdbId(id);
              const data = await response.json();
              console.log("data", data);
              
              // const poster = dataImage.find((img: any) => img.file_path) || {};
              return {
                ...item,
                imdb_id: data || null,
              };
            } catch (error) {
              console.error(`Error normalizing item ${item.tmdbId}:`, error);
              return null; // Or handle as needed
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
    getSeriesEpisodes: builder.query({
      query: ({ Id, selectedSeason }: { Id: number; selectedSeason: number }) =>
        `tv/${Id}/season/${selectedSeason}?api_key=${apiKey}`,
      // Cache the data for 10 minutes
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        //console.log(response.episodes);

        return response.episodes;
      },
    }),
    getHowToWatchSeries: builder.query({
      query: (id: number) => `tv/${id}/watch/providers?api_key=${apiKey}`,
      // Cache the data for 10 minutes
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        const data = response.results.US;
        // const combinedServices = [
        //   ...(data.flatrate || []),
        //   ...(data.rent || []),
        //   ...(data.buy || []),
        // ];

        return data;
      },
    }),
    getSeriesReview: builder.query({
      query: (id: number) => `tv/${id}/reviews?api_key=${apiKey}`,
      // Cache the data for 10 minutes
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        const data = response.results;
        // const combinedServices = [
        //   ...(data.flatrate || []),
        //   ...(data.rent || []),
        //   ...(data.buy || []),
        // ];

        return data;
      },
    }),
    getSeriesCollection: builder.query({
      query: (id: number) => `collection/${id}?api_key=${apiKey}`,
      // Cache the data for 10 minutes
      keepUnusedDataFor: time,
    }),
    getSeriesSimilar: builder.query({
      query: (genres: any[]) => {
        // Extract genre IDs and join them
        const genreIds = genres
          .slice(0, 2) // Adjust slice based on your logic
          .map((genre) => genre.id)
          .join(",");

        return `discover/tv?api_key=${apiKey}&language=en-US&region=US&vote_count.gte=100&vote_average.gte=7&sort_by=popularity.desc&with_genres=${genreIds}`;
      },
      // Cache the data for 10 minutes
      keepUnusedDataFor: time,
      // transformResponse: (response: any) => {
      //   const data = response.results;
      //   return data;
      // },
    }),
    getSeriesRecommendation: builder.query({
      query: (id: number) =>
        `tv/${id}/recommendations?api_key=${apiKey}&language=en-US&page=1&region=US&sort_by=primary_release_date.desc`,
      // Cache the data for 10 minutes
      keepUnusedDataFor: time,
    }),
    getSeriesRecommendationFallBack: builder.query({
      query: () => `tv/now_playing?api_key=${apiKey}&region=US`,
      // Cache the data for 10 minutes
      keepUnusedDataFor: time,
    }),
        getNewSeriesOnNetflix: builder.query<MediaProp[], { page: number }>({
          query: ({ page }: { page: number }) =>
            `discover/tv?api_key=${apiKey}&page=${page}&include_adult=false&include_video=false&language=en-US&first_air_date.lte=${min_date}&sort_by=first_air_date.desc&watch_region=US&with_original_language=en&with_watch_monetization_types=flatrate&with_watch_providers=8`,
          // Cache the data for 10 minutes
          keepUnusedDataFor: time,
          transformResponse: async (
            response: any,
            // meta: FetchBaseQueryMeta | undefined,
            // arg: {
            //   page: number;
            // }
          ) => {
            //const { page } = arg;
            // Enhance the data with video keys
    
            const filteredPoster = response.results.filter((item: any) => {
              return !!item.poster_path; // Ensure poster_path exists and is not null or undefined
            });
            
            //console.log(filteredPoster);
            
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
          // Cache the data for 10 minutes
          keepUnusedDataFor: time,
          transformResponse: async (
            response: any,
            // meta: FetchBaseQueryMeta | undefined,
            // arg: {
            //   page: number;
            // }
          ) => {
            //const { page } = arg;
            // Enhance the data with video keys
    
            const filteredPoster = response.results.filter((item: any) => {
              return !!item.poster_path; // Ensure poster_path exists and is not null or undefined
            });
            
            //console.log(filteredPoster);
            
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
        getNewSeriesOnPrime: builder.query<MediaProp[], { page: number }>({
          query: ({ page }: { page: number }) =>
            `discover/tv?api_key=${apiKey}&page=${page}&include_adult=false&include_null_first_air_dates=false&language=en-US&first_air_date.lte=${min_date}&sort_by=popularity.desc&with_origin_country=US&with_original_language=en&with_watch_providers=119`,
          // Cache the data for 10 minutes
          keepUnusedDataFor: time,
          transformResponse: async (
            response: any,
            // meta: FetchBaseQueryMeta | undefined,
            // arg: {
            //   page: number;
            // }
          ) => {
            //const { page } = arg;
            // Enhance the data with video keys
    
            const filteredPoster = response.results.filter((item: any) => {
              return !!item.poster_path; // Ensure poster_path exists and is not null or undefined
            });
            
            //console.log(filteredPoster);
            
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
        getNewSeriesOnParamount: builder.query<MediaProp[], { page: number }>({
          query: ({ page }: { page: number }) =>
            `discover/tv?api_key=${apiKey}&page=${page}&include_adult=false&include_video=false&language=en-US&first_air_date.lte=${min_date}&sort_by=first_air_date.desc&watch_region=US&with_original_language=en&with_watch_monetization_types=flatrate&with_watch_providers=531`,
          // Cache the data for 10 minutes
          keepUnusedDataFor: time,
          transformResponse: async (
            response: any,
            // meta: FetchBaseQueryMeta | undefined,
            // arg: {
            //   page: number;
            // }
          ) => {
            //const { page } = arg;
            // Enhance the data with video keys
    
            const filteredPoster = response.results.filter((item: any) => {
              return !!item.poster_path; // Ensure poster_path exists and is not null or undefined
            });
            
            //console.log(filteredPoster);
            
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
