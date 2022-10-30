import React from "react";
import Link from "next/link";
import cn from "classnames";
import styles from "./menu.module.scss";
import { selectToken } from "store/userSlice";
import { useSelector } from "react-redux";

export const Menu = ({ showMenu }) => {
  const token = useSelector(selectToken);
  return (
    <div
      className={cn({
        [styles.menuWrapper]: true,
        [styles.menuContainerOpen]: showMenu,
      })}
    >
      <ul className={styles.menu}>
        {token ? (
          <MenuItem>Logout</MenuItem>
        ) : (
          <>
            <Link href="/login">
              <MenuItem>Login</MenuItem>
            </Link>
            <MenuItem>mas cosas</MenuItem>
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
  return <li ref={ref}>{children}</li>;
});
