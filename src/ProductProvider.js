import React, { Component, useContext } from "react";
import { auth, db } from "./firebase";
import axios from "./axios";
import visaImg from "./img/visa.png";
import masterImg from "./img/master.png";
import jcbImg from "./img/jcb.png";
import expressImg from "./img/express.png";
import { isEqual } from "lodash";

export const ProductContext = React.createContext();
export function useProduct() {
  return useContext(ProductContext);
}

export default class ProductProvider extends Component {
  state = {
    items: [],
    similarItems: [],

    // shipInfos: null,
  }; // json server->fetch data to here and pass to value of Provider component

  // componentDidMount() {
  //   // this.getDataFireBase();
  //   //onAuthStateChanged Observer for only user's signed-in signed out state.
  //   //onIdTokenChanged.check Observer trigger if signed-in signed out, firebase auto changes id token
  //   auth.onIdTokenChanged((authUser) => {
  //     if (authUser) {
  //       //user will log in or logged in
  //       this.setState({ user: authUser });
  //       this.checkFirebaseIdTokenAuthTime();
  //       // this.getShipInfos();
  //       this.getCustomerIdFromFirebase();
  //       this.getCartItemsFromFirebase();
  //       // this.setSearchHistoryFromFirebase();
  //       // cartItems = this.getCartItemsFromFirebase(authUser);
  //     } else {
  //       //user logged out
  //       this.setState({ user: null });
  //     }
  //   });
  // }

  componentDidUpdate(prevProps, prevState) {
    // if (this.state.searchHistory !== prevState.searchHistory) {
    //   this.saveSearchHistoryToFirebase(this.state.searchHistory);
    // }
  }
  // TODO: Called many times, this should be in provider or hook?
  checkFirebaseIdTokenAuthTime = async () => {
    const { user } = this.state;
    if (!user) return;
    try {
      //revoke id token if expired
      // const idToken = await auth.currentUser.getIdToken(
      //   /* forceRefresh */ false
      // );
      const idToken = this.state.user._lat;
      const result = await axios({
        method: "POST",
        url: "/verify-id-token-by-firebase",
        data: { idToken },
      });
      if (result.data.revoked) {
        // never be called cause idToken auto refresh after 1 hour by fỉrebase sdk unless manual refresh
        alert("Id Token refreshed. Vui lòng đăng nhập lại!");
        this.handleLogout();
      }
      if (result.data.invalid) {
        alert("Token's invalid. Vui lòng đăng nhập lại!");
        this.handleLogout();
      }
      if (result.data.succeeded) {
        const idToken = result.data.idToken;
        const authTime = idToken.auth_time; //auth time stay the same after idToken revoked
        if (
          Math.floor(this.currentTimeinMs / 1000) - authTime >=
          this.sessionExpinSec
        ) {
          alert(`Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!`);
          this.handleLogout();
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    const value = {
      ...this.state,
      handleClick: this.handleClick,
      changeVariationDisPlayCartItems: this.changeVariationDisPlayCartItems,
      changeCartItemsVariation: this.changeCartItemsVariation,
      changeSimilarDisPlayCartItems: this.changeSimilarDisPlayCartItems,
      delCartItem: this.delCartItem,
      delCartItems: this.delCartItems,
      saveCartItemsToStorage: this.saveCartItemsToStorage,
      setCheckoutItemsByChecked: this.setCheckoutItemsByChecked,
      setVoucher: this.setVoucher,
      setShipPriceProvince: this.setShipPriceProvince,
      setCartItems: this.setCartItems,
      calcCartNumb: this.calcCartNumb,
      getItemsPriceTotal: this.getItemsPriceTotal,
      getItemsTotal: this.getItemsTotal,
      getShipPrice: this.getShipPrice,
      getSaved: this.getSaved,
      getItemsPriceFinal: this.getItemsPriceFinal,

      saveCartItemsToFirebase: this.saveCartItemsToFirebase,
      getCartItemsFromFirebase: this.getCartItemsFromFirebase,
      saveCheckoutItemsToFirebase: this.saveCheckoutItemsToFirebase,
      setCheckoutItemsFromFirebase: this.setCheckoutItemsFromFirebase,

      setOrderPageTotal: this.setOrderPageTotal,
      setOrderPageIndex: this.setOrderPageIndex,

      handleLogout: this.handleLogout,
      saveCheckoutItemsToStorage: this.saveCheckoutItemsToStorage,
      getCartItemsFromStorage: this.getCartItemsFromStorage,
      getCheckoutItemsFromStorage: this.getCheckoutItemsFromStorage,
    };
    return (
      <ProductContext.Provider value={value}>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}
