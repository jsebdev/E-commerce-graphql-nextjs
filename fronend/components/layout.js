import React from "react";
import Head from "next/head";
import styles from "./layout.module.scss";
import { Header } from "./header";
import { Footer } from "./footer";

export const siteTitle = "Awesome Website";

export const Layout = ({ children }) => {
  return (
    <div className={styles.containerLayout}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Awesome E-commerce website" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer></Footer>
    </div>
  );
};
