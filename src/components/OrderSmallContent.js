import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import CurrencyFormat from "react-currency-format";
import moment from "moment";
import Pagination from "./Pagination";

const OrderSmallContent = () => {
  const {
    orderItems,
    calcOrderPageTotals,
    setPageIndex,
    setPageSize,
    setPageTotal,
    pageIndex,
    pageSize,
    pageTotalCalc,
  } = useContext(ProductContext);
  const [filterOrderItems, setFilterOrderItems] = useState([]);
  const [isOrderPage, setIsOrderPage] = useState(false);

  const currentOrderItems = filterOrderItems.slice(
    (pageIndex - 1) * pageSize,
    pageIndex * pageSize
  );

  useEffect(() => {
    const orderPageIndex = 1;
    const orderPageSize = 2;
    setPageIndex(orderPageIndex);
    setPageSize(orderPageSize);

    const orderPageTotal = pageTotalCalc(filterOrderItems, orderPageSize);
    setPageTotal(orderPageTotal);
  }, [
    filterOrderItems,
    pageTotalCalc,
    setPageIndex,
    setPageSize,
    setPageTotal,
  ]);

  useEffect(() => {
    setIsOrderPage(true);
  }, []);

  useEffect(() => {
    setFilterOrderItems(orderItems);
  }, [orderItems]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSearchInput = (e) => {
    const text = e.target.value;
    handleFilterOrderItems(text);
  };

  const handleFilterOrderItems = (text) => {
    text = text.trim().toLowerCase();
    let filterOrderItems = [...orderItems];
    if (text.length > 0) {
      filterOrderItems = [...orderItems].filter((orderItem) =>
        orderItem.data.basket.some((item) =>
          item.name.toLowerCase().includes(text)
        )
      );
    }
    setFilterOrderItems(filterOrderItems);
  };

  return (
    <>
      <div className="user-order__title-container">
        <div className="user-order__title-item">Tất cả</div>
        <div className="user-order__title-item">Chờ xác nhận</div>
        <div className="user-order__title-item">Chờ lấy hàng</div>
        <div className="user-order__title-item">Đang giao</div>
        <div className="user-order__title-item">Đã giao</div>
        <div className="user-order__title-item">Hủy</div>
      </div>
      <div className="user-order__search-container">
        <svg className="user-order__search-icon" viewBox="0 0 19 19">
          <g id="Search-New" strokeWidth="1" fill="none" fillRule="evenodd">
            <g
              id="my-purchase-copy-27"
              transform="translate(-399.000000, -221.000000)"
              strokeWidth="2"
            >
              <g id="Group-32" transform="translate(400.000000, 222.000000)">
                <circle id="Oval-27" cx="7" cy="7" r="7"></circle>
                <path
                  d="M12,12 L16.9799555,16.919354"
                  id="Path-184"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </g>
          </g>
        </svg>
        <input
          type="text"
          className="user-order__search"
          onChange={handleSearchInput}
          placeholder="Tìm kiếm theo Tên Shop, ID đơn hàng hoặc Tên Sản phẩm"
        ></input>
      </div>
      <div className="user-order__order-container">
        {currentOrderItems.map((item, index) => (
          <div key={index} className="user-order__order-item">
            <div className="order-product__moment">
              <div className="grid__col order-product__id">
                mã Đơn hàng : {item.id}
              </div>
              <div className="grid__col order-product__time">
                Thời gian đặt:{" "}
                {moment
                  .unix(item.data.created)
                  .format("MMMM Do YYYY, h:mm:ss a")}
              </div>
              <div className="grid__col order-product__shipInfo">
                Địa chỉ nhận hàng: {item.data.shipInfo?.name},{" "}
                {item.data.shipInfo?.phone}, {item.data.shipInfo?.fullAddress}
              </div>
            </div>
            <div className="order-product__header">
              <div className="grid__col order-product__product">Sản Phẩm</div>
              <div className="grid__col order-product__price">Đơn Giá</div>
              <div className="grid__col order-product__amount">Số Lượng</div>
              <div className="grid__col order-product__header-total">
                Số Tiền
              </div>
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
      <Pagination
        isOrderPage={isOrderPage}
        filterOrderItems={filterOrderItems}
      ></Pagination>
    </>
  );
};

export default OrderSmallContent;
