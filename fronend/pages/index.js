import React from "react";
import { Layout } from "components/layout";
import Head from "next/head";

import { gql } from "@apollo/client";
import { client } from "../apolloClient";
import { itemGraphqlQueryFields } from "helpers/gqlQueries";
import { wrapper } from "store/store";
import { connect } from "react-redux";
import {
  selectItems,
  selectSearchText,
  setItems,
} from "store/slices/searchSlice";
import { useEffect } from "react";
import { selectUsername } from "store/slices/userSlice";
import { Center, Stack, Text, Title } from "@mantine/core";
import { ItemsGrid } from "components/itemsGrid";
import { useRouter } from "next/router";

function Home({ items, searchText, username }) {
  // const router = useRouter();
  // useEffect(() => {
  // console.log("en el useeffect del main");
  // router.replace(router.asPath);
  // console.log("26: router.asPath >>>", router.asPath);
  // }, []);
  // useEffect(() => {
  //   console.log("searchText: ", searchText);
  //   console.log("23: items >>>", items);
  // }, []);
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
            <Text>Sorry! There are no items published at the moment</Text>
            <Text>Came back later or publish an item yourself 😉</Text>
          </Stack>
        )}
      </div>
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  // export const getStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    const query = gql`
    query {
      items (filter:true, published:true) {
        ${itemGraphqlQueryFields}
      }
    }
  `;
    try {
      const { data } = await client.query({ query });
      console.log("the items: ", data.items);
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
