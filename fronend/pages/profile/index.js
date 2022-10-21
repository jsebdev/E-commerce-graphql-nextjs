import Head from "next/head";
import Script from "next/script";

import Layout from "components/layout";
import Link from "next/link";

export default function Profile() {
  return (
    <Layout home={false}>
      <h1>User page</h1>
    </Layout>
  );
}
