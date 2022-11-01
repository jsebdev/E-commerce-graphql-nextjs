import React from "react";
import { Item } from "./item";
import utilStyles from "styles/utils.module.scss";

export const ItemsGrid = ({ items, notFoundMessage = "No items found" }) => {
  return (
    <div className={utilStyles.itemsGrid}>
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
      {items.length === 0 && <p>{notFoundMessage}</p>}
    </div>
  );
};
