import React, { useContext, useState } from "react";
import { ProductContext } from "../context";
import axios from "../axios";

const PaymentSmallContent = () => {
  const {
    paymentMethodList,
    customerID,
    defaultPaymentMethodID,
    updateDefaultPaymentMethodIDToFirebase,
  } = useContext(ProductContext);
  const handleDefaultClick = (paymentMethodID) => {
    updateDefaultPaymentMethodIDToFirebase(paymentMethodID);
  };
  return (
    <>
      <div className="user-profile__title-container">
        <div className="user-profile__title">
          <div className="user-profile__label">
            Thẻ Tín Dụng/Ghi Nợ
            <button className="btn user-profile__card-add">Thêm thẻ mới</button>
          </div>
        </div>
      </div>
      <div className="payment-profile__payment-container">
        {paymentMethodList.map((item, index) => (
          <div key={index} className="payment-profile__payment-content">
            <div className="payment-profile__card-logo">{item.card.brand}</div>
            <div className="payment-profile__card-name">{item.card.brand}</div>
            {item.id === defaultPaymentMethodID && (
              <div className="payment-profile__card-default">default</div>
            )}
            <div className="payment-profile__card-spacer"></div>
            <div className="payment-profile__card-number">
              **** **** **** {item.card.last4}
            </div>
            <div className="payment-profile__btn-container">
              <div className="payment-profile__card-delete">Xóa</div>
              <button
                onClick={() => handleDefaultClick(item.id)}
                className="btn payment-profile__default-btn"
              >
                Thiết lập mặc định
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PaymentSmallContent;
