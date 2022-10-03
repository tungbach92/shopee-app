import "./css/reset.css";
import "./css/base.css";
import "./css/main.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import Footer from "./components/Footer";
import { Route, Routes, Navigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { Suspense } from "react";
import { ClipLoader } from "react-spinners";
import useCheckPhotoURL from "./hooks/useCheckPhotoURL";
import UserProvider from "./context/UserProvider";
import SearchProvider from "./context/SearchProvider";

//Lazy load page
const Product = React.lazy(() => import("./pages/Product"));
const Cart = React.lazy(() => import("./pages/Cart"));
const Checkout = React.lazy(() => import("./pages/CheckOut"));
const Detail = React.lazy(() => import("./pages/Detail"));
const Account = React.lazy(() => import("./pages/Account"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const Search = React.lazy(() => import("./pages/Search"));
const Error = React.lazy(() => import("./pages/Error"));
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY_TEST);

function App() {
  // const { user } = useProduct();
  // useCheckPhotoURL(user);
  return (
    <>
      <Suspense
        fallback={
          <div className="app__no-product">
            <ClipLoader color="var(--primary-color)" />
          </div>
        }
      >
        <Routes>
          <Route
            path="/"
            element={
              <SearchProvider>
                <Product />
              </SearchProvider>
            }
          ></Route>
          <Route
            path="/search"
            element={
              <SearchProvider>
                <Search />
              </SearchProvider>
            }
          ></Route>
          <Route
            path="/cart"
            element={
              <SearchProvider>
                <Cart />
              </SearchProvider>
            }
          ></Route>
          <Route
            path="/product/:metaTitle/:productId"
            element={
              <SearchProvider>
                <Detail />
              </SearchProvider>
            }
          ></Route>
          <Route
            path="/user"
            element={<Navigate to="/user/account/" replace></Navigate>}
          ></Route>
          <Route
            path="/user/account/*"
            element={
              <Elements stripe={stripePromise}>
                <SearchProvider>
                  <Account />
                </SearchProvider>
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
          {/* <Route path="/admin" element={<Admin />}></Route> */}
          <Route
            path="*"
            element={
              <SearchProvider>
                <Error />
              </SearchProvider>
            }
          />
        </Routes>
      </Suspense>
      <Footer></Footer>
    </>
  );
}
export default App;
