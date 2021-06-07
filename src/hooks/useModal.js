import { useState, useCallback } from "react";

const useModal = () => {
  const [isVoucherShowing, setIsVoucherShowing] = useState(false);
  const [isPopupShowing, setIsPopupShowing] = useState(false);
  const [isShipUnits, setIsShipUnits] = useState(false);
  const [isCardInfoShowing, setIsCardInfoShowing] = useState(false);
  const [isAddCartPopup, setIsAddCartPopup] = useState(false);

  const toggleShipUnits = useCallback((value) => {
    setIsShipUnits(value);
  }, []);

  const toggleVoucher = useCallback((value) => {
    setIsVoucherShowing(value);
  }, []);

  const togglePopup = useCallback((value) => {
    setIsPopupShowing(value);
  }, []);

  const toggleCardInfo = useCallback((value) => {
    setIsCardInfoShowing(value);
  }, []);

  const toggleIsAddCardPopup = useCallback((value) => {
    setIsAddCartPopup(value);
  }, []);

  return {
    isVoucherShowing,
    toggleVoucher,
    isPopupShowing,
    togglePopup,
    isShipUnits,
    toggleShipUnits,
    isCardInfoShowing,
    toggleCardInfo,
    isAddCartPopup,
    toggleIsAddCardPopup,
  };
};
export default useModal;
