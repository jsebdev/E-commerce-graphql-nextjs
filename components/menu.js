import React from "react";
import Link from "next/link";
import cn from "classnames";
import menuStyles from "styles/componentsStyles/menu.module.scss";
import { selectToken } from "store/slices/userSlice";
import { connect } from "react-redux";
import { Button, useMantineTheme } from "@mantine/core";
import {
  ADD_ITEM_PATH,
  LOGIN_PATH,
  PROFILE_PATH,
  SEARCH_TAGS_PATH,
  SIGNUP_PATH,
  THEMES_NAMES,
} from "helpers/strings";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { createPath } from "helpers/utils";
import { handleLogout } from "hooksAndLogic/signup.hook";
import { setShowWelcome } from "store/slices/welcomeSlice";

const MenuNotConnected = ({ showMenu = false, token, onTablet = false }) => {
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const router = useRouter();
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
            <Link href={createPath(ADD_ITEM_PATH)}>
              <MenuItem>Add New Item</MenuItem>
            </Link>
            <Link href={createPath(SEARCH_TAGS_PATH)}>
              <MenuItem>Search Tags</MenuItem>
            </Link>
            <MenuItem onClick={() => handleLogout(dispatch, router)}>
              Logout
            </MenuItem>
          </>
        ) : (
          <>
            <Link href={createPath(LOGIN_PATH)}>
              <MenuItem>Login</MenuItem>
            </Link>
            <Link href={createPath(SIGNUP_PATH)}>
              <MenuItem>Sign up</MenuItem>
            </Link>
            <Link href={createPath(SEARCH_TAGS_PATH)}>
              <MenuItem>Search Tags</MenuItem>
            </Link>
          </>
        )}
        <MenuItem onClick={() => dispatch(setShowWelcome(true))}>
          Welcome Message
        </MenuItem>
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
