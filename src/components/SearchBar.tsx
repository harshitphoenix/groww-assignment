import React, { useState } from "react";
import styles from "../styles/SearchBar.module.css";
import { FaSearch } from "react-icons/fa";
import { debounce } from "@/utils/debounceSearch";
const comp = [
  "Microsoft",
  "Apple",
  "Amazon",
  "Google",
  "Facebook",
  "Tesla",
  "Netflix",
  "Paypal",
  "Adobe",
];
const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const debounceSearch = debounce(() => {}, 300);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debounceSearch(e.target.value);
  };

  return (
    <div className={styles.container}>
      <FaSearch />
      <input
        value={search}
        onChange={handleSearch}
        type="text"
        placeholder="Search stock & etfs"
      />
      <div className={styles.suggestions}>
        {comp.map((val, index) => (
          <p className={styles.suggestionItems} key={`${index}-${val}`}>
            {val}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
