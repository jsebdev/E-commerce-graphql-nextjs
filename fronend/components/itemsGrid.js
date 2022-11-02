import React from "react";
import { Item } from "./item";
import utilStyles from "styles/utils.module.scss";
import Link from "next/link";
import { PROFILE_PATH } from "helpers/strings";

export const ItemsGrid = ({
  items,
  notFoundMessage = "No items found",
  inHome = true,
}) => {
  return (
    <div className={utilStyles.itemsGrid}>
      {items.map((item) => (
        <Link
          key={item.id}
          href={inHome ? `${item.id}` : `${PROFILE_PATH}/${item.id}`}
        >
          <div>
            <Item item={item} />
          </div>
        </Link>
      ))}
      {items.length === 0 && <p>{notFoundMessage}</p>}
    </div>
  );
};
