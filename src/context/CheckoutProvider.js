import React, { useContext, useState } from "react";

const CheckoutContext = React.createContext();
export const useCheckoutContext = () => {
  return useContext(CheckoutContext);
};

const CheckoutProvider = ({ children }) => {
  const [checkoutItems, setCheckoutItems] = useState([]);

  const setCheckoutItemsByChecked = (checked) => {
    const checkoutItems = checked.map((checkedItem) => {
      // return checkedItem without uneccessary field
      const { similarDisPlay, variationDisPlay, ...rest } = checkedItem;
      return rest;
    });
    setCheckoutItems(checkoutItems);
  };

  const value = { checkoutItems, setCheckoutItemsByChecked };
  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutProvider;
