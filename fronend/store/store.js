import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { itemSlice } from "./itemsSlice";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
  configureStore({
    reducer: {
      [itemSlice.name]: itemSlice.reducer,
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
