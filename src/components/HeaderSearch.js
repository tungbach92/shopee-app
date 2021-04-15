import React from "react";
import shopeeLogo from "../img/shoppe-logo.png";
import noCartImg from "../img/no-cart.png";

export default function HeaderSearch() {
  return (
    <div className="header__search">
      <a href="# " className="header__logo-link">
        <img src={shopeeLogo} alt="shoppe-logo" />
      </a>
      <div className="header__search-content">
        <div className="header__search-wrapper">
          <input
            type="text"
            className="header__search-input"
            placeholder="Tìm sản phẩm, thương hiệu, và tên shop"
          />
          <a href="# " className="header__search-icon">
            <i className="bi bi-search"></i>
          </a>
          <ul className="header__history-list">
            <li className="header__history-title">Lịch Sử Tìm Kiếm</li>
            <li className="header__history-item">
              <a href="# " className="header__history-link">
                Item
              </a>
            </li>
            <li className="header__history-item">
              <a href="# " className="header__history-link">
                Item
              </a>
            </li>
            <li className="header__history-item">
              <a href="# " className="header__history-link">
                Item
              </a>
            </li>
          </ul>
        </div>

        <ul className="header__search-list">
          <li className="header__search-item">
            <a href="# " className="header__item-link">
              Hoodie Nam
            </a>
          </li>
          <li className="header__search-item">
            <a href="# " className="header__item-link">
              Sandal Nữ
            </a>
          </li>
          <li className="header__search-item">
            <a href="# " className="header__item-link">
              Áo Nữ
            </a>
          </li>
          <li className="header__search-item">
            <a href="# " className="header__item-link">
              Quần Nam
            </a>
          </li>
          <li className="header__search-item">
            <a href="# " className="header__item-link">
              Dép Nam
            </a>
          </li>
          <li className="header__search-item">
            <a href="# " className="header__item-link">
              Balo Nữ
            </a>
          </li>
          <li className="header__search-item">
            <a href="# " className="header__item-link">
              Váy Trắng
            </a>
          </li>
          <li className="header__search-item">
            <a href="# " className="header__item-link">
              Tất Nữ
            </a>
          </li>
        </ul>
      </div>
      <div className="header__cart">
        <div className="header__cart-wrapper">
          <a href="# " className="header__cart-icon-link">
            <i className="header__cart-icon bi bi-cart">
              {/* <!-- No cart: empty --> */}
              <div className="header__cart-numb">0</div>
            </i>
          </a>
          {/* <!-- No cart: header__cart-list--empty --> */}
          <div className="header__cart-list">
            <div className="header__cart-arrow"></div>
            <div className="header__cart-list-container">
              <div className="header__cart-title">Sản phẩm mới thêm</div>
              <div className="header__cart-list-item">{/* <!-- render --> */}</div>
              <div className="header__cart-item">
                <a href="# " className="header__cart-button">
                  Xem giỏ hàng
                </a>
              </div>
            </div>
            <img src={noCartImg} className="header__cart-empty-img" alt="no-cart" />
            <div className="header__cart-empty-info">Chưa có sản phẩm</div>
          </div>
        </div>
      </div>
    </div>
  );
}
