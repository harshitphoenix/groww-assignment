import React, { useState } from "react";
import styles from "../styles/SearchBar.module.css";
import { FaSearch } from "react-icons/fa";
import { debounce } from "@/utils/debounceSearch";
import { DataService, SearchSuggestion } from "@/services/dataService";
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
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);

  const debounceSearch = debounce(() => {
    DataService.getSearchSuggestions(search).then((res) => {
      console.log(res);
      setSuggestions(res);
    });
  }, 300);

  const handleSuggestionClick = (symbol: string) => {
    console.log("symbol", symbol);
    setSuggestions([]);
  };

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
      {suggestions.length > 0 && (
        <div className={styles.suggestions}>
          {suggestions.map((val, index) => (
            <div onClick={()=>handleSuggestionClick(val.symbol)} className={styles.suggestionItems} key={`${index}-${val}`}>
              {val?.name} ({val?.symbol})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
