import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface Like {
//   id:number,
//   type:string
// }

// interface Watchlist {
//   id:number,
//   type:string
// }

interface QueryState {
  likes: any[]; // Use an array type instead of any[]
  watchlist: any[];
}

const initialState: QueryState = {
  // type: "all",
  likes: [], // Load from localStorage initially,
  watchlist: [],
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
  },
});

export const {
  setLikes,
  likeMovie,
  unlikeMovie,
  setWatchlists,
  watchlistMovie,
  unwatchlistMovie,
} = dbSlice.actions;

export default dbSlice.reducer;
