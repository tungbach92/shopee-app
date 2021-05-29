import React, { useContext, useEffect, useState, useRef } from "react";
import { ProductContext } from "../context";
import classNames from "classnames";
import { Link } from "react-router-dom";
import useModal from "../hooks/useModal";
import ShipUnitsModal from "./ShipUnitsModal";
import VoucherModal from "./VoucherModal";
import PopupModal from "./PopupModal";

export default function CheckoutProduct() {
  console.log("check out render");
  //
  const { shipUnitList, checkoutItems } = useContext(ProductContext);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

  let orderItems = {};

  const [shipUnit, setShipUnit] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isInformation, setIsInformation] = useState(false);
  const [isPaymentMethod, setIsPaymentMethod] = useState(false);
  const [shipChecked, setShipChecked] = useState([]);
  const {
    isPopupShowing,
    togglePopup,
    isVoucherShowing,
    toggleVoucher,
    isShipUnits,
    toggleShipUnits,
  } = useModal();

  const inputEl = useRef([]);
  let isInfoEmpty = false;
  if (
    customerInfo.name === "" ||
    customerInfo.phone === "" ||
    customerInfo.address === ""
  ) {
    isInfoEmpty = true;
  }
  //
  let checkoutPriceTotal = 0;
  let checkoutItemTotal = 0;
  let shipPrice = Number(shipUnit.price === undefined ? 0 : shipUnit.price);
  checkoutItems.forEach(
    (item) => (checkoutPriceTotal += item.amount * item.price)
  );
  checkoutItems.forEach((item) => (checkoutItemTotal += item.amount));

  useEffect(() => {
    // effect
    const setInputCustomerInfo = () => {
      if (isInformation === true) {
        inputEl.current[0].value = customerInfo.name;
        inputEl.current[1].value = customerInfo.phone;
        inputEl.current[2].value = customerInfo.address;
      }
    };
    const setCheckedByShipUnit = () => {
      let checked = [];
      shipUnitList.forEach((item) => {
        if (item.id === shipUnit.id) {
          checked[item.id] = true;
        } else {
          checked[item.id] = false;
        }
      });
      setShipChecked(checked);
    };
    setCheckedByShipUnit();
    setInputCustomerInfo();
    return () => {
      // cleanup
    };
  }, [shipUnit, shipUnitList, isInformation, customerInfo]);

  const handleClick = () => {
    setIsInformation(!isInformation);
    if (isInformation) {
      const name = inputEl.current[0].value;
      const phone = inputEl.current[1].value;
      const address = inputEl.current[2].value;
      setCustomerInfo({ name, phone, address });
    }
  };

  const handlePaymentMethodSelect = (e) => {
    const paymentMethod = e.target.innerText;
    if (paymentMethod.length > 0) {
      setPaymentMethod(paymentMethod);
    }
    setIsPaymentMethod(!isPaymentMethod);
  };

  const handlePaymentMethodChange = (e) => {
    setIsPaymentMethod(!isPaymentMethod);
  };

  const handleChange = (e) => {
    e.target.value = e.target.value
      .replace(/[^1-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
  };

  const handleShipUnitModal = (e) => {
    toggleShipUnits(!isShipUnits);
  };

  const handleVoucherModal = (e) => {
    toggleVoucher(!isShipUnits);
  };

  const handleCheckout = () => {
    if (
      isInformation === true ||
      isInfoEmpty === true ||
      !Object.keys(shipUnit).length
    ) {
      togglePopup(!isPopupShowing);
    } else {
      orderItems = {
        date: new Date(),
        checkoutItems: checkoutItems,
        customerInfo: customerInfo,
        shipUnit: shipUnit,
        paymentMethod: paymentMethod,
      };
      console.log(orderItems); // order output
    }
  };

  return (
    <div className="container">
      <div className="grid checkout-product">
        <div className="checkout-product__address-line"></div>
        <div className="checkout-product__address-wrapper">
          <svg
            height="16"
            viewBox="0 0 12 16"
            width="12"
            className="checkout-product__address-icon"
          >
            <path
              d="M6 3.2c1.506 0 2.727 1.195 2.727 2.667 0 1.473-1.22 2.666-2.727 2.666S3.273 7.34 3.273 5.867C3.273 4.395 4.493 3.2 6 3.2zM0 6c0-3.315 2.686-6 6-6s6 2.685 6 6c0 2.498-1.964 5.742-6 9.933C1.613 11.743 0 8.498 0 6z"
              fillRule="evenodd"
            ></path>
          </svg>
          <span className="checkout-product__address-label">
            Thông tin người mua
          </span>
          <div className="checkout-product__address-content">
            {!isInformation && (
              <>
                <span className="checkout-product__info">
                  {customerInfo.name} {customerInfo.phone}{" "}
                  {customerInfo.address}
                </span>
                <span
                  onClick={handleClick}
                  className="checkout-product__address-action"
                >
                  {isInfoEmpty ? "Thêm" : "Sửa"}
                </span>
              </>
            )}
            {isInformation && (
              <form
                className="checkout-product__info-input"
                onSubmit={handleClick}
              >
                <label className="checkout-product__name-label">
                  Họ và tên:
                </label>
                <input
                  ref={(el) => (inputEl.current[0] = el)}
                  type="text"
                  className="checkout-product__name-input"
                  placeholder="Họ và tên..."
                  required
                />

                <label className="checkout-product__phone-label">
                  Số điện thoại:
                </label>
                <input
                  ref={(el) => (inputEl.current[1] = el)}
                  type="text"
                  className="checkout-product__phone-input"
                  placeholder="Số điện thoại..."
                  onChange={handleChange}
                  required
                />

                <label className="checkout-product__location-label">
                  Địa chỉ:
                </label>
                <input
                  ref={(el) => (inputEl.current[2] = el)}
                  type="text"
                  className="checkout-product__location-input"
                  placeholder="Địa chỉ..."
                  required
                />
                <button
                  className="btn checkout-product__input-btn"
                  type="submit"
                >
                  Lưu
                </button>
              </form>
            )}
          </div>
        </div>
        <div className="checkout-product__item-label">
          <span className="checkout-product__product">Sản phẩm</span>
          <span className="checkout-product__price">Đơn giá</span>
          <span className="checkout-product__amount">Số lượng</span>
          <span className="checkout-product__total">Thành tiền</span>
        </div>
        <ul className="checkout-product__item-list">
          {checkoutItems.map((item, index) => (
            <div key={index} className="checkout-product-item-wrapper">
              <li className="checkout-product__item">
                <span className="checkout-product__name-wrapper">
                  <img
                    src={require(`../img/${item.imageUrl}`).default}
                    alt="product__item-img"
                    className="checkout-product__item-img"
                  ></img>
                  <span className="checkout-product__item-name">
                    {item.name}
                  </span>
                  <span className="checkout-product__variation-wrapper">
                    <span className="checkout-product__variation-label">
                      Loại:
                    </span>
                    <span className="checkout-product__variation">XL</span>
                  </span>
                </span>
                <span className="checkout-product__item-price">
                  {item.price}
                </span>
                <span className="checkout-product__item-amount">
                  {item.amount}
                </span>
                <span className="checkout-product__item-total">
                  {item.price * item.amount}
                </span>
              </li>
              <div className="checkout-product__addition">
                <span className="checkout-product__second-addition">
                  <span className="checkout-product__price-label">
                    Tổng số tiền ({item.amount} sản phẩm):
                  </span>
                  <span className="checkout-product__additon-price">
                    {item.price * item.amount}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </ul>
        <div className="checkout-product__first-addition">
          <span className="checkout-product__message-wrapper">
            <span className="checkout-product__message-label">Lời nhắn:</span>
            <input
              type="text"
              placeholder="Lưu ý cho người bán..."
              className="checkout-product__message-input"
            />
          </span>
          <span className="checkout-product__transport-wrapper">
            <span className="checkout-product__transport-label">
              Đơn vị vận chuyển:
            </span>

            {!Object.keys(shipUnit).length ? (
              <span className="checkout-product__transport-notchoose">
                Chưa chọn đơn vị vận chuyển
              </span>
            ) : (
              <span className="checkout-product__transport-info">
                <span className="checkout-product__transport-name">
                  {shipUnit.name}
                </span>
                <span className="checkout-product__transport-date">
                  {shipUnit.date}
                </span>
                <span className="checkout-product__transport-method">
                  {shipUnit.method}
                </span>
              </span>
            )}

            <span
              onClick={handleShipUnitModal}
              className="checkout-product__transport-action"
            >
              {!Object.keys(shipUnit).length ? "Chọn" : "Thay đổi"}
            </span>
            {isShipUnits && (
              <ShipUnitsModal
                isShipUnits={isShipUnits}
                toggleShipUnits={toggleShipUnits}
                shipUnit={shipUnit}
                setShipUnit={setShipUnit}
                shipChecked={shipChecked}
                setShipChecked={setShipChecked}
              ></ShipUnitsModal>
            )}
            <span className="checkout-product__transport-price">
              {shipUnit.price}
            </span>
          </span>
        </div>
        <div className="checkout-product__checkout-wrapper">
          <div className="checkout-product__voucher-wrapper">
            <svg
              fill="none"
              viewBox="0 -2 23 22"
              className="checkout-product__voucher-icon"
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
            <span className="checkout-product__voucher-label">
              Shopee Voucher
            </span>
            <span
              onClick={handleVoucherModal}
              className="checkout-product__voucher-action"
            >
              Chọn Voucher
            </span>
            {isVoucherShowing && (
              <VoucherModal
                isVoucherShowing={isVoucherShowing}
                toggleVoucher={toggleVoucher}
              ></VoucherModal>
            )}
          </div>
          <div className="checkout-product__method-wrapper">
            <span className="checkout-product__method-label">
              Phương thức thanh toán
            </span>
            {isPaymentMethod && (
              <>
                <span
                  onClick={handlePaymentMethodSelect}
                  className="checkout-product__method-airpay"
                >
                  Ví AirPay
                </span>
                <div className="checkout-product__airpay-notify">
                  airpay info
                </div>

                <span
                  onClick={handlePaymentMethodSelect}
                  className="checkout-product__method-card"
                >
                  Thẻ Tín dụng/Ghi nợ
                </span>
                <div className="checkout-product__card-notify">card info</div>

                <span
                  onClick={handlePaymentMethodSelect}
                  className="checkout-product__method-Immediatepay"
                >
                  Thanh toán khi nhận hàng
                </span>
                <div className="checkout-product__Immediatepay-notify">
                  Immediatepay info
                </div>
              </>
            )}

            {!isPaymentMethod && (
              <>
                <span className="checkout-product__method">
                  {paymentMethod}
                </span>
                <span
                  onClick={handlePaymentMethodChange}
                  className="checkout-product__method-action"
                >
                  THAY ĐỔI
                </span>
              </>
            )}
          </div>

          <div className="checkout-product__calc-wrapper">
            <span className="checkout-product__payment-label">
              Tổng tiền hàng:
            </span>
            <span className="checkout-product__payment">
              {checkoutPriceTotal}
            </span>
            <span className="checkout-product__ship-label">
              Phí vận chuyển:
            </span>
            <span className="checkout-product__ship">{shipPrice}</span>
            <span className="checkout-product__final-label">
              Tổng thanh toán:
            </span>
            <span className="checkout-product__final">
              {checkoutPriceTotal + shipPrice}
            </span>
          </div>
          <div className="checkout-product__order-wrapper">
            <span className="checkout-product__order-notice">
              Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo
            </span>
            <span className="checkout-product__order-policy">
              Điều khoản Shopee
            </span>
            <button
              onClick={handleCheckout}
              className="btn checkout-product__order-btn"
            >
              Đặt hàng
            </button>
            {isPopupShowing && (
              <PopupModal
                isPopupShowing={isPopupShowing}
                togglePopup={togglePopup}
                isInformation={isInformation}
                isInfoEmpty={isInfoEmpty}
              ></PopupModal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
