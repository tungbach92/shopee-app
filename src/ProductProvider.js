import React, { useReducer } from "react";

// Prepare a global data layer
export const ProductContext = React.createContext();

//Wrap our component and provide the data in value by useReducer
//useRducer return initialState and dispatch func for trigger a function
//reducer with state and action return a new state
export const ProductProvider = ({ initialState, reducer, children }) => {
  <ProductContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </ProductContext.Provider>;
};
