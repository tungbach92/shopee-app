import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";

export default function PopupModal(props) {
  const history = useHistory();

  const {
    isAnyUserInfoUpdateFail,
    isAccountPage,
    isUpdateUserEmail,
    isUpdatingEmailProcess,
    setVerifyPassword,
    isWrongPassword,
    updateEmail,
    isCartPageLoaded,
    isVariationChoose,
    selectedItems,
    isCardInfoMustFilled,
    shipUnit,
    isPopupShowing,
    togglePopup,
    isInformation,
    isInfoEmpty,
    paymentMethod,
    setCheckoutProduct,
    setCartProduct,
    succeeded,
  } = props;
  const handleClick = (e) => {
    if (!isCartPageLoaded && !isAccountPage) {
      if (isInformation || isInfoEmpty) {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else if (!Object.keys(shipUnit).length) {
        window.scrollTo({ top: 300, left: 0, behavior: "smooth" });
      } else if (isCardInfoMustFilled) {
        window.scrollTo({ top: 700, left: 0, behavior: "smooth" });
      } else if (paymentMethod.length <= 0) {
        window.scrollTo({ top: 600, left: 0, behavior: "smooth" });
      } else if (succeeded) {
        history.replace("/user/order");
      }
      togglePopup(!isPopupShowing);
    } else if (isAccountPage && isUpdateUserEmail) {
      updateEmail();
    } else if (isAccountPage && !isUpdateUserEmail) {
      togglePopup(!isPopupShowing);
    }
  };
  const handleInputPwdKeyUp = (e) => {
    if (e.keyCode === 13) {
      updateEmail();
    }
  };
  return ReactDOM.createPortal(
    <div className="cart-product__modal">
      <div className="cart-product__modal-overlay"></div>
      <div className="cart-product__modal-container">
        <div className="cart-product__modal-header">
          <span className="cart-product__popup-label">
            {isAccountPage && isUpdateUserEmail ? (
              <>
                <label className="user-profile__password-label">Password</label>
                <input
                  type="password"
                  onChange={(e) => setVerifyPassword(e.target.value)}
                  onKeyUp={handleInputPwdKeyUp}
                  className="user-profile__password-input"
                />
                {isWrongPassword && (
                  <div className="user-profile__password-error">
                    Password incorrect! Please try again
                  </div>
                )}
              </>
            ) : isAccountPage && isAnyUserInfoUpdateFail ? (
              "Cập nhật thông tin tài khoản không thành công"
            ) : isAccountPage && !isAnyUserInfoUpdateFail ? (
              "Cập nhật thông tin tài khoản  thành công"
            ) : isCartPageLoaded && selectedItems?.length === 0 ? (
              "Bạn vẫn chưa chọn sản phẩm nào để mua."
            ) : isCartPageLoaded && isVariationChoose === false ? (
              "Bạn vẫn chưa chọn loại hay kích cỡ sản phẩm để mua."
            ) : isInformation === true || isInfoEmpty === true ? (
              "Vui lòng điền thông tin người mua và ấn Lưu."
            ) : !Object.keys(shipUnit).length ? (
              "Vui lòng chọn đơn vị vận chuyển."
            ) : paymentMethod?.length <= 0 ? (
              "Vui lòng chọn phương thức thanh toán."
            ) : isCardInfoMustFilled ? (
              "Vui lòng điền đầy đủ thông tin Thẻ Tín dụng/Ghi nợ"
            ) : succeeded ? (
              "Đặt hàng thành công"
            ) : (
              "Có lỗi xảy ra. Vui lòng thử lại sau hoặc liên hệ tổng đài"
            )}
          </span>
        </div>
        <div className="cart-product__popup-footer">
          <button
            onClick={isUpdatingEmailProcess ? undefined : handleClick}
            className={
              isUpdatingEmailProcess
                ? "btn cart-product__popup-apply cart-product__popup-apply--disabled"
                : "btn cart-product__popup-apply"
            }
          >
            {isUpdatingEmailProcess ? "Processing" : "OK"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
