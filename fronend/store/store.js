import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { itemSlice } from "./searchSlice";
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from "next-redux-cookie-wrapper";
import { createWrapper } from "next-redux-wrapper";
import { userSlice } from "./userSlice";

const makeStore = wrapMakeStore(() =>
  configureStore({
    reducer: {
      [itemSlice.name]: itemSlice.reducer,
      [userSlice.name]: userSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(
        nextReduxCookieMiddleware({
          subtrees: [`${userSlice.name}.token`, `${userSlice.name}.username`],
          // subtrees: [`${userSlice.name}`],
        })
      ),
    devTools: true,
  })
);

export const wrapper = createWrapper(makeStore, { debug: true });
