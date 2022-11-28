import { Box, Center, Group, Space, Stack, Text, Title } from "@mantine/core";
import React, { useState } from "react";
import { ShareButtons } from "./shareButtons";
import { ItemTagsList } from "./itemTagsList";
import itemDetailsStyles from "styles/componentsStyles/itemDetails.module.scss";
import { createPath, formatDate, printObjLog, roundPrice } from "helpers/utils";
import cn from "classnames";
import { useWindowSize } from "hooksAndLogic/global.hooks";
import { tabletWidth } from "helpers/varialbles";
import { DynamicShadedBox } from "./themedComponents/dynamicColoredBox";
import { AddToCart } from "./addToCart";
import { GoToCart } from "./goToCart";
import { ShadedBox } from "./themedComponents/shadedBox";
import { useRouter } from "next/router";
import { Loading } from "./loading";
import { useEffect } from "react";
import { ImageStore } from "./imageStore";
import { connect } from "react-redux";
import { selectUsername } from "store/slices/userSlice";
import Link from "next/link";
import { OWN_ITEM_PATH } from "helpers/strings";
import { FullScreenImage } from "./fullScreenImage";
import classNames from "classnames";

export const ItemDetails = connect((state) => ({
  username: selectUsername(state),
}))(({ item, username }) => {
  const { windowSize } = useWindowSize();
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  useEffect(() => {
    printObjLog(item, "item in itemDetails");
  }, [item]);
  if (item === null) {
    try {
      router.push("/404");
    } catch (e) {
      console.log("ItemDetails error: ", e);
    }
    return <Loading />;
  }
  const [showFullScreenImage, setShowFullScreenImage] = useState(false);
  return (
    <>
      {showFullScreenImage && (
        <FullScreenImage
          image={item.image}
          onClose={() => setShowFullScreenImage(false)}
        />
      )}
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
            <Space h="md"></Space>
          </Box>
        </Stack>
        <Group
          noWrap="noWrap"
          align="flex-start"
          className={itemDetailsStyles.rowContainer}
        >
          <Box className={itemDetailsStyles.leftContainer}>
            <Center
              mb="1rem"
              onClick={() => {
                if (item.image) setShowFullScreenImage(true);
              }}
              style={{ cursor: item.image ? "pointer" : "default" }}
            >
              <ShadedBox className={itemDetailsStyles.imagesContainer}>
                <ImageStore image={item.image} />
              </ShadedBox>
            </Center>
            {item.seller.username == username && (
              <Text color="dimmed" size="sm">
                This item is yours! want to{" "}
                <Link
                  href={createPath(OWN_ITEM_PATH(item.id))}
                  className={classNames(
                    itemDetailsStyles.editLink,
                    "classic",
                    "normalColor"
                  )}
                >
                  edit it?
                </Link>
              </Text>
            )}
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
                  <Title order={4}>${roundPrice(item.price * quantity)}</Title>
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
              <ItemTagsList tags={item.tags}></ItemTagsList>
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
            <ItemTagsList tags={item.tags}></ItemTagsList>
            <ShareButtons noWrap="nowrap" />
          </Stack>
        </Group>
      </Stack>
    </>
  );
});
