import React from "react";
import { wrapper } from "store/store";
import { Provider } from "react-redux";
import { MyLoader } from "components/myLoader";
import { MantineController } from "components/mantineController";
import { client } from "apolloClient";
import { ApolloProvider } from "@apollo/client";

import "styles/tagInputStyles.scss";

export default function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  console.log("13: client >>>", client);
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <MantineController>
          <Component {...props.pageProps} />
          <MyLoader />
        </MantineController>
      </ApolloProvider>
    </Provider>
  );
}
