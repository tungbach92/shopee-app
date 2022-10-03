import { useLayoutEffect, useState } from "react";
import { getDefaultPaymentMethodID } from "../services/getDefaultPaymentMethodID";

const useDefaultPaymentMethodID = (customerID) => {
  const [defaultPaymentMethodID, setDefaultPaymentMethodID] = useState("");

  useLayoutEffect(() => {
    (async () => {
      const defaultPaymentMethodID = await getDefaultPaymentMethodID(
        customerID
      );
      setDefaultPaymentMethodID(defaultPaymentMethodID);
    })();
  }, [customerID]);
  return { defaultPaymentMethodID, setDefaultPaymentMethodID };
};

export default useDefaultPaymentMethodID;
