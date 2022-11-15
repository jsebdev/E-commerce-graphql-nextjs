import { Box, Center, Group, Space, Stack, Text, Title } from "@mantine/core";
import React, { useState } from "react";
import { ShareButtons } from "./shareButtons";
import { TagsList } from "./tagsList";
import itemDetailsStyles from "styles/componentsStyles/itemDetails.module.scss";
import { formatDate, itemImageSource } from "helpers/utils";
import cn from "classnames";
import { useWindowSize } from "hooksAndLogic/global.hooks";
import { tabletWidth } from "helpers/varialbles";
import { DynamicShadedBox } from "./themedComponents/dynamicColoredBox";
import { AddToCart } from "./addToCart";
import { GoToCart } from "./goToCart";
import { ShadedBox } from "./themedComponents/shadedBox";

export const ItemDetails = ({ item }) => {
  const { windowSize } = useWindowSize();
  const [quantity, setQuantity] = useState(1);
  return (
    <Stack spacing={0} align="center">
      <Stack className={itemDetailsStyles.titleDateContainer}>
        <Box mb="1rem">
          <Title order={1}>{item.title}</Title>
          {item.subtitle && <Title order={3}>{item.subtitle}</Title>}
        </Box>
        <Box className={itemDetailsStyles.datesContainer}>
          <Text color="dimmed" size="sm">
            Sold by: {item.seller.username}
          </Text>
          <Text color="dimmed" size="sm">
            Created: {formatDate(item.dateCreated)}
          </Text>
          <Text color="dimmed" size="sm">
            Last modified: {formatDate(item.dateModified)}
          </Text>
        </Box>
      </Stack>
      <Group
        noWrap="noWrap"
        align="flex-start"
        className={itemDetailsStyles.rowContainer}
      >
        <Box className={itemDetailsStyles.leftContainer}>
          <Center mb="1rem">
            <ShadedBox className={itemDetailsStyles.imagesContainer}>
              <img
                className={itemDetailsStyles.image}
                src={itemImageSource(item.image)}
              />
            </ShadedBox>
          </Center>
          <Group
            className={cn(
              itemDetailsStyles.actionsContainer,
              itemDetailsStyles.mobileSection
            )}
          >
            <Group>
              <AddToCart
                item={item}
                quantity={quantity}
                setQuantity={setQuantity}
              />
              <Stack
                align="center"
                className={itemDetailsStyles.addToCartContainer}
              >
                <Title order={4}>${item.price * quantity}</Title>
                <GoToCart />
              </Stack>
            </Group>
          </Group>
          <DynamicShadedBox wide={windowSize.width < tabletWidth}>
            <Stack py="1rem">
              <Text>Description:</Text>
              {item.description
                .split(/[\n\r]/)
                .filter((p) => p !== "")
                .map((p, i) => (
                  <Text key={i}>{p}</Text>
                ))}
            </Stack>
          </DynamicShadedBox>
          <Stack className={itemDetailsStyles.mobileSection}>
            <TagsList tags={item.tags}></TagsList>
            <ShareButtons />
          </Stack>
        </Box>
        <Stack
          className={cn(
            itemDetailsStyles.tabletSection,
            itemDetailsStyles.stickySide
          )}
        >
          <Space h="lg" />
          <Group position="center">
            <Stack align="center">
              <AddToCart
                item={item}
                quantity={quantity}
                setQuantity={setQuantity}
              />
              <Title order={4}>${item.price * quantity}</Title>
              <GoToCart />
            </Stack>
          </Group>
          <TagsList tags={item.tags}></TagsList>
          <ShareButtons noWrap="nowrap" />
        </Stack>
      </Group>
    </Stack>
  );
};
