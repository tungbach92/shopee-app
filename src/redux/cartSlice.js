import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  quantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProducts: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.totalPrice += action.payload.price * action.payload.amount;
    },
    updateProducts: (state, action) => {
      state.products = action.payload;
      state.totalPrice += action.payload.price * action.payload.amount;
    },
  },
});

export const { addProducts, updateProducts } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
