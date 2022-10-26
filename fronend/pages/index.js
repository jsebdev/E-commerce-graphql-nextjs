import { Layout } from "components/layout";
import Head from "next/head";
import Script from "next/script";

import { gql } from "@apollo/client";
import client from "../apollo-client";
import { Item } from "components/item";
import utilStyles from "styles/utils.module.scss";
import { itemGraphqlQueryFields } from "helpers/queries";
import { wrapper } from "store/store";
import { connect } from "react-redux";
import { selectItems, setItems } from "store/itemsSlice";

function Home({ items }) {
  // export default function Home({ items }) {
  console.log("Home component called");
  // console.log("16: items >>>", items);
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
      items {
        ${itemGraphqlQueryFields}
      }
    }
  `;
    const { data } = await client.query({ query });
    store.dispatch(setItems(data.items));
    // store.dispatch(setItems(["test"]));
    return {
      props: {},
    };
  }
);

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async () => {
//     store.dispatch(setItems(["test"]));
//     return {
//       props: {},
//     };
//   }
// );

export default connect((state) => ({
  items: selectItems(state),
}))(Home);

// export async function getServerSideProps() {
//   const query = gql`
//     query {
//       items {
//         ${itemGraphqlQueryFields}
//       }
//     }
//   `;
//   const { data } = await client.query({ query });
//   return {
//     props: {
//       items: data.items,
//     },
//   };
// }
