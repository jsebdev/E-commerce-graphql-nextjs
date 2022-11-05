import {
  Box,
  Button,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Image from "next/image";
import React from "react";
import { useEffect } from "react";
import { QuantityInput } from "./quantityInput";
import { ShareButtons } from "./shareButtons";
import { TagsList } from "./tagsList";
import { ShadedBox } from "./themedComponents/shadedBox";
import itemDetailsStyles from "styles/componentsStyles/itemDetails.module.scss";
import { formatDate } from "helpers/utils";

export const ItemDetails = ({ item }) => {
  useEffect(() => {
    console.log("ItemDetails useEffect");
    console.log(item);
  }, []);
  return (
    <Container pt="1rem">
      <Stack spacing={0}>
        <Box mb="1rem">
          <Title order={1}>{item.title}</Title>
          {item.subtitle && <Title order={3}>{item.subtitle}</Title>}
        </Box>
        <Text color="dimmed" size="sm">
          sold by: {item.seller.username}
        </Text>
        <Text color="dimmed" size="sm">
          Created: {formatDate(item.dateCreated)}
        </Text>
        <Text color="dimmed" size="sm">
          Last modified: {formatDate(item.dateModified)}
        </Text>
        <div className={itemDetailsStyles.imagesContainer}>
          <Image
            src="/images/profile.jpg"
            width="100%"
            height="100%"
            layout="responsive"
          />
        </div>
        <Group my="1rem" noWrap={true} position="apart">
          <ShareButtons />
          <Stack>
            <QuantityInput></QuantityInput>
            <Button>Add to Cart</Button>
          </Stack>
        </Group>
        <ShadedBox wide>
          <Stack py="1rem">
            <Text>Description:</Text>
            {item.description
              .split(/[\n\r]/)
              .filter((p) => p !== "")
              .map((p, i) => (
                <Text key={i}>{p}</Text>
              ))}
          </Stack>
        </ShadedBox>
        <TagsList tags={item.tags}></TagsList>
      </Stack>
    </Container>
  );
};
