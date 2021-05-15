import { useState } from "react";

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggleModal(isShowing) {
    setIsShowing(isShowing);
    console.log(isShowing);
  }
  return {
    isShowing,
    toggleModal,
  };
};

export default useModal;
