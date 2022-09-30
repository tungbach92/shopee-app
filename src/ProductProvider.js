import React, { Component, useContext } from "react";
import { auth, db } from "./firebase";
import axios from "./axios";
import visaImg from "./img/visa.png";
import masterImg from "./img/master.png";
import jcbImg from "./img/jcb.png";
import expressImg from "./img/express.png";
import { isEqual } from "lodash";

export const ProductContext = React.createContext();
export function useProduct() {
  return useContext(ProductContext);
}

export default class ProductProvider extends Component {
  state = {
    items: [],
    similarItems: [],

    defaultPageIndex: 1,
    pageIndex: 1,
    pageSize: 10,
    pageTotal: 0,

    cartItems: [],
    cartItemsLoading: false,
    voucher: {},
    voucherList: [
      { code: "FREE", discount: "100%" },
      { code: "SALE50", discount: "50%" },
      { code: "SALE100000", discount: "100000" },
    ],

    checkoutItems: [],
    shipPriceProvince: [0, 0],
    shipInfos: null,
    paymentMethodList: null,
    defaultPaymentMethodID: "",

    searchHistory: [],

    user: null,
    userLoading: false,
    customerID: "",
    authorized: null,
  }; // json server->fetch data to here and pass to value of Provider component
  oneDayinMs = 24 * 3600 * 1000;
  sessionExpinSec = this.oneDayinMs / 1000;
  currentTimeinMs = new Date().valueOf();

  componentDidMount() {
    // this.getDataFireBase();
    //onAuthStateChanged Observer for only user's signed-in signed out state.
    //onIdTokenChanged.check Observer trigger if signed-in signed out, firebase auto changes id token
    this.setUserLoading(true);
    this.unsubscribeUserObserver = auth.onIdTokenChanged((authUser) => {
      this.setUserLoading(false);
      if (authUser) {
        //user will log in or logged in
        this.setState({ user: authUser });
        this.checkFirebaseIdTokenAuthTime();
        this.getShipInfos();
        this.getCustomerIdFromFirebase();
        this.setCartItemsFromFirebase();
        this.setSearchHistoryFromFirebase();
        this.setAuthorized(true);
        // cartItems = this.getCartItemsFromFirebase(authUser);
      } else {
        //user logged out
        this.setState({ user: null });
        this.setAuthorized(false);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeUserObserver();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchHistory !== prevState.searchHistory) {
      this.saveSearchHistoryToFirebase(this.state.searchHistory);
    }
    if (this.state.cartItems !== prevState.cartItems) {
      this.saveCartItemsToStorage();
    }
    if (this.state.checkoutItems !== prevState.checkoutItems) {
      this.saveCheckoutItemsToStorage();
    }
  }

  checkFirebaseIdTokenAuthTime = async () => {
    const { user } = this.state;
    if (!user) return;
    try {
      //revoke id token if expired
      // const idToken = await auth.currentUser.getIdToken(
      //   /* forceRefresh */ false
      // );
      const idToken = this.state.user._lat;
      const result = await axios({
        method: "POST",
        url: "/verify-id-token-by-firebase",
        data: { idToken },
      });
      if (result.data.revoked) {
        // never be called cause idToken auto refresh after 1 hour by fỉrebase sdk unless manual refresh
        alert("Id Token refreshed. Vui lòng đăng nhập lại!");
        this.handleLogout();
      }
      if (result.data.invalid) {
        alert("Token's invalid. Vui lòng đăng nhập lại!");
        this.handleLogout();
      }
      if (result.data.succeeded) {
        const idToken = result.data.idToken;
        const authTime = idToken.auth_time; //auth time stay the same after idToken revoked
        if (
          Math.floor(this.currentTimeinMs / 1000) - authTime >=
          this.sessionExpinSec
        ) {
          alert(`Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!`);
          this.handleLogout();
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };

  setCategorySearchItems = (categorySearchItems) => {
    this.setState({ categorySearchItems });
  };

  setAuthorized = (authorized) => {
    this.setState({ authorized });
  };

  setProductLoading = (productLoading) => {
    this.setState({ productLoading });
  };

  setUserLoading = (userLoading) => {
    this.setState({ userLoading });
  };

  setCategory = (category) => {
    this.setState({ category });
  };

  setFilterPrice = (filterPrice) => {
    this.setState({ filterPrice });
  };

  setFilter = (filter) => {
    this.setState({ filter });
  };

  setPageSize = (pageSize) => {
    this.setState({ pageSize });
  };

  setOrderPageIndex = (orderPageIndex) => {
    this.setState({ orderPageIndex });
  };

  setOrderPageTotal = (orderPageTotal) => {
    this.setState({ orderPageTotal });
  };

  getCardImgByBrand = (brand) => {
    if (brand === "visa") {
      return visaImg;
    }
    if (brand === "american Express") {
      return expressImg;
    }
    if (brand === "mastercard") {
      return masterImg;
    }
    if (brand === "jcb") {
      return jcbImg;
    }
  };

  setDefaultPaymentMethodID = (defaultPaymentMethodID) => {
    this.setState({ defaultPaymentMethodID });
  };

  getDefaultPaymentMethodID = () => {
    const customerID = this.state.customerID;
    if (customerID) {
      axios({
        method: "POST",
        url: "/retrieve-customer-by-id",
        data: { customerID: customerID },
      }).then((res) => {
        let defaultPaymentMethodID =
          res.data.customer.invoice_settings.default_payment_method;
        defaultPaymentMethodID = defaultPaymentMethodID
          ? defaultPaymentMethodID
          : res.data.customer.default_source;
        this.setState({ defaultPaymentMethodID });
      });
    }
  };

  updateDefaultPaymentMethodIDToStripe = (paymentMethodID) => {
    const customerID = this.state.customerID;
    if (customerID) {
      axios({
        method: "POST",
        url: "/update-customer-payment-method",
        data: {
          customerID: customerID,
          paymentMethodID: paymentMethodID,
        },
      }).then((res) => {
        let defaultPaymentMethodID =
          res.data.customer.invoice_settings.default_payment_method;
        // defaultPaymentMethodID = defaultPaymentMethodID
        //   ? defaultPaymentMethodID
        //   : res.data.customer.default_source;
        this.setState({ defaultPaymentMethodID });
      });
    }
  };

  setPaymentMethodList = (paymentMethodList) => {
    this.setState({ paymentMethodList }, () => {
      if (paymentMethodList.length === 1) {
        this.setDefaultPaymentMethodID(paymentMethodList[0].id);
      }
    });
  };

  getPaymentMethodList = () => {
    const customerID = this.state.customerID;
    if (customerID) {
      axios({
        method: "POST",
        url: "/get-payment-method-list",
        data: { customerID: customerID },
      }).then((res) => {
        const paymentMethodList = res.data.paymentMethodList;
        this.setPaymentMethodList(paymentMethodList);
      });
    }
  };

  detachPaymentMethod = (paymentMethodID) => {
    const customerID = this.state.customerID;
    if (customerID) {
      axios({
        method: "POST",
        url: "/detach-payment-method",
        data: { paymentMethodID: paymentMethodID, customerID: customerID },
      }).then((res) => {
        // console.log(res.data.paymentMethod);
        this.getPaymentMethodList();
      });
    }
  };

  setCustomerID = (customerID) => {
    this.setState({ customerID });
  };

  updateCustomerIdToFirebase = (customerID) => {
    const user = this.state.user;
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .set({
          customerID: customerID,
        })
        .then(() => {
          this.setState({ customerID });
        });
    }
  };

  updateCustomerBillingAddress = async (tempShipInfos) => {
    const { customerID, paymentMethodList, defaultPaymentMethodID } =
      this.state;
    if (customerID && paymentMethodList && defaultPaymentMethodID) {
      let defaultshipInfo;
      let cardName = "";

      paymentMethodList.forEach((item) => {
        if (item.id === defaultPaymentMethodID) {
          cardName = item.billing_details.name;
        }
      });

      tempShipInfos.forEach((item) => {
        if (item.isDefault) {
          defaultshipInfo = { ...item };
        }
      });

      axios({
        method: "POST",
        url: "/update-customer-billing-address",
        data: {
          customerID: customerID,
          userName: cardName.length > 0 ? cardName : defaultshipInfo.name,
          shipName: defaultshipInfo.name,
          phone: defaultshipInfo.phone,
          province: defaultshipInfo.province.name,
          district: defaultshipInfo.district.name,
          ward: defaultshipInfo.ward.name,
          street: defaultshipInfo.street,
        },
      })
        .then((res) => {})
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  getCustomerIdFromFirebase = () => {
    const user = this.state.user;
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const customerID = doc.data().customerID;
            if (customerID) {
              this.setState({ customerID }, () => {
                this.getPaymentMethodList();
                this.getDefaultPaymentMethodID();
              });
            }
          } else {
            this.setPaymentMethodList([]);
          }
        })
        .catch((err) => alert(err.message));
    }
  };

  setShipInfos = (shipInfos) => {
    this.setState({ shipInfos }, () => {
      if (shipInfos.length === 1) {
        shipInfos[0].isDefault = true;
      }
    });
  };

  updateShipInfoToFirebase = (shipInfos) => {
    const user = this.state.user;
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("shipInfos")
        .doc("shipInfoDoc")
        .get()
        .then((doc) => {
          if (!doc.exists) {
            db.collection("users")
              .doc(user?.uid)
              .collection("shipInfos")
              .doc("shipInfoDoc")
              .set({ shipInfos: [] })
              .then(() => {});
          }
        })
        .then(() => {
          db.collection("users")
            .doc(user?.uid)
            .collection("shipInfos")
            .doc("shipInfoDoc")
            .update({
              shipInfos: shipInfos,
            });
        })
        .then(() => {
          this.setState({ shipInfos });
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  getShipInfos = () => {
    const user = this.state.user;
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("shipInfos")
        .doc("shipInfoDoc")
        .onSnapshot(
          (doc) => {
            if (doc.exists) {
              const shipInfos = doc.data().shipInfos;
              this.setState({ shipInfos });
            } else {
              this.setState({ shipInfos: [] });
            }
          },
          (err) => alert(err.message)
        );
    }
  };

  setSearchInput = (searchInput) => {
    this.setState({ searchInput });
  };
  setCategorySearchItemsFiltered = (categorySearchItemsFiltered) => {
    this.setState({ categorySearchItemsFiltered });
  };

  setSearchItems = (searchItems) => {
    this.setState({ searchItems });
  };

  getItemsPriceTotal = (items) => {
    const result = items?.reduce(
      (checkoutPriceTotal, item) =>
        checkoutPriceTotal + item.price * item.amount,
      0
    );
    return result ? result : 0;
  };

  getItemsTotal = (items) => {
    const result = items?.reduce(
      (checkoutItemTotal, item) => checkoutItemTotal + item.amount,
      0
    );
    return result ? result : 0;
  };

  getShipPrice = (shipUnit) =>
    Number(shipUnit?.price) ? Number(shipUnit?.price) : 0;

  getSaved = (voucher, checkoutItems) => {
    if (Object.keys(voucher).length > 0) {
      let result = voucher.discount.includes("%")
        ? (this.getItemsPriceTotal(checkoutItems) *
            Number(voucher.discount.slice(0, -1))) /
          100
        : voucher.discount;
      return result;
    } else {
      return 0;
    }
  };

  getItemsPriceFinal = (items, shipUnit, voucher) => {
    let result =
      this.getItemsPriceTotal(items) +
      this.getShipPrice(shipUnit) -
      this.getSaved(voucher, items);
    return result;
  };

  setCheckoutItems = (checkoutItems) => {
    this.setState({ checkoutItems });
  };

  setCartItems = (cartItems) => {
    this.setState({ cartItems });
  };

  setPageTotal = (pageTotal) => {
    this.setState({ pageTotal });
  };

  setPageIndex = (pageIndex) => {
    this.setState({ pageIndex });
  };

  setCategoryItems = (categoryItems) => {
    this.setState({ categoryItems });
  };

  setCategoryItemsFiltered = (categoryItemsFiltered) => {
    this.setState({ categoryItemsFiltered });
  };

  setShipPriceProvince = (shipPriceProvince) => {
    this.setState({ shipPriceProvince });
  };

  setVoucher = (voucher) => {
    this.setState({ voucher });
  };

  /**
   * It goes to {@link componentDidMount}
   */
  getDataFireBase = async () => {
    let items = [];
    this.setProductLoading(true);
    this.unsubscribeProductObserver = db.collection("products").onSnapshot(
      (querySnapshot) => {
        items = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        this.setState({ items });
        this.setProductLoading(false);
      },
      (error) => {
        alert(error.message);
        this.setProductLoading(false);
      }
    );
  };

  pageTotalCalc = (items, pageSize) => {
    const pageTotal =
      Math.ceil(items.length / pageSize) < 1
        ? 1
        : Math.ceil(items.length / pageSize);
    return pageTotal;
  };

  calcCartNumb = (items) => {
    let cartNumb = 0;
    items.forEach((item) => {
      cartNumb += Number(item.amount);
    });
    return cartNumb;
  };

  handleClick = (event, item) => {
    const value = event.currentTarget.dataset.value;
    const name = event.currentTarget.dataset.name;
    const id = event.currentTarget.dataset.id;
    const variation = event.currentTarget.dataset.variation;

    // if (name === "category") {
    //   this.setState(
    //     { [name]: value, filter: "all", filterPrice: "default" },
    //     () => {
    //       this.filterItemsByCategory();
    //       this.filterSearchItemsByCategory();
    //     }
    //   );
    //   // set category filter filterPrice state, and categoryItemsFiltered categoryItem pageIndex after state mutate
    //   // co the viet vao day duoi dang dinh nghi callback func nhung can reused lai o ngoai
    // }
    // if (name === "filter") {
    //   this.setState({ [name]: value, filterPrice: "default" }, () => {
    //     this.filterCategoryItems();
    //     this.filterSearchItems();
    //   });
    // }
    // if (name === "filterPrice") {
    //   this.setFilterPrice(value);
    // }

    if (name === "addToCartBtn") {
      this.addToCartItems(id)(item);
    }

    if (name === "incrCartItem") {
      this.incrCartItem(id, variation);
    }

    if (name === "inputAmount") {
      event.target.value = event.target.value
        .replace(/[^0-9.]/g, "")
        .replace(/(\..*)\./g, "$1");
      const value = Number(event.target.value);
      if (value > 0) {
        this.changeAmountCartItem(id, variation, value);
      }
    }
    if (name === "decrCartItem") {
      this.decrCartItem(id, variation);
    }
  };

  addToSearchHistory = (text) => {
    let { searchHistory } = this.state;
    text = text.trim();
    if (text.length > 0) {
      searchHistory = [...searchHistory, text];
      let uniqueSearchHistory = [...new Set(searchHistory)];
      this.setState({ searchHistory: uniqueSearchHistory });
    }
  };

  deleteFromSearchHistory = (text) => {
    let { searchHistory } = this.state;
    text = text.trim();
    if (text.length > 0) {
      searchHistory = [...searchHistory].filter((item) => item !== text);
      this.setState({ searchHistory });
    }
  };

  saveSearchHistoryToFirebase = async (searchHistory) => {
    const { user } = this.state;
    if (!user) return;
    try {
      await db
        .collection("users")
        .doc(user?.uid)
        .collection("searchHistory")
        .doc("searchHistoryItems")
        .set({
          basket: searchHistory,
        });
    } catch (error) {
      alert(error);
    }
  };
  setSearchHistoryFromFirebase = () => {
    let searchHistory = [];
    const { user } = this.state;
    if (!user) return;
    db.collection("users")
      .doc(user?.uid)
      .collection("searchHistory")
      .doc("searchHistoryItems")
      .get()
      .then((doc) => {
        if (doc.exists) {
          searchHistory = doc.data().basket;
        }
        this.setState({ searchHistory });
      })
      .catch((err) => {
        alert(err);
      });
  };

  addToCartItems = (id) => (item) => {
    let { items, cartItems } = this.state;
    let cartItemsUpdated = [];

    if (!item) {
      let item = items.find((item) => item.id === id);
      item = {
        ...item,
        amount: 1,
        variation: "",
        variationDisPlay: false,
        similarDisPlay: false,
      };
      cartItemsUpdated = [...cartItems, item];
    } else {
      let isExistId = cartItems.some((cartItem) => cartItem.id === item.id);
      let isExistVariation = cartItems.some(
        (cartItem) =>
          cartItem.variation === item.variation && cartItem.id === item.id
      );
      if (isExistId && isExistVariation) {
        cartItemsUpdated = cartItems.map((cartItem) =>
          cartItem.id === item.id && cartItem.variation === item.variation
            ? { ...cartItem, amount: cartItem.amount + item.amount }
            : cartItem
        );
      } else cartItemsUpdated = [...cartItems, item];
    }

    this.setState({
      cartItems: cartItemsUpdated,
    });
  };

  delCartItem = (id, variation) => {
    let { cartItems } = this.state;
    // cartItems = cartItems.filter((item) => item.id !== id);
    const newCartItems = [...cartItems].filter(
      (cartItem) => cartItem.id !== id || cartItem.variation !== variation
    );
    this.setState(
      {
        cartItems: newCartItems,
      },
      () => {
        if (cartItems.length === 0) {
          this.saveCartItemsToFirebase(cartItems);
        }
      }
    );
  };

  delCartItems = (checked) => {
    let { cartItems } = this.state;
    const forCompareChecked = checked.map((checkedItem) => {
      return { ...checkedItem, variationDisPlay: false, similarDisPlay: false };
    });
    forCompareChecked.forEach(
      (checkedItem) =>
        (cartItems = [...cartItems].filter(
          (cartItem) => !isEqual(cartItem, checkedItem)
        ))
    );

    this.setState(
      {
        cartItems,
      },
      () => {
        if (cartItems.length === 0) {
          this.saveCartItemsToFirebase(cartItems);
        }
      }
    );
  };

  changeAmountCartItem = (id, variation, amount) => {
    const { cartItems } = this.state;
    const newCartItems = [...cartItems];
    let item = newCartItems.find(
      (item) => item.id === id && item.variation === variation
    );
    item.amount = amount;
    this.setCartItems(newCartItems);
  };

  incrCartItem = (id, variation) => {
    const { cartItems } = this.state;
    const newCartItems = [...cartItems];
    const indexOfItem = newCartItems.findIndex(
      (item) => item.id === id && item.variation === variation
    );
    newCartItems[indexOfItem].amount++;
    this.setCartItems(newCartItems);
  };

  decrCartItem = (id, variation) => {
    const { cartItems } = this.state;
    const newCartItems = [...cartItems];
    let item = newCartItems.find(
      (item) => item.id === id && item.variation === variation
    );
    item.amount <= 1 ? (item.amount = 1) : item.amount--;
    this.setCartItems(newCartItems);
  };

  setCheckoutItemsByChecked = (checked) => {
    let checkoutItems = checked.map((checkedItem) => {
      // return checkedItem without uneccessary field
      const { similarDisPlay, variationDisPlay, ...rest } = checkedItem;
      return rest;
    });
    this.setState({ checkoutItems });
  };

  saveCheckoutItemsToStorage = () => {
    const { checkoutItems } = this.state;
    localStorage.setItem(
      "checkoutProduct",
      JSON.stringify(checkoutItems === null ? [] : checkoutItems)
    );
  };

  getCheckoutItemsFromStorage = () => {
    let savedCheckoutItems = localStorage.getItem("checkoutProduct");
    return savedCheckoutItems === null ? [] : JSON.parse(savedCheckoutItems);
  };

  saveCartItemsToStorage = () => {
    let { cartItems } = this.state;
    cartItems = cartItems.map((item) => ({
      ...item,
      similarDisPlay: undefined,
      variationDisPlay: undefined,
    }));
    localStorage.setItem("cartProduct", JSON.stringify(cartItems));
  };

  getCartItemsFromStorage = () => {
    let savedCartItems = localStorage.getItem("cartProduct");
    return savedCartItems === null ? [] : JSON.parse(savedCartItems);
  };

  filterItemsBySimilar = () => {
    const { items, category } = this.state;
    let tempItems = [...items];
    //filter by category
    if (category !== "allProduct") {
      tempItems = tempItems.filter((item) => item.category === category);
    }
    //change state
    this.setState({
      similarItems: tempItems,
    });
  };

  changeVariationDisPlayCartItems = (index) => {
    let { cartItems } = this.state;

    let items = cartItems.filter((item) => cartItems.indexOf(item) !== index);
    items.forEach((item) => {
      item.variationDisPlay = false;
    });
    cartItems[index] = {
      ...cartItems[index],
      variationDisPlay: !cartItems[index].variationDisPlay,
    };
    this.setState({ cartItems });
  };

  changeCartItemsVariation = (variation, index) => {
    let { cartItems } = this.state;
    cartItems[index] = { ...cartItems[index], variation };
    this.setState({ cartItems });
  };

  changeSimilarDisPlayCartItems = (index) => {
    const { cartItems } = this.state;
    const newCartItems = [...cartItems];

    let items = newCartItems.filter(
      (item) => newCartItems.indexOf(item) !== index
    );
    items.forEach((item) => {
      item.similarDisPlay = false;
    });

    newCartItems[index] = {
      ...newCartItems[index],
      similarDisPlay: !cartItems[index].similarDisPlay,
    };
    const category = cartItems[index].category;
    this.setState(
      { cartItems: newCartItems, category },
      this.filterItemsBySimilar
    );
  };

  saveCartItemsToFirebase = async (cartItems) => {
    const { user } = this.state;
    if (!user) return;
    try {
      const created = Date.now();
      cartItems = cartItems.map((item) => {
        const { similarDisPlay, variationDisPlay, ...rest } = item;
        return rest;
      });
      await db
        .collection("users")
        .doc(user?.uid)
        .collection("cart")
        .doc("cartItems")
        .set({
          basket: cartItems,
          created: created,
        });
    } catch (error) {
      alert(error);
    }
  };

  setCartItemsFromFirebase = () => {
    const { user } = this.state;
    if (!user) return;

    let cartItems = [];
    if (this.getCartItemsFromStorage().length > 0) {
      cartItems = this.getCartItemsFromStorage();
      cartItems = cartItems.map((item) => ({
        ...item,
        similarDisPlay: false,
        variationDisPlay: false,
      }));
      this.setCartItems(cartItems);
    } else {
      this.setState({ cartItemsLoading: true });
      db.collection("users")
        .doc(user?.uid)
        .collection("cart")
        .doc("cartItems")
        .get()
        .then((doc) => {
          if (doc.exists) {
            cartItems = doc.data().basket;
            cartItems = cartItems.map((item) => ({
              ...item,
              similarDisPlay: false,
              variationDisPlay: false,
            }));
          }
          this.setCartItems(cartItems);
          this.setState({ cartItemsLoading: false });
        })
        .catch((err) => {
          this.setState({ cartItemsLoading: false });
          alert(err);
        });
    }
  };

  saveCheckoutItemsToFirebase = async (checkoutItems) => {
    const { user } = this.state;
    if (!user) return;
    try {
      const created = Date.now();
      db.collection("users")
        .doc(user?.uid)
        .collection("checkout")
        .doc("checkoutItems")
        .set({
          basket: checkoutItems,
          created: created,
        });
    } catch (error) {
      alert(error);
    }
  };

  setCheckoutItemsFromFirebase = async () => {
    let checkoutItems = [];
    const { user } = this.state;
    if (this.getCheckoutItemsFromStorage().length > 0) {
      checkoutItems = this.getCheckoutItemsFromStorage();
      this.setCheckoutItems(checkoutItems);
    } else {
      db.collection("users")
        .doc(user?.uid)
        .collection("checkout")
        .doc("checkoutItems")
        .get()
        .then((doc) => {
          if (doc.exists) {
            checkoutItems = doc.data().basket;
          }
          this.setCheckoutItems(checkoutItems);
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  handleLogout = () => {
    const { user, cartItems, checkoutItems, searchHistory } = this.state;
    if (user) {
      this.saveCartItemsToFirebase(cartItems);
      this.setState({ searchHistory: [] });
      this.saveSearchHistoryToFirebase(searchHistory);
      this.saveCheckoutItemsToFirebase(checkoutItems);
      this.setCartItems([]);
      this.setCheckoutItems([]);
      this.setSearchInput("");
      this.setPaymentMethodList([]);
      this.setDefaultPaymentMethodID("");
      this.setShipInfos([]);
      this.setCustomerID("");
      auth.signOut();
    }
  };

  render() {
    const value = {
      ...this.state,
      handleClick: this.handleClick,
      addToSearchHistory: this.addToSearchHistory,
      changeVariationDisPlayCartItems: this.changeVariationDisPlayCartItems,
      changeCartItemsVariation: this.changeCartItemsVariation,
      changeSimilarDisPlayCartItems: this.changeSimilarDisPlayCartItems,
      delCartItem: this.delCartItem,
      delCartItems: this.delCartItems,
      saveCartItemsToStorage: this.saveCartItemsToStorage,
      setCheckoutItemsByChecked: this.setCheckoutItemsByChecked,
      setVoucher: this.setVoucher,
      setShipPriceProvince: this.setShipPriceProvince,
      setCategoryItems: this.setCategoryItems,
      setCategoryItemsFiltered: this.setCategoryItemsFiltered,
      setPageIndex: this.setPageIndex,
      setPageTotal: this.setPageTotal,
      setCartItems: this.setCartItems,
      calcCartNumb: this.calcCartNumb,
      setCheckoutItems: this.setCheckoutItems,
      getItemsPriceTotal: this.getItemsPriceTotal,
      getItemsTotal: this.getItemsTotal,
      getShipPrice: this.getShipPrice,
      getSaved: this.getSaved,
      getItemsPriceFinal: this.getItemsPriceFinal,
      getDataFireBase: this.getDataFireBase,
      saveCartItemsToFirebase: this.saveCartItemsToFirebase,
      setCartItemsFromFirebase: this.setCartItemsFromFirebase,
      saveCheckoutItemsToFirebase: this.saveCheckoutItemsToFirebase,
      setCheckoutItemsFromFirebase: this.setCheckoutItemsFromFirebase,
      setSearchItems: this.setSearchItems,
      setCategorySearchItems: this.setCategorySearchItems,
      setCategorySearchItemsFiltered: this.setCategorySearchItemsFiltered,
      setSearchInput: this.setSearchInput,
      setShipInfos: this.setShipInfos,
      updateShipInfoToFirebase: this.updateShipInfoToFirebase,
      updateCustomerIdToFirebase: this.updateCustomerIdToFirebase,
      setPaymentMethodList: this.setPaymentMethodList,
      getPaymentMethodList: this.getPaymentMethodList,
      updateDefaultPaymentMethodIDToStripe:
        this.updateDefaultPaymentMethodIDToStripe,
      getCardImgByBrand: this.getCardImgByBrand,
      detachPaymentMethod: this.detachPaymentMethod,
      updateCustomerBillingAddress: this.updateCustomerBillingAddress,
      setOrderPageTotal: this.setOrderPageTotal,
      setOrderPageIndex: this.setOrderPageIndex,
      pageTotalCalc: this.pageTotalCalc,
      setPageSize: this.setPageSize,
      setFilter: this.setFilter,
      setFilterPrice: this.setFilterPrice,
      setCategory: this.setCategory,
      setProductLoading: this.setProductLoading,
      setCustomerID: this.setCustomerID,
      setDefaultPaymentMethodID: this.setDefaultPaymentMethodID,
      setAuthorized: this.setAuthorized,
      getShipInfos: this.getShipInfos,
      handleLogout: this.handleLogout,
      deleteFromSearchHistory: this.deleteFromSearchHistory,
      setUserLoading: this.setUserLoading,
      saveCheckoutItemsToStorage: this.saveCheckoutItemsToStorage,
      getCartItemsFromStorage: this.getCartItemsFromStorage,
      getCheckoutItemsFromStorage: this.getCheckoutItemsFromStorage,
    };
    return (
      <ProductContext.Provider value={value}>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}
