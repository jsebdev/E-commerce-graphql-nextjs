import { gql } from "@apollo/client";
import client from "apollo-client";
import { itemGraphqlQueryFields } from "helpers/queries";
import React from "react";
import { useDispatch } from "react-redux";
import { setItems } from "store/itemsSlice";

export const useSearcher = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState("");
  const handleSearch = async (event) => {
    event.preventDefault();
    console.log("the search is ", search);
    const query = gql`
    query {
      itemBySearch(searchText:"${search}") {
        ${itemGraphqlQueryFields}
      }
    }`;
    const { data } = await client.query({ query });
    console.log("21: data >>>", data);
    dispatch(setItems(data.itemBySearch));
  };
  const changeSearch = (event) => {
    setSearch(event.target.value);
  };

  return { search, handleSearch, changeSearch };
};
