const initialState = {
  cartItems: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_CART": {
      let cartItems = [...state.cartItems];
      cartItems = cartItems.filter(
        (item) => item.id !== Number(action.id)
      );
      return { ...state, cartItems };
    }
    default:
      return state;
  }
};

export default cartReducer;
