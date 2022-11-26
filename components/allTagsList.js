import { Box, Text } from "@mantine/core";
import {
  allTagsWidthContainer,
  highlightedTextShaded,
  highlightedShadedBackground,
  shadedBackground,
} from "helpers/utils";
import { useWindowSize } from "hooksAndLogic/global.hooks";
import React, { useEffect } from "react";
import allTagsListStyles from "styles/componentsStyles/allTagsList.module.scss";
import { handleTagAddition, tagB2F } from "hooksAndLogic/tagsInput.logic";
import { useFetchTags } from "hooksAndLogic/fetchTags.hook";

export const AllTagsList = ({ selectedTags, setSelectedTags }) => {
  const selectedTagsIds = selectedTags.map((tag) => tag.id);
  const [allTags, setAllTags] = React.useState([]);
  const {
    windowSize: { width: windowWidth },
  } = useWindowSize();
  const { data, loading, error } = useFetchTags({ filter: true });
  useEffect(() => {
    if (error) {
      console.log("error getting tags for suggestions >>>", error);
      return;
    }
    if (loading) {
      console.log("loading tags for suggestions");
      return;
    }
    if (data) setAllTags(data.tags.map(tagB2F));
    else {
      console.log("no tags found");
    }
  }, [data, error]);
  return (
    <Box
      className={allTagsListStyles.allTagsScroll}
      sx={(theme) => ({
        border: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.gray[8]
            : theme.colors.gray[4]
        }`,
      })}
    >
      <Box
        className={allTagsListStyles.allTagsContainer}
        sx={{
          width: allTagsWidthContainer(allTags, windowWidth),
        }}
      >
        {allTags.map((tag) => (
          <Text
            onClick={() =>
              handleTagAddition(tag, selectedTags, setSelectedTags, allTags)
            }
            sx={(theme) => ({
              backgroundColor: selectedTagsIds.includes(tag.id)
                ? highlightedShadedBackground(theme)
                : shadedBackground(theme),
              color: selectedTagsIds.includes(tag.id)
                ? highlightedTextShaded(theme)
                : null,
            })}
            className={allTagsListStyles.tag}
            key={tag.id}
          >
            {tag.text}
          </Text>
        ))}
      </Box>
    </Box>
  );
};
