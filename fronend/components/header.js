import React from "react";
import { Cart } from "./cart";
import styles from "./header.module.scss";
import { Logo } from "./logo";
import { Menu } from "./menu";
import { Searcher } from "./searcher";

export const Header = () => {
  return (
    <div className={styles.header}>
      <Logo />
      <Searcher />
      <Menu />
      <Cart />
    </div>
  );
};
