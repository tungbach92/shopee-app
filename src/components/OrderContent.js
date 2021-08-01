import React, { useContext, useEffect } from "react";
import { ProductContext } from "../context";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import CurrencyFormat from "react-currency-format";
import moment from "moment";
const OrderContent = () => {
  const { orderItems, setOrderItems, user, setUser } =
    useContext(ProductContext);
  // read order from db and set state
  // useEffect(() => {
  //   setUser(setOrderItems);
  // }, [setOrderItems, setUser, user]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container">
      {orderItems.map((item, index) => (
        <div key={index} className="grid order-product">
          <div className="order-product__moment">
            <div className="grid__col order-product__id">
              Đơn hàng mã: {item.id}
            </div>
            <div className="grid__col order-product__time">
              Thời gian đặt:{" "}
              {moment.unix(item.data.created).format("MMMM Do YYYY, h:mm:ss a")}
            </div>
          </div>
          <div className="order-product__header">
            <div className="grid__col order-product__product">Sản Phẩm</div>
            <div className="grid__col order-product__price">Đơn Giá</div>
            <div className="grid__col order-product__amount">Số Lượng</div>
            <div className="grid__col order-product__header-total">Số Tiền</div>
          </div>
          {item.data.basket.map((basketItem, index) => (
            <div key={index} className="order-product__item">
              <Link
                to={{
                  pathname: `/product/${basketItem.metaTitle}`,
                  state: { id: basketItem.id },
                }}
                className="grid__col order-product__overview"
              >
                <img
                  src={require(`../img/${basketItem.imageUrl}`).default}
                  alt="cart-product"
                  className="order-product__img "
                />
                <span className="order-product__name">{basketItem.name}</span>
              </Link>
              <div
                data-name="variation"
                className="grid__col cart-product__variation"
              >
                <span className="order-product__variation-label">
                  Phân Loại Hàng:
                </span>
                <span className="order-product__variation-numb">
                  {basketItem.variation}
                </span>
              </div>
              <div className="grid__col order-product__item-price">
                {/* cart-product__price-item--before  */}
                {/* cart-product__price-item--after  */}
                <span className="order-product__price-item">
                  {basketItem.price}
                </span>
              </div>
              <div className="grid__col order-product__item-amount">
                <div className="order-product__amount-wrapper">
                  {basketItem.amount}
                </div>
              </div>
              <div className="grid__col order-product__item-total">
                {basketItem.price * basketItem.amount}
              </div>
            </div>
          ))}
          <div className="order-product__footer">
            <span className="order-product__label">Tổng số tiền:</span>
            <span className="order-product__total-all">
              <CurrencyFormat
                decimalScale={2}
                value={item.data.amount}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₫"}
              ></CurrencyFormat>
            </span>
          </div>
        </div>
      ))}
      {orderItems.length <= 0 && (
        <div className="grid order-empty">Chưa có đơn hàng.</div>
      )}
    </div>
  );
};

export default OrderContent;
