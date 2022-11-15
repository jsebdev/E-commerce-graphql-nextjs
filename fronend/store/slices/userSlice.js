import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  user: {
    token: null,
    username: null,
    userItems: [],
    itemsFetched: false,
  },
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
      state.user.userItems = action.payload;
    },
    addUserItem: (state, action) => {
      state.user.userItems = [action.payload, ...state.user.userItems];
    },
    modifyUserItem: (state, action) => {
      state.user.userItems = state.user.userItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.user.userItems = [action.payload, ...state.user.userItems];
    },
    setActivationEmail: (state, action) => {
      state.activationEmail = action.payload;
    },
    setItemsFetched: (state, action) => {
      state.user.itemsFetched = action.payload;
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

export const {
  setUserItems,
  setUser,
  setActivationEmail,
  addUserItem,
  modifyUserItem,
  setItemsFetched,
} = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectUsername = (state) => state.user.user.username;
export const selectToken = (state) => state.user.user.token;
export const selectActivationEmail = (state) => state.user.activationEmail;
export const selectUserItems = (state) => state.user.user.userItems || [];
export const selectItemsFetched = (state) =>
  state.user.user.itemsFetched || false;
