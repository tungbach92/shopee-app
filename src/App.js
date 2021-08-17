import "./css/reset.css";
import "./css/base.css";
import "./css/main.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import Footer from "./components/Footer";
import Product from "./pages/Product";
import { Redirect, Route, Switch } from "react-router-dom";
import Cart from "./pages/Cart";
import Detail from "./pages/Detail";
import Error from "./pages/Error";
import Account from "./pages/Account";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Order from "./pages/Order";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useContext, useEffect } from "react";
import { ProductContext } from "./context";
import Search from "./pages/Search";
import Email from "./pages/Email";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY_TEST);

function App() {
  console.log("app render");
  const { user, setUser } = useContext(ProductContext);
  // useEffect(() => {
  //   if (!user) {
  //     setUser();
  //   }
  // }, [setUser, user]);
  return (
    <>
      <Switch>
        <Route exact path="/" component={Product}></Route>

        <Route exact path="/cart">
          {user ? <Cart /> : <Login />}
        </Route>

        <Route exact path="/product/:metaTitle" component={Detail}></Route>

        <Route path="/user/account/profile">
          {user ? <Account /> : <Login />}
        </Route>
        <Route exact path="/user/account/email">
          {user ? <Email /> : <Login />}
        </Route>
        <Redirect
          exact
          from="/user/account"
          to="/user/account/profile"
        ></Redirect>
        <Redirect exact from="/user" to="/user/account/profile"></Redirect>

        <Route exact path="/checkout">
          {user ? (
            <Elements stripe={stripePromise}>
              <Checkout />
            </Elements>
          ) : (
            <Login />
          )}
        </Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/user/order">
          {user ? <Order /> : <Login />}
        </Route>
        <Route exact path="/search" component={Search}></Route>
        <Route path="/error" component={Error} />
      </Switch>
      <Footer></Footer>
    </>
  );
}
export default App;
