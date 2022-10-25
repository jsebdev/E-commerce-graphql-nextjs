import React from "react";
import { useDispatch } from "react-redux";
import { setItems } from "store/itemsSlice";

export const useSearcher = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState("");
  const handleSearch = (event) => {
    event.preventDefault();
    console.log("the search is ", search);
    // TODO: search the items
  };
  const changeSearch = (event) => {
    setSearch(event.target.value);
  };

  return { search, handleSearch, changeSearch };
};
