import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { itemSlice } from "./searchSlice";
import { createWrapper } from "next-redux-wrapper";
import { userSlice } from "./userSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      [itemSlice.name]: itemSlice.reducer,
      [userSlice.name]: userSlice.reducer,
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
