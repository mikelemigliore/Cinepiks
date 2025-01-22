import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Episode {
  episodeNumber: number;
  episodeWatched: boolean;
}

interface Season {
  seriesId: number;
  seasonNumber: number;
  episodes: Episode[];
}

interface QueryState {
  likes: any[]; 
  watchlist: any[];
  watched: any[];
  score: any[];
  season: Season[];
  picture: string;
}

const initialState: QueryState = {
  likes: [], 
  watchlist: [],
  watched: [],
  score: [],
  season: [],
  picture: "",
};
const dbSlice = createSlice({
  name: "dbSlice",
  initialState,
  reducers: {
    setLikes: (state, action: PayloadAction<any[]>) => {
      state.likes = action.payload;
    },
    likeMovie: (state, action: PayloadAction<any>) => {
      state.likes.push(action.payload);
    },
    unlikeMovie: (state, action: PayloadAction<any>) => {
      state.likes = state.likes.filter((like) => like.id !== action.payload.id);
    },
    setWatchlists: (state, action: PayloadAction<any[]>) => {
      state.watchlist = action.payload;
    },
    watchlistMovie: (state, action: PayloadAction<any>) => {
      state.watchlist.push(action.payload);
    },
    unwatchlistMovie: (state, action: PayloadAction<any>) => {
      state.watchlist = state.watchlist.filter(
        (list) => list.id !== action.payload.id
      );
    },
    setWatched: (state, action: PayloadAction<any[]>) => {
      state.watched = action.payload;
    },
    watchedMovie: (state, action: PayloadAction<any>) => {
      state.watched.push(action.payload);
    },
    unwatchedMovie: (state, action: PayloadAction<any>) => {
      state.watched = state.watched.filter(
        (list) => list.id !== action.payload.id
      );
    },
    setScore: (state, action: PayloadAction<any[]>) => {
      state.score = action.payload;
    },
    unscoreMovie: (state, action: PayloadAction<any>) => {
      state.score = state.score.filter((list) => list.id !== action.payload.id);
    },
    updateScore: (state, action: PayloadAction<any>) => {
      const index = state.score.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        // Update existing score
        state.score[index].score = action.payload.score;
      } else {
        // If the movie doesn't exist yet, add it as a new score
        state.score.push(action.payload);
      }
    },
    // Handling Seasons
    setSeasonData: (state, action: PayloadAction<Season[]>) => {
      state.season = action.payload;
    },
    addEpisode: (
      state,
      action: PayloadAction<{
        seasonNumber: number;
        episodeNumber: number;
        Id: number;
        episodeWatched: boolean;
      }>
    ) => {
      const { Id, seasonNumber, episodeNumber, episodeWatched } =
        action.payload;

      const seasonEntry = state.season.find(
        (season) =>
          season.seriesId === Id && season.seasonNumber === seasonNumber
      );

      if (seasonEntry) {
        const episodeExists = seasonEntry.episodes.find(
          (ep) => ep.episodeNumber === episodeNumber
        );

        if (!episodeExists) {
          seasonEntry.episodes.push({ episodeNumber, episodeWatched });
        }
      } else {
        state.season.push({
          seriesId: Id,
          seasonNumber,
          episodes: [{ episodeNumber, episodeWatched }],
        });
      }
    },
    removeEpisode: (
      state,
      action: PayloadAction<{
        seasonNumber: number;
        episodeNumber: number;
        Id: number;
        episodeWatched: boolean;
      }>
    ) => {
      const { Id, seasonNumber, episodeNumber } = action.payload;

      const season = state.season.find(
        (season) =>
          season.seriesId === Id && season.seasonNumber === seasonNumber
      );

      if (season) {
        season.episodes = season.episodes.filter(
          (ep) => ep.episodeNumber !== episodeNumber
        );
      }
    },
    setPicture: (state, action: PayloadAction<string>) => {
      state.picture = action.payload;
    },
    updatePicture: (state, action: PayloadAction<{ picture: string }>) => {
      state.picture = action.payload.picture;
    },
  },
});

export const {
  setLikes,
  likeMovie,
  unlikeMovie,
  setWatchlists,
  watchlistMovie,
  unwatchlistMovie,
  setWatched,
  watchedMovie,
  unwatchedMovie,
  updateScore,
  setScore,
  unscoreMovie,
  setSeasonData,
  removeEpisode,
  addEpisode,
  updatePicture,
  setPicture,
} = dbSlice.actions;

export default dbSlice.reducer;
