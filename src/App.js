import "./css/reset.css";
import "./css/base.css";
import "./css/main.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import Footer from "./components/Footer";
import { Route, Routes, Navigate } from "react-router-dom";
import Cart from "./pages/Cart";
import Detail from "./pages/Detail";
import Error from "./pages/Error";
import Account from "./pages/Account";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { ProductContext } from "./context";
import Search from "./pages/Search";

//Lazy load product page
const Product = React.lazy(() => import("./pages/Product"));
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY_TEST);

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/" element={<Product />}></Route>
          <Route exact path="/cart" element={<Cart />}></Route>
          <Route
            exact
            path="/product/:metaTitle/:id"
            element={<Detail />}
          ></Route>
          <Route
            exact
            path="/user"
            element={<Navigate to="/user/account/"></Navigate>}
          ></Route>
          <Route
            path="/user/account/*"
            element={
              <Elements stripe={stripePromise}>
                <Account />
              </Elements>
            }
          ></Route>
          <Route
            exact
            path="/checkout"
            element={
              <Elements stripe={stripePromise}>
                <Checkout />
              </Elements>
            }
          ></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/search" element={<Search />}></Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
      <Footer></Footer>
    </>
  );
}
export default App;
