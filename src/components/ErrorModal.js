import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
export default function ErrorModal() {
  return ReactDOM.createPortal(
    <div className="cart-product__modal">
      <div className="cart-product__modal-overlay"></div>
      <div className="cart-product__modal-container">
        <div className="cart-product__error-label">Có lỗi xảy ra.</div>
        <div className="cart-product__modal-footer">
          <Link to="/cart" className="btn cart-product__error-btn">
            OK
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
}
