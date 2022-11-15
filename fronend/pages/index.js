import React from "react";
import { Layout } from "components/layout";
import Head from "next/head";

import { client } from "../apolloClient";
import { ALL_ITEMS } from "helpers/gqlQueries";
import { wrapper } from "store/store";
import { connect } from "react-redux";
import {
  selectItems,
  selectSearchText,
  setItems,
} from "store/slices/searchSlice";
import { selectUsername } from "store/slices/userSlice";
import { Stack, Text, Title } from "@mantine/core";
import { ItemsGrid } from "components/itemsGrid";

function Home({ items, searchText, username }) {
  return (
    <Layout home>
      <Head>
        <title>Next Django E-commerce baby</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Title order={1} align="center" my={10}>
          {username ? `Welcome ${username}` : "The E-commerce"}
        </Title>
        {items.length > 0 ? (
          <ItemsGrid items={items} />
        ) : (
          <Stack align="center" mt={60}>
            {searchText ? (
              <Text>No items found for search &#39;{searchText}&#39;</Text>
            ) : (
              <>
                <Text>Sorry! There are no items published at the moment</Text>
                <Text>Came back later or publish an item yourself 😉</Text>
              </>
            )}
          </Stack>
        )}
      </div>
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  // export const getStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    try {
      const { data } = await client.query({ query: ALL_ITEMS });
      console.log("the first 3 items: ", data.items.slice(0, 3));
      store.dispatch(setItems(data.items));
    } catch (e) {
      console.log("Error: ", e);
      console.log("Error: ", e?.networkError?.result?.errors);
    }
    return {
      props: {},
    };
  }
);

export default connect((state) => ({
  items: selectItems(state),
  searchText: selectSearchText(state),
  username: selectUsername(state),
}))(Home);
