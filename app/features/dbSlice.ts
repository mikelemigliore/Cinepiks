import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QueryState {
  likes: any[]; // Use an array type instead of any[]
}

const initialState: QueryState = {
  // type: "all",
  likes: [], // Load from localStorage initially,
};
//JSON.parse(localStorage.getItem("likesdb") || "[]"),
const dbSlice = createSlice({
  name: "dbSlice",
  initialState,
  reducers: {
    // setType: (state, action: PayloadAction<string>) => {
    //   state.type = action.payload;
    // },
    setLikes: (state, action: PayloadAction<any[]>) => {
      state.likes = action.payload;
    },
    likeMovie: (state, action: PayloadAction<any>) => {
      state.likes.push(action.payload);
    },
    unlikeMovie: (state, action: PayloadAction<any>) => {
      console.log("Before:", state.likes);
      console.log("Payload ID:", action.payload.id);

      state.likes = state.likes.filter((like) => like.id !== action.payload.id);

      console.log("After:", state.likes);
    },
  },
});

export const { setLikes, likeMovie, unlikeMovie } = dbSlice.actions;

export default dbSlice.reducer;
