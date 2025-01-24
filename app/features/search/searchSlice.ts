import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const time = 600;
function formatDate(date: any) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); 
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const today = new Date();
const min_date = formatDate(today);

const daysToAdd = 60;
const max_date = formatDate(
  new Date(today.getTime() + daysToAdd * 24 * 60 * 60 * 1000)
);

const daysToSub = 14;
const max_date_back = formatDate(
  new Date(today.getTime() - daysToSub * 24 * 60 * 60 * 1000)
);

const days = 7;
const min_date_future = formatDate(
  new Date(today.getTime() + days * 24 * 60 * 60 * 1000)
);

const pickGenres = (withFilterGenre: number[] | undefined) => {
  if (withFilterGenre && withFilterGenre.length > 0) {
    const genres = withFilterGenre.join(",");
    console.log(genres);

    return `&with_genres=${genres}`;
  } else {
    return "";
  }
};

const pickPlatform = (withFilterPlatform: string[] | undefined) => {
  if (withFilterPlatform && withFilterPlatform.length > 0) {

    const platforms = withFilterPlatform.join("|");
    console.log("PickPlatform", platforms);
    return `&with_watch_providers=${platforms}&${(platforms.includes("119") || platforms.includes("384")) ? '' : `watch_region=US`}`; //add &watch_region=US to get US accurate data, but they are much less. Better without but more confusion
  } else {
    return "";
  }
};

interface Availability {
  id: string;
  tag: string;
}

const pickAvailability = (withAvailability: Availability[] | undefined) => {
  if (withAvailability && withAvailability.length > 0) {
    const order = ["2|3", "4"];

    const filteredItems = withAvailability.filter((item) =>
      order.includes(`${item.id}`)
    );

    const theatersItem = filteredItems.find(
      (item) => item.tag === "inTheaters"
    );
    const upcomingItem = filteredItems.find((item) => item.tag === "upcoming");

    if (theatersItem && theatersItem.id === "2|3") {
      return `&region=US&with_release_type=${theatersItem.id}&release_date.gte=${max_date_back}&release_date.lte=${min_date}`;
    } else if (upcomingItem && upcomingItem.id === "2|3") {
      return `&region=US&release_date.gte=${min_date}&release_date.lte=${max_date}&with_release_type=${upcomingItem.id}`;
    } else if (filteredItems.some((item) => item.id === "4")) {
      return `&region=US&with_release_type=4&release_date.lte=${min_date}`;
    }
  }

  return "";
};

const pickRuntime = (withRuntime: number[] | undefined) => {
  if (withRuntime && withRuntime.length > 0) {
    if (withRuntime.includes(90)) {
      return `&region=US&with_runtime.lte=90`;
    } else if (withRuntime.includes(120)) {
      return `&region=US&with_runtime.gte=90&with_runtime.lte=120`;
    } else if (withRuntime.includes(121)) {
      return `&region=US&with_runtime.gte=125`;
    }
  } else {
    return "";
  }
};

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  endpoints: (builder) => ({
    getContent: builder.query({
      query: ({
        type,
        page,
        sortBy,
        withFilterGenre,
        withFilterPlatform,
        withAvailability,
        withRuntime,
      }: {
        type: string;
        page: number;
        sortBy: string;
        withFilterGenre?: number[];
        withFilterPlatform?: string[];
        withAvailability?: Availability[];
        withRuntime?: number[];
      }) => {
        const endpoints: Record<string, string> = {
          movie: `discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sortBy}${
            withAvailability
              ? ``
              : `&primary_release_date.lte=${min_date}&vote_count.gte=300&vote_average.gte=4`
          }${pickGenres(withFilterGenre)}${pickPlatform(
            withFilterPlatform
          )}${pickAvailability(withAvailability)}${pickRuntime(withRuntime)}`,
          series: `discover/tv?api_key=${apiKey}&include_adult=false&include_null_first_air_dates=false&language=en-US&sort_by=${sortBy}&page=${page}&first_air_date.lte=${min_date}${pickGenres( 
            withFilterGenre
          )}${pickPlatform(withFilterPlatform)}&with_original_language=en&with_watch_monetization_types=flatrate`,
          all: `trending/all/day?api_key=${apiKey}&page=${page}`,
        };
        
        return (
          endpoints[type] || 
          (() => {
            throw new Error("Invalid type provided");
          })()
        );
      },
      keepUnusedDataFor: time,
      //We don't need the meta segment but, the Redux library expects a function with exactly three parameters, and removing one breaks the type matching.
      transformResponse: (
        response: any,
        meta: FetchBaseQueryMeta | undefined,
        arg: {
          type: string;
          page: number;
          sortBy: string;
          withFilterGenre: number[];
          withFilterPlatform: string[];
          withAvailability: Availability[];
          withRuntime: number[];
        }
      ) => {
        const { type } = arg; 
        const { sortBy } = arg;
        if (!response || !response.results) {
          return []; 
        }

        const newData = response.results.map((item: any) => ({
          ...item,
          media_type:
            type === "movie" //If type is "movie",
              ? "movie" //it sets media_type to "movie". If media_type is not present , it create it.
              : type === "series" //If type is "series"
              ? "tv" //sets media_type to "tv". If media_type is not present , it create it.
              : type === "all"
              ? item.first_air_date
                ? "tv"
                : "movie"
              : item.media_type, // it uses the existing media_type
        }));


        const filteredData = newData.filter((item: any) => {
          return !!item.poster_path; 
        });


        if (type === "all") {
          const sorteData = filteredData.sort((a: any, b: any) => {
            switch (sortBy) {
              case "primary_release_date.desc":
                return (
                  new Date(b.release_date || b.first_air_date).getTime() -
                  new Date(a.release_date || a.first_air_date).getTime()
                );
              case "popularity.desc":
                return b.popularity - a.popularity;
              case "vote_average.desc":
                return b.vote_average - a.vote_average;
              case "title.desc": // Sort alphabetically
                const titleA = (a.title || a.name || "").toLowerCase();
                const titleB = (b.title || b.name || "").toLowerCase();
                if (titleA < titleB) return -1; 
                if (titleA > titleB) return 1; 
                return 0; 
              default:
                return 0; 
            }
          });
          return sorteData;
        } else {

          return filteredData;
        }
      },
    }),
    getSearchItem: builder.query({
      query: ({ page, query }: { page: number; query: string }) =>
        `/search/multi?api_key=${apiKey}&page=${page}&query=${query}&include_adult=false&language=en-US`,
      keepUnusedDataFor: time,
      transformResponse: (response: any) => {
        const newData = response.results.map((item: any) => ({
          ...item,
          media_type: item.first_air_date ? "tv" : "movie",
        }));

        const filteredData = newData.filter((item: any) => {
          return !!item.poster_path; 
        });

        const sorteData = filteredData.sort((a: any, b: any) => {
          return b.popularity - a.popularity && b.vote_count - a.vote_count;
        });

        return sorteData;
      },
    }),
  }),
});

export const { useGetContentQuery, useGetSearchItemQuery } = searchApi;
