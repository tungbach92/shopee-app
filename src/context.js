import React, { Component } from "react";
import { auth, db, storage } from "./firebase";
import _ from "lodash";
import axios from "./axios";
import cimbImg from "./img/ic_cimb_bank@4x.png";
import mbImg from "./img/ic_MBBank@4x.png";
import visaImg from "./img/visa.png";
import masterImg from "./img/master.png";
import jcbImg from "./img/jcb.png";
import expressImg from "./img/express.png";
export const ProductContext = React.createContext();
export const ProductConsumer = ProductContext.Consumer;
const itemsApi = "http://localhost:3000/items";

export default class ProductProvider extends Component {
  state = {
    items: [],
    sortedItems: [], // items sort
    similarItems: [],
    categoryItems: [], // category
    searchItems: [], // search
    sortedSearchItems: [],
    today: new Date(),
    defaultPageIndex: 1,
    bestSelling: 10,
    type: "allProduct",
    filter: "",
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
      { code: "FREEFORALL", discount: "100%" },
      { code: "LUNARSALE", discount: "50%" },
      { code: "CHRISTMASSALE", discount: "100000" },
    ],
    shipPriceProvince: [0, 0],
    orderItems: [],
    user: null,
    userAvatar: null,
    shipInfos: [],
    paymentMethodList: [],
    defaultPaymentMethodID: "",
    customerID: "",
  }; // json server->fetch data to here and pass to value of Provider component

  componentDidMount() {
    console.log("provider mount");
    this.setUser(() => {
      this.setOrderItems();
      this.setUserAvatar();
      this.getShipInfos();
      this.getCustomerIdFromFirebase();
    });
  }

  setType = (type) => {
    this.setState({ type });
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

  updateDefaultPaymentMethodIDToFirebase = (paymentMethodID) => {
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
    this.setState({ paymentMethodList });
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
        this.setState({ paymentMethodList });
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
    const { customerID, paymentMethodList, defaultPaymentMethodID, user } =
      this.state;
    if (customerID && paymentMethodList && defaultPaymentMethodID) {
      let defaultshipInfo, userName;

      // paymentMethodList.forEach((item) => {
      //   if (item.id === defaultPaymentMethodID) {
      //     cardName = item.billing_details.name;
      //   }
      // });

      tempShipInfos.forEach((item) => {
        if (item.isDefault) {
          defaultshipInfo = { ...item };
        }
      });

      const getUserNameDocsAsync = () => {
        return db
          .collection("users")
          .doc(user?.uid)
          .collection("infos")
          .doc("infoItems")
          .get();
      };
      const userNameDocs = await getUserNameDocsAsync();
      if (userNameDocs) {
        userName = userNameDocs.data().name;
      }

      axios({
        method: "POST",
        url: "/update-customer-billing-address",
        data: {
          customerID: customerID,
          userName: userName,
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
          }
        });
    }
  };

  setShipInfos = (shipInfos) => {
    this.setState({ shipInfos });
  };

  updateShipInfoToFirebase = (shipInfos) => {
    const user = this.state.user;
    if (user) {
      try {
        db.collection("users")
          .doc(user?.uid)
          .collection("shipInfos")
          .doc("shipInfoDoc")
          .update({
            shipInfos: shipInfos,
          })
          .then(() => {
            console.log("update shipInfo successfully!");
            this.setState({ shipInfos });
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
          }
        });
    }
  };

  setUserAvatar = () => {
    const user = this.state.user;
    if (user) {
      const userAvatar = user.photoURL;
      this.setState({ userAvatar });
    }
  };

  searchInputOnChange = (event) => {
    this.setState({ searchInput: event.currentTarget.value });
  };

  setSearchInput = (searchInput) => {
    this.setState({ searchInput });
  };
  setSortedSearchItems = (sortedSearchItems) => {
    this.setState({ sortedSearchItems });
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
        // cartItems = this.getCartItemsFromFirebase(authUser);
      } else {
        //user logged out
        this.setState({ user: null });
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

  setCheckoutProduct = (checkoutItems) => {
    this.setState({ checkoutItems }, this.saveCheckoutItemsToStorage);
  };

  setCartProduct = (cartItems) => {
    this.setState({ cartItems }, this.saveCartItemsToStorage);
  };

  setPageTotal = (pageTotal) => {
    this.setState({ pageTotal });
  };

  setPageIndex = (pageIndex) => {
    this.setState({ pageIndex });
  };

  setCategoryProduct = (categoryItems) => {
    this.setState({ categoryItems });
  };

  setSortedProducts = (sortedItems) => {
    this.setState({ sortedItems });
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

  setDefaultChecked = () => {
    let { checkoutItems, cartItems } = this.state;
    let defaultChecked = [];
    const unmodifiedCartItems = cartItems.map((item) => {
      const { similarDisPlay, variationDisPlay, ...rest } = item;
      return rest;
    });
    if (
      (checkoutItems.length > 0 || cartItems.length > 0) &&
      _.isEqual(checkoutItems, unmodifiedCartItems)
    ) {
      defaultChecked = unmodifiedCartItems.map((item) => true);
      defaultChecked = [true, ...defaultChecked, true];
    } else {
      defaultChecked = unmodifiedCartItems.map((cartItem) => {
        let result = false;
        checkoutItems.forEach((checkoutItem) => {
          if (_.isEqual(cartItem, checkoutItem)) {
            result = true;
          }
        });
        return result;
      });
      // defaultChecked = cartItems.map((item) => false);
      defaultChecked = [false, ...defaultChecked, false];
    }
    this.setChecked(defaultChecked);
  };

  getData = async () => {
    try {
      const response = await fetch(itemsApi);
      const items = await response.json();
      const itemsWithID = await this.addItemId(items);
      const itemsWithMetaTitle = await this.addMetaTitleProp(itemsWithID);
      const finalItems = await this.addVariationProp(itemsWithMetaTitle);
      this.setState({ items: finalItems });
    } catch (error) {
      console.log(error);
    }
  };

  getDataFireBase = async () => {
    try {
      let items = [];
      db.collection("products").onSnapshot((snapshot) => {
        snapshot.docs.forEach((doc) => {
          items = [...items, ...doc.data().items];
          items = items.sort((a, b) => {
            return new Date(a.date) - new Date(b.date); //sort by date ascending
          });
          this.setState({ items });
        });
      });
    } catch (error) {
      alert(error);
    }
  };

  //add id cho item
  addItemId = async (items) => {
    items.forEach((item, index) => {
      item.id = index;
    });
    return items;
  };

  addVariationProp = async (items) => {
    items.forEach((item) => {
      switch (item.type) {
        case "shirt":
          item.variationList = ["M", "L", "XL"];
          break;
        case "set":
          item.variationList = ["M", "L"];
          break;
        case "bag":
          item.variationList = ["S", "M", "L"];
          break;
        case "shoe":
          item.variationList = ["38", "39", "40", "41"];
          break;
        case "accessories":
          item.variationList = ["M", "L", "XL"];
          break;
        default:
          item.variationList = ["M", "L", "XL"];
          break;
      }
    });
    return items;
  };

  addVariationSimilarDisplayProp = async (items) => {
    items.forEach((item) => {
      item.variationDisPlay = false;
      item.similarDisPlay = false;
    });
    return items;
  };

  addMetaTitleProp = async (items) => {
    items.forEach((item) => {
      item.metaTitle = item.name
        .toLowerCase()
        .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
        .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
        .replace(/ì|í|ị|ỉ|ĩ/g, "i")
        .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
        .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
        .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
        .replace(/đ/g, "d")
        .replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "")
        .replace(/\u02C6|\u0306|\u031B/g, "")
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");
    });
    return items;
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

  filterProductBySearch = (text) => {
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

    if (name === "type") {
      this.setState(
        { [name]: value, filter: "", filterPrice: "default" },
        this.categoryProduct
      );
      // set type filter filterPrice state, and sortedItems categoryItem pageIndex after state mutate
      // co the viet vao day duoi dang dinh nghi callback func nhung can reused lai o ngoai
    }
    if (name === "filter") {
      this.setState({ [name]: value, filterPrice: "default" }, () => {
        this.filterCategoryProduct();
        this.filterSearchProduct();
      });
    }
    if (name === "filterPrice") {
      this.setState({ [name]: value }, () => {
        this.filterCategoryProduct();
        this.filterSearchProduct();
      });
      event.currentTarget.parentElement.style.display = "none";
    }

    if (name === "addToCartBtn") {
      this.addToCartItems(id, item, () => {
        this.setDefaultChecked(); // provider render
        this.saveCartItemsToStorage();
      });
    }

    if (name === "delCartBtn") {
      this.delCartItem(id);
    }
    if (name === "incrCartItem") {
      this.incrCartItem(id, this.saveCartItemsToStorage);
    }

    if (name === "inputAmount") {
      event.target.value = event.target.value
        .replace(/[^0-9.]/g, "")
        .replace(/(\..*)\./g, "$1");
      const value = event.target.value;
      this.changeAmountCartItem(id, value, this.saveCartItemsToStorage);
    }
    if (name === "decrCartItem") {
      this.decrCartItem(id, this.saveCartItemsToStorage);
    }
  };

  addToSearchHistory = (text) => {
    let { searchHistory } = this.state;
    searchHistory = [...searchHistory, text];
    this.setState({ searchHistory });
  };

  addToCartItems = (id, item, callback) => {
    let { items, cartItems } = this.state;
    const tempItems = [...items];
    let cartItemsModified = [];
    let existItems = cartItems.find((cartItem) => cartItem.id === Number(id));

    if (!item) {
      let item = tempItems.find((item) => item.id === Number(id));
      item = {
        ...item,
        amount: 1,
        variation: "",
        variationDisPlay: false,
        similarDisPlay: false,
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
    this.setState(
      {
        cartItems: cartItemsModified,
        cartNumb: this.calcCartNumb(cartItemsModified),
      },
      callback
    );
  };

  delCartItem = (id) => {
    let { cartItems } = this.state;
    cartItems = cartItems.filter((item) => item.id !== Number(id));
    this.setState(
      {
        cartItems,
        cartNumb: this.calcCartNumb(cartItems),
      },
      () => {
        this.saveCartItemsToStorage();
        if (cartItems.length === 0) {
          this.saveCartItemsToFirebase(this.state.user, cartItems);
        }
        this.saveCheckoutItemsToStorage();
        this.setDefaultChecked();
      }
    );
  };

  delCartItems = (idArr) => {
    if (idArr.length > 0) {
      let { cartItems } = this.state;
      // idArr.forEach((id) => {
      //   cartItems = cartItems.filter((item) => item.id !== Number(id));
      // });
      cartItems = cartItems.filter(
        (item, index) => idArr.indexOf(item.id) === -1
      );
      this.setState(
        {
          cartItems,
          cartNumb: this.calcCartNumb(cartItems),
        },
        () => {
          if (cartItems.length === 0) {
            this.saveCartItemsToFirebase(this.state.user, cartItems);
          }
          this.saveCartItemsToStorage();
          this.saveCheckoutItemsToStorage();
          this.setDefaultChecked();
        }
      );
    }
  };

  changeAmountCartItem = (id, amount, callback) => {
    const { cartItems } = this.state;
    let item = cartItems.find((item) => item.id === Number(id));
    item.amount = amount;
    const cartNumb = this.calcCartNumb(cartItems);
    this.setState({ cartNumb }, callback);
  };

  incrCartItem = (id, callback) => {
    const { cartItems } = this.state;
    let item = cartItems.find((item) => item.id === Number(id));
    item.amount++;
    const cartNumb = this.calcCartNumb(cartItems);
    this.setState({ cartNumb }, callback);
  };

  decrCartItem = (id, callback) => {
    const { cartItems } = this.state;
    let item = cartItems.find((item) => item.id === Number(id));
    item.amount <= 1 ? (item.amount = 1) : item.amount--;
    const cartNumb = this.calcCartNumb(cartItems);
    this.setState({ cartNumb }, callback);
  };

  setCheckoutItemsByChecked = () => {
    //
    const { checked, cartItems } = this.state;
    const lastIndex = cartItems.length + 1;
    let checkoutItems = checked.map((checkItem, index) => {
      if (checkItem === true && index > 0 && index < lastIndex) {
        // return cartItems[index-1] without uneccessary field
        const { similarDisPlay, variationDisPlay, ...rest } =
          cartItems[index - 1];
        return rest;
      } else return null;
    });
    checkoutItems = checkoutItems.filter((item) => item !== null);
    this.setState({ checkoutItems }, this.saveCheckoutItemsToStorage);
  };

  saveCheckoutItemsToStorage = () => {
    const { checkoutItems } = this.state;
    localStorage.setItem("checkoutProduct", JSON.stringify(checkoutItems));
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

  categoryProduct = () => {
    //get sortedItems by type using items
    const { items, type } = this.state;
    let tempItems = [...items];
    //filter by category
    if (type !== "allProduct") {
      tempItems = tempItems.filter((item) => item.type === type);
    }
    //change state
    this.setState({
      categoryItems: tempItems,
      sortedItems: tempItems,
    });
  };

  similarProduct = () => {
    const { items, type } = this.state;
    let tempItems = [...items];
    //filter by category
    if (type !== "allProduct") {
      tempItems = tempItems.filter((item) => item.type === type);
    }
    //change state
    this.setState({
      similarItems: tempItems,
    });
  };

  filterCategoryProduct = () => {
    //get sortedItems by filter using categoryItems
    let { categoryItems, filter, filterPrice } = this.state;
    let tempItems = [...categoryItems];
    //filter by filter
    if (filter === "popular") {
      tempItems = tempItems.filter(
        (item) =>
          new Date(item.date).getDate() > new Date().getDate() - 20 ||
          item.soldAmount >= this.state.bestSelling
      );
    }

    // Best Selling Filter
    if (filter === "bestSelling") {
      tempItems = tempItems.filter(
        (item) => item.soldAmount >= this.state.bestSelling
      );
    }

    // Date Filter
    if (filter === "date") {
      tempItems = tempItems.filter(
        (item) => new Date(item.date).getDate() > new Date().getDate() - 20
        // (item) => item.date.getDate() > today.getDate() - 20
      );
    }

    //price filter
    if (filterPrice !== "default") {
      // priceAscFilter
      if (filterPrice === "priceAsc" && tempItems.length !== 1) {
        tempItems = tempItems.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
      }
      // priceDescFilter
      if (filterPrice === "priceDesc" && tempItems.length !== 1) {
        tempItems = tempItems.sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
      }
    }

    //change state
    this.setState({
      sortedItems: tempItems,
    });
  };

  filterSearchProduct = () => {
    //get sortedItems by filter using searchItems
    let { searchItems, filter, filterPrice } = this.state;
    let tempItems = [...searchItems];
    //filter by filter
    if (filter === "popular") {
      tempItems = tempItems.filter(
        (item) =>
          new Date(item.date).getDate() > new Date().getDate() - 20 ||
          item.soldAmount >= this.state.bestSelling
      );
    }

    // Best Selling Filter
    if (filter === "bestSelling") {
      tempItems = tempItems.filter(
        (item) => item.soldAmount >= this.state.bestSelling
      );
    }

    // Date Filter
    if (filter === "date") {
      tempItems = tempItems.filter(
        (item) => new Date(item.date).getDate() > new Date().getDate() - 20
        // (item) => item.date.getDate() > today.getDate() - 20
      );
    }

    //price filter
    if (filterPrice !== "default") {
      // priceAscFilter
      if (filterPrice === "priceAsc" && tempItems.length !== 1) {
        tempItems = tempItems.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
      }
      // priceDescFilter
      if (filterPrice === "priceDesc" && tempItems.length !== 1) {
        tempItems = tempItems.sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
      }
    }

    //change state
    this.setState({
      sortedSearchItems: tempItems,
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
    cartItems[index] = { ...cartItems[index], variation: variation };
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
    const type = cartItems[index].type;
    this.setState({ cartItems: newCartItems, type }, this.similarProduct);
  };

  saveCartItemsToFirebase = async (user, cartItems) => {
    try {
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

  setCartItemsFromFirebase = (user) => {
    let cartItems = [];
    if (this.getCartItemsFromStorage().length > 0) {
      cartItems = this.getCartItemsFromStorage();
      cartItems = cartItems.map((item) => ({
        ...item,
        similarDisPlay: false,
        variationDisPlay: false,
      }));
      this.setState({ cartItems });
    } else {
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
          this.setState({ cartItems });
        })
        .catch((err) => alert(err));
    }
  };

  saveCheckoutItemsToFirebase = async (user, checkoutItems) => {
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

  setCheckoutItemsFromFirebase = (user) => {
    let checkoutItems = [];
    if (this.getCheckoutItemsFromStorage().length > 0) {
      checkoutItems = this.getCheckoutItemsFromStorage();
      this.setState({ checkoutItems });
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
          this.setState({ checkoutItems });
        })
        .catch((err) => alert(err));
    }
  };

  render() {
    console.log("provider render");
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          setUser: this.setUser,
          setDefaultChecked: this.setDefaultChecked,
          handleClick: this.handleClick,
          filterProductBySearch: this.filterProductBySearch,
          addToSearchHistory: this.addToSearchHistory,
          changeVariationDisPlayCartItems: this.changeVariationDisPlayCartItems,
          changeCartItemsVariation: this.changeCartItemsVariation,
          changeSimilarDisPlayCartItems: this.changeSimilarDisPlayCartItems,
          delCartItems: this.delCartItems,
          saveCartItemsToStorage: this.saveCartItemsToStorage,
          saveCheckoutItemsToStorage: this.saveCheckoutItemsToStorage,
          setCheckoutItemsByChecked: this.setCheckoutItemsByChecked,
          setChecked: this.setChecked,
          setCustomerInfo: this.setCustomerInfo,
          setVoucher: this.setVoucher,
          setShipPriceProvince: this.setShipPriceProvince,
          getData: this.getData,
          setCategoryProduct: this.setCategoryProduct,
          setSortedProducts: this.setSortedProducts,
          setPageIndex: this.setPageIndex,
          setPageTotal: this.setPageTotal,
          setCartProduct: this.setCartProduct,
          calcCartNumb: this.calcCartNumb,
          getCartItemsFromStorage: this.getCartItemsFromStorage,
          setCartNumb: this.setCartNumb,
          getCheckoutItemsFromStorage: this.getCheckoutItemsFromStorage,
          setCheckoutProduct: this.setCheckoutProduct,
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
          setSortedSearchItems: this.setSortedSearchItems,
          searchInputOnChange: this.searchInputOnChange,
          setSearchInput: this.setSearchInput,
          setUserAvatar: this.setUserAvatar,
          setShipInfos: this.setShipInfos,
          updateShipInfoToFirebase: this.updateShipInfoToFirebase,
          updateCustomerIdToFirebase: this.updateCustomerIdToFirebase,
          setPaymentMethodList: this.setPaymentMethodList,
          getPaymentMethodList: this.getPaymentMethodList,
          updateDefaultPaymentMethodIDToFirebase:
            this.updateDefaultPaymentMethodIDToFirebase,
          getCardImgByBrand: this.getCardImgByBrand,
          detachPaymentMethod: this.detachPaymentMethod,
          updateCustomerBillingAddress: this.updateCustomerBillingAddress,
          setOrderPageTotal: this.setOrderPageTotal,
          setOrderPageIndex: this.setOrderPageIndex,
          pageTotalCalc: this.pageTotalCalc,
          setPageSize: this.setPageSize,
          setFilter: this.setFilter,
          setFilterPrice: this.setFilterPrice,
          setType: this.setType,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}
