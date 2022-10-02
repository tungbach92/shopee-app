import { useEffect, useState } from "react";
import { getDefaultPaymentMethodID } from "../services/getDefaultPaymentMethodID";

const useDefaultPaymentMethodID = (user) => {
  const [defaultPaymentMethodID, setDefaultPaymentMethodID] = useState("");
  useEffect(() => {
    (async () => {
      const defaultPaymentMethodID = await getDefaultPaymentMethodID(user);
      setDefaultPaymentMethodID(defaultPaymentMethodID);
    })();
  }, [setDefaultPaymentMethodID, user]);
  return { defaultPaymentMethodID, setDefaultPaymentMethodID };
};

export default useDefaultPaymentMethodID;
