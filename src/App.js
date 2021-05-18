import "./css/reset.css";
import "./css/base.css";
import "./css/main.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import Footer from "./components/Footer";
import Product from "./pages/Product";
import { Route, Switch } from "react-router-dom";
import Cart from "./pages/Cart";
import SingleProduct from "./pages/SingleProduct";
import Error from "./pages/Error";
import Account from "./pages/Account";
import CheckOut from "./pages/CheckOut";
import ProductProvider from "./context";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Product}></Route>
        <Route exact path="/cart" component={Cart}></Route>
        <Route exact path="/metaName" component={SingleProduct}></Route>
        <Route exact path="/account" component={Account}></Route>
        <Route exact path="/checkOut" component={CheckOut}></Route>
        <Route component={Error} />
      </Switch>
      <Footer></Footer>
    </>
  );
}
export default App;
