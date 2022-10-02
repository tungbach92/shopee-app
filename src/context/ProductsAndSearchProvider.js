import React, { useContext, useEffect, useState } from "react";
import { useCallback } from "react";
import { db } from "../firebase";
import useGetItemsFromFirebase from "../hooks/useGetItemsFromFirebase";
import useGetUserByObserver from "../hooks/useGetUserByObserver";

const ProductsContext = React.createContext();
export function useProductsAndSearch() {
  return useContext(ProductsContext);
}
const ProductsAndSearchProvider = ({ children }) => {
  const { items, itemsLoading } = useGetItemsFromFirebase();
  const [searchInput, setSearchInput] = useState("");
  const [searchItems, setSearchIems] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

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
  const deleteFromSearchHistory = (text) => {
    text = text.trim();
    if (text.length > 0) {
      const newSearchHistory = [...searchHistory].filter(
        (item) => item !== text
      );
      setSearchHistory(newSearchHistory);
    }
  };

  const addToSearchHistory = (text) => {
    text = text.trim();
    if (text.length > 0) {
      const newSearchHistory = [...searchHistory, text];
      const uniqueNewSearchHistory = [...new Set(newSearchHistory)];
      setSearchHistory(uniqueNewSearchHistory);
    }
  };

  const saveSearchHistoryToFirebase = async (user) => {
    if (!user) return;
    try {
      await db
        .collection("users")
        .doc(user?.uid)
        .collection("searchHistory")
        .doc("searchHistoryItems")
        .set({
          basket: searchHistory,
        });
    } catch (error) {
      alert(error);
    }
  };

  const setSearchHistoryFromFirebase = useCallback((user) => {
    let searchHistory = [];
    if (!user) return;
    db.collection("users")
      .doc(user?.uid)
      .collection("searchHistory")
      .doc("searchHistoryItems")
      .get()
      .then((doc) => {
        if (doc.exists) {
          searchHistory = doc.data().basket;
        }
        setSearchHistory(searchHistory);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  useEffect(() => {
    setSearchHistoryFromFirebase();
  }, [setSearchHistoryFromFirebase]);

  const value = {
    items,
    itemsLoading,
    searchInput,
    setSearchInput,
    searchItems,
    handleSearchInputChange,
    searchHistory,
    setSearchHistory,
    deleteFromSearchHistory,
    addToSearchHistory,
    saveSearchHistoryToFirebase,
    setSearchHistoryFromFirebase,
  };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsAndSearchProvider;
