import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

console.log(
  "4: process.env.BACKEND_URI >>>",
  process.env.NEXT_PUBLIC_BACKEND_URI
);

export const client = new ApolloClient({
  link: createUploadLink({
    uri: process.env.NEXT_PUBLIC_BACKEND_URI,
    // uri: "http://localhost:8001/graphql/",
  }),
  cache: new InMemoryCache(),
});
