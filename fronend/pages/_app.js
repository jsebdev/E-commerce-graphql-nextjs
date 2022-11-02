import React from "react";
import { wrapper } from "store/store";
import { Provider } from "react-redux";
import { MyLoader } from "components/myLoader";
import { ThemeController } from "components/themeController";

export default function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <ThemeController>
        <Component {...props.pageProps} />
        <MyLoader />
      </ThemeController>
    </Provider>
  );
}
