import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/SearchBar.module.css";
import { FaSearch } from "react-icons/fa";
import { debounce } from "@/utils/debounceSearch";
import { DataService, SearchSuggestion } from "@/services/dataService";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const suggestionRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLInputElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);

  const debounceSearch = debounce(() => {
    DataService.getSearchSuggestions(search).then((res) => {
      console.log(res);
      setSuggestions(res);
    });
  }, 300);

  const fetchFromSessionStorage = () => {
    const data = sessionStorage.getItem("searchSuggestions");
    if (data) {
      setShowSuggestions(true);
      setSuggestions(JSON.parse(data));
    }
  };

  const handleSuggestionClick = (symbol: SearchSuggestion) => {
    const data = sessionStorage.getItem("searchSuggestions");
    if (data) {
      const parsedData = JSON.parse(data);
      const found = parsedData.find((val: SearchSuggestion) => {
        return val.symbol === symbol.symbol;
      });
      if (!found) {
        parsedData.push(symbol);
        sessionStorage.setItem("searchSuggestions", JSON.stringify(parsedData));
      }
    } else {
      sessionStorage.setItem("searchSuggestions", JSON.stringify([symbol]));
    }
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setShowSuggestions(true);
    debounceSearch(e.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(e.target as Node) &&
        searchBarRef.current &&
        !searchBarRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div ref={searchBarRef} className={styles.container}>
      <div className={styles.parentContainer}>
        <div className={styles.searchBarContainer}>
          <FaSearch />
          <input
            onFocus={fetchFromSessionStorage}
            value={search}
            onChange={handleSearch}
            type="text"
            placeholder="Search stock & etfs"
          />
        </div>
        {showSuggestions && (
          <div
            style={{ width: searchBarRef?.current?.clientWidth }}
            ref={suggestionRef}
            className={styles.suggestions}
          >
            {suggestions.length === 0 && (
              <div className={styles.suggestionItems}>No results found</div>
            )}
            {suggestions.map((val, index) => (
              <div
                onClick={() => handleSuggestionClick(val)}
                className={styles.suggestionItems}
                key={`${index}-${val}`}
              >
                {val?.name} ({val?.symbol})
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
