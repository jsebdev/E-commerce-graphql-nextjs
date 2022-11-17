import { Button, Text } from "@mantine/core";
import { AllTagsList } from "components/allTagsList";
import { Layout } from "components/layout";
import NonSsrWrapper from "components/nonSsrWrapper";
import { TagsInput } from "components/tagsInput";
import React from "react";
import { connect } from "react-redux";
import { selectSearchTags, setSearchTags } from "store/slices/searchTagsSlice";

const SearchTag = connect(
  (state) => ({
    searchTags: selectSearchTags(state),
  }),
  (dispatch) => ({
    setTags: (tags) => dispatch(setSearchTags(tags)),
  })
)(({ searchTags, setTags }) => {
  return (
    <NonSsrWrapper>
      <Layout>
        <h1>Search tag</h1>
        <Text>
          Click or tap in any tag to add it to the tags list or write it
          yourself
        </Text>
        <AllTagsList selectedTags={searchTags} setSelectedTags={setTags} />
        <TagsInput tags={searchTags} setTags={setTags} />
        <Button variant="outline">Search</Button>
      </Layout>
    </NonSsrWrapper>
  );
});

export default SearchTag;
