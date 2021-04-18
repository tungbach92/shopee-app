import "./css/reset.css";
import "./css/base.css";
import "./css/main.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Product from "./pages/Product";
import ProductProvider from "../src/context";

function App() {
  return (
    <>
      <Header></Header>
      <ProductProvider>
        <Product></Product>
      </ProductProvider>
      <Footer></Footer>
    </>
  );
}
export default App;
