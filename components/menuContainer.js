import React, { useState } from "react";
import Image from "next/image";
import headerStyles from "styles/componentsStyles/header.module.scss";
import menuStyles from "styles/componentsStyles/menu.module.scss";
import cn from "classnames";
import dynamic from "next/dynamic";

// This loads the menu component dynamically
// so it doesn't get loaded on the server
const DynamicMenu = dynamic(() => import("./menu"), { ssr: false });

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
      {showMenu && <DynamicMenu showMenu={showMenu} />}
    </div>
  );
};

const CloseMenuLayer = () => {
  return <div className={menuStyles.closeMenuLayer} />;
};
