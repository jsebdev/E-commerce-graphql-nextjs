import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

export const client = new ApolloClient({
  link: createUploadLink({
    uri: "http://localhost:8000/graphql/",
  }),
  cache: new InMemoryCache(),
});
