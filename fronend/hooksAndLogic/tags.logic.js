import { gql } from "@apollo/client";
import { client } from "apolloClient";

export const getTags = async () => {
  const query = gql`
    query {
      tags {
        id
        name
      }
    }
  `;
  try {
    const { data } = await client.query({
      query,
    });
    return data.tags;
  } catch (e) {
    console.log("e >>>", e);
    console.log("Error: ", e?.networkError?.result?.errors);
  }
};
