import React, { useContext, useEffect } from "react";
import { ProductContext } from "../context";
import ProductItem from "./ProductItem";
import { useParams } from "react-router-dom";
import { db } from "../firebase";

export default function ProductList({ similarDisPlay, isSearchPage }) {
  // const _isMounted = useRef(true);
  const context = useContext(ProductContext);
  let {
    user,
    items,
    orderItems,
    getData,
    type,
    bestSelling,
    setCategoryProduct,
    setSortedProducts,
    setPageIndex,
    setPageTotal,
    searchInput,
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
    getDataFireBase,
    setSearchInput,
    sortedSearchItems,
    searchItems,
    setSortedSearchItems,
  } = context;
  useEffect(() => {
    if (items.length <= 0) {
      getDataFireBase();
    }
    // if (user) {
    //   db.collection("products").doc(user?.uid).set({
    //     user: user.displayName,
    //     email: user.email,
    //     uid: user.uid,
    //     items: items,
    //   });
    // }
  }, [getDataFireBase, items, orderItems, user]);

  //set default some states
  useEffect(() => {
    setDefaultState();
  }, [setDefaultState]);

  //set default remain state by above state
  useEffect(() => {
    if (type === "allProduct") {
      // set default only when not searching
      const categoryItems = items.filter((item) => item.type !== type);
      const sortedItems = [...categoryItems];
      const pageIndex = 1;
      const pageTotal = calcPageTotals(sortedItems);
      //get and set checkoutItems state
      const checkoutItems = getCheckoutItemsFromStorage();
      setCategoryProduct(categoryItems);
      setSortedProducts(sortedItems);
      setPageIndex(pageIndex);
      setPageTotal(pageTotal);
      setCheckoutProduct(checkoutItems);
    }
  }, [
    calcPageTotals,
    getCheckoutItemsFromStorage,
    items,
    setCategoryProduct,
    setCheckoutProduct,
    setPageIndex,
    setPageTotal,
    setSortedProducts,
    type,
  ]);
  // useEffect(() => {
  //   if (!props.similarDisPlay) {
  //     const cartItems = getCartItemsFromStorage();
  //     setCartProduct(cartItems);
  //   }
  // }, [getCartItemsFromStorage, props.similarDisPlay, setCartProduct]);

  if (similarDisPlay) {
    sortedItems = [...similarItems];
    pageIndex = similarPageIndex;
    pageSize = similarPageSize;
  }

  let renderItem = [];
  if (isSearchPage) {
    renderItem = sortedSearchItems.slice(
      (pageIndex - 1) * pageSize,
      pageIndex * pageSize
    );
  } else {
    renderItem = sortedItems.slice(
      (pageIndex - 1) * pageSize,
      pageIndex * pageSize
    );
  }
  useEffect(() => {
    setSortedSearchItems(searchItems);
  }, [searchItems, setSortedSearchItems]);
  if (renderItem.length === 0 && isSearchPage) {
    return <div className="app__no-product">Không tìm thấy kết quả nào</div>;
  } else
    return renderItem.map((item, index) => (
      <ProductItem
        key={item.id}
        cartItems={cartItems}
        similarDisPlay={similarDisPlay}
        item={item}
        handleClick={handleClick}
        user={user}
      ></ProductItem>
    ));
}
