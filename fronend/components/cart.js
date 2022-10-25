import React from "react";
import Image from "next/image";
import styles from "./header.module.scss";

export const Cart = () => {
  return (
    <div className={styles.headerItem}>
      <div className={styles.cartContainer}>
        <Image
          layout="responsive"
          src="/images/cart_128.png"
          width={10}
          height={10}
        />
      </div>
    </div>
  );
};
