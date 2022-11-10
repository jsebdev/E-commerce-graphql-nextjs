import React from "react";
import Link from "next/link";
import cn from "classnames";
import menuStyles from "styles/componentsStyles/menu.module.scss";
import { selectToken } from "store/slices/userSlice";
import { connect } from "react-redux";
import { Button, Center, useMantineTheme } from "@mantine/core";
import {
  LOGIN_PATH,
  PROFILE_PATH,
  SIGNUP_PATH,
  THEMES_NAMES,
} from "helpers/strings";
import { hoverButtonEffect } from "./componentHelpers/hoverButtonEffect";
import { useLogout } from "hooksAndLogic/login.hook";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { createPath } from "helpers/utils";

const MenuNotConnected = ({ showMenu = false, token, onTablet }) => {
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const { handleLogout } = useLogout(dispatch, router);
  return (
    <div
      className={cn({
        [menuStyles.menuWrapper]: !onTablet,
        [menuStyles.menuContainerOpen]: showMenu,
        [menuStyles.onTablet]: onTablet,
      })}
      style={{
        backgroundColor:
          theme.colorScheme === THEMES_NAMES.dark
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
        border: `1px solid ${
          theme.colorScheme === THEMES_NAMES.dark
            ? theme.colors.dark[3]
            : theme.colors.gray[5]
        }`,
      }}
    >
      <ul className={menuStyles.menu}>
        {token ? (
          <>
            <Link href={createPath(PROFILE_PATH)}>
              <MenuItem>My Profile</MenuItem>
            </Link>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </>
        ) : (
          <>
            <Link href={createPath(LOGIN_PATH)}>
              <MenuItem>Login</MenuItem>
            </Link>
            <Link href={createPath(SIGNUP_PATH)}>
              <MenuItem>Sign up</MenuItem>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
};

// React.forwardRef is used here to avoid a bug in Next.js
// for when a component is wrapped in a Link component
const MenuItem = React.forwardRef(({ children, onClick }, ref) => {
  return (
    <li ref={ref} onClick={onClick}>
      {/* <Center px="0.5rem" sx={(theme) => hoverButtonEffect(theme)}> */}
      <Button variant="subtle" size="md">
        {children}
      </Button>
      {/* </Center> */}
    </li>
  );
});
MenuItem.displayName = "MenuItem";

export default connect((state) => ({ token: selectToken(state) }))(
  MenuNotConnected
);
