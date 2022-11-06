import { configureStore } from "@reduxjs/toolkit";
import { searchSlice } from "./slices/searchSlice";
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from "next-redux-cookie-wrapper";
import { createWrapper } from "next-redux-wrapper";
import { userSlice } from "./slices/userSlice";
import { loaderSlice } from "./slices/loaderSlice";
import { themeSlice } from "./slices/themeSlice";
import { cartSlice } from "./slices/cartSlice";

const makeStore = wrapMakeStore(() =>
  configureStore({
    reducer: {
      [searchSlice.name]: searchSlice.reducer,
      [userSlice.name]: userSlice.reducer,
      [loaderSlice.name]: loaderSlice.reducer,
      [themeSlice.name]: themeSlice.reducer,
      [cartSlice.name]: cartSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(
        nextReduxCookieMiddleware({
          subtrees: [
            `${userSlice.name}.user`,
            searchSlice.name,
            themeSlice.name,
            cartSlice.name,
          ],
        })
      ),
    devTools: true,
  })
);

export const wrapper = createWrapper(makeStore, { debug: true });
