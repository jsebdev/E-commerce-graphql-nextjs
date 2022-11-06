import { Center, Group, Stack, Text } from "@mantine/core";
import { shadedBackground } from "helpers/utils";
import React from "react";
import tagListStyles from "styles/componentsStyles/tagList.module.scss";

export const TagsList = ({ tags = [], className }) => {
  return (
    <Stack spacing={0} my="1rem" className={className}>
      <Text mb={5}>Tags:</Text>
      <Group spacing={2}>
        {tags.map((tag) => (
          <Center
            sx={(theme) => ({
              backgroundColor: shadedBackground(theme),
            })}
            className={tagListStyles.tag}
            key={tag.name}
          >
            {tag.name}
          </Center>
        ))}
      </Group>
    </Stack>
  );
};
