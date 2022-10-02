import { useLayoutEffect, useState } from "react";
import { getPaymentMethodList } from "../services/getPaymentMethodList";
import useDefaultPaymentMethodID from "./useDefaultPaymentMethodID";

const usePaymentMethodList = (user) => {
  const { setDefaultPaymentMethodID } = useDefaultPaymentMethodID(user);
  const [paymentMethodList, setPaymentMethodList] = useState([]);
  const [loading, setLoading] = useState(false);
  useLayoutEffect(() => {
    (async () => {
      setLoading(true);
      const paymentMethodList = await getPaymentMethodList(user);
      setPaymentMethodList(paymentMethodList);
      if (paymentMethodList.length === 1) {
        setDefaultPaymentMethodID(paymentMethodList[0].id);
      }
      setLoading(false);
    })();
  }, [setDefaultPaymentMethodID, user]);
  return {
    paymentMethodList,
    setPaymentMethodList,
    paymentMethodListLoading: loading,
  };
};

export default usePaymentMethodList;
