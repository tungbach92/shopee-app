import React, { useContext, useEffect, useMemo, useState } from "react";
import useGetItemsFromFirebase from "../hooks/useGetItemsFromFirebase";

const ProductsContext = React.createContext();
export function useProductsAndSearch() {
  return useContext(ProductsContext);
}
const ProductsAndSearchProvider = ({ children }) => {
  const { items, itemsLoading } = useGetItemsFromFirebase();
  const [searchInput, setSearchInput] = useState("");
  const [searchItems, setSearchIems] = useState([]);
  // const searchItems = useMemo(() => {
  //   return searchInput.length > 0
  //     ? items.filter((item) =>
  //         item.name.toLowerCase().includes(searchInput.trim().toLowerCase())
  //       )
  //     : [];
  // }, [items, searchInput]);
  const handleSearchInputChange = (input) => {
    const searchItems = items.filter((item) =>
      item.name.toLowerCase().includes(input.trim().toLowerCase())
    );
    setSearchIems(searchItems);
  };

  const value = {
    items,
    itemsLoading,
    searchInput,
    setSearchInput,
    searchItems,
    handleSearchInputChange,
  };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsAndSearchProvider;
