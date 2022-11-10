import { itemGraphqlQueryFields } from "helpers/gqlQueries";

// const { gql } = require("@apollo/client");
// const { setUserItems } = require("store/slices/userSlice");
import { gql } from "@apollo/client";
import { setUserItems } from "store/slices/userSlice";
import { client } from "apolloClient";
import { setLoading } from "store/slices/loaderSlice";

export const fetchUserItems = async (username, dispatch) => {
  dispatch(setLoading(true));
  const query = gql`
    query {
      itemsBySeller (username:"${username}") {
        ${itemGraphqlQueryFields}
      }
    }`;
  try {
    const { data } = await client.query({ query });
    console.log("22: data >>>", data);
    dispatch(setUserItems(data.itemsBySeller));
  } catch (e) {
    console.log("Error: ", e);
    console.log("Error: ", e?.networkError?.result?.errors);
  }
  dispatch(setLoading(false));
};
