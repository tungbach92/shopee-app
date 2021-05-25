import { useState, useCallback } from "react";

const useModal = () => {
  const [isVoucherShowing, setIsVoucherShowing] = useState(false);
  const [isPopupShowing, setIsPopupShowing] = useState(false);

  const toggleVoucher = useCallback((value) => {
    setIsVoucherShowing(value);
  }, []);

  const togglePopup = useCallback((value) => {
    setIsPopupShowing(value);
  }, []);

  return {
    isVoucherShowing,
    toggleVoucher,
    isPopupShowing,
    togglePopup,
  };
};
export default useModal;
