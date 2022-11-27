import React from "react";
import { CartIcon } from "./cartIcon";
import headerStyles from "styles/componentsStyles/header.module.scss";
import { Logo } from "./logo";
import { MenuContainer } from "./menuContainer";
import { Searcher } from "./searcher";
import { Center, Container, Paper } from "@mantine/core";
import { ThemeSwitcher } from "./themeSwitcher";
import { HeaderButton } from "./headerButton";
import dynamic from "next/dynamic";

const DynamicMenu = dynamic(() => import("./menu"), { ssr: false });

export const Header = () => {
  return (
    <Paper className={headerStyles.headerWrapper}>
      <Container className={headerStyles.header}>
        <Center>
          <Logo />
        </Center>
        <Searcher />
        <HeaderButton className={headerStyles.cartIconContainer}>
          <CartIcon />
        </HeaderButton>
        <HeaderButton className={headerStyles.themeIconContainer}>
          <ThemeSwitcher />
        </HeaderButton>
        <HeaderButton className={headerStyles.menuButtonContainer}>
          <MenuContainer />
        </HeaderButton>
        <DynamicMenu onTablet={true} />
      </Container>
    </Paper>
  );
};
