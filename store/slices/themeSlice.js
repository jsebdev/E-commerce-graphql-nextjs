import { createSlice } from "@reduxjs/toolkit";
import { THEMES_NAMES } from "helpers/strings";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  themeName: THEMES_NAMES.light,
};

// Actual Slice
export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
      if (action.payload) {
        state.themeName = action.payload;
        return;
      }
      state.themeName =
        state.themeName === THEMES_NAMES.light
          ? THEMES_NAMES.dark
          : THEMES_NAMES.light;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.theme,
      };
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export const selectThemeName = (state) => state[themeSlice.name].themeName;
