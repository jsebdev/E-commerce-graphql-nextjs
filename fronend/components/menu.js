import React from "react";
import Image from "next/image";
import styles from "./header.module.scss";

export const Menu = () => {
  return (
    <div className={styles.headerItem}>
      <div className={styles.menuButtonContainer}>
        <Image
          layout="responsive"
          src="/images/cheeseburger_128.png"
          width={10}
          height={10}
        />
      </div>
    </div>
  );
};
