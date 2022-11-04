import React from "react";
import { GridItem } from "./gridItem";
import utilStyles from "styles/utils.module.scss";
import Link from "next/link";
import { ITEM_DISPLAY_PATH, OWN_ITEM_PATH } from "helpers/strings";
import { createPath } from "helpers/utils";

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
          href={
            inHome
              ? createPath(ITEM_DISPLAY_PATH(item.id))
              : createPath(OWN_ITEM_PATH(item.id))
          }
        >
          <div>
            <GridItem item={item} />
          </div>
        </Link>
      ))}
      {items.length === 0 && <p>{notFoundMessage}</p>}
    </div>
  );
};
