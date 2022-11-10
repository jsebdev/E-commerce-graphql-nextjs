import { Text, useMantineColorScheme } from "@mantine/core";
import classNames from "classnames";
import { THEMES_NAMES } from "helpers/strings";
import { getTags } from "hooksAndLogic/tags.logic";
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
  const handleAddition = (tag) => {
    tag = { ...tag, text: tag.text.toLowerCase() };
    if (tags.map((tag) => tag.text).includes(tag.text)) {
      return;
    }
    if (
      suggestions.map((suggestedTag) => suggestedTag.text).includes(tag.text)
    ) {
      setTags([
        ...tags,
        {
          ...suggestions.find((suggestedTag) => suggestedTag.text === tag.text),
          newTag: false,
        },
      ]);
      return;
    }
    console.log("tag does not exist in suggestions");
    setTags([...tags, { ...tag, newTag: true }]);
  };
  useEffect(() => {}, [tags]);
  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };
  useEffect(async () => {
    const actualTags = await getTags();
    setSuggestions(actualTags.map((tag) => ({ id: tag.id, text: tag.name })));
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
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        placeholder="Click to add tags"
        autocomplete={false}
        inputFieldPosition="inline"
      />
    </div>
  );
};
