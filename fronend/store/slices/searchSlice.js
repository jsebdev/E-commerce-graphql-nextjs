import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  items: [],
  searchText: "",
};

// Actual Slice
export const itemSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      // console.log("HYDRATE action called in items");
      // console.log("25: action >>>", action);
      // console.log("26: state.items >>>", state.items);
      // console.log("26: state.searchText >>>", state.searchText);
      if (state.searchText !== "") return;
      return {
        ...state,
        ...action.payload.search,
      };
    },
  },
});

export const { setItems, setSearchText } = itemSlice.actions;

export const selectItems = (state) => state.search.items;
export const selectSearchText = (state) => state.search.searchText;
