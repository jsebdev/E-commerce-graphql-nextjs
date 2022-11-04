import { Center, Group, Stack, Text } from "@mantine/core";
import React from "react";

export const TagsList = ({ tags = [] }) => {
  return (
    <Stack>
      <Text>Tags:</Text>
      <Group>
        {tags.map((tag) => (
          <Center key={tag}>{tag.name}</Center>
        ))}
      </Group>
    </Stack>
  );
};
