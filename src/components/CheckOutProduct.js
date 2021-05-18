import React from "react";
import img1 from "../img/ao.png";

export default function CheckOutProduct() {
  return (
    <div className="container">
      <div className="grid checkOut-product">
        <div className="checkOut-product__address-line"></div>
        <div className="checkOut-product__address-wrapper">
          <svg
            height="16"
            viewBox="0 0 12 16"
            width="12"
            className="checkOut-product__address-icon"
          >
            <path
              d="M6 3.2c1.506 0 2.727 1.195 2.727 2.667 0 1.473-1.22 2.666-2.727 2.666S3.273 7.34 3.273 5.867C3.273 4.395 4.493 3.2 6 3.2zM0 6c0-3.315 2.686-6 6-6s6 2.685 6 6c0 2.498-1.964 5.742-6 9.933C1.613 11.743 0 8.498 0 6z"
              fillRule="evenodd"
            ></path>
          </svg>
          <span className="checkOut-product__address-label">
            Địa Chỉ Nhận Hàng
          </span>
          <div className="checkOut-product__address-content">
            <span className="checkOut-product__address">
              Nguyễn Tùng Bách (+84) 369832318 Số 28 Ngõ 420 Tổ 22 Đường Kim
              Giang, Phường Đại Kim, Quận Hoàng Mai, Hà Nội
            </span>
            <span className="checkOut-product__address-default">Mặc Định</span>
            <span className="checkOut-product__address-action">THAY ĐỔI</span>
          </div>
        </div>
        <ul className="checkOut-product__item-list">
          <li className="checkOut-product__item-label">
            <span className="checkOut-product__product">Sản phẩm</span>
            <span className="checkOut-product__price">Đơn giá</span>
            <span className="checkOut-product__amount">Số lượng</span>
            <span className="checkOut-product__total">Thành tiền</span>
          </li>
          <li className="checkOut-product__item">
            <span className="checkOut-product__name-wrapper">
              <img
                src={img1}
                alt="product__item-img"
                className="checkOut-product__item-img"
              ></img>
              <span className="checkOut-product__item-name">dsdfsdfsdf</span>
              <span className="checkOut-product__variation-wrapper">
                <span className="checkOut-product__variation-label">Loại:</span>
                <span className="checkOut-product__variation">100ml</span>
              </span>
            </span>
            <span className="checkOut-product__item-price">30000</span>
            <span className="checkOut-product__item-amount">1</span>
            <span className="checkOut-product__item-total">30000</span>
          </li>
        </ul>
        <div className="checkOut-product__addition">
          <div className="checkOut-product__first-addition">
            <span className="checkOut-product__message-wrapper">
              <span className="checkOut-product__message-label">Lời nhắn:</span>
              <input type="text" className="checkOut-product__message-input" />
            </span>
            <span className="checkOut-product__transport-wrapper">
              <span className="checkOut-product__transport-label">
                Đơn vị vận chuyển:
              </span>
              <span className="checkOut-product__transport-info">
                <span className="checkOut-product__transport-type">
                  Vận Chuyển Nhanh
                </span>
                <span className="checkOut-product__transport-unit">
                  Shopee Express
                </span>
                <span className="checkOut-product__transport-time">
                  Nhận hàng vào 22 Th05 - 24 Th05
                </span>
              </span>
              <span className="checkOut-product__transport-action">
                Thay đổi
              </span>
              <span className="checkOut-product__transport-price">31.900</span>
            </span>
          </div>

          <span className="checkOut-product__second-addition">
            <span className="checkOut-product__price-label">
              Tổng số tiền (1 sản phẩm):
            </span>
            <span className="checkOut-product__additon-price">61.900</span>
          </span>
        </div>
        <div className="checkOut-product__voucher-wrapper"></div>
        <div className="checkOut-product__checkOut-wrapper"></div>
      </div>
    </div>
  );
}
