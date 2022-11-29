import React from "react";
import { Layout } from "components/layout";
import { client } from "../apolloClientServer";
import { ALL_ITEMS } from "helpers/gqlQueries";
import { wrapper } from "store/store";
import { connect } from "react-redux";
import {
  selectSearchItems,
  selectSearchText,
  setItems,
} from "store/slices/searchSlice";
import { selectUsername } from "store/slices/userSlice";
import { Stack, Text, Title } from "@mantine/core";
import { ItemsGrid } from "components/itemsGrid";
import { NoItemsPublished } from "components/noItemsPublished";
import {
  selectWelcomed,
  setShowWelcome,
  setWelcomed,
} from "store/slices/welcomeSlice";
import { useState } from "react";

export const getServerSideProps = wrapper.getServerSideProps(
  // export const getStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    const searchText = selectSearchText(store.getState());
    if (searchText !== "" && searchText !== null && searchText !== undefined) {
      return;
    }
    try {
      const { data } = await client.query({
        query: ALL_ITEMS,
        fetchPolicy: "no-cache",
      });
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

export default connect(
  (state) => ({
    items: selectSearchItems(state),
    searchText: selectSearchText(state),
    username: selectUsername(state),
    welcomed: selectWelcomed(state),
  }),
  (dispatch) => ({
    sWelcomed: (value) => dispatch(setWelcomed(value)),
    sShowWelcome: (value) => dispatch(setShowWelcome(value)),
  })
)(({ items, searchText, username, welcomed, sShowWelcome, sWelcomed }) => {
  useState(() => {
    if (!welcomed) {
      sShowWelcome(true);
      sWelcomed(true);
    }
  }, []);
  return (
    <Layout home>
      <div>
        <Title order={1} align="center" my={10}>
          {username ? `Welcome ${username}!` : "Welcome!"}
        </Title>
        {items.length > 0 ? (
          <ItemsGrid items={items} />
        ) : (
          <Stack align="center" mt={60}>
            {searchText ? (
              <Text>No items found for search &#39;{searchText}&#39;</Text>
            ) : (
              <NoItemsPublished />
            )}
          </Stack>
        )}
      </div>
    </Layout>
  );
});
