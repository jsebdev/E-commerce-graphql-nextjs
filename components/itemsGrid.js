import React from "react";
import { GridItem } from "./gridItem";
import itemsGridStyles from "styles/componentsStyles/itemsGrid.module.scss";

export const ItemsGrid = ({ items, inHome = true }) => {
  return (
    <div className={itemsGridStyles.itemsGrid}>
      {items.map((item) => (
        <GridItem key={item.id} item={item} inHome={inHome} />
      ))}
    </div>
  );
};
