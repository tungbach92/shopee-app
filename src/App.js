import "./css/reset.css";
import "./css/base.css";
import "./css/main.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import Footer from "./components/Footer";
import Product from "./pages/Product";
import { Route, Switch, Redirect } from "react-router-dom";
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
import React, { useContext } from "react";
import { ProductContext } from "./context";
const stripePromise = loadStripe(
  "pk_test_51JB5XCLveZMOamkE7YBOsq6C9xFH3NM26c3UGHpbZe1cYnPgUYaYNUGJQ8cT5d60ZYwCoFMlBA2WeHwLjjRfLPAh00R3vOY9JQ"
);

function App() {
  console.log("app render");
  const { user } = useContext(ProductContext);

  return (
    <>
      <Switch>
        <Route exact path="/" component={Product}></Route>
        <Route exact path="/cart">
          {user ? <Cart /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/product/:metaTitle" component={Detail}></Route>
        <Route exact path="/account" component={Account}>
          {user ? <Account /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/checkout">
          {user ? (
            <Elements stripe={stripePromise}>
              <Checkout />
            </Elements>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/user/order">
          {user ? <Order /> : <Redirect to="/login" />}
        </Route>
        <Route component={Error} />
      </Switch>
      <Footer></Footer>
    </>
  );
}
export default App;
