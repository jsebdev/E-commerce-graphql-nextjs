import {
  Box,
  Button,
  Center,
  Container,
  Group,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Image from "next/image";
import React, { useState } from "react";
import { QuantityInput } from "./quantityInput";
import { ShareButtons } from "./shareButtons";
import { TagsList } from "./tagsList";
import itemDetailsStyles from "styles/componentsStyles/itemDetails.module.scss";
import { formatDate } from "helpers/utils";
import cn from "classnames";
import { useWindowSize } from "hooksAndLogic/global.hooks";
import { tabletWidth } from "helpers/varialbles";
import { DynamicShadedBox } from "./themedComponents/dynamicShadedBox";

export const ItemDetails = ({ item }) => {
  const { windowSize } = useWindowSize();
  const [quantity, setQuantity] = useState(1);
  return (
    <Container pt="1rem">
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
        <Group noWrap="noWrap" align="flex-start">
          <Box>
            <Center>
              <div className={itemDetailsStyles.imagesContainer}>
                <Image
                  src="/images/profile.jpg"
                  width="100"
                  height="100"
                  layout="responsive"
                />
              </div>
            </Center>
            <Group
              className={cn(
                itemDetailsStyles.actionsContainer,
                itemDetailsStyles.mobileSection
              )}
            >
              <ShareButtons />
              <Stack>
                <QuantityInput quantity={quantity} setQuantity={setQuantity} />
                <Button>Add to Cart</Button>
              </Stack>
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
            <TagsList
              className={itemDetailsStyles.mobileSection}
              tags={item.tags}
            ></TagsList>
          </Box>
          <Stack
            className={cn(
              itemDetailsStyles.tabletSection,
              itemDetailsStyles.stickySide
            )}
          >
            <Space h="lg" />
            <Group>
              <Stack>
                <QuantityInput quantity={quantity} setQuantity={setQuantity} />
                <Button>Add to Cart</Button>
              </Stack>
            </Group>
            <ShareButtons noWrap="nowrap" />
            <TagsList tags={item.tags}></TagsList>
          </Stack>
        </Group>
      </Stack>
    </Container>
  );
};
