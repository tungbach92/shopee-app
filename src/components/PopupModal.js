import React from "react";
import ReactDOM from "react-dom";
export default function PopupModal(props) {
  const {
    isCardInfoMustFilled,
    shipUnit,
    isPopupShowing,
    togglePopup,
    isInformation,
    isInfoEmpty,
  } = props;
  const handleClick = () => {
    togglePopup(!isPopupShowing);
  };
  return ReactDOM.createPortal(
    <div className="cart-product__modal">
      <div className="cart-product__modal-overlay"></div>
      <div className="cart-product__modal-container">
        <div className="cart-product__modal-header">
          <span className="cart-product__popup-label">
            {isInformation === true || isInfoEmpty === true
              ? "Vui lòng điền thông tin người mua và ấn Lưu."
              : !Object.keys(shipUnit).length
              ? "Vui lòng chọn đơn vị vận chuyển."
              : isCardInfoMustFilled
              ? "Vui lòng điền đầy đủ thông tin Thẻ Tín dụng/Ghi nợ"
              : "Đặt hàng thành công"}
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
