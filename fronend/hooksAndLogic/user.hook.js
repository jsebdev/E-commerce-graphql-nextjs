import { itemGraphqlQueryFields } from "helpers/queries";

// const { gql } = require("@apollo/client");
// const { setUserItems } = require("store/slices/userSlice");
import { gql } from "@apollo/client";
import { setUserItems } from "store/slices/userSlice";
import { client } from "apolloClient";
import { setLoading } from "store/slices/loaderSlice";

export const useUserItems = (username, dispatch) => {
  const fetchUserItems = async () => {
    dispatch(setLoading(true));
    const query = gql`
    query {
      itemsBySeller (username:"${username}") {
        ${itemGraphqlQueryFields}
      }
    }`;
    try {
      const { data } = await client.query({ query });
      dispatch(setUserItems(data.itemsBySeller));
    } catch (e) {
      console.log("Error: ", e);
      console.log("Error: ", e?.networkError?.result?.errors);
    }
    dispatch(setLoading(false));
  };
  return { fetchUserItems };
};
