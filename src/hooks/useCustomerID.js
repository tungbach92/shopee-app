import { useState } from "react";
import { db } from "../firebase";

const useCustomerID = () => {
  const [customerID, setCustomerID] = useState("");
  const updateCustomerIdToFirebase = (user, customerID) => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .set({
          customerID: customerID,
        })
        .then(() => {
          setCustomerID(customerID);
        })
        .catch((err) => alert(err));
    }
  };

  return { customerID, updateCustomerIdToFirebase };
};
export default useCustomerID;
