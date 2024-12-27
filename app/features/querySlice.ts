// querySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "./store"; // Adjust the import path as needed

interface QueryState {
  type: string;
  page: number;
  sortBy: string;
  withFilterGenre: number[];
  withFilterPlatform: number[];
  ContentSearch: any[];
}

const initialState: QueryState = {
  type: "all",
  page: 1,
  sortBy: "popularity.desc",
  withFilterGenre: [],
  withFilterPlatform: [],
  ContentSearch:[]
};

const querySlice = createSlice({
  name: "querySlice",
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSortby: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setFilterGenre: (state, action: PayloadAction<number[]>) => {
      state.withFilterGenre = action.payload;
    },
    setFilterPlatform: (state, action: PayloadAction<number[]>) => {
      state.withFilterPlatform = action.payload;
    },
    setContent: (state, action: PayloadAction<any[]>) => {
        // console.log("Previous ContentSearch:", state.ContentSearch);
        // console.log("New Content:", action.payload);
        state.ContentSearch = action.payload;
      },
  },
});

export const {
    setType,
    setPage,
    setSortby,
    setFilterGenre,
    setFilterPlatform,
    setContent
  } = querySlice.actions;

// const { type, page, sortBy, withFilterGenre, withFilterPlatform } = useSelector(
//     (state: RootState) => state.query
//   );

export default querySlice.reducer;