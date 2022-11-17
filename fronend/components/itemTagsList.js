import { Center, Group, Stack, Text } from "@mantine/core";
import { SEARCH_TAGS_PATH } from "helpers/strings";
import { createPath, shadedBackground } from "helpers/utils";
import { tagB2F } from "hooksAndLogic/tagsInput.logic";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { setSearchOnRender, setSearchTags } from "store/slices/searchTagsSlice";
import itemTagListStyles from "styles/componentsStyles/itemTagList.module.scss";

export const ItemTagsList = ({ tags = [], className }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchTag = (tag) => {
    console.log("searching for tag", tag);
    dispatch(setSearchOnRender(true));
    dispatch(setSearchTags([tag]));
    router.push(createPath(SEARCH_TAGS_PATH));
  };
  return (
    <Stack spacing={0} my="1rem" className={className}>
      <Text mb={5}>Tags:</Text>
      <Group spacing={2}>
        {tags.map((tag) => (
          <Center
            onClick={() => searchTag(tagB2F(tag))}
            sx={(theme) => ({
              backgroundColor: shadedBackground(theme),
            })}
            className={itemTagListStyles.tag}
            key={tag.name}
          >
            {tag.name}
          </Center>
        ))}
      </Group>
    </Stack>
  );
};
