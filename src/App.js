import "./css/main.css";
import "./css/base.css";
import "./css/reset.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Product from "./pages/Product";

function App() {
  return (
    <>
      <Header></Header>
      <Product></Product>
      <Footer></Footer>
    </>
  );
}
export default App;
