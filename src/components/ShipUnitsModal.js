import React from "react";
import ReactDOM from "react-dom";
export default function ShipUnitsModal(props) {
  const { isShipUnits, toggleShipUnits } = props;
  const handleClick = () => {
    toggleShipUnits(!isShipUnits);
  };
  return ReactDOM.createPortal(
    <div className="cart-product__modal">
      <div className="cart-product__modal-overlay"></div>
      <div className="cart-product__modal-container">
        <div className="cart-product__modal-header">
          <span className="cart-product__shipunit-label">
            Chọn đơn vị vận chuyển
          </span>
        </div>
        <div className="cart-product__shipunit-type">Vận Chuyển Nhanh</div>
        <ul className="cart-product__shipunit-list">
          <li className="cart-product__shipunit-item">
            <span className="cart-product__shipunit-name">
              Giao Hàng Tiết Kiệm
            </span>
            <span className="cart-product__shipunit-date">
              Nhận hàng vào 27 Th05 - 29 Th05
            </span>
            <span className="cart-product__shipunit-pay">
              Cho phép Thanh toán khi nhận hàng
            </span>
          </li>
          <li className="cart-product__shipunit-item">
            <span className="cart-product__shipunit-name">JT Express</span>
            <span className="cart-product__shipunit-date">
              Nhận hàng vào 28 Th05
            </span>
            <span className="cart-product__shipunit-pay">
              Cho phép Thanh toán khi nhận hàng
            </span>
          </li>
        </ul>
        <div className="cart-product__popup-footer">
          <button
            onClick={handleClick}
            className="btn cart-product__shipunit-close"
          >
            Trở lại
          </button>
          <button className="btn cart-product__shipunit-apply">OK</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
