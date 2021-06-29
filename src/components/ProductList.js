import React, { useContext, useEffect } from "react";
import { ProductContext } from "../context";
import ProductItem from "./ProductItem";

export default function ProductList(props) {
  // const _isMounted = useRef(true);
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
    setCheckoutProduct,
    calcCartNumb,
    sortedItems,
    similarItems,
    cartItems,
    pageIndex,
    pageSize,
    similarPageIndex,
    similarPageSize,
    handleClick,
    setDefaultState,
  } = context;

  useEffect(() => {
    if (items.length <= 0) {
      getData();
    }
  }, [items, getData]);

  //set default some states
  useEffect(() => {
    setDefaultState();
  }, [setDefaultState]);

  //default when open main page
  useEffect(() => {
    if (type === "allProduct") {
      const categoryItems = items.filter((item) => item.type !== type);
      const sortedItems = [...categoryItems];
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
      setCheckoutProduct(checkoutItems);
    }
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
    setCheckoutProduct,
  ]);
  useEffect(() => {
    if (!props.similarDisPlay) {
      const cartItems = getCartItemsFromStorage();
      setCartProduct(cartItems);
    }
  }, [getCartItemsFromStorage, props.similarDisPlay, setCartProduct]);

  if (props.similarDisPlay) {
    sortedItems = [...similarItems];
    pageIndex = similarPageIndex;
    pageSize = similarPageSize;
  }

  let renderItem = [];
  renderItem = sortedItems.slice(
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
