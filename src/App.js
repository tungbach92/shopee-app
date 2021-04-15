import "./css/main.css";
import "./css/base.css";
import "./css/reset.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Product from "./pages/Product";
import RoomProvider from "../src/context";

function App() {
  return (
    <>
      <Header></Header>
      <RoomProvider>
        <Product></Product>
      </RoomProvider>
      <Footer></Footer>
    </>
  );
}
export default App;
