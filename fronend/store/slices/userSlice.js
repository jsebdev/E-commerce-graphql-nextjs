import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  token: null,
  username: null,
  userItems: [],
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
    setUserItems: (state, action) => {
      state.userItems = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.user,
      };
    },
  },
});

export const { setToken, setUsername, setUserItems } = userSlice.actions;

export const selectToken = (state) => state.user.token;
export const selectUsername = (state) => state.user.username;
export const selectUserItems = (state) => state.user.userItems;
