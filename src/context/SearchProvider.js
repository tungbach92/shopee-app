import React, { useContext, useEffect, useMemo, useState } from "react";
import getSearchHistoryFromFirebase from "../services/getSearchHistoryFromFirebase";
import { saveSearchHistoryToFirebase } from "../services/saveSearchHistoryToFirebase";
import { useProductsContext } from "./ProductsProvider";
import { useUser } from "./UserProvider";
const SearchContext = React.createContext();
export const useSearchContext = () => {
  return useContext(SearchContext);
};

const SearchProvider = ({ children }) => {
  const { user } = useUser();
  const { items } = useProductsContext();
  const [searchItems, setSearchItems] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const suggestions = useMemo(
    () =>
      searchHistory.filter((item) => {
        return item
          .trim()
          .toLowerCase()
          .includes(searchInput.trim().toLowerCase());
      }),
    [searchHistory, searchInput]
  );

  useEffect(() => {
    (async () => {
      if (user) {
        const searchHistory = await getSearchHistoryFromFirebase(user);
        setSearchHistory(searchHistory);
      }
    })();
  }, [setSearchHistory, user]);

  const addToSearchHistory = (text) => {
    text = text.trim();
    if (text.length > 0) {
      const newSearchHistory = [...searchHistory, text];
      const uniqueNewSearchHistory = [...new Set(newSearchHistory)];
      saveSearchHistoryToFirebase(user, uniqueNewSearchHistory);
      setSearchHistory(uniqueNewSearchHistory);
    }
  };

  const deleteFromSearchHistory = (text) => {
    text = text.trim();
    if (text.length > 0) {
      const newSearchHistory = [...searchHistory].filter(
        (item) => item !== text
      );
      setSearchHistory(newSearchHistory);
      saveSearchHistoryToFirebase(user, newSearchHistory);
    }
  };

  const handleSearchInputChange = (input) => {
    if (input.length === 0) {
      setSearchItems([]);
      return;
    }
    const searchItems = items.filter((item) =>
      item.name.toLowerCase().includes(input.trim().toLowerCase())
    );
    setSearchItems(searchItems);
  };

  const value = {
    searchItems,
    searchInput,
    setSearchInput,
    handleSearchInputChange,
    addToSearchHistory,
    deleteFromSearchHistory,
    suggestions,
  };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
export default SearchProvider;
