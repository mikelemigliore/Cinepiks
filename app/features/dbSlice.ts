import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface Like {
//   id:number,
//   type:string
// }

// interface Watchlist {
//   id:number,
//   type:string
// }

interface Episode {
  episodeNumber: number;
  episodeValue: number;
}

interface Season {
  seriesId: number;
  seasonNumber: number;
  episodes: Episode[];
  progress: number;
}

interface QueryState {
  likes: any[]; // Use an array type instead of any[]
  watchlist: any[];
  watched: any[];
  score: any[];
  season: Season[];
}

const initialState: QueryState = {
  // type: "all",
  likes: [], // Load from localStorage initially,
  watchlist: [],
  watched: [],
  score: [],
  season: [],
};
//JSON.parse(localStorage.getItem("likesdb") || "[]"),
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
    // scoreMovie: (state, action: PayloadAction<any>) => {
    //   state.score.push(action.payload);
    // },
    unscoreMovie: (state, action: PayloadAction<any>) => {
      state.score = state.score.filter((list) => list.id !== action.payload.id);
    },
    // ✅ Updates the score if the movie already exists in the array
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
        episodeValue: number;
        progress: number;
        //progressValue: number;
      }>
    ) => {
      const { Id, seasonNumber, episodeNumber, episodeValue, progress } =
        action.payload;

      // ✅ Find the correct index instead of just the first match
      const seasonEntry = state.season.find(
        (season) =>
          season.seriesId === Id && season.seasonNumber === seasonNumber
      );

      if (seasonEntry) {
        // if (!seasonEntry.episodes.includes(episodeNumber)) {
        //   seasonEntry.episodes = [...seasonEntry.episodes, episodeNumber];
        // }
        const episodeExists = seasonEntry.episodes.find(
          (ep) => ep.episodeNumber === episodeNumber
        );

        if (!episodeExists) {
          seasonEntry.episodes.push({ episodeNumber, episodeValue });
          // ✅ Increment progress only if the episode is new
          seasonEntry.progress += episodeValue;
        }
      } else {
        // ✅ If the season doesn't exist, add a new entry with the correct Id and seasonNumber
        // state.season.push({
        //   seriesId: Id,
        //   seasonNumber,
        //   episodes: [episodeNumber],
        // });
        state.season.push({
          seriesId: Id,
          seasonNumber,
          episodes: [{ episodeNumber, episodeValue }],
          progress: episodeValue, // ✅ Initialize progress with the first episodeValue
        });
      }
    },
    removeEpisode: (
      state,
      action: PayloadAction<{
        seasonNumber: number;
        episodeNumber: number;
        Id: number;
        episodeValue: number;
      }>
    ) => {
      const { Id, seasonNumber, episodeNumber, episodeValue } = action.payload;

      const season = state.season.find(
        (season) =>
          season.seriesId === Id && season.seasonNumber === seasonNumber
      );

      // if (season) {
      //   if (season.episodes.includes(episodeNumber)) {
      //     season.episodes = season.episodes.filter(
      //       (ep) => ep !== episodeNumber
      //     );
      //   }
      // }
      if (season) {
        // ✅ Decrease progress only when an episode is removed
        season.progress -= episodeValue;
        season.episodes = season.episodes.filter(
          (ep) => ep.episodeNumber !== episodeNumber
        );
      }
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
  // addSeason,
  removeEpisode,
  addEpisode,
} = dbSlice.actions;

export default dbSlice.reducer;
