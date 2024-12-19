import { configureStore } from "@reduxjs/toolkit";
import { movieApi } from "./homepage/movies/movieSlice";
import { ratingsApi } from "./ratingSlice";
import { seriesApi } from "./homepage/series/seriesSlice";
import { StreamingServicesApi } from "./homepage/movies/moviesStreamServiceSlice";

export const store = configureStore({
  reducer: {
    //reducer is responsible for updating the state based on the action it receives
    // When you use createApi from RTK Query, it automatically generates reducers to manage the API's state, including:
    // Caching API responses.
    // Tracking the status of queries (e.g., loading, error).
    // Invalidating data when needed.

    //Ex:
    // A key under which movieApi.reducer is added to the store.
    // Manages the state for all API calls related to movieApi
    [movieApi.reducerPath]: movieApi.reducer,
    [seriesApi.reducerPath]: seriesApi.reducer,
    [StreamingServicesApi.reducerPath]: StreamingServicesApi.reducer,
    [ratingsApi.reducerPath]: ratingsApi.reducer,
  },
  middleware: (
    getDefaultMiddleware //This is a function provided by Redux Toolkit that includes default middleware like redux-thunk (uses for async code) for handling asynchronous actions.Middleware for serializable state checks and more.
  ) =>
    getDefaultMiddleware()
      .concat(movieApi.middleware)
      .concat(seriesApi.middleware)
      .concat(StreamingServicesApi.middleware)
      .concat(ratingsApi.middleware), //Adds the middleware provided by movieApi. This middleware handles tasks like: Caching API responses. Invalidating or refetching data when queries/mutations change. Tracking loading and error states.
});
``;
