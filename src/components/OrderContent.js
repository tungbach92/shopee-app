import React, { useContext, useEffect } from "react";
import { ProductContext } from "../context";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { db } from "../firebase";
const OrderContent = () => {
  const { orderItems, setOrderItems, user } = useContext(ProductContext);

  return (
    <div className="container">
      {orderItems.map((item, index) => (
        <div key={index} className="grid cart-product">
          <div className="cart-product__header">
            <div className="grid__col cart-product__product">Sản Phẩm</div>
            <div className="grid__col cart-product__price">Đơn Giá</div>
            <div className="grid__col cart-product__amount">Số Lượng</div>
            <div className="grid__col cart-product__total">Số Tiền</div>
            <div className="grid__col cart-product__action">Thao Tác</div>
          </div>
          {item.basket.map((basketItem, index) => (
            <div key={index} className="cart-product__item">
              <Link
                to={`/product/${basketItem.metaTitle}`}
                className="grid__col cart-product__overview"
              >
                <img
                  src={require(`../img/${basketItem.imageUrl}`).default}
                  alt="cart-product"
                  className="cart-product__img"
                />
                <span className="cart-product__name">{basketItem.name}</span>
              </Link>
              <div
                data-name="variation"
                className="grid__col cart-product__variation"
              >
                <span className="cart-product__variation-label">
                  Phân Loại Hàng:
                  <span
                    href="# "
                    className={classNames("cart-product__variation-icon", {
                      "cart-product__variation-icon--rotate":
                        basketItem.variationDisPlay,
                    })}
                  ></span>
                </span>
                <span className="cart-product__variation-numb">
                  {basketItem.variation}
                </span>
              </div>
              <div className="grid__col cart-product__price">
                {/* cart-product__price-item--before  */}
                {/* cart-product__price-item--after  */}
                <span className="cart-product__price-item cart-product__price-item--before">
                  {basketItem.price}
                </span>
                <span className="cart-product__price-item">
                  {basketItem.price}
                </span>
              </div>
              <div className="grid__col cart-product__amount">
                <div className="cart-product__amount-wrapper">1</div>
              </div>
              <div className="grid__col cart-product__total">
                {basketItem.price * basketItem.amount}
              </div>
            </div>
          ))}
          <div className="cart-product__footer">
            <div className="cart-product__anonymous-shopee"></div>
            <div className="cart-product__shopee-wrapper">
              <div className="cart-product__icon-wrapper">
                <svg
                  fill="none"
                  viewBox="0 -2 23 22"
                  className="cart-product__shoppe-icon"
                >
                  <g filter="url(#voucher-filter0_d)">
                    <mask id="a" fill="#fff">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1 2h18v2.32a1.5 1.5 0 000 2.75v.65a1.5 1.5 0 000 2.75v.65a1.5 1.5 0 000 2.75V16H1v-2.12a1.5 1.5 0 000-2.75v-.65a1.5 1.5 0 000-2.75v-.65a1.5 1.5 0 000-2.75V2z"
                      ></path>
                    </mask>
                    <path
                      d="M19 2h1V1h-1v1zM1 2V1H0v1h1zm18 2.32l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zm0 .65l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zm0 .65l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zM19 16v1h1v-1h-1zM1 16H0v1h1v-1zm0-2.12l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zm0-.65l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zm0-.65l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zM19 1H1v2h18V1zm1 3.32V2h-2v2.32h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zm.6 1.56v-.65h-2v.65h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zm.6 1.56v-.65h-2v.65h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zM20 16v-2.13h-2V16h2zM1 17h18v-2H1v2zm-1-3.12V16h2v-2.12H0zm1.4.91a2.5 2.5 0 001.5-2.29h-2a.5.5 0 01-.3.46l.8 1.83zm1.5-2.29a2.5 2.5 0 00-1.5-2.3l-.8 1.84c.18.08.3.26.3.46h2zM0 10.48v.65h2v-.65H0zM.9 9.1a.5.5 0 01-.3.46l.8 1.83A2.5 2.5 0 002.9 9.1h-2zm-.3-.46c.18.08.3.26.3.46h2a2.5 2.5 0 00-1.5-2.3L.6 8.65zM0 7.08v.65h2v-.65H0zM.9 5.7a.5.5 0 01-.3.46l.8 1.83A2.5 2.5 0 002.9 5.7h-2zm-.3-.46c.18.08.3.26.3.46h2a2.5 2.5 0 00-1.5-2.3L.6 5.25zM0 2v2.33h2V2H0z"
                      mask="url(#a)"
                    ></path>
                  </g>
                  <path
                    clipRule="evenodd"
                    d="M6.49 14.18h.86v-1.6h-.86v1.6zM6.49 11.18h.86v-1.6h-.86v1.6zM6.49 8.18h.86v-1.6h-.86v1.6zM6.49 5.18h.86v-1.6h-.86v1.6z"
                  ></path>
                  <defs>
                    <filter
                      id="voucher-filter0_d"
                      x="0"
                      y="1"
                      width="20"
                      height="16"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood
                        floodOpacity="0"
                        result="BackgroundImageFix"
                      ></feFlood>
                      <feColorMatrix
                        in="SourceAlpha"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      ></feColorMatrix>
                      <feOffset></feOffset>
                      <feGaussianBlur stdDeviation=".5"></feGaussianBlur>
                      <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0"></feColorMatrix>
                      <feBlend
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow"
                      ></feBlend>
                      <feBlend
                        in="SourceGraphic"
                        in2="effect1_dropShadow"
                        result="shape"
                      ></feBlend>
                    </filter>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      ))}
      {orderItems.length <= 0 && (
        <div className="grid cart-empty">No order</div>
      )}
    </div>
  );
};

export default OrderContent;
