import { useState, useCallback } from "react";

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  const toggleModal = useCallback(
    (isShowing) => {
      setIsShowing(isShowing);
    },
    [],
  )
  return {
    isShowing,
    toggleModal,
  };
};
export default useModal;
