import { db } from "../firebase";

export const saveCartItemsToFirebase = async (user, cartItems) => {
  if (!user) return;
  try {
    const created = Date.now();
    cartItems = cartItems.map((item) => {
      const { similarDisPlay, variationDisPlay, ...rest } = item;
      return rest;
    });
    await db
      .collection("users")
      .doc(user.uid)
      .collection("cart")
      .doc("cartItems")
      .set({
        basket: cartItems,
        created: created,
      });
  } catch (error) {
    alert("Lỗi lưu giỏ hàng:" + error.message);
  }
};
