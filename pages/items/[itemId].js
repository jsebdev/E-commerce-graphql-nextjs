import { client } from "apolloClientServer";
import { ItemDetails } from "components/itemDetails";
import { Layout } from "components/layout";
import { ITEM_BY_ID_SERVER } from "helpers/gqlQueries";
import React from "react";

export const getServerSideProps = async (context) => {
  const itemId = context.params.itemId;
  try {
    const { data } = await client.query({
      query: ITEM_BY_ID_SERVER(itemId),
      fetchPolicy: "no-cache",
    });
    return { props: { item: data.itemById } };
  } catch (e) {
    console.log("getStaticProps error: ", e);
    console.log("Error: ", e?.networkError?.result?.errors);
  }
  return { props: { item: null } };
};

const ItemPage = ({ item }) => {
  return (
    <Layout>
      <ItemDetails item={item} />
    </Layout>
  );
};

export default ItemPage;
