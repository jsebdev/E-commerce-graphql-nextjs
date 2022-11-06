import { gql } from "@apollo/client";
import { client } from "apolloClient";
import { GridItem } from "components/gridItem";
import { ItemDetails } from "components/itemDetails";
import { Layout } from "components/layout";
import { itemGraphqlQueryFields } from "helpers/gqlQueries";
import React from "react";

export const getStaticPaths = async () => {
  const query = gql`
    query {
      items {
        id
      }
    }
  `;
  try {
    const { data } = await client.query({ query });
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
  const query = gql`
    query {
      itemById(id: "${itemId}") {
        ${itemGraphqlQueryFields}
      }
    }
  `;
  try {
    const { data } = await client.query({ query });
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
