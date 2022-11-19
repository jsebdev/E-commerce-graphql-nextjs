import { ITEMS_BY_SELLER } from "helpers/gqlQueries";
import { setUserItems } from "store/slices/userSlice";
import { client } from "apolloClient";
import { setLoading } from "store/slices/loaderSlice";

export const fetchUserItems = async (username, dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await client.query({
      query: ITEMS_BY_SELLER(username),
      fetchPolicy: "no-cache",
    });
    console.log("22: data >>>", data);
    dispatch(setUserItems(data.itemsBySeller));
  } catch (e) {
    console.log("Error: ", e);
    console.log("Error: ", e?.networkError?.result?.errors);
  }
  dispatch(setLoading(false));
};
