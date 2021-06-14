import React, { Component } from "react";

export const ProductContext = React.createContext();
export const ProductConsumer = ProductContext.Consumer;
const itemsApi = "http://localhost:3000/items";
export default class ProductProvider extends Component {
  state = {
    items: [],
    sortedItems: [], // items sort
    similarItems: [],
    categoryItems: [], // category
    today: new Date(),
    defaultPageIndex: 1,
    bestSelling: 20,
    type: "allProduct",
    filter: "popular",
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
    shipUnitList: [
      {
        id: 0,
        name: "Giao Hàng Tiết Kiệm",
        price: "10000",
        date: "4~5 ngày",
        method: "Cho phép Thanh toán khi nhận hàng",
      },
      {
        id: 1,
        name: "JT Express",
        price: "20000",
        date: "2~3 ngày",
        method: "Cho phép Thanh toán khi nhận hàng",
      },
    ],
  }; // json server->fetch data to here and pass to value of Provider component

  componentDidMount = async () => {
    console.log("did Mount");
    //get items
    const items = await this.getData();
    const categoryItems = items.filter((item) => item.type !== this.state.type);
    const sortedItems = categoryItems.filter(
      (item) =>
        new Date(item.date).getDate() > new Date().getDate() - 20 ||
        item.soldAmount >= this.state.bestSelling
    );
    const pageIndex = this.state.pageIndex;
    const pageTotal = this.calcPageTotals(sortedItems);
    //get and set cartItems state
    const cartItems = this.getCartItemsFromStorage();
    const cartNumb = this.calcCartNumb(cartItems);
    //get and set checkoutItems state
    const checkoutItems = this.getCheckoutItemsFromStorage();

    this.setState(
      {
        items,
        categoryItems,
        sortedItems,
        pageIndex,
        pageTotal,
        cartItems,
        cartNumb,
        checkoutItems,
      },
      this.setDefaultChecked
    );
  };

  setVoucher = (voucher) => {
    this.setState({ voucher });
  };

  setChecked = (cheked, callback) => {
    this.setState({ checked: cheked }, callback);
  };

  setCustomerInfo = (name, phone, address) => {
    this.setState({ name, phone, address });
  };

  setDefaultChecked = () => {
    const { checkoutItems, cartItems } = this.state;
    let defaultChecked = [];
    if (checkoutItems.length === cartItems.length) {
      defaultChecked = cartItems.map((item) => true);
      defaultChecked = [true, ...defaultChecked, true];
    } else {
      defaultChecked = cartItems.map((item) => {
        const element = checkoutItems.find((el) => el.id === item.id);
        if (element) {
          return true;
        } else {
          return false;
        }
      });

      defaultChecked = [false, ...defaultChecked, false];
    }
    this.setChecked(defaultChecked);
  };

  setDefaultState = () => {
    //clean function when destroy cartProduct component
    //reset sortItem, dom button, pageIndex, pageTotal, searchInput to default
    this.setState(
      {
        type: "allProduct",
        filter: "popular",
        filterPrice: "default",
        searchInput: "",
      },
      this.categoryProduct
    );
  };

  setDefaultType = () => {
    this.setState({ type: "allProduct" });
  };

  getData = async () => {
    try {
      const response = await fetch(itemsApi);
      const items = await response.json();
      const itemsWithID = await this.addItemId(items);
      const itemsWithMetaTitle = await this.addMetaTitleProp(itemsWithID);
      const itemsWithVariationSimilarDisPlay =
        await this.addVariationSimilarDisplayProp(itemsWithMetaTitle);
      const itemsWithVariation = await this.addVariationProp(
        itemsWithVariationSimilarDisPlay
      );
      return itemsWithVariation;
    } catch (error) {
      console.log(error);
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
          item.variation = "";
          item.variationList = ["M", "L", "XL"];
          break;
        case "set":
          item.variation = "";
          item.variationList = ["M", "L"];
          break;
        case "bag":
          item.variation = "";
          item.variationList = ["S", "M", "L"];
          break;
        case "shoe":
          item.variation = "";
          item.variationList = ["38", "39", "40", "41"];
          break;
        case "accessories":
          item.variation = "";
          item.variationList = ["M", "L", "XL"];
          break;
        default:
          item.variation = "";
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

  calcPageTotals = (items) => {
    const pageTotal =
      Math.ceil(items.length / this.state.pageSize) < 1
        ? 1
        : Math.ceil(items.length / this.state.pageSize);
    return pageTotal;
  };

  calcSimilarPageTotals = (items) => {
    const similarPageTotal =
      Math.ceil(items.length / this.state.similarPageSize) < 1
        ? 1
        : Math.ceil(items.length / this.state.similarPageSize);
    return similarPageTotal;
  };

  calcCartNumb = (items) => {
    let cartNumb = 0;
    items.forEach((item) => {
      cartNumb += Number(item.amount);
    });
    return cartNumb;
  };

  filterProductBySearch = (text) => {
    text = text.trim();
    if (text.length > 0) {
      const { items } = this.state;
      const sortedItems = [...items].filter((item) =>
        item.name.toLowerCase().includes(text)
      );
      this.setState({
        sortedItems,
        categoryItems: sortedItems,
        searchInput: text,
        type: "allProduct",
        filter: "popular",
        filterPrice: "default",
        pageIndex: 1,
        pageTotal: this.calcPageTotals(sortedItems),
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
        { [name]: value, filter: "popular", filterPrice: "default" },
        this.categoryProduct
      );
      // set type filter filterPrice state, and sortedItems categoryItem pageIndex after state mutate
      // co the viet vao day duoi dang dinh nghi callback func nhung can reused lai o ngoai
    }
    if (name === "filter") {
      this.setState(
        { [name]: value, filterPrice: "default" },
        this.filterCategoryProduct
      );
    }
    if (name === "filterPrice") {
      this.setState({ [name]: value }, this.filterCategoryProduct);
      event.currentTarget.parentElement.style.display = "none";
    }

    if (name === "pageIndex") {
      this.setState({
        [name]: parseInt(value),
      });
    }

    if (name === "similarPageIndex") {
      this.setState({
        similarPageIndex: parseInt(value),
      });
    }

    if (name === "pageIndexLeftIcon") {
      const pageIndex =
        this.state.pageIndex - 1 <= 0 ? 1 : this.state.pageIndex - 1;

      this.setState({ pageIndex });
    }
    if (name === "pageIndexRightIcon") {
      const pageIndex =
        this.state.pageIndex + 1 >= this.state.pageTotal
          ? this.state.pageTotal
          : this.state.pageIndex + 1;

      this.setState({ pageIndex });
    }

    if (name === "similarPageIndexLeftIcon") {
      const similarPageIndex =
        this.state.similarPageIndex - 1 <= 0
          ? 1
          : this.state.similarPageIndex - 1;

      this.setState({ similarPageIndex });
    }
    if (name === "similarPageIndexRightIcon") {
      const similarPageIndex =
        this.state.similarPageIndex + 1 >= this.state.similarPageTotal
          ? this.state.similarPageTotal
          : this.state.similarPageIndex + 1;

      this.setState({ similarPageIndex });
    }

    if (name === "addToCartBtn") {
      this.addToCartItems(id, item, () => {
        this.setDefaultChecked(); // provider render
        this.saveCartItemsToStorage();
      });
    }

    if (name === "delCartBtn") {
      this.delCartItem(id, () => {
        this.setDefaultChecked();
        this.saveCartItemsToStorage();
      });
    }
    if (name === "incrCartItem") {
      this.incrCartItem(id, this.saveCartItemsToStorage);
    }

    if (name === "inputAmount") {
      event.target.value = event.target.value
        .replace(/[^1-9.]/g, "")
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
    let modifiedItem = {
      ...item,
      amount: 1,
      shipPriceProvince: 0,
    };
    if (!item) {
      let item = tempItems.find((item) => item.id === Number(id));
      item = {
        ...item,
        amount: 1,
        shipPriceProvince: 0,
      };
      cartItemsModified = [...cartItems, item];
    } else if (existItems) {
      cartItems = cartItems.filter((cartItem) => cartItem.id !== Number(id));
      let newItem = { ...modifiedItem };
      newItem.amount += existItems.amount;
      cartItemsModified = [...cartItems, newItem];
    } else {
      cartItemsModified = [...cartItems, modifiedItem];
    }
    this.setState(
      {
        cartItems: cartItemsModified,
        cartNumb: this.calcCartNumb(cartItemsModified),
      },
      callback
    );
  };

  delCartItem = (id, callback) => {
    let { cartItems } = this.state;
    cartItems = cartItems.filter((item) => item.id !== Number(id));
    this.setState(
      {
        cartItems,
        cartNumb: this.calcCartNumb(cartItems),
      },
      callback
    );
  };

  delCartItems = (idArr, callback) => {
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
        callback
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

  setCheckoutItems = () => {
    //
    const { checked, cartItems } = this.state;
    const lastIndex = cartItems.length + 1;
    let checkoutItems = checked.map((checkItem, index) => {
      if (checkItem === true && index > 0 && index < lastIndex) {
        return cartItems[index - 1];
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
    const { cartItems } = this.state;
    cartItems.forEach((item) => {
      item.variationDisPlay = false;
      item.similarDisPlay = false;
    }); // reset properties first
    localStorage.setItem("product", JSON.stringify(cartItems));
  };

  getCartItemsFromStorage = () => {
    let savedCartItems = localStorage.getItem("product");
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
    const sortedItems = tempItems.filter(
      (item) =>
        new Date(item.date).getDate() > new Date().getDate() - 20 ||
        item.soldAmount >= this.state.bestSelling
    );
    //change state
    this.setState({
      sortedItems,
      categoryItems: tempItems,
      pageIndex: 1,
      pageTotal: this.calcPageTotals(tempItems),
    });
  };

  similarProduct = () => {
    let { items, type } = this.state;
    let tempItems = [...items];
    //filter by category
    if (type !== "allProduct") {
      tempItems = tempItems.filter((item) => item.type === type);
    }
    //change state
    this.setState({
      similarItems: tempItems,
      similarPageIndex: 1,
      similarPageTotal: this.calcSimilarPageTotals(tempItems),
    });
  };

  singleProduct = (metaTitle) => {
    const items = [...this.state.items];
    const item = items.find((item) => item.metaTitle === metaTitle);
    return item;
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
      pageIndex: 1,
      pageTotal: this.calcPageTotals(tempItems),
    });
  };

  changeVariationDisPlayCartItems = (index) => {
    let { cartItems } = this.state;

    let items = cartItems.filter((item) => cartItems.indexOf(item) !== index);
    items.forEach((item) => {
      item.variationDisPlay = false;
    });
    cartItems[index].variationDisPlay = !cartItems[index].variationDisPlay;
    this.setState({ cartItems });
  };

  changeVariation = (variation, index) => {
    let { cartItems } = this.state;
    cartItems[index].variation = variation;
    this.setState({ cartItems });
  };

  changeSimilarDisPlayCartItems = (index) => {
    let { type, cartItems } = this.state;

    let items = cartItems.filter((item) => cartItems.indexOf(item) !== index);
    items.forEach((item) => {
      item.similarDisPlay = false;
    });
    cartItems[index].similarDisPlay = !cartItems[index].similarDisPlay;
    type = cartItems[index].type;
    this.setState({ cartItems, type }, this.similarProduct);
  };

  render() {
    console.log("provider render");
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          setDefaultChecked: this.setDefaultChecked,
          setDefaultType: this.setDefaultType,
          setDefaultState: this.setDefaultState,
          handleClick: this.handleClick,
          filterProductBySearch: this.filterProductBySearch,
          addToSearchHistory: this.addToSearchHistory,
          changeVariationDisPlayCartItems: this.changeVariationDisPlayCartItems,
          changeVariation: this.changeVariation,
          changeSimilarDisPlayCartItems: this.changeSimilarDisPlayCartItems,
          delCartItems: this.delCartItems,
          saveCartItemsToStorage: this.saveCartItemsToStorage,
          setCheckoutItems: this.setCheckoutItems,
          setChecked: this.setChecked,
          setCustomerInfo: this.setCustomerInfo,
          setVoucher: this.setVoucher,
          singleProduct: this.singleProduct,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}
