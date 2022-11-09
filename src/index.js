import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { BrowserRouter as Router } from "react-router-dom";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material";
import UserProvider from "./context/UserProvider.js";
import ProductsProvider from "./context/ProductsProvider.js";
import { store } from "./redux/store";
import { Provider } from "react-redux";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <UserProvider>
            <ProductsProvider>
              <App />
            </ProductsProvider>
          </UserProvider>
        </Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
