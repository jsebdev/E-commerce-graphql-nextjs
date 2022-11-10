import React from "react";
import { GridItem } from "./gridItem";
import itemsGridStyles from "styles/componentsStyles/itemsGrid.module.scss";
import Link from "next/link";
import { ITEM_DISPLAY_PATH, OWN_ITEM_PATH } from "helpers/strings";
import { createPath } from "helpers/utils";

export const ItemsGrid = ({
  items,
  notFoundMessage = "No items found",
  inHome = true,
}) => {
  return (
    <div className={itemsGridStyles.itemsGrid}>
      {items.map((item) => (
        <GridItem key={item.id} item={item} inHome={inHome} />
      ))}
      {items.length === 0 && <p>{notFoundMessage}</p>}
    </div>
  );
};
