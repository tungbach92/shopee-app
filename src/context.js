import React, { Component } from "react";
import { auth, db, storage } from "./firebase";
import axios from "./axios";
import visaImg from "./img/visa.png";
import masterImg from "./img/master.png";
import jcbImg from "./img/jcb.png";
import expressImg from "./img/express.png";
import _ from "lodash";
export const ProductContext = React.createContext();
export const ProductConsumer = ProductContext.Consumer;
const itemsApi = "http://localhost:3000/items";

export default class ProductProvider extends Component {
  state = {
    items: [],
    categoryItemsFiltered: [], // items sort
    similarItems: [],
    categoryItems: [], // category
    searchItems: [], // search
    searchItemFiltered: [],
    today: new Date(),
    defaultPageIndex: 1,
    bestSelling: 1000,
    category: "allProduct",
    filter: "all",
    filterPrice: "default",
    pageIndex: 1,
    pageSize: 10,
    pageTotal: 0,
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
      { code: "FREE", discount: "100%" },
      { code: "SALE50", discount: "50%" },
      { code: "SALE100000", discount: "100000" },
    ],
    shipPriceProvince: [0, 0],
    orderItems: null,
    user: null,
    userAvatar: null,
    shipInfos: null,
    paymentMethodList: null,
    defaultPaymentMethodID: "",
    customerID: "",
    loading: false,
    cartItemsLoading: false,
    authorized: null,
  }; // json server->fetch data to here and pass to value of Provider component

  componentDidMount() {
    console.log("provider mount");
    this.getDataFireBase();
    this.setUser(() => {
      this.setOrderItems();
      this.setUserAvatar();
      this.getShipInfos();
      this.getCustomerIdFromFirebase();
      this.setCartItemsFromFirebase();
      this.setSearchHistoryFromFirebase();
    });
    console.log(this.state.items);
  }

  setAuthorized = (authorized) => {
    this.setState({ authorized });
  };

  setLoading = (loading) => {
    this.setState({ loading });
  };

  setCategory = (category) => {
    this.setState({ category });
  };

  setFilterPrice = (filterPrice) => {
    this.setState({ filterPrice }, () => {
      this.filterCategoryItems();
      this.filterSearchItems();
    });
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
        console.log("detach payment method successfully");
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
        .then((res) => {
          console.log(res.data.customer);
          console.log("update billing success");
        })
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
        });
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
      try {
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
                .then(() => {
                  console.log("Document successfully written!");
                });
            }
            db.collection("users")
              .doc(user?.uid)
              .collection("shipInfos")
              .doc("shipInfoDoc") // TO DO: need to create document shipInfoDoc before update shipInfoDoc
              .update({
                shipInfos: shipInfos,
              })
              .then(() => {
                console.log("update shipInfo successfully!");
                this.setState({ shipInfos });
              });
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  getShipInfos = () => {
    const user = this.state.user;
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("shipInfos")
        .doc("shipInfoDoc")
        .onSnapshot((doc) => {
          if (doc.exists) {
            const shipInfos = doc.data().shipInfos;
            this.setState({ shipInfos });
          } else {
            this.setState({ shipInfos: [] });
          }
        });
    }
  };

  setUserAvatar = () => {
    const user = this.state.user;
    let userAvatar = "";
    if (user) {
      const storageRef = storage.ref(`users/${user.uid}/avatar`);
      storageRef
        .getDownloadURL()
        .then((downloadURL) => {
          userAvatar = downloadURL;
          this.setState({ userAvatar });
        })
        .catch((error) => {
          // 404
          this.setState({ userAvatar });
        });
    }
  };

  setSearchInput = (searchInput) => {
    this.setState({ searchInput });
  };
  setSearchItemFiltered = (searchItemFiltered) => {
    this.setState({ searchItemFiltered });
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
      console.log(result);
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

  setUser = (cb) => {
    auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if (authUser) {
        //user will log in or logged in
        this.setState({ user: authUser }, cb);
        this.setAuthorized(true);
        // cartItems = this.getCartItemsFromFirebase(authUser);
      } else {
        //user logged out
        this.setState({ user: null });
        this.setAuthorized(false);
      }
    });
  };

  setOrderItems = () => {
    let { user } = this.state;
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        //using onsnapshot for get all updated documents in the collection
        .onSnapshot(
          (snapshot) => {
            this.setState({
              orderItems: snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              })),
            });
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      this.setState({ orderItems: [] });
    }
  };

  setCartNumb = (cartNumb) => {
    this.setState({ cartNumb });
  };

  setCheckoutItems = (checkoutItems) => {
    this.setState({ checkoutItems }, this.saveCheckoutItemsToStorage);
  };

  setCartItems = (cartItems) => {
    this.setState({ cartItems }, this.saveCartItemsToStorage);
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

  setChecked = (checked) => {
    this.setState({ checked });
  };

  setCustomerInfo = (name, phone, address) => {
    this.setState({ name, phone, address });
  };
  /**
   * It goes to {@link componentDidMount}
   * TODO refactor this
   */
  getDataFireBase = async () => {
    try {
      let items = [];
      this.setLoading(true);
      db.collection("products").onSnapshot(
        (querySnapshot) => {
          items = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          this.setState({ items });
          this.setLoading(false);

          // onError((err) => alert(err));
        }
        // (err) => alert(err)
      );
    } catch (error) {
      alert(error);
      this.setLoading(false);
    }
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

  filterItemsBySearch = (text) => {
    text = text.trim().toLowerCase();
    if (text.length > 0) {
      const { items } = this.state;
      const searchItems = [...items].filter((item) =>
        item.name.toLowerCase().includes(text)
      );
      this.setState({
        searchItems,
        filter: "",
        filterPrice: "default",
      });
    }
  };

  handleClick = (event, item) => {
    console.log(event);
    const value = event.currentTarget.dataset.value;
    const name = event.currentTarget.dataset.name;
    const id = event.currentTarget.dataset.id;
    const variation = event.currentTarget.dataset.variation;

    if (name === "category") {
      this.setState(
        { [name]: value, filter: "all", filterPrice: "default" },
        this.filterItemsByCategory
      );
      // set category filter filterPrice state, and categoryItemsFiltered categoryItem pageIndex after state mutate
      // co the viet vao day duoi dang dinh nghi callback func nhung can reused lai o ngoai
    }
    if (name === "filter") {
      this.setState({ [name]: value, filterPrice: "default" }, () => {
        this.filterCategoryItems();
        this.filterSearchItems();
      });
    }
    if (name === "filterPrice") {
      this.setFilterPrice(value);
    }

    if (name === "addToCartBtn") {
      this.addToCartItems(id)(item)(() => {
        this.saveCartItemsToStorage();
      });
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
      this.setState({ searchHistory: uniqueSearchHistory }, () => {
        this.saveSearchHistoryToStorage(uniqueSearchHistory);
      });
    }
  };

  saveSearchHistoryToStorage = () => {
    const { searchHistory } = this.state;
    localStorage.setItem(
      "searchHistory",
      JSON.stringify(searchHistory === null ? [] : searchHistory)
    );
  };

  getSearchHistoryFromStorage = () => {
    let savedSearchHistory = localStorage.getItem("searchHistory");
    return savedSearchHistory === null ? [] : JSON.parse(savedSearchHistory);
  };

  saveSearchHistoryToFirebase = async (searchHistory) => {
    const { user } = this.state;
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
    if (this.getSearchHistoryFromStorage().length > 0) {
      searchHistory = this.getSearchHistoryFromStorage();
      this.setState({ searchHistory });
    } else {
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
    }
  };

  addToCartItems = (id) => (item) => (callback) => {
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

    this.setState(
      {
        cartItems: cartItemsUpdated,
        cartNumb: this.calcCartNumb(cartItemsUpdated),
      },
      callback
    );
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
        cartNumb: this.calcCartNumb(cartItems),
      },
      () => {
        this.saveCartItemsToStorage();
        if (cartItems.length === 0) {
          this.saveCartItemsToFirebase(cartItems);
        }
        this.saveCheckoutItemsToStorage();
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
          (cartItem) => !_.isEqual(cartItem, checkedItem)
        ))
    );

    this.setState(
      {
        cartItems,
        cartNumb: this.calcCartNumb(cartItems),
      },
      () => {
        if (cartItems.length === 0) {
          this.saveCartItemsToFirebase(cartItems);
        }
        this.saveCartItemsToStorage();
        this.saveCheckoutItemsToStorage();
      }
    );
  };

  changeAmountCartItem = (id, variation, amount) => {
    const { cartItems } = this.state;
    let item = cartItems.find(
      (item) => item.id === id && item.variation === variation
    );
    item.amount = amount;
    const cartNumb = this.calcCartNumb(cartItems);
    this.setCartNumb(cartNumb);
    this.setCartItems(cartItems);
  };

  incrCartItem = (id, variation) => {
    const { cartItems } = this.state;
    const indexOfItem = cartItems.findIndex(
      (item) => item.id === id && item.variation === variation
    );
    cartItems[indexOfItem].amount++;
    const cartNumb = this.calcCartNumb(cartItems);
    this.setCartNumb(cartNumb);
    this.setCartItems(cartItems);
  };

  decrCartItem = (id, variation) => {
    const { cartItems } = this.state;
    let item = cartItems.find(
      (item) => item.id === id && item.variation === variation
    );
    item.amount <= 1 ? (item.amount = 1) : item.amount--;
    const cartNumb = this.calcCartNumb(cartItems);
    this.setCartNumb(cartNumb);
    this.setCartItems(cartItems);
  };

  setCheckoutItemsByChecked = (checked) => {
    let checkoutItems = checked.map((checkedItem) => {
      // return checkedItem without uneccessary field
      const { similarDisPlay, variationDisPlay, ...rest } = checkedItem;
      return rest;
    });
    this.setState({ checkoutItems }, this.saveCheckoutItemsToStorage);
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

  filterItemsByCategory = () => {
    //get categoryItemsFiltered by category using items
    const { items, category } = this.state;
    let tempItems = [...items];
    //filter by category
    if (category !== "allProduct") {
      tempItems = tempItems.filter((item) => item.category === category);
    }
    //change state
    this.setState({
      categoryItems: tempItems,
      categoryItemsFiltered: tempItems,
    });
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

  filterCategoryItems = () => {
    //get categoryItemsFiltered by filter using categoryItems
    let { categoryItems } = this.state;
    this.filterCommonItems(categoryItems, "categoryItemsFiltered");
  };

  filterSearchItems = () => {
    //get categoryItemsFiltered by filter using searchItems
    let { searchItems } = this.state;
    this.filterCommonItems(searchItems, "searchItemFiltered");
  };

  filterCommonItems = (commonItems, name) => {
    //get categoryItemsFiltered by filter using searchItems
    let { filter, filterPrice } = this.state;
    let filterCommonItems = [...commonItems];
    //filter by filter
    if (filter === "all") {
      filterCommonItems = [...commonItems];
    }

    // Best Selling Filter
    if (filter === "bestSelling") {
      filterCommonItems = filterCommonItems.filter(
        (item) => item.soldAmount >= this.state.bestSelling
      );
    }

    // Date Filter
    let newestDays = 30;
    let oneDayinMs = 24 * 60 * 60 * 1000;
    if (filter === "date") {
      filterCommonItems = filterCommonItems.filter(
        (item) =>
          Math.floor(new Date(item.date).valueOf() / oneDayinMs) >
          Math.floor(new Date().valueOf() / oneDayinMs) - newestDays
      );
    }

    //price filter
    if (filterPrice !== "default") {
      // priceAscFilter
      if (filterPrice === "priceAsc" && filterCommonItems.length !== 1) {
        filterCommonItems = filterCommonItems.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
      }
      // priceDescFilter
      if (filterPrice === "priceDesc" && filterCommonItems.length !== 1) {
        filterCommonItems = filterCommonItems.sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
      }
    }

    //change state
    this.setState({
      [name]: filterCommonItems,
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
    this.setState({ cartItems }, this.saveCartItemsToStorage);
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
    try {
      const { user } = this.state;
      const created = Date.now();
      cartItems = cartItems.map((item) => {
        const { similarDisPlay, variationDisPlay, ...rest } = item;
        return rest;
      });
      db.collection("users")
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
    let cartItems = [];
    this.setState({ cartItemsLoading: false });
    const { user } = this.state;
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
    try {
      const { user } = this.state;
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

  setCheckoutItemsFromFirebase = () => {
    let checkoutItems = [];
    const { user } = this.state;
    this.setLoading(true);
    if (this.getCheckoutItemsFromStorage().length > 0) {
      checkoutItems = this.getCheckoutItemsFromStorage();
      this.setCheckoutItems(checkoutItems);
      this.setLoading(false);
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
          this.setLoading(false);
        })
        .catch((err) => {
          alert(err);
          this.setLoading(false);
        });
    }
  };

  handleLogout = async () => {
    const { user, cartItems, checkoutItems, searchHistory } = this.state;
    if (user) {
      this.saveCartItemsToFirebase(cartItems);
      await this.saveSearchHistoryToFirebase(searchHistory);
      this.saveCheckoutItemsToFirebase(checkoutItems);
      this.setCartItems([]);
      this.setCheckoutItems([]);
      this.setSearchInput("");
      this.setState({ searchHistory: [] }, this.saveSearchHistoryToStorage);
      this.setOrderItems();
      this.setPaymentMethodList([]);
      this.setDefaultPaymentMethodID("");
      this.setShipInfos([]);
      this.setUserAvatar();
      this.setCustomerID("");
      auth.signOut();
    }
  };

  // const handlePhoneChange = (e) => {
  //   e.target.value = e.target.value
  //     .replace(/[^0-9.]/g, "")
  //     .replace(/(\..*)\./g, "$1");
  //   setPhone(e.target.value);
  // };

  render() {
    console.log("provider render");
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          setUser: this.setUser,
          handleClick: this.handleClick,
          filterItemsBySearch: this.filterItemsBySearch,
          addToSearchHistory: this.addToSearchHistory,
          changeVariationDisPlayCartItems: this.changeVariationDisPlayCartItems,
          changeCartItemsVariation: this.changeCartItemsVariation,
          changeSimilarDisPlayCartItems: this.changeSimilarDisPlayCartItems,
          delCartItem: this.delCartItem,
          delCartItems: this.delCartItems,
          saveCartItemsToStorage: this.saveCartItemsToStorage,
          saveCheckoutItemsToStorage: this.saveCheckoutItemsToStorage,
          setCheckoutItemsByChecked: this.setCheckoutItemsByChecked,
          setCustomerInfo: this.setCustomerInfo,
          setVoucher: this.setVoucher,
          setShipPriceProvince: this.setShipPriceProvince,
          setCategoryItems: this.setCategoryItems,
          setCategoryItemsFiltered: this.setCategoryItemsFiltered,
          setPageIndex: this.setPageIndex,
          setPageTotal: this.setPageTotal,
          setCartItems: this.setCartItems,
          calcCartNumb: this.calcCartNumb,
          getCartItemsFromStorage: this.getCartItemsFromStorage,
          setCartNumb: this.setCartNumb,
          getCheckoutItemsFromStorage: this.getCheckoutItemsFromStorage,
          setCheckoutItems: this.setCheckoutItems,
          setOrderItems: this.setOrderItems,
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
          setSearchItemFiltered: this.setSearchItemFiltered,
          setSearchInput: this.setSearchInput,
          setUserAvatar: this.setUserAvatar,
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
          setLoading: this.setLoading,
          setCustomerID: this.setCustomerID,
          setDefaultPaymentMethodID: this.setDefaultPaymentMethodID,
          setAuthorized: this.setAuthorized,
          getShipInfos: this.getShipInfos,
          handleLogout: this.handleLogout,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}
