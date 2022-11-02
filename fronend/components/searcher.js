import React from "react";
import headerStyles from "./header.module.scss";
import searcherStyles from "./searcher.module.scss";
import { useSearcher } from "hooks/searcher.hook";
import { connect } from "react-redux";
import { useEffect } from "react";
import { selectSearchText } from "store/slices/searchSlice";
import cn from "classnames";
import { Center, Group, UnstyledButton, useMantineTheme } from "@mantine/core";

import { IconBuildingStore, IconSearch } from "@tabler/icons";
import { THEMES_NAMES } from "helpers/strings";

export const SearcherWithoutConnection = ({ searchText }) => {
  const { search, handleSearch, changeSearch, setSearch } = useSearcher();
  useEffect(() => {
    setSearch(searchText);
  }, [searchText]);
  return (
    <Group className={cn(headerStyles.headerItem, searcherStyles.searcher)}>
      <form onSubmit={handleSearch}>
        <SearcherInput value={search} onChange={changeSearch} />
      </form>
    </Group>
  );
};

const SearcherInput = ({ value, onChange }) => {
  const theme = useMantineTheme();
  const visibleColor =
    theme.colorScheme === THEMES_NAMES.dark
      ? theme.colors.dark[0]
      : theme.colors.dark[9];
  const nonVisibleColor =
    theme.colorScheme === THEMES_NAMES.dark
      ? theme.colors.dark[5]
      : theme.colors.dark[0];
  return (
    <Group
      spacing={0}
      className={searcherStyles.searcherContainer}
      sx={(theme) => ({
        border: `1px solid ${
          theme.colorScheme === THEMES_NAMES.dark
            ? theme.colors.dark[3]
            : theme.colors.dark[5]
        }`,
      })}
    >
      <Center p="xs">
        <IconBuildingStore size={18} />
      </Center>
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={onChange}
        className={searcherStyles.searcherInput}
      />
      <UnstyledButton
        type="submit"
        sx={(theme) => ({
          borderLeft: `1px solid ${
            theme.colorScheme === THEMES_NAMES.dark
              ? theme.colors.dark[4]
              : theme.colors.gray[4]
          }`,
        })}
        disabled={value.length === 0}
      >
        <Center p="sm">
          <IconSearch
            size={18}
            color={value.length > 0 ? visibleColor : nonVisibleColor}
          />
        </Center>
      </UnstyledButton>
    </Group>
  );
};

export const Searcher = connect((state) => ({
  searchText: selectSearchText(state),
}))(SearcherWithoutConnection);
