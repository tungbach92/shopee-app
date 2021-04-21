import React, { Component } from "react";

export const ProductContext = React.createContext();
export const ProductConsumer = ProductContext.Consumer;
const itemsApi = "http://localhost:3000/items";
export default class ProductProvider extends Component {
  state = {
    items: [],
    sortedItems: [], // items sort 
    today: new Date(),
    defaultPageIndex: 1,
    bestSelling: 20,
    type: "allProduct",
    filter: "popular",
  }; // json server->fetch data to here and pass to value of Provider component

  componentDidMount = async () => {
    let items = await this.getData();
    let sortedItems = [...items];
    let categoryItems = [...sortedItems];
    let defaultPageIndex = 1; // set = pageIndex in component pagination
    this.setState({
      items,
      sortedItems,
      categoryItems,
      defaultPageIndex,
    });
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

  handleEvent = (event) => {
    console.log(event);
    const value = event.currentTarget.dataset.value;
    const name = event.currentTarget.dataset.name;
    this.setState({ [name]: value }, this.filterProduct);
  };

  filterProduct = () => {
    let {
      items,
      sortedItems,
      today,
      defaultPageIndex,
      bestSelling,
      category,
      type,
      filter,
    } = this.state;
    let tempItems = [...items];
    //filter by category
    if (type !== "allProduct") {
      tempItems = tempItems.filter((item) => item.type === type);
    }
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
        (item) => item.date.getDate() > today.getDate() - 20
        // (item) => new Date(item.date).getDate() > this.today.getDate() - 20
      );
    }

    // Price filter
    if (filter === "price") {
      if (tempItems.length === 1) {
        return;
      }
      // priceAscFilter
      tempItems = tempItems.sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
      // priceDescFilter
      tempItems = tempItems.sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price)
      );
    }

    //change state
    this.setState({ sortedItems: tempItems });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{ ...this.state, handleEvent: this.handleEvent }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}
