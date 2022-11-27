import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  showWelcome: false,
  welcomed: false,
};

// Actual Slice
export const welcomeSlice = createSlice({
  name: "welcome",
  initialState,
  reducers: {
    setShowWelcome: (state, action) => {
      state.showWelcome = action.payload;
    },
    setWelcomed: (state, action) => {
      state.welcomed = action.payload;
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

export const { setShowWelcome, setWelcomed } = welcomeSlice.actions;

export const selectShowWelcome = (state) =>
  state[welcomeSlice.name].showWelcome;
export const selectWelcomed = (state) => state[welcomeSlice.name].welcomed;
