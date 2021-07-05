export const initialState = {
  items: [],
  sortedItems: [], // items sort
  similarItems: [],
  categoryItems: [], // category
  today: new Date(),
  defaultPageIndex: 1,
  bestSelling: 20,
  type: "allProduct",
  filter: "",
  filterPrice: "default",
  pageIndex: 1,
  pageSize: 10,
  pageTotal: 0,
  similarPageIndex: 1,
  similarPageTotal: 0,
  similarPageSize: 6,
  cartNumb: 0,
  cartItems: [],
  checkoutItems: [],
  searchInput: "",
  searchHistory: [],
  checked: [],
  name: "",
  phone: "",
  address: "",
  voucher: {},
  voucherList: [
    { code: "FREEFORALL", discount: "100%" },
    { code: "LUNARSALE", discount: "50%" },
    { code: "CHRISTMASSALE", discount: "100000" },
  ],
  shipPriceProvince: [0, 0],
  orderItems: [],
};

//reducer run when dispatch is called
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
     
    default:
      return { ...state };
  }
};

export default reducer;

const addToCartItems = (id, item, callback) => {
  let { items, cartItems } = initialState;
  const tempItems = [...items];
  let cartItemsModified = [];
  let existItems = cartItems.find((cartItem) => cartItem.id === Number(id));

  if (!item) {
    let item = tempItems.find((item) => item.id === Number(id));
    item = {
      ...item,
      amount: 1,
      shipPriceProvince: [0, 0],
    };
    cartItemsModified = [...cartItems, item];
  } else if (existItems) {
    cartItems = cartItems.filter((cartItem) => cartItem.id !== Number(id));
    let newItem = { ...item };
    newItem.amount += existItems.amount;
    cartItemsModified = [...cartItems, newItem];
  } else {
    cartItemsModified = [...cartItems, item];
  }
  
  return {
    ...state,
    cartItems: [...state.cartItems, action.item],
  };
  this.setState(
    {
      cartItems: cartItemsModified,
      cartNumb: this.calcCartNumb(cartItemsModified),
    },
    callback
  );
};
