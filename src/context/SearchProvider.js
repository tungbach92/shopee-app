import React, { useContext, useEffect, useState } from "react";
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
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    (async () => {
      if (user) {
        const searchHistory = await getSearchHistoryFromFirebase(user);
        setSearchHistory(searchHistory);
      }
    })();
  }, [setSearchHistory, user]);

  const changeSuggestionsByInputText = (text) => {
    const mathSuggestions = searchHistory.filter((item) => {
      return item.trim().toLowerCase().includes(text.trim().toLowerCase());
    });
    if (text === "") {
      setSuggestions(searchHistory);
    } else {
      setSuggestions(mathSuggestions);
    }
  };

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
    }
  };

  const deleteFromSuggestions = (text) => {
    const mathSuggestions = [...suggestions].filter((item) => item !== text);
    setSuggestions(mathSuggestions);
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
    changeSuggestionsByInputText,
    addToSearchHistory,
    deleteFromSearchHistory,
    deleteFromSuggestions,
    suggestions,
  };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
export default SearchProvider;
