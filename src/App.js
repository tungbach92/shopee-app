import "./css/reset.css";
import "./css/base.css";
import "./css/main.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import Footer from "./components/Footer";
import { Route, Routes, Navigate } from "react-router-dom";
import Detail from "./pages/Detail";
import Error from "./pages/Error";
import Account from "./pages/Account";
import Checkout from "./pages/CheckOut";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { Suspense } from "react";
import Search from "./pages/Search";
import Admin from "./pages/Admin";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material";
import { ClipLoader } from "react-spinners";

//Lazy load product page
const Product = React.lazy(() => import("./pages/Product"));
const Cart = React.lazy(() => import("./pages/Cart"));
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY_TEST);

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Suspense
          fallback={
            <div className="app__no-product">
              <ClipLoader color="var(--primary-color)" />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Product />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route
              path="/product/:metaTitle/:productId"
              element={<Detail />}
            ></Route>
            <Route
              path="/user"
              element={<Navigate to="/user/account/" replace></Navigate>}
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
              path="/checkout"
              element={
                <Elements stripe={stripePromise}>
                  <Checkout />
                </Elements>
              }
            ></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/search" element={<Search />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
        <Footer></Footer>
      </ThemeProvider>
    </>
  );
}
export default App;
