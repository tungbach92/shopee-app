import React, { useContext, useState } from "react";
import { ProductContext } from "../context";
import useModal from "../hooks/useModal";
import PopupModal from "./PopupModal";
import CardInfoModal from "./CardInfoModal";
const PaymentSmallContent = ({ isAccountPage }) => {
  const {
    paymentMethodList,
    setPaymentMethodList,
    customerID,
    getPaymentMethodList,
    defaultPaymentMethodID,
    updateDefaultPaymentMethodIDToFirebase,
    getCardImgByBrand,
    detachPaymentMethod,
  } = useContext(ProductContext);
  const [paymentMethodID, setPaymentMethodID] = useState();
  const { isPopupShowing, togglePopup, isCardInfoShowing, toggleCardInfo } =
    useModal();

  const handleAddCardClick = () => {
    toggleCardInfo(!isCardInfoShowing);
  };

  const handlePaymentDeleteClick = (id) => {
    setPaymentMethodID(id);
    togglePopup(!isPopupShowing);
  };

  const handlePaymentDeleteTrue = (id) => {
    detachPaymentMethod(id);
  };

  const handleDefaultClick = (paymentMethodID) => {
    if (paymentMethodID === defaultPaymentMethodID) {
      return;
    }
    updateDefaultPaymentMethodIDToFirebase(paymentMethodID);
  };
  return (
    <>
      <div className="user-profile__title-container">
        <div className="user-profile__title">
          <div className="user-profile__label">
            Thẻ Tín Dụng/Ghi Nợ
            <button
              onClick={handleAddCardClick}
              className="btn user-profile__card-add"
            >
              Thêm thẻ mới
            </button>
            {isCardInfoShowing && (
              <CardInfoModal
                isCardInfoShowing={isCardInfoShowing}
                toggleCardInfo={toggleCardInfo}
              ></CardInfoModal>
            )}
          </div>
        </div>
      </div>
      <div className="payment-profile__payment-container">
        {paymentMethodList.length > 0 ? (
          paymentMethodList.map((item, index) => (
            <div key={index} className="payment-profile__payment-content">
              <img
                src={getCardImgByBrand(item.card.brand)}
                alt="card-brand"
                className="payment-profile__card-logo"
              />
              <div className="payment-profile__card-name">
                {item.card.brand}
              </div>
              {item.id === defaultPaymentMethodID && (
                <div className="payment-profile__card-default">Mặc định</div>
              )}
              <div className="payment-profile__card-spacer"></div>
              <div className="payment-profile__card-number">
                **** **** **** {item.card.last4}
              </div>
              <div className="payment-profile__btn-container">
                <div
                  onClick={() => handlePaymentDeleteClick(item.id)}
                  className="payment-profile__card-delete"
                >
                  Xóa
                </div>
                {isPopupShowing && (
                  <PopupModal
                    isAccountPage={isAccountPage}
                    isPopupShowing={isPopupShowing}
                    togglePopup={togglePopup}
                    paymentMethodID={paymentMethodID}
                    setPaymentMethodID={setPaymentMethodID}
                    handlePaymentDeleteTrue={handlePaymentDeleteTrue}
                  ></PopupModal>
                )}
                <button
                  onClick={() => handleDefaultClick(item.id)}
                  className={
                    item.id === defaultPaymentMethodID
                      ? "btn payment-profile__default-btn payment-profile__default-btn--disabled "
                      : "btn payment-profile__default-btn"
                  }
                >
                  Thiết lập mặc định
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="payment-profile__payment-empty">
            Bạn chưa liên kết thẻ
          </div>
        )}
      </div>
    </>
  );
};

export default PaymentSmallContent;
