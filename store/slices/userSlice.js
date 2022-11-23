import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  user: {
    token: null,
    username: null,
    email: null,
  },
  userItems: {
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
    setToken: (state, action) => {
      state.user.token = action.payload;
    },
    setUserItems: (state, action) => {
      state.userItems.userItems = action.payload;
    },
    addUserItem: (state, action) => {
      state.userItems.userItems = [
        action.payload,
        ...state.userItems.userItems.filter(
          (item) => item.id !== action.payload.id
        ),
      ];
    },
    modifyUserItem: (state, action) => {
      state.userItems.userItems = state.userItems.userItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.userItems.userItems = [
        action.payload,
        ...state.userItems.userItems,
      ];
    },
    deleteUserItem: (state, action) => {
      state.userItems.userItems = state.userItems.userItems.filter(
        (item) => item.id !== action.payload
      );
    },
    setActivationEmail: (state, action) => {
      state.activationEmail = action.payload;
    },
    setItemsFetched: (state, action) => {
      state.userItems.itemsFetched = action.payload;
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
  deleteUserItem,
  setToken,
} = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectUsername = (state) => state.user.user.username;
export const selectToken = (state) => state.user.user.token;
export const selectEmail = (state) => state.user.user.email;
export const selectActivationEmail = (state) => state.user.activationEmail;
export const selectUserItems = (state) => state.user.userItems.userItems || [];
export const selectUserItemsFetched = (state) =>
  state.user.userItems.itemsFetched || false;
