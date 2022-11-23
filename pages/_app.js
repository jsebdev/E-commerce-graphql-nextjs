import React from "react";
import { wrapper } from "store/store";
import { Provider } from "react-redux";
import { MyLoader } from "components/myLoader";
import { MantineController } from "components/mantineController";

import "styles/tagInputStyles.scss";
import "styles/global.scss";
import { ApolloController } from "components/apolloController";

export default function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <ApolloController>
        <MantineController>
          <Component {...props.pageProps} />
          <MyLoader />
        </MantineController>
      </ApolloController>
    </Provider>
  );
}
