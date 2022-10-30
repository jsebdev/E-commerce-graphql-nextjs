import { Layout } from "components/layout";
import Head from "next/head";

import { gql } from "@apollo/client";
import client from "../apollo-client";
import { Item } from "components/item";
import utilStyles from "styles/utils.module.scss";
import { itemGraphqlQueryFields } from "helpers/queries";
import { wrapper } from "store/store";
import { connect } from "react-redux";
import { selectItems, selectSearchText, setItems } from "store/searchSlice";
import { useEffect } from "react";

function Home({ items, searchText }) {
  useEffect(() => {
    console.log("searchText: ", searchText);
  }, []);
  return (
    <Layout home>
      <Head>
        <title>Next Django E-commerce baby</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1 className="title">The E-commerce</h1>
        <div className={utilStyles.itemsGrid}>
          {items.map((item) => (
            <Item key={item.id} item={item} />
          ))}
          {items.length === 0 && <p>No items found</p>}
        </div>
      </div>
    </Layout>
  );
}

// export const getServerSideProps = wrapper.getServerSideProps(
export const getServerSideProps = wrapper.getServerSideProps(
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
}))(Home);
