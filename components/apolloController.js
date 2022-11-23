import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { selectToken } from "store/slices/userSlice";
import { connect } from "react-redux";
import { setContext } from "@apollo/client/link/context";

export const ApolloController = connect((state) => ({
  token: selectToken(state),
}))(({ token, children }) => {
  const authLink = setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        Authorization: token ? `JWT ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(
      createUploadLink({
        uri: process.env.NEXT_PUBLIC_BACKEND_URI,
      })
    ),
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
});
