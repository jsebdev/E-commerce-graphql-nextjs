import React from "react";
import { CartIcon } from "./cartIcon";
import headerStyles from "styles/componentsStyles/header.module.scss";
import { Logo } from "./logo";
import { MenuContainer } from "./menuContainer";
import { Searcher } from "./searcher";
import { Paper } from "@mantine/core";
import { ThemeSwitcher } from "./themeSwitcher";
import { HeaderButton } from "./headerButton";
import menuStyles from "styles/componentsStyles/menu.module.scss";
import dynamic from "next/dynamic";

const DynamicMenu = dynamic(() => import("./menu"), { ssr: false });

export const Header = () => {
  return (
    <div className={headerStyles.headerWrapper}>
      <Paper className={headerStyles.header}>
        <HeaderButton>
          <Logo />
        </HeaderButton>
        <HeaderButton className={menuStyles.menuButtonContainer}>
          <MenuContainer />
        </HeaderButton>
        <Searcher />
        <HeaderButton>
          <CartIcon />
        </HeaderButton>
        <HeaderButton>
          <ThemeSwitcher />
        </HeaderButton>
        <DynamicMenu onTablet={true} />
      </Paper>
    </div>
  );
};

// export default Header;
