import Image from "next/image";
import React from "react";
import styles from "styles/componentsStyles/item.module.scss";
import utilStyles from "styles/utils.module.scss";
import cn from "classnames";

export const GridItem = ({ item }) => {
  return (
    <div className={cn(styles.itemContainer, utilStyles.gridItem)}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.itemImage}
          src="/images/profile.jpg"
          layout="responsive"
          width={1}
          height={1}
        />
      </div>
      <h3>{item.title}</h3>
      <h4>{item.subtitle}</h4>
      <p>{item.description}</p>
    </div>
  );
};
