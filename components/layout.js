import React from "react";
import Head from "next/head";
import styles from "styles/componentsStyles/layout.module.scss";
import { Header } from "./header";
import { Footer } from "./footer";
import { Container } from "@mantine/core";

export const Layout = ({ children }) => {
  return (
    <div className={styles.containerLayout}>
      <Head>
        <meta name="description" content="Awesome E-commerce website" />
        <meta
          property="og:image"
          content="https://jseb.dev/static/media/ecommerce.1a42b43ab95ed22bf8bf.png"
        />
        <meta name="og:title" content="Awesome Port-Ecommerce" />
      </Head>
      <Header />
      <main className={styles.main}>
        <Container pt="1rem">{children}</Container>
      </main>
      <Footer></Footer>
    </div>
  );
};
