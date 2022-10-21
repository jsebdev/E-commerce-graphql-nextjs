import { Layout } from "components/layout";
import Head from "next/head";
import Script from "next/script";

import { gql } from "@apollo/client";
import client from "../apollo-client";
import { queryForCountriesMaps } from "ayudasChidas";

export default function Home({ items }) {
  return (
    <Layout home>
      <Head>
        <title>Next Django E-commerce baby</title>
        <link rel="icon" href="/favicon.ico" />
        <Script
          src="https://connect.facebook.net/en_US/sdk.js"
          strategy="lazyOnload"
          onLoad={() =>
            console.log(`script loaded correctly, window.FB has been populated`)
          }
        />
      </Head>

      <div>
        <h1 className="title">The E-commerce</h1>
        <div>
          <p>This is the home</p>
        </div>
        <div>
          {items.map((item) => (
            <div key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const query = gql`
    query {
      items {
        id
        title
        subtitle
        seller {
          user {
            id
            username
          }
        }
        tags {
          name
        }
        description
        dateCreated
        dateModified
        published
      }
    }
  `;
  const { data } = await client.query({ query });
  return {
    props: {
      items: data.items,
    },
  };
}
