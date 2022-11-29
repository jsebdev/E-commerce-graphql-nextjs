import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  items: [],
  searchText: "",
};

// Actual Slice
export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (
        state.searchText !== "" &&
        state.searchText !== null &&
        state.searchText !== undefined
      ) {
        return;
      }
      return {
        ...state,
        ...action.payload.search,
      };
    },
  },
});

export const { setItems, setSearchText } = searchSlice.actions;

export const selectSearchItems = (state) => state.search.items;
export const selectSearchText = (state) => state.search.searchText;
