import { Button, Text, useMantineColorScheme } from "@mantine/core";
import classNames from "classnames";
import { THEMES_NAMES } from "helpers/strings";
import { useFetchTags } from "hooksAndLogic/fetchTags.hook";
import {
  createRawTag,
  handleTagAddition,
  tagB2F,
} from "hooksAndLogic/tagsInput.logic";
import React from "react";
import { useEffect } from "react";

import { WithContext as ReactTags } from "react-tag-input";
import tagsInputStyles from "styles/componentsStyles/tagsInput.module.scss";

const KeyCodes = {
  comma: 188,
  enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

export const TagsInput = ({ tags, setTags, displayError }) => {
  const handleAdditionOut = () => {
    const input = document.querySelector(
      "#inputContainer > div > div > div > input"
    );
    if (input.value.length === 0) return;
    handleTagAddition(createRawTag(input.value), tags, setTags, suggestions);
    input.value = "";
  };
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
  const { data, loading, error } = useFetchTags();
  useEffect(() => {
    if (error) {
      console.log("error getting tags for suggestions >>>", error);
      return;
    }
    if (loading) {
      console.log("loading tags for suggestions");
      return;
    }
    if (data) setSuggestions(data.tags.map(tagB2F));
    else {
      console.log("no tags found");
    }
  }, [data, error]);

  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme.colorScheme === THEMES_NAMES.dark;

  return (
    <div
      className={classNames({
        [tagsInputStyles.container]: true,
        darkMode: isDark,
      })}
    >
      <Text className={tagsInputStyles.label}>Tags:</Text>
      <Text color="dimmed" size="xs">
        Separate tags with commas, pressing enter or pressing on the button
      </Text>
      <div
        className={classNames({
          [tagsInputStyles.inputContainer]: true,
          [tagsInputStyles.displayError]: displayError,
        })}
        id="inputContainer"
      >
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={(tag) =>
            handleTagAddition(tag, tags, setTags, suggestions)
          }
          handleDrag={handleDrag}
          placeholder="Add tags"
          autocomplete={false}
          inputFieldPosition="inline"
        />
        <Button variant="outline" size="xs" onClick={handleAdditionOut}>
          Add tag
        </Button>
      </div>
    </div>
  );
};
