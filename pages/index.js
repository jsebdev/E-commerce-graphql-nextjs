import React from "react";
import { Layout } from "components/layout";
import { PUBLISHED_ITEMS } from "helpers/gqlQueries";
import { connect } from "react-redux";
import { selectSearchItems, selectSearchText } from "store/slices/searchSlice";
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
import { useQuery } from "@apollo/client";
import ClientOnly from "components/clientOnly";
import { Spinner } from "components/spinner";

export default connect(
  (state) => ({
    searchItems: selectSearchItems(state),
    searchText: selectSearchText(state),
    username: selectUsername(state),
    welcomed: selectWelcomed(state),
  }),
  (dispatch) => ({
    sWelcomed: (value) => dispatch(setWelcomed(value)),
    sShowWelcome: (value) => dispatch(setShowWelcome(value)),
  })
)(
  ({
    searchItems,
    searchText,
    username,
    welcomed,
    sShowWelcome,
    sWelcomed,
  }) => {
    const { data, loading, error } = useQuery(PUBLISHED_ITEMS, {
      variables: { amigo: "del alama" },
    });
    useState(() => {
      if (!welcomed) {
        sShowWelcome(true);
        sWelcomed(true);
      }
    }, []);

    if (searchText) {
      return (
        <Layout home>
          <ClientOnly>
            <Title order={1} align="center" my={10}>
              {username ? `Welcome ${username}!` : "Welcome!"}
            </Title>
            {searchItems.length > 0 ? (
              <ItemsGrid items={searchItems} />
            ) : (
              <Stack align="center" mt={60}>
                <Text>No items found for search &#39;{searchText}&#39;</Text>
              </Stack>
            )}
          </ClientOnly>
        </Layout>
      );
    }

    if (loading) {
      return (
        <Layout home>
          <ClientOnly>
            <Spinner />
          </ClientOnly>
        </Layout>
      );
    }

    if (error) {
      return (
        <Layout home>
          <ClientOnly>
            <Stack align="center" mt={60}>
              <Text>Error loading items</Text>
            </Stack>
          </ClientOnly>
        </Layout>
      );
    }

    return (
      <Layout home>
        <ClientOnly>
          {data.items.length > 0 ? (
            <ItemsGrid items={data.items} />
          ) : (
            <NoItemsPublished />
          )}
        </ClientOnly>
      </Layout>
    );
  }
);
