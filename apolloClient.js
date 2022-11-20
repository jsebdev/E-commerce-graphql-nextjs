import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

export const client = new ApolloClient({
  link: createUploadLink({
    uri: process.env.NEXT_PUBLIC_BACKEND_URI,
  }),
  cache: new InMemoryCache(),
});
