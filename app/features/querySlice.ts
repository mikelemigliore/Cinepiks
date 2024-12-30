// querySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "./store"; // Adjust the import path as needed

interface QueryState {
  type: string;
  page: number;
  sortBy: string;
  withFilterGenre: number[];
  withFilterPlatform: string[]
  ContentSearch: any[];
  withAvailability: any[];
  withRuntime:any[]
}

const initialState: QueryState = {
  type: "all",
  page: 1,
  sortBy: "popularity.desc",
  withFilterGenre: [],
  withFilterPlatform: [],
  ContentSearch: [],
  withAvailability: [],
  withRuntime:[]
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
    setFilterPlatform: (state, action: PayloadAction<string[]>) => {
      state.withFilterPlatform = action.payload;
    },
    setContent: (state, action: PayloadAction<any[]>) => {
      state.ContentSearch = action.payload;
    },
    setAvailability: (state, action: PayloadAction<any[]>) => {
      state.withAvailability = action.payload;
    },
    setRuntime: (state, action: PayloadAction<any[]>) => {
        state.withRuntime = action.payload;
      },
  },
});

export const {
  setType,
  setPage,
  setSortby,
  setFilterGenre,
  setFilterPlatform,
  setContent,
  setAvailability,
  setRuntime
} = querySlice.actions;

// const { type, page, sortBy, withFilterGenre, withFilterPlatform } = useSelector(
//     (state: RootState) => state.query
//   );

export default querySlice.reducer;
