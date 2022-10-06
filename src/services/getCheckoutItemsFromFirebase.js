import { db } from "../firebase";

export const getCheckoutItemsFromFirebase = (user) => {
  return db
    .collection("users")
    .doc(user?.uid)
    .collection("checkout")
    .doc("checkoutItems")
    .get();
};
