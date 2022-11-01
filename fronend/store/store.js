import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { itemSlice } from "./slices/searchSlice";
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from "next-redux-cookie-wrapper";
import { createWrapper } from "next-redux-wrapper";
import { userSlice } from "./slices/userSlice";
import { loaderSlice } from "./slices/loaderSlice";

const makeStore = wrapMakeStore(() =>
  configureStore({
    reducer: {
      [itemSlice.name]: itemSlice.reducer,
      [userSlice.name]: userSlice.reducer,
      [loaderSlice.name]: loaderSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(
        nextReduxCookieMiddleware({
          subtrees: [`${userSlice.name}.token`, `${userSlice.name}.username`],
        })
      ),
    devTools: true,
  })
);

export const wrapper = createWrapper(makeStore, { debug: true });
