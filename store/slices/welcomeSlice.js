import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  showWelcome: true,
};

// Actual Slice
export const welcomeSlice = createSlice({
  name: "welcome",
  initialState,
  reducers: {
    setShowWelcome: (state, action) => {
      state.showWelcome = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.welcome,
      };
    },
  },
});

export const { setShowWelcome } = welcomeSlice.actions;

export const selectShowWelcome = (state) =>
  state[welcomeSlice.name].showWelcome;
