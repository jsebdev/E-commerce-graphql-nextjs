import React from "react";
import Head from "next/head";
import styles from "styles/componentsStyles/layout.module.scss";
import { Header } from "./header";
import { Footer } from "./footer";
import { Container } from "@mantine/core";

export const siteTitle = "Awesome Port-Ecommerce";

export const Layout = ({ children }) => {
  return (
    <div className={styles.containerLayout}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Awesome E-commerce website" />
        <meta property="og:image" content="/favicon.ico" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <Header />
      <main className={styles.main}>
        <Container pt="1rem">{children}</Container>
      </main>
      <Footer></Footer>
    </div>
  );
};
