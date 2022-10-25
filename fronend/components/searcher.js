import { SlMagnifier } from "react-icons/sl";

import styles from "./header.module.scss";
import { useSearcher } from "./searcher.hook";

export const Searcher = () => {
  const { search, handleSearch, changeSearch } = useSearcher();
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
