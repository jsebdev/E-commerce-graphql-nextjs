import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { itemSlice } from "./searchSlice";
// import { searchSlice } from "./searchSlice";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
  configureStore({
    reducer: {
      [itemSlice.name]: itemSlice.reducer,
      // [searchSlice.name]: searchSlice.reducer,
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
