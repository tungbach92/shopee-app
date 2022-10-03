import { useEffect } from "react";
import { useState } from "react";
import getCustomerID from "../services/getCustomerID";

export const useCustomerID = (user) => {
  const [customerID, setCustomerID] = useState("");

  useEffect(() => {
    (async () => {
      const customerID = await getCustomerID(user);
      setCustomerID(customerID);
    })();
  }, [user]);
  return { customerID };
};
