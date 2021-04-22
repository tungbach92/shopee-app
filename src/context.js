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
  }; // json server->fetch data to here and pass to value of Provider component

  componentDidMount = async () => {
    let items = await this.getData();
    this.setState({
      items,
    });
    this.filterCategoryProduct();
    this.filterProduct();
    let defaultPageIndex = 1; // set = pageIndex in component pagination
  };

  getData = async () => {
    try {
      const response = await fetch(itemsApi);
      const items = await response.json();
      const itemsWithID = await this.addItemId(items);
      return itemsWithID;
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

  handleClick = (event) => {
    // console.log(event.currentTarget.parentElement);
    const value = event.currentTarget.dataset.value;
    const name = event.currentTarget.dataset.name;
    if (name === "filterPrice") {
      event.currentTarget.parentElement.style.display = "none";
    }
    //
    // console.log(event.currentTarget.childNodes);
    // event.currentTarget.removeChild(event.currentTarget.childNodes);
    // event.currentTarget.classList.remove("app__input-item--active");

    // event.currentTarget.classList.add("app__input-item--active");
    // event.currentTarget.innerHTML += `<i class="app__input-item-icon bi bi-check"></i>`;
    if (name === "type") {
      this.setState(
        { [name]: value, filter: "popular", filterPrice: "default" },
        this.filterCategoryProduct
      );
    }
    if (name === "filter") {
      this.setState(
        { [name]: value, filterPrice: "default" },
        this.filterProduct
      );
    }
    if (name === "filterPrice") {
      this.setState({ [name]: value }, this.filterProduct);
    }
  };

  filterCategoryProduct = () => {
    let { items, sortedItems, type } = this.state;
    let tempItems = [...items];
    //filter by category
    if (type !== "allProduct") {
      tempItems = tempItems.filter((item) => item.type === type);
    }
    //change state
    this.setState({
      sortedItems: tempItems,
      categoryItems: tempItems,
    });
    console.log(sortedItems);
  };

  filterProduct = () => {
    let {
      categoryItems,
      filter,
      filterPrice,
    } = this.state;
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
        tempItems = [...tempItems].sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
      }
      // priceDescFilter
      if (filterPrice === "priceDesc" && tempItems.length !== 1) {
        tempItems = [...tempItems].sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
      }
    }

    //change state
    this.setState({ sortedItems: tempItems });
  };
  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleClick: this.handleClick,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}
