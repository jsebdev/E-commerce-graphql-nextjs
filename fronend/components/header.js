import React from "react";
import { Cart } from "./cart";
import styles from "./header.module.scss";
import { Logo } from "./logo";
import { MenuContainer } from "./menuContainer";
import { Searcher } from "./searcher";
import { Paper, Center } from "@mantine/core";
import { ThemeSwitcher } from "./themeSwitcher";
import { THEMES } from "helpers/strings";

export const Header = () => {
  return (
    <div className={styles.headerWrapper}>
      <Paper
        className={styles.header}
        sx={(theme) => ({
          borderBlockEnd: `1px solid ${theme.colors.gray[5]}`,
        })}
      >
        <HeaderButton>
          <Logo />
        </HeaderButton>
        <Searcher />
        <HeaderButton>
          <MenuContainer />
        </HeaderButton>
        <HeaderButton>
          <Cart />
        </HeaderButton>
        <HeaderButton>
          <ThemeSwitcher />
        </HeaderButton>
      </Paper>
    </div>
  );
};

const HeaderButton = ({ children }) => {
  return (
    <Center
      p="0.3rem"
      sx={(theme) => ({
        "&:hover": {
          backgroundColor:
            theme.colorScheme === THEMES.light
              ? theme.colors.gray[2]
              : theme.colors.gray[7],
          borderRadius: "0.3rem",
        },
      })}
    >
      {children}
    </Center>
  );
};
