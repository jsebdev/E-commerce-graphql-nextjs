import React from "react";
import Image from "next/image";
import styles from "styles/componentsStyles/header.module.scss";

export const Cart = () => {
  return (
    <div className={styles.smallHeaderButton}>
      <Image
        layout="responsive"
        src="/images/cart_128.png"
        width={20}
        height={20}
      />
    </div>
  );
};
