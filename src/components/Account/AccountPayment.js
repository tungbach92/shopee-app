import React, { useState } from "react";
import useModal from "../../hooks/useModal";
import PopupModal from "../Modal/PopupModal";
import CardInfoModal from "../Modal/CardInfoModal";
import { ClipLoader } from "react-spinners";
import usePaymentMethodList from "../../hooks/usePaymentMethodList";
import useDefaultPaymentMethodID from "../../hooks/useDefaultPaymentMethodID";
import { updateDefaultPaymentMethodIDToStripe } from "../../services/updateDefaultPaymentMethodIDToStripe";
import { getCardImgByBrand } from "../../services/getCardImgByBrand";
import { detachPaymentMethodID } from "../../services/detachPaymentMethodID";
import { useUser } from "../../context/UserProvider";
import getCustomerID from "../../services/getCustomerID";
import useNavigateAndRefreshBlocker from "../../hooks/useNavigateAndRefreshBlocker";
const AccountPayment = () => {
  const { user } = useUser();
  //TODO: payment and check out context
  const {
    defaultPaymentMethodID,
    setDefaultPaymentMethodID,
    defaultPaymentMethodIDLoading,
  } = useDefaultPaymentMethodID(user);
  const {
    paymentMethodList,
    deletePaymentMethod,
    setPaymentMethodList,
    paymentMethodListLoading,
  } = usePaymentMethodList(user, setDefaultPaymentMethodID);
  const [paymentMethodID, setPaymentMethodID] = useState();
  const [deletePaymentLoading, setDeletePaymentLoading] = useState(false);
  const [defaultPMIDUpdateLoading, setDefaultPMIDUpdateLoading] =
    useState(false);
  const { isPopupShowing, togglePopup, isCardInfoShowing, toggleCardInfo } =
    useModal();

  useNavigateAndRefreshBlocker(
    defaultPaymentMethodIDLoading ||
      deletePaymentLoading ||
      defaultPMIDUpdateLoading
  );

  const handleAddCardClick = () => {
    toggleCardInfo(!isCardInfoShowing);
  };

  const handlePaymentDeleteClick = (id) => {
    setPaymentMethodID(id);
    togglePopup(!isPopupShowing);
  };

  const handlePaymentDeleteTrue = async (id) => {
    setDeletePaymentLoading(true);
    const customerID = await getCustomerID(user);
    const paymentMethod = await detachPaymentMethodID(customerID, id);
    setDeletePaymentLoading(false);
    deletePaymentMethod(paymentMethod.id);
  };

  const handleDefaultClick = async (paymentMethodID) => {
    setDefaultPMIDUpdateLoading(true);
    if (paymentMethodID === defaultPaymentMethodID) {
      return;
    }
    await updateDefaultPaymentMethodIDToStripe(user, paymentMethodID);
    setDefaultPMIDUpdateLoading(false);
    setDefaultPaymentMethodID(paymentMethodID);
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
                paymentMethodList={paymentMethodList}
                setPaymentMethodList={setPaymentMethodList}
                isCardInfoShowing={isCardInfoShowing}
                toggleCardInfo={toggleCardInfo}
              ></CardInfoModal>
            )}
          </div>
        </div>
      </div>
      <div className="payment-profile__payment-container">
        {paymentMethodListLoading ? (
          <div className="payment-profile__payment-loading">
            <ClipLoader color="var(--primary-color)" />
          </div>
        ) : paymentMethodList.length === 0 && !paymentMethodListLoading ? (
          <div className="payment-profile__payment-empty">
            Bạn chưa liên kết thẻ
          </div>
        ) : (
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
                {item.id !== defaultPaymentMethodID && (
                  <div
                    onClick={() => handlePaymentDeleteClick(item.id)}
                    className="payment-profile__card-delete"
                  >
                    Xóa
                  </div>
                )}

                {isPopupShowing && (
                  <PopupModal
                    isAccountPage={true}
                    isPopupShowing={isPopupShowing}
                    togglePopup={togglePopup}
                    paymentMethodID={paymentMethodID}
                    setPaymentMethodID={setPaymentMethodID}
                    handlePaymentDeleteTrue={handlePaymentDeleteTrue}
                  ></PopupModal>
                )}
                <button
                  disabled={item.id === defaultPaymentMethodID}
                  onClick={() => handleDefaultClick(item.id)}
                  className="btn payment-profile__default-btn"
                >
                  Thiết lập mặc định
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default AccountPayment;
