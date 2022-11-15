import Image from "next/image";
import React from "react";
import { Box, Group, Title } from "@mantine/core";
import gridItemStyles from "styles/componentsStyles/gridItem.module.scss";
import { ShadedBox } from "./themedComponents/shadedBox";
import Link from "next/link";
import { createPath, itemImageSource } from "helpers/utils";
import { ITEM_DISPLAY_PATH, OWN_ITEM_PATH } from "helpers/strings";

export const GridItem = ({ item, inHome = true }) => {
  const itemPath = inHome
    ? createPath(ITEM_DISPLAY_PATH(item.id))
    : createPath(OWN_ITEM_PATH(item.id));
  return (
    <Box className={gridItemStyles.gridItemContainer}>
      <ShadedBox className={gridItemStyles.gridItem}>
        <Link key={item.id} href={itemPath} legacyBehavior>
          <a className={gridItemStyles.imageContainer}>
            <img
              className={gridItemStyles.itemImage}
              src={itemImageSource(item.image)}
            />
          </a>
        </Link>
        <Group position="apart" align="self-start">
          <Box className={gridItemStyles.titlesBox}>
            <h3>{item.title}</h3>
            {item.subtitle && <h4>{item.subtitle}</h4>}
          </Box>
          <Title order={5} color="grape.9">
            ${item.price}
          </Title>
        </Group>
        <div className={gridItemStyles.descriptionContainer}>
          <p>{item.description}</p>
        </div>
      </ShadedBox>
    </Box>
  );
};
