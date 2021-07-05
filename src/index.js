import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals";
import ProductProvider from "./ProductProvider";
import { initialState } from "./reducer.js";
import reducer from "./reducer.js";
import { BrowserRouter as Router } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <ProductProvider initialState={initialState} reducer={reducer}>
      <Router>
        <App />
      </Router>
    </ProductProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
