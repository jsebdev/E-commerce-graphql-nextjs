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
import { Title } from "@mantine/core";
import { ItemsGrid } from "components/itemsGrid";

function Home({ items, searchText, username }) {
  useEffect(() => {
    console.log("searchText: ", searchText);
    console.log("23: items >>>", items);
  }, []);
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
        <ItemsGrid items={items} />
      </div>
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  // export const getStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    // const items = useSelector(selectItems);
    // console.log("50: items >>>", items);
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
