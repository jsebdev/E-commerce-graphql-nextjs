import { client } from "apolloClient";
import { SEARCH_ITEMS } from "helpers/gqlQueries";
import React from "react";
import { useDispatch } from "react-redux";
import { setItems, setSearchText } from "store/slices/searchSlice";
// import { setSearchText } from "store/searchSlice";

export const useSearcher = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState("");
  const handleSearch = async (event) => {
    event.preventDefault();
    console.log("the search is ", search);
    dispatch(setSearchText(search));
    const { data } = await client.query({ query: SEARCH_ITEMS(search) });
    console.log("21: data >>>", data);
    dispatch(setItems(data.itemsBySearch));
  };
  const changeSearch = (event) => {
    setSearch(event.target.value);
  };

  return { search, handleSearch, changeSearch, setSearch };
};
