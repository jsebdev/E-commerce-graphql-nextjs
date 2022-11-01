import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = loaderSlice.actions;

export const selectLoading = (state) => state.loader.loading;
