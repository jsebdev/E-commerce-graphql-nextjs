import { Box, Center } from "@mantine/core";
import { Layout } from "components/layout";
import NonSsrWrapper from "components/nonSsrWrapper";
import ColoredBox from "components/themedComponents/coloredBox";
import { ShadedBox } from "components/themedComponents/shadedBox";
import { allTagsWidthContainer, shadedBackground } from "helpers/utils";
import { getTags } from "hooksAndLogic/tags.logic";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import searchTagsStyles from "styles/componentsStyles/searchTags.module.scss";

const SearchTag = () => {
  const [allTags, setAllTags] = React.useState([]);
  useEffect(async () => {
    const actualTags = await getTags();
    setAllTags(actualTags.map((tag) => ({ id: tag.id, text: tag.name })));
  }, []);
  // const [n, sn] = useState(1);
  return (
    <NonSsrWrapper>
      <Layout>
        <h1>Search tag</h1>
        {/* <p>{allTags.length}</p> */}
        {/* <input
          type="number"
          value={n}
          onChange={(e) => {
            sn(Number.parseInt(e.target.value));
          }}
          placeholder={0}
          min={0}
        /> */}
        {/* <p>
          width: {allTagsWidthContainer(allTags.slice(0, Number.parseInt(n)))}
        </p> */}
        <div className={searchTagsStyles.parent}>
          I am the parent
          <div className={searchTagsStyles.child}>
            I am the child, but I want to be behind my parent
          </div>
        </div>

        <Box
          className={searchTagsStyles.allTagsScroll}
          sx={(theme) => ({
            border: `2px solid ${
              theme.colorScheme === "dark" ? "white" : "black"
            }`,
          })}
        >
          <Box
            className={searchTagsStyles.allTagsContainer}
            sx={{
              width: allTagsWidthContainer(allTags),
            }}
          >
            {allTags.map((tag) => (
              <Center
                sx={(theme) => ({
                  backgroundColor: shadedBackground(theme),
                })}
                className={searchTagsStyles.tag}
                key={tag.id}
              >
                {tag.text}
                {console.log(tag)}
              </Center>
            ))}
          </Box>
        </Box>
      </Layout>
    </NonSsrWrapper>
  );
};

export default SearchTag;
