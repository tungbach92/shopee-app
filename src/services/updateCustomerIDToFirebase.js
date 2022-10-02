import { db } from "../firebase";

export const updateCustomerIDToFirebase = (user, customerID) => {
  if (user) {
    db.collection("users")
      .doc(user?.uid)
      .set({
        customerID: customerID,
      })
      .catch((err) => alert(err));
  }
};
