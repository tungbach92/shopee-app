import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals";
import ProductProvider from "./context";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <React.StrictMode>
    <ProductProvider>
      <ReduxProvider store={store}>
        <Router>
          <App />
        </Router>
      </ReduxProvider>
    </ProductProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
