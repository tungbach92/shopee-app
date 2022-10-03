import React, { useContext, useState } from "react";
import useGetItemsFromFirebase from "../hooks/useGetItemsFromFirebase";

const ProductsContext = React.createContext();
export function useProductsContext() {
  return useContext(ProductsContext);
}
const ProductsProvider = ({ children }) => {
  const { items, itemsLoading } = useGetItemsFromFirebase();

  const value = {
    items,
    itemsLoading,
  };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
