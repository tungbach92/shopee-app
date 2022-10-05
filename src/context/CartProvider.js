import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useProductsContext } from "./ProductsProvider";
import { isEqual } from "lodash";
import { db } from "../firebase";
import { useUser } from "./UserProvider";
import { getCartItemsFromFirebase } from "../services/getCartItemsFromFirebase";
import useVoucher from "../hooks/useVoucher";

const CartContext = React.createContext();
export const useCartContext = () => {
  return useContext(CartContext);
};

const CartProvider = ({ children }) => {
  const { items } = useProductsContext();
  const { user } = useUser();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { voucher, updateVoucher, resetVoucher } = useVoucher();

  useEffect(() => {
    (async () => {
      const cartItems = await getCartItemsFromFirebase(user);
      setCartItems(cartItems);
      setLoading(false);
    })();
  }, [user]);

  const resetCartItems = () => {
    setCartItems([]);
  };

  const addToCartItems = (id) => (item) => {
    let cartItemsUpdated = [];

    if (!item) {
      let item = items.find((item) => item.id === id);
      item = {
        ...item,
        amount: 1,
        variation: "",
        variationDisPlay: false,
        similarDisPlay: false,
      };
      cartItemsUpdated = [...cartItems, item];
    } else {
      let isExistId = cartItems.some((cartItem) => cartItem.id === item.id);
      let isExistVariation = cartItems.some(
        (cartItem) =>
          cartItem.variation === item.variation && cartItem.id === item.id
      );
      if (isExistId && isExistVariation) {
        cartItemsUpdated = cartItems.map((cartItem) =>
          cartItem.id === item.id && cartItem.variation === item.variation
            ? { ...cartItem, amount: cartItem.amount + item.amount }
            : cartItem
        );
      } else cartItemsUpdated = [...cartItems, item];
    }

    setCartItems(cartItemsUpdated);
  };

  const delCartItem = (id, variation) => {
    // cartItems = cartItems.filter((item) => item.id !== id);
    const newCartItems = [...cartItems].filter(
      (cartItem) => cartItem.id !== id || cartItem.variation !== variation
    );
    setCartItems(newCartItems);
    // if (cartItems.length === 0) {
    //     this.saveCartItemsToFirebase(cartItems);
    // }
  };

  const delCartItems = (checked) => {
    let newCartItems = [];
    const forCompareChecked = checked.map((checkedItem) => {
      return { ...checkedItem, variationDisPlay: false, similarDisPlay: false };
    });
    forCompareChecked.forEach(
      (checkedItem) =>
        (newCartItems = cartItems.filter(
          (cartItem) => !isEqual(cartItem, checkedItem)
        ))
    );

    setCartItems(newCartItems);
    // if (cartItems.length === 0) {
    //   this.saveCartItemsToFirebase(cartItems);
    // }
  };

  const changeAmountCartItem = (id, variation, amount) => {
    const newCartItems = [...cartItems];
    let item = newCartItems.find(
      (item) => item.id === id && item.variation === variation
    );
    item.amount = amount;
    setCartItems(newCartItems);
  };

  const incrCartItem = (id, variation) => {
    const newCartItems = [...cartItems];
    const indexOfItem = newCartItems.findIndex(
      (item) => item.id === id && item.variation === variation
    );
    newCartItems[indexOfItem].amount++;
    setCartItems(newCartItems);
  };

  const decrCartItem = (id, variation) => {
    const newCartItems = [...cartItems];
    let item = newCartItems.find(
      (item) => item.id === id && item.variation === variation
    );
    item.amount <= 1 ? (item.amount = 1) : item.amount--;
    setCartItems(newCartItems);
  };

  const saveCartItemsToStorage = () => {
    const savedCartItems = cartItems.map((item) => ({
      ...item,
      similarDisPlay: undefined,
      variationDisPlay: undefined,
    }));
    localStorage.setItem("cartProduct", JSON.stringify(savedCartItems));
  };

  const changeVariationDisPlayCartItems = (index) => {
    const newCartItems = cartItems.map((item) =>
      cartItems.indexOf(item) === index
        ? { ...item, variationDisPlay: !item.variationDisPlay }
        : item
    );
    setCartItems(newCartItems);
  };

  const changeCartItemsVariation = (variation, index) => {
    const newCartItems = cartItems.map((item) =>
      cartItems.indexOf(item) === index
        ? { ...item, variation, variationDisPlay: !item.variationDisPlay }
        : item
    );
    setCartItems([...newCartItems]);
  };

  //TODO: choose when to save cart to firebase
  const saveCartItemsToFirebase = async (cartItems) => {
    try {
      const created = Date.now();
      cartItems = cartItems.map((item) => {
        const { similarDisPlay, variationDisPlay, ...rest } = item;
        return rest;
      });
      await db
        .collection("users")
        .doc(user?.uid)
        .collection("cart")
        .doc("cartItems")
        .set({
          basket: cartItems,
          created: created,
        });
    } catch (error) {
      alert("lỗi lưu giỏ hàng:" + error.message);
    }
  };

  //   const changeSimilarDisPlayCartItems = (index) => {
  //     const { cartItems } = this.state;
  //     const newCartItems = [...cartItems];

  //     let items = newCartItems.filter(
  //       (item) => newCartItems.indexOf(item) !== index
  //     );
  //     items.forEach((item) => {
  //       item.similarDisPlay = false;
  //     });

  //     newCartItems[index] = {
  //       ...newCartItems[index],
  //       similarDisPlay: !cartItems[index].similarDisPlay,
  //     };
  //     const category = cartItems[index].category;
  //     this.setState(
  //       { cartItems: newCartItems, category },
  //       this.filterItemsBySimilar
  //     );
  //   };

  const value = {
    cartItems,
    cartItemsLoading: loading,
    resetCartItems,
    addToCartItems,
    delCartItem,
    delCartItems,
    changeAmountCartItem,
    incrCartItem,
    decrCartItem,
    saveCartItemsToStorage,
    saveCartItemsToFirebase,
    changeVariationDisPlayCartItems,
    changeCartItemsVariation,
    voucher,
    updateVoucher,
    resetVoucher,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
