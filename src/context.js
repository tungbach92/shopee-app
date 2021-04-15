import React, { Component } from 'react'

export const ProductContext = React.createContext();
export const ProductConsumer = ProductContext.Consumer;
export default class ProductProvider extends Component {
    state = {}; // json server->fetch data to here and pass to value of Provider component
    render() {
        return (
            <ProductContext.Provider value="hello">
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}
