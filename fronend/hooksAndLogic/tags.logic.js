import { client } from "apolloClient";
import { ALL_TAGS } from "helpers/gqlQueries";

export const getTags = async () => {
  try {
    const { data } = await client.query({
      query: ALL_TAGS,
    });
    return data.tags;
  } catch (e) {
    console.log("e >>>", e);
    console.log("Error: ", e?.networkError?.result?.errors);
  }
};
