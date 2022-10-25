import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  items: [],
};

// Actual Slice
export const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    // Action to set the authentication status
    setItems: (state, action) => {
      // console.log("16: state.items >>>", state.items);
      state.items = action.payload;
      // console.log("18: state.items >>>", state.items);
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE action called");
      return {
        ...state,
        ...action.payload.items,
      };
    },
  },
});

export const { setItems } = itemSlice.actions;

export const selectItems = (state) => state.items.items;

export default itemSlice.reducer;
