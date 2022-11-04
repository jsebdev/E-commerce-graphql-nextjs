import { Button, Container, Group, Stack, Text, Title } from "@mantine/core";
import Image from "next/image";
import React from "react";
import { useEffect } from "react";
import { ShareButtons } from "./shareButtons";
import { TagsList } from "./tagsList";
import { ShadedBox } from "./themedComponents/shadedBox";

export const ItemDetails = ({ item }) => {
  useEffect(() => {
    console.log("ItemDetails useEffect");
    console.log(item);
  }, []);
  return (
    <Container pt="1rem">
      <Stack>
        <Title order={1}>{item.title}</Title>
        {item.subtitle && <Title order={3}>{item.subtitle}</Title>}
        <Text>sell by: {item.seller.username}</Text>
        <div>
          <Image
            src="/images/profile.jpg"
            width="100%"
            height="100%"
            layout="responsive"
          />
        </div>
        <Group>
          <ShareButtons />
          <Button>Add to Cart</Button>
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
