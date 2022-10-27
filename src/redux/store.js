import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cartSlice";

const rootReducer = {
  cart: cartReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});
