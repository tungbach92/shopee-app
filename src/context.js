import React, { Component } from "react";

export const ProductContext = React.createContext();
export const ProductConsumer = ProductContext.Consumer;
const itemsApi = "http://localhost:3000/items";
export default class ProductProvider extends Component {
  state = {
    tempItems: [], // tempItems : [...items] tham tri den items
    categoryItems: [], // items sort theo category
    sortedItems: [], // items sort theo popular, new, price
    today: new Date(),
    defaultPageIndex: 1,
    bestSelling: 20,
  }; // json server->fetch data to here and pass to value of Provider component

  async componentDidMount() {
    let tempItems = await this.getData();
    let sortedItems = [...tempItems];
    let categoryItems = [...sortedItems];
    let defaultPageIndex = 1; // set = pageIndex in component pagination
    this.setState({
      tempItems,
      sortedItems,
      categoryItems,
      defaultPageIndex,
    });
  }

  async getData() {
    try {
      const response = await fetch(itemsApi);
      const items = await response.json();
      const itemsWithID = await this.addItemId(items);
      return itemsWithID;
    } catch (error) {
      console.log(error);
    }
  }

  //add id cho item
  async addItemId(items) {
    items.forEach((item, index) => {
      item.id = index;
    });
    return items;
  }

  render() {
    return (
      <ProductContext.Provider value={this.state}>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}
