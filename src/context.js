import React, { Component } from "react";

export const ProductContext = React.createContext();
export const ProductConsumer = ProductContext.Consumer;
const itemsApi = "http://localhost:3000/items";
export default class ProductProvider extends Component {
  state = {
    items: [],
    sortedItems: [], // items sort
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
    cartNumb: 0,
    cartItems: [],
    searchInput: "",
    searchHistory: [],
  }; // json server->fetch data to here and pass to value of Provider component

  componentDidMount = async () => {
    //get and filter
    const items = await this.getData();
    this.setState({
      items,
    });
    this.categoryProduct();
    this.filterCategoryProduct();
    //get and set state cartItems
    const cartItems = this.getCartItemsFromStorage();
    this.setState({
      cartItems: this.getCartItemsFromStorage(),
      cartNumb: this.calcCartNumb(cartItems),
    });
  };

  getData = async () => {
    try {
      const response = await fetch(itemsApi);
      const items = await response.json();
      const itemsWithID = await this.addItemId(items);
      const itemsWithVariationDisPlay = await this.addVariationDisplayProp(
        itemsWithID
      );
      return itemsWithVariationDisPlay;
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

  addVariationDisplayProp = async (items) => {
    items.forEach((item, index) => {
      item.variationDisPlay = false;
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

  calcCartNumb = (items) => {
    let cartNumb = 0;
    items.forEach((item) => {
      cartNumb += item.amount;
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
      this.setState(
        {
          sortedItems,
          categoryItems: sortedItems,
          searchInput: text,
          type: "allProduct",
          filter: "popular",
          filterPrice: "default",
          pageIndex: 1,
          pageTotal: this.calcPageTotals(sortedItems),
        },
        () => {
          console.log(this.state.sortedItems);
        }
      );
    }
  };

  handleClick = (event) => {
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
      this.setState({ [name]: parseInt(value) });
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
    if (name === "addToCartBtn") {
      this.addToCartItems(id, this.saveCartItemsToStorage);
    }
    if (name === "delCartBtn") {
      this.delCartItem(id, this.saveCartItemsToStorage);
    }
    if (name === "incrCartItem") {
      this.incrCartItem(id, this.saveCartItemsToStorage);
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

  addToCartItems = (id, callback) => {
    const { items, cartItems } = this.state;
    const tempItems = [...items];
    let item = tempItems.find((item) => item.id === Number(id));
    item = { ...item, amount: 1 };
    let cartItemsModified = [...cartItems, item];
    this.setState(
      {
        cartItems: cartItemsModified,
        cartNumb: this.calcCartNumb(cartItemsModified),
      },
      callback
    );
  };

  delCartItem = (id, callback) => {
    const { cartItems } = this.state;
    let items = cartItems.filter((item) => item.id !== Number(id));
    this.setState(
      {
        cartItems: items,
        cartNumb: this.calcCartNumb(items),
      },
      callback
    );
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

  saveCartItemsToStorage = () => {
    const { cartItems } = this.state;
    localStorage.setItem("product", JSON.stringify(cartItems));
  };

  getCartItemsFromStorage = () => {
    let savedCartItems = localStorage.getItem("product");
    return savedCartItems === null ? [] : JSON.parse(savedCartItems);
  };

  categoryProduct = () => {
    let { items, type } = this.state;
    let tempItems = [...items];
    //filter by category
    if (type !== "allProduct") {
      tempItems = tempItems.filter((item) => item.type === type);
    }
    //change state
    this.setState({
      sortedItems: tempItems,
      categoryItems: tempItems,
      pageIndex: 1,
      pageTotal: this.calcPageTotals(tempItems),
    });
  };

  filterCategoryProduct = () => {
    let { categoryItems, filter, filterPrice } = this.state;
    let tempItems = [...categoryItems];
    //filter by filter
    if (filter === "popular") {
      tempItems = tempItems.filter(
        (item) =>
          new Date(item.date).getDate() > this.state.today.getDate() - 20 ||
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
        (item) =>
          new Date(item.date).getDate() > this.state.today.getDate() - 20
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

  changeVariationDisPlayCartItems = (index, event) => {
    let { cartItems } = this.state;
    const { name } = event.currentTarget.dataset;
    if (name === "variation") {
      let items = cartItems.filter((item) => cartItems.indexOf(item) !== index);
      items.forEach((item) => {
        item.variationDisPlay = false;
      });
      cartItems[index].variationDisPlay = !cartItems[index].variationDisPlay;
      this.setState({ cartItems });
    }
  };
  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleClick: this.handleClick,
          filterProductBySearch: this.filterProductBySearch,
          addToSearchHistory: this.addToSearchHistory,
          changeVariationDisPlayCartItems: this.changeVariationDisPlayCartItems,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}
