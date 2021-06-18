import React, { useContext, useEffect } from "react";
import { ProductContext } from "../context";
import ProductItem from "./ProductItem";

export default function ProductList(props) {
  const context = useContext(ProductContext);
  let {
    items,
    getData,
    type,
    bestSelling,
    setCategoryProduct,
    setSortedProducts,
    setPageIndex,
    setPageTotal,
    setCartProduct,
    getCartItemsFromStorage,
    calcPageTotals,
    setCartNumb,
    getCheckoutItemsFromStorage,
    setCheckoutItems,
    calcCartNumb,
    setDefaultChecked,
    checkoutItems,

    sortedItems,
    similarItems,
    cartItems,
    pageIndex,
    pageSize,
    similarPageIndex,
    similarPageSize,
    handleClick,
  } = context;

  useEffect(() => {
    if (items.length <= 0) {
      getData();
    }
  }, [items, getData]);

  useEffect(() => {
    const categoryItems = items.filter((item) => item.type !== type);

    const sortedItems = categoryItems.filter(
      (item) =>
        new Date(item.date).getDate() > new Date().getDate() - 20 ||
        item.soldAmount >= bestSelling
    );
    const pageIndex = 1;
    const pageTotal = calcPageTotals(sortedItems);
    //get and set cartItems state
    const cartItems = getCartItemsFromStorage();
    const cartNumb = calcCartNumb(cartItems);
    //get and set checkoutItems state
    const checkoutItems = getCheckoutItemsFromStorage();
    setCategoryProduct(categoryItems);
    setSortedProducts(sortedItems);
    setPageIndex(pageIndex);
    setPageTotal(pageTotal);
    setCartNumb(cartNumb);
    setCheckoutItems(checkoutItems);
  }, [
    bestSelling,
    setCategoryProduct,
    setSortedProducts,
    items,
    type,
    calcPageTotals,
    getCartItemsFromStorage,
    calcCartNumb,
    getCheckoutItemsFromStorage,
    setPageIndex,
    setPageTotal,
    setCartNumb,
    setCheckoutItems,
  ]);
  useEffect(() => {
    const cartItems = getCartItemsFromStorage();
    if (!props.similarDisPlay) {
      setCartProduct(cartItems);
    }
  }, [getCartItemsFromStorage, props.similarDisPlay, setCartProduct]);

  useEffect(() => {
    setDefaultChecked();
  }, [checkoutItems, cartItems, setDefaultChecked]);

  if (props.similarDisPlay) {
    sortedItems = similarItems;
    pageIndex = similarPageIndex;
    pageSize = similarPageSize;
  }
  const renderItem = sortedItems.slice(
    (pageIndex - 1) * pageSize,
    pageIndex * pageSize
  );
  return renderItem.map((item) => (
    <ProductItem
      key={item.id}
      cartItems={cartItems}
      similarDisPlay={props.similarDisPlay}
      item={item}
      handleClick={handleClick}
    ></ProductItem>
  ));
}
