import Image from "next/image";
import React from "react";
import { Box, Group, Title } from "@mantine/core";
import gridItemStyles from "styles/componentsStyles/gridItem.module.scss";
import { ShadedBox } from "./themedComponents/shadedBox";

export const GridItem = React.forwardRef(({ item }, ref) => {
  return (
    <div ref={ref}>
      <ShadedBox className={gridItemStyles.gridItem}>
        <div className={gridItemStyles.imageContainer}>
          <Image
            className={gridItemStyles.itemImage}
            src="/images/profile.jpg"
            layout="responsive"
            width={1}
            height={1}
          />
        </div>
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
    </div>
  );
});

GridItem.displayName = "GridItem";
