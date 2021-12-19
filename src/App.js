import "./css/reset.css";
import "./css/base.css";
import "./css/main.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import Footer from "./components/Footer";
import { Route, Switch, Redirect } from "react-router-dom";
import Cart from "./pages/Cart";
import Detail from "./pages/Detail";
import Error from "./pages/Error";
import Account from "./features/Account";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { ProductContext } from "./context";
import Search from "./features/Search";

//Lazy load product page
const Product = React.lazy(() => import("./features/Product"));
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY_TEST);

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Product}></Route>
          <Route exact path="/cart" component={Cart}></Route>
          <Route
            exact
            path="/product/:metaTitle/:id"
            component={Detail}
          ></Route>
          <Redirect exact from="/user" to="/user/account"></Redirect>
          <Route path="/user/account">
            <Elements stripe={stripePromise}>
              <Account />
            </Elements>
          </Route>
          <Route exact path="/checkout">
            <Elements stripe={stripePromise}>
              <Checkout />
            </Elements>
          </Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/search" component={Search}></Route>
          <Route component={Error} />
        </Switch>
      </Suspense>
      <Footer></Footer>
    </>
  );
}
export default App;
