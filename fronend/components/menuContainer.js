import React, { useState } from "react";
import Image from "next/image";
import headerStyles from "./header.module.scss";
import menuStyles from "./menu.module.scss";
import { Menu } from "./menu";
import cn from "classnames";

export const MenuContainer = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu((s) => !s);
  return (
    <div className={cn(headerStyles.smallHeaderButton)} onClick={toggleMenu}>
      <Image
        layout="responsive"
        src="/images/cheeseburger_128.png"
        width={10}
        height={10}
      />
      {showMenu && <CloseMenuLayer />}
      {showMenu && <Menu showMenu={showMenu} />}
    </div>
  );
};

const CloseMenuLayer = () => {
  return <div className={menuStyles.closeMenuLayer} />;
};
