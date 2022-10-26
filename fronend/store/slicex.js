import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  searchText: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE action called in search");
      console.log("21: action >>>", action);
      if (!action?.payload?.search?.searchText) return;
      return {
        ...state,
        ...action.payload.search,
      };
    },
  },
});

// export const { setSearchText } = searchSlice.actions;

// export const selectSearchText = (state) => state.search.searchText;
