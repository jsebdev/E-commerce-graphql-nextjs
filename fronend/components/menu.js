import React from "react";
import Link from "next/link";
import cn from "classnames";
import menuStyles from "./menu.module.scss";
import { selectToken } from "store/userSlice";
import { useSelector } from "react-redux";
import { Center, Paper, useMantineTheme } from "@mantine/core";
import { THEMES } from "helpers/strings";
import { hoverButtonEffect } from "./componentHelpers/hoverButton";

export const Menu = ({ showMenu = false, onTablet }) => {
  const token = useSelector(selectToken);
  const theme = useMantineTheme();
  return (
    <div
      className={cn({
        [menuStyles.menuWrapper]: !onTablet,
        [menuStyles.menuContainerOpen]: showMenu,
        [menuStyles.onTablet]: onTablet,
      })}
      style={{
        backgroundColor:
          theme.colorScheme === THEMES.dark
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
        border: `1px solid ${
          theme.colorScheme === THEMES.dark
            ? theme.colors.dark[3]
            : theme.colors.gray[5]
        }`,
      }}
    >
      <ul className={menuStyles.menu}>
        {token ? (
          <MenuItem>Logout</MenuItem>
        ) : (
          <>
            <Link href="/login">
              <MenuItem>Login</MenuItem>
            </Link>
            <MenuItem>mas cosas largas baby</MenuItem>
            <MenuItem>siii</MenuItem>
          </>
        )}
      </ul>
    </div>
  );
};

// React.forwardRef is used here to avoid a bug in Next.js
// for when a component is wrapped in a Link component
const MenuItem = React.forwardRef(({ children }, ref) => {
  const theme = useMantineTheme();
  return (
    // <li ref={ref} style={hoverButtonEffect(theme)}>
    <li ref={ref}>
      <Center px="0.5rem" sx={(theme) => hoverButtonEffect(theme)}>
        {children}
      </Center>
      {/* {children} */}
    </li>
  );
});
