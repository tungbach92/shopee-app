import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { BrowserRouter as Router } from "react-router-dom";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material";
import UserProvider from "./context/UserProvider.js";
import CartProvider from "./context/CartProvider.js";
import ProductsProvider from "./context/ProductsProvider.js";
import "./sass/style.scss";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <UserProvider>
          <ProductsProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </ProductsProvider>
        </UserProvider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
