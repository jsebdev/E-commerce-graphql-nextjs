import { client } from "apolloClient";
import { ItemDetails } from "components/itemDetails";
import { Layout } from "components/layout";
import { ALL_ITEMS_IDS, ITEM_BY_ID_SERVER } from "helpers/gqlQueries";
import React from "react";

export const getStaticPaths = async () => {
  try {
    const { data } = await client.query({ query: ALL_ITEMS_IDS });
    console.log("14: data >>>", data);
    const paths = data.items.map((item) => ({ params: { itemId: item.id } }));
    return { paths, fallback: false };
  } catch (e) {
    console.log("Error: ", e);
    console.log("Error: ", e?.networkError?.result?.errors);
  }
};

export const getStaticProps = async (context) => {
  const itemId = context.params.itemId;
  try {
    const { data } = await client.query({ query: ITEM_BY_ID_SERVER(itemId) });
    return { props: { item: data.itemById } };
  } catch (e) {
    console.log("Error: ", e);
    console.log("Error: ", e?.networkError?.result?.errors);
  }
};

const ItemPage = ({ item }) => {
  return (
    <Layout>
      <ItemDetails item={item} />
    </Layout>
  );
};

export default ItemPage;
