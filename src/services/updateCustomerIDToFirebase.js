import { db } from "../firebase";

export const updateCustomerIDToFirebase = async (user, customerID) => {
  if (!user || !customerID) {
    return;
  }
  try {
    await db.collection("users").doc(user?.uid).set({
      customerID: customerID,
    });
  } catch (error) {
    alert("customerID:" + error.message);
  }
};
