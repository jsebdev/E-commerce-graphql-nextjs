import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  // uri: "https://countries.trevorblades.com",
  cache: new InMemoryCache(),
});

export default client;
