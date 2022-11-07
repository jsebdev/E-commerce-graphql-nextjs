import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  user: {
    // id: null,
    token: null,
    username: null,
  },
  userItems: [],
  activationEmail: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserItems: (state, action) => {
      state.userItems = action.payload;
    },
    setActivationEmail: (state, action) => {
      state.activationEmail = action.payload;
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

export const { setUserItems, setUser, setActivationEmail } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectUsername = (state) => state.user.user.username;
export const selectToken = (state) => state.user.user.token;
export const selectActivationEmail = (state) => state.user.activationEmail;
export const selectUserItems = (state) => state.user.userItems;