import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  searchTags: [],
};

// Actual Slice
export const searchTagsSlice = createSlice({
  name: "searchTags",
  initialState,
  reducers: {
    setSearchTags: (state, action) => {
      state.searchTags = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.searchTags,
      };
    },
  },
});

export const { setSearchTags } = searchTagsSlice.actions;

export const selectSearchTags = (state) =>
  state[searchTagsSlice.name].searchTags;
