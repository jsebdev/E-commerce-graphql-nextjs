import { Text, useMantineColorScheme } from "@mantine/core";
import classNames from "classnames";
import { THEMES_NAMES } from "helpers/strings";
import { getTags } from "hooksAndLogic/fetchTags.logic";
import { handleTagAddition, tagB2F } from "hooksAndLogic/inputTags.logic";
import React from "react";
import { useEffect } from "react";

import { WithContext as ReactTags } from "react-tag-input";
import tagsInputStyles from "styles/componentsStyles/tagsInput.module.scss";

const KeyCodes = {
  comma: 188,
  enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

export const TagsInput = ({ tags, setTags }) => {
  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };
  const [suggestions, setSuggestions] = React.useState([]);
  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };
  useEffect(async () => {
    const actualTags = await getTags();
    setSuggestions(actualTags.map(tagB2F));
  }, []);

  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme.colorScheme === THEMES_NAMES.dark;

  return (
    <div
      className={classNames({
        [tagsInputStyles.container]: true,
        darkMode: isDark,
      })}
    >
      <Text className={tagsInputStyles.label}>Tags</Text>
      <ReactTags
        tags={tags}
        suggestions={suggestions}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={(tag) =>
          handleTagAddition(tag, tags, setTags, suggestions)
        }
        handleDrag={handleDrag}
        placeholder="Click to add tags"
        autocomplete={false}
        inputFieldPosition="inline"
      />
    </div>
  );
};
