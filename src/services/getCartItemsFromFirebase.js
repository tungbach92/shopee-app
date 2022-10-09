import { db } from "../firebase";

const getCartItemsFromStorage = () => {
  let savedCartItems = localStorage.getItem("cartProduct");
  return savedCartItems ? JSON.parse(savedCartItems) : savedCartItems;
};

export const getCartItemsFromFirebase = async (user) => {
  let cartItems = [];

  const savedCartItems = getCartItemsFromStorage();
  if (savedCartItems) {
    cartItems = savedCartItems.map((item) => ({
      ...item,
      similarDisPlay: false,
      variationDisPlay: false,
    }));
    return cartItems;
  }

  try {
    const doc = await db
      .collection("users")
      .doc(user?.uid)
      .collection("cart")
      .doc("cartItems")
      .get();

    if (doc.exists) {
      cartItems = doc.data().basket;
      cartItems = cartItems.map((item) => ({
        ...item,
        similarDisPlay: false,
        variationDisPlay: false,
      }));
    }
  } catch (error) {
    alert("Lỗi lấy giỏ hàng từ firestore:" + error.message);
  }

  return cartItems;
};
