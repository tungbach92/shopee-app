import React, { useContext, useEffect, useState } from "react";
import { useProductsContext } from "./ProductsProvider";
const SearchContext = React.createContext();
export const useSearchContext = () => {
  return useContext(SearchContext);
};

const SearchProvider = ({ children }) => {
  const { items } = useProductsContext();
  const [searchItems, setSearchItems] = useState([]);
  const [searchInput, setSearchInput] = useState("");

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
    handleSearchInputChange,
    searchInput,
    setSearchInput,
  };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
export default SearchProvider;
