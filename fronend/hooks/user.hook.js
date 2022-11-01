import { itemGraphqlQueryFields } from "helpers/queries";

const { gql } = require("@apollo/client");
const { setUserItems } = require("store/slices/userSlice");
import { client } from "apolloClient";
import { setLoading } from "store/slices/loaderSlice";

export const useUserItems = () => {
  const fetchUserItems = async (username, { dispatch }) => {
    dispatch(setLoading(true));
    const query = gql`
    query {
      itemsBySeller (username:"${username}") {
        ${itemGraphqlQueryFields}
      }
    }`;
    try {
      const { data } = await client.query({ query });
      console.log("the items: ", data.itemsBySeller);
      dispatch(setUserItems(data.itemsBySeller));
    } catch (e) {
      console.log("Error: ", e);
      console.log("Error: ", e?.networkError?.result?.errors);
    }
    dispatch(setLoading(false));
  };
  return { fetchUserItems };
};
