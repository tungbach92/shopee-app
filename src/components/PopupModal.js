import React from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";

export default function PopupModal(props) {
  const history = useHistory();
  const {
    isCartPageLoaded,
    isCardInfoMustFilled,
    shipUnit,
    isPopupShowing,
    togglePopup,
    isInformation,
    isInfoEmpty,
    paymentMethod,
    setCheckoutProduct,
    setCartProduct,
    succeeded
  } = props;
  const handleClick = () => {
    togglePopup(!isPopupShowing);
    if (!isCartPageLoaded) {
      if (isInformation || isInfoEmpty) {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else if (!Object.keys(shipUnit).length) {
        window.scrollTo({ top: 300, left: 0, behavior: "smooth" });
      } else if (isCardInfoMustFilled) {
        window.scrollTo({ top: 700, left: 0, behavior: "smooth" });
      } else if (paymentMethod.length <= 0) {
        window.scrollTo({ top: 600, left: 0, behavior: "smooth" });
      } else if(succeeded){
        setCartProduct([]);
        setCheckoutProduct([]);
        history.replace("/cart");
      }
    }
  };
  return ReactDOM.createPortal(
    <div className="cart-product__modal">
      <div className="cart-product__modal-overlay"></div>
      <div className="cart-product__modal-container">
        <div className="cart-product__modal-header">
          <span className="cart-product__popup-label">
            {isCartPageLoaded
              ? "Bạn vẫn chưa chọn sản phẩm nào để mua."
              : isInformation === true || isInfoEmpty === true
              ? "Vui lòng điền thông tin người mua và ấn Lưu."
              : !Object.keys(shipUnit).length
              ? "Vui lòng chọn đơn vị vận chuyển."
              : paymentMethod.length <= 0
              ? "Vui lòng chọn phương thức thanh toán."
              : isCardInfoMustFilled
              ? "Vui lòng điền đầy đủ thông tin Thẻ Tín dụng/Ghi nợ"
              : succeeded 
              ? "Đặt hàng thành công"
              : "Có lỗi xảy ra. Vui lòng thử lại sau hoặc liên hệ tổng đài"}
          </span>
        </div>
        <div className="cart-product__popup-footer">
          <button
            onClick={handleClick}
            className="btn cart-product__popup-apply"
          >
            OK
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
