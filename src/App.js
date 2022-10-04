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
import ProductsProviderLayout from "./context/ProductsProviderLayout";
import SearchProviderLayout from "./context/SearchProviderLayout";
import PrivateRoute from "./routes/PrivateRoute";

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
          <Route element={<ProductsProviderLayout />}>
            <Route element={<SearchProviderLayout />}>
              <Route path="/" element={<Product />}></Route>
              <Route path="/search" element={<Search />}></Route>

              <Route
                path="/product/:metaTitle/:productId"
                element={<Detail />}
              ></Route>
              <Route element={<PrivateRoute />}>
                <Route
                  path="/user/account/*"
                  element={
                    <Elements stripe={stripePromise}>
                      <Account />
                    </Elements>
                  }
                ></Route>
                <Route path="/cart" element={<Cart />}></Route>
                <Route
                  path="/checkout"
                  element={
                    <Elements stripe={stripePromise}>
                      <Checkout />
                    </Elements>
                  }
                ></Route>
              </Route>
              <Route
                path="/user"
                element={<Navigate to="/user/account/" replace></Navigate>}
              ></Route>
              <Route path="*" element={<Error />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          {/* <Route path="/admin" element={<Admin />}></Route> */}
        </Routes>
      </Suspense>
      <Footer></Footer>
    </>
  );
}
export default App;
