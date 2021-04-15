import React from "react";
import shopeeLogo from "../img/shoppe-logo.png";
import noCartImg from "../img/no-cart.png";

export default function HeaderSearch() {
  return (
    <div class="header__search">
      <a href="# " class="header__logo-link">
        <img src={shopeeLogo} alt="shoppe-logo" />
      </a>
      <div class="header__search-content">
        <div class="header__search-wrapper">
          <input
            type="text"
            class="header__search-input"
            placeholder="Tìm sản phẩm, thương hiệu, và tên shop"
          />
          <a href="# " class="header__search-icon">
            <i class="bi bi-search"></i>
          </a>
          <ul class="header__history-list">
            <li class="header__history-title">Lịch Sử Tìm Kiếm</li>
            <li class="header__history-item">
              <a href="# " class="header__history-link">
                Item
              </a>
            </li>
            <li class="header__history-item">
              <a href="# " class="header__history-link">
                Item
              </a>
            </li>
            <li class="header__history-item">
              <a href="# " class="header__history-link">
                Item
              </a>
            </li>
          </ul>
        </div>

        <ul class="header__search-list">
          <li class="header__search-item">
            <a href="# " class="header__item-link">
              Hoodie Nam
            </a>
          </li>
          <li class="header__search-item">
            <a href="# " class="header__item-link">
              Sandal Nữ
            </a>
          </li>
          <li class="header__search-item">
            <a href="# " class="header__item-link">
              Áo Nữ
            </a>
          </li>
          <li class="header__search-item">
            <a href="# " class="header__item-link">
              Quần Nam
            </a>
          </li>
          <li class="header__search-item">
            <a href="# " class="header__item-link">
              Dép Nam
            </a>
          </li>
          <li class="header__search-item">
            <a href="# " class="header__item-link">
              Balo Nữ
            </a>
          </li>
          <li class="header__search-item">
            <a href="# " class="header__item-link">
              Váy Trắng
            </a>
          </li>
          <li class="header__search-item">
            <a href="# " class="header__item-link">
              Tất Nữ
            </a>
          </li>
        </ul>
      </div>
      <div class="header__cart">
        <div class="header__cart-wrapper">
          <a href="# " class="header__cart-icon-link">
            <i class="header__cart-icon bi bi-cart">
              {/* <!-- No cart: empty --> */}
              <div class="header__cart-numb">0</div>
            </i>
          </a>
          {/* <!-- No cart: header__cart-list--empty --> */}
          <div class="header__cart-list">
            <div class="header__cart-arrow"></div>
            <div class="header__cart-list-container">
              <div class="header__cart-title">Sản phẩm mới thêm</div>
              <div class="header__cart-list-item">{/* <!-- render --> */}</div>
              <div class="header__cart-item">
                <a href="# " class="header__cart-button">
                  Xem giỏ hàng
                </a>
              </div>
            </div>
            <img src={noCartImg} class="header__cart-empty-img" alt="no-cart" />
            <div class="header__cart-empty-info">Chưa có sản phẩm</div>
          </div>
        </div>
      </div>
    </div>
  );
}
