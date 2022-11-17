import { Box, Center, Text, useMantineTheme } from "@mantine/core";
import {
  allTagsWidthContainer,
  dimmedTextShaded,
  dimmedShadedBackground,
  shadedBackground,
} from "helpers/utils";
import { useWindowSize } from "hooksAndLogic/global.hooks";
import { getTags } from "hooksAndLogic/fetchTags.logic";
import React, { useEffect } from "react";
import allTagsListStyles from "styles/componentsStyles/allTagsList.module.scss";
import { handleTagAddition, tagB2F } from "hooksAndLogic/inputTags.logic";

export const AllTagsList = ({ selectedTags, setSelectedTags }) => {
  const selectedTagsIds = selectedTags.map((tag) => tag.id);
  console.log("16: selectedTags >>>", selectedTags);
  const [allTags, setAllTags] = React.useState([]);
  const {
    windowSize: { width: windowWidth },
  } = useWindowSize();
  useEffect(async () => {
    const actualTags = await getTags();
    setAllTags(actualTags.map(tagB2F));
  }, []);
  useEffect(() => {
    // console.log("24: allTags >>>", allTags);
  }, [allTags]);
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
                ? dimmedShadedBackground(theme)
                : shadedBackground(theme),
              color: selectedTagsIds.includes(tag.id)
                ? dimmedTextShaded(theme)
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
