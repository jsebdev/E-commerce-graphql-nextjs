import { SlMagnifier } from "react-icons/sl";

import styles from "./header.module.scss";
import { useSearcher } from "hooks/searcher.hook";
import { connect } from "react-redux";
import { useEffect } from "react";
import { selectSearchText } from "store/searchSlice";

export const SearcherWithoutConnection = ({ searchText }) => {
  const { search, handleSearch, changeSearch, setSearch } = useSearcher();
  useEffect(() => {
    setSearch(searchText);
  }, [searchText]);
  return (
    <div className={styles.headerItem}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={changeSearch}
        />
        <button type="submit">
          <SlMagnifier />
        </button>
      </form>
    </div>
  );
};

export const Searcher = connect((state) => ({
  searchText: selectSearchText(state),
}))(SearcherWithoutConnection);
