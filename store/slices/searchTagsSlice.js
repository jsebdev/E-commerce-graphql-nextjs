import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  searchTags: [],
  itemsByTags: [],
  searchOnRender: false,
};

// Actual Slice
export const searchTagsSlice = createSlice({
  name: "searchTags",
  initialState,
  reducers: {
    setSearchTags: (state, action) => {
      state.searchTags = action.payload;
    },
    setItemsByTags: (state, action) => {
      state.itemsByTags = action.payload;
    },
    setSearchOnRender: (state, action) => {
      state.searchOnRender = action.payload;
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

export const { setSearchOnRender, setSearchTags, setItemsByTags } =
  searchTagsSlice.actions;

export const selectSearchTags = (state) =>
  state[searchTagsSlice.name].searchTags;
export const selectItemsByTags = (state) =>
  state[searchTagsSlice.name].itemsByTags;
export const selectSearchOnRender = (state) =>
  state[searchTagsSlice.name].searchOnRender;
