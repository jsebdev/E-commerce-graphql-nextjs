import { gql } from "@apollo/client";
import { client } from "apolloClient";
import { itemGraphqlQueryFields } from "helpers/queries";
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
    const query = gql`
    query {
      itemsBySearch(searchText:"${search}") {
        ${itemGraphqlQueryFields}
      }
    }`;
    const { data } = await client.query({ query });
    console.log("21: data >>>", data);
    dispatch(setItems(data.itemsBySearch));
  };
  const changeSearch = (event) => {
    setSearch(event.target.value);
  };

  return { search, handleSearch, changeSearch, setSearch };
};
