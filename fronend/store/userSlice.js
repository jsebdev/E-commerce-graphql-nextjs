import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  username: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setToken, setUsername } = userSlice.actions;

export const selectToken = (state) => state.user.token;
