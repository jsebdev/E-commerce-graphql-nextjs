import React, { useState } from "react";
import Image from "next/image";
import styles from "./header.module.scss";
import { Menu } from "./menu";

export const MenuContainer = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu((s) => !s);
  return (
    <div className={styles.smallHeaderButton} onClick={toggleMenu}>
      <Image
        layout="responsive"
        src="/images/cheeseburger_128.png"
        width={10}
        height={10}
      />
      {showMenu && <Menu showMenu={showMenu} />}
    </div>
  );
};
