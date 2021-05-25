import React from "react";
import ReactDOM from "react-dom";
export default function PopupModal(props) {
  const { isPopupShowing, togglePopup } = props;
  const handleClick = () => {
    togglePopup(!isPopupShowing);
  };
  return ReactDOM.createPortal(
    <div className="cart-product__modal">
      <div className="cart-product__modal-overlay"></div>
      <div className="cart-product__modal-container">
        <div className="cart-product__modal-header">
          <span className="cart-product__popup-label">
            Bạn vẫn chưa chọn sản phẩm nào để mua.
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
