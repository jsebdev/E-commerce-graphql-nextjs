import React from "react";
import { Cart } from "./cart";
import styles from "./header.module.scss";
import { Logo } from "./logo";
import { MenuContainer } from "./menuContainer";
import { Searcher } from "./searcher";

export const Header = () => {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.header}>
        <Logo />
        <Searcher />
        <MenuContainer />
        <Cart />
      </div>
    </div>
  );
};
