import { useLazyQuery } from "@apollo/client";
import { Space, Text, Title } from "@mantine/core";
import { AllTagsList } from "components/allTagsList";
import { ItemsGrid } from "components/itemsGrid";
import { Layout } from "components/layout";
import { NoItemsPublished } from "components/noItemsPublished";
import ClientOnly from "components/clientOnly";
import { TagsInput } from "components/tagsInput";
import { ITEMS_BY_TAGS } from "helpers/gqlQueries";
import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { setLoading } from "store/slices/loaderSlice";
import { selectSearchItems } from "store/slices/searchSlice";
import {
  selectItemsByTags,
  selectSearchOnRender,
  selectSearchTags,
  setItemsByTags,
  setSearchOnRender,
  setSearchTags,
} from "store/slices/searchTagsSlice";

const SearchTag = connect(
  (state) => ({
    searchTags: selectSearchTags(state),
    itemsByTags: selectItemsByTags(state),
    itemsBySearch: selectSearchItems(state),
    searchOnRender: selectSearchOnRender(state),
  }),
  (dispatch) => ({
    setTags: (tags) => dispatch(setSearchTags(tags)),
    setItems: (items) => dispatch(setItemsByTags(items)),
    setLoading: (loading) => dispatch(setLoading(loading)),
    unsetSearchOnRender: () => dispatch(setSearchOnRender(false)),
  })
)(
  ({
    searchTags,
    setTags,
    itemsByTags,
    itemsBySearch,
    setItems,
    setLoading,
    searchOnRender,
    unsetSearchOnRender,
  }) => {
    const [getItemsByTags, { loading, data }] = useLazyQuery(ITEMS_BY_TAGS, {
      ssr: false,
      variables: {
        tagsIds: searchTags
          .filter((tag) => tag.newTag === false)
          .map((tag) => tag.id),
      },
    });
    const getItems = () => {
      getItemsByTags({
        variables: {
          tagsIds: searchTags
            .filter((tag) => tag.newTag !== true)
            .map((tag) => tag.id),
        },
      });
    };
    useEffect(() => {
      if (searchOnRender) {
        getItems();
        unsetSearchOnRender();
      }
    }, []);
    useEffect(() => getItems(), [searchTags]);
    useEffect(() => {
      if (data) {
        console.log("setting items by tags");
        setItems(data.itemsByTags);
      }
      setLoading(loading);
    }, [data, loading]);
    return (
      <ClientOnly>
        <Layout>
          <Title order={2} mb="lg">
            Search tags
          </Title>
          <Text my="lg">
            You can click or tap in any tag to add it to the search or write it
            in the tags input
          </Text>
          <AllTagsList selectedTags={searchTags} setSelectedTags={setTags} />
          <TagsInput tags={searchTags} setTags={setTags} />
          <Space h="lg"></Space>
          {data ? (
            itemsByTags.length > 0 ? (
              <ItemsGrid items={itemsByTags} />
            ) : (
              <Text>No items found for given tag search</Text>
            )
          ) : itemsBySearch.length > 0 ? (
            <ItemsGrid items={itemsBySearch} />
          ) : (
            <NoItemsPublished />
          )}
        </Layout>
      </ClientOnly>
    );
  }
);

export default SearchTag;
