import { configureStore } from "@reduxjs/toolkit";
import { movieApi } from "./homepage/movies/movieSlice";
import { ratingsApi } from "./ratingsSlice";
import { seriesApi } from "./homepage/series/seriesSlice";
import { StreamingServicesApi } from "./homepage/movies/moviesStreamServiceSlice";
import { movieDetailsApi } from "./homepage/movies/moviedetailsSlice";
import { loginApi } from "./loginpage/loginSlice";
import { searchApi } from "./search/searchSlice";
import querySlice from "./querySlice";
import dbSlice from "./dbSlice";
import { likesDBApi } from "./likes/likesSlice";
import { persistReducer, persistStore } from 'redux-persist';
import { watchlistDBApi } from "./watchlist/watchlistSlice";
import storage from './storage';  // Import the storage created above
import { watchedDBApi } from "./watched/watchedSlice";
import { scoreDBApi } from "./score/scoreSlice";
import { seasonDBApi } from "./season/seasonSlice";
import { accountDBApi } from "./account/accountSlice";
//import rootReducer from './features/store';
//import storage from 'redux-persist/lib/storage'


// Combine reducers (if you have multiple slices)
const rootReducer =  dbSlice // Add other reducers here as needed

// Configure Redux Persist
const persistConfig = {
  key: 'root',
  storage,  // Uses createWebStorage here
};

// Wrap your slice reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

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
    [movieDetailsApi.reducerPath]: movieDetailsApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [likesDBApi.reducerPath] : likesDBApi.reducer,
    [watchlistDBApi.reducerPath]: watchlistDBApi.reducer,
    [watchedDBApi.reducerPath]:watchedDBApi.reducer,
    [scoreDBApi.reducerPath]: scoreDBApi.reducer,
    [seasonDBApi.reducerPath]:seasonDBApi.reducer,
    [accountDBApi.reducerPath]:accountDBApi.reducer,
    content: persistedReducer,
    query: querySlice, // Register the querySlice reducer under the 'query' key
  },
  middleware: (
    getDefaultMiddleware //This is a function provided by Redux Toolkit that includes default middleware like redux-thunk (uses for async code) for handling asynchronous actions.Middleware for serializable state checks and more.
  ) =>
    getDefaultMiddleware({
      serializableCheck: false,  // Required for Redux Persist to avoid serialization issues
    })
      .concat(movieApi.middleware)
      .concat(seriesApi.middleware)
      .concat(StreamingServicesApi.middleware)
      .concat(ratingsApi.middleware)
      .concat(movieDetailsApi.middleware)
      .concat(loginApi.middleware)
      .concat(likesDBApi.middleware)
      .concat(watchlistDBApi.middleware)
      .concat(watchedDBApi.middleware)
      .concat(scoreDBApi.middleware)
      .concat(seasonDBApi.middleware)
      .concat(accountDBApi.middleware)
      .concat(searchApi.middleware), //Adds the middleware provided by movieApi. This middleware handles tasks like: Caching API responses. Invalidating or refetching data when queries/mutations change. Tracking loading and error states.
});
// ✅ Export the store and persistor
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


