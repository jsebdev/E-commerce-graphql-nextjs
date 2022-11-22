import React from "react";
import { CartIcon } from "./cartIcon";
import headerStyles from "styles/componentsStyles/header.module.scss";
import { Logo } from "./logo";
import { MenuContainer } from "./menuContainer";
import { Searcher } from "./searcher";
import { Container, Paper } from "@mantine/core";
import { ThemeSwitcher } from "./themeSwitcher";
import { HeaderButton } from "./headerButton";
import dynamic from "next/dynamic";

const DynamicMenu = dynamic(() => import("./menu"), { ssr: false });

export const Header = () => {
  return (
    <Paper className={headerStyles.headerWrapper}>
      <Container className={headerStyles.header}>
        <HeaderButton>
          <Logo />
        </HeaderButton>
        <HeaderButton className={headerStyles.menuButtonContainer}>
          <MenuContainer />
        </HeaderButton>
        <Searcher />
        <HeaderButton className={headerStyles.cartIconContainer}>
          <CartIcon />
        </HeaderButton>
        <HeaderButton>
          <ThemeSwitcher />
        </HeaderButton>
        <DynamicMenu onTablet={true} />
      </Container>
    </Paper>
  );
};

// export default Header;
