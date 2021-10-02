import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";

export default function PopupModal(props) {
  const history = useHistory();

  const {
    isProductPage,
    isAccountPage,
    isAnyUserInfoUpdateFail,
    isUpdateEmailSuccess,
    isUpdatePasswordSuccess,
    handleDeleteTrue,
    shipInfoIndex,
    setShipInfoIndex,
    paymentMethodID,
    setPaymentMethodID,
    handlePaymentDeleteTrue,
    isSearchPage,
    isCartPageLoaded,
    deleteID,
    setDeleteID,
    isDeleteSelected,
    setIsDeleteSelected,
    handleDeleteSelectionTrue,
    handleDeleteCartTrue,
    isVariationChoose,
    selectedItems,
    isCardInfoMustFilled,
    shipUnit,
    isPopupShowing,
    togglePopup,
    paymentMethod,
    defaultPaymentMethodID,
    isCardPayment,
    succeeded,
  } = props;

  const handleBackClick = (e) => {
    togglePopup(!isPopupShowing);

    // set those values to defaultm undefined if setState function true
    if (setDeleteID) {
      setDeleteID();
    }
    if (setPaymentMethodID) {
      setPaymentMethodID();
    }
    if (setShipInfoIndex) {
      setShipInfoIndex();
    }
    if(setIsDeleteSelected) {
      setIsDeleteSelected(false);
    }
  };

  const handleApplyClick = (e) => {
    togglePopup(!isPopupShowing);
    if (
      !isCartPageLoaded &&
      !isAccountPage &&
      !isSearchPage &&
      !isProductPage
    ) {
      if (!Object.keys(shipUnit).length) {
        window.scrollTo({ top: 300, left: 0, behavior: "smooth" });
      } else if (isCardInfoMustFilled) {
        window.scrollTo({ top: 700, left: 0, behavior: "smooth" });
      } else if (paymentMethod.length <= 0) {
        window.scrollTo({ top: 600, left: 0, behavior: "smooth" });
      } else if (succeeded) {
        history.replace("/user/purchase");
      }
    }

    if (
      isAccountPage &&
      typeof shipInfoIndex === "undefined" &&
      typeof paymentMethodID === "undefined"
    ) {
      history.replace("/user");
    } else if (isAccountPage && typeof shipInfoIndex !== "undefined") {
      handleDeleteTrue(shipInfoIndex);
      setShipInfoIndex();
    } else if (isAccountPage && typeof paymentMethodID !== "undefined") {
      handlePaymentDeleteTrue(paymentMethodID);
      setPaymentMethodID();
    }

    if ((isCartPageLoaded || isSearchPage || isProductPage) && typeof deleteID !== "undefined") {
      handleDeleteCartTrue(deleteID);
      setDeleteID();
    }

    if ((isCartPageLoaded || isSearchPage || isProductPage) && isDeleteSelected) {
      handleDeleteSelectionTrue();
      setIsDeleteSelected(false);
    }
  };

  return ReactDOM.createPortal(
    <div className="cart-product__modal">
      <div className="cart-product__modal-overlay"></div>
      <div className="cart-product__modal-container">
        <div className="cart-product__modal-header">
          <span className="cart-product__popup-label">
            {isAccountPage && isUpdateEmailSuccess
              ? "Cập nhật địa chỉ email thành công"
              : isAccountPage && isUpdatePasswordSuccess
              ? "Cập nhật mật khẩu thành công"
              : isAccountPage && typeof shipInfoIndex !== "undefined"
              ? "Bạn chắc chắn muốn xóa địa chỉ này?"
              : isAccountPage && typeof paymentMethodID !== "undefined"
              ? "Bạn chắc chắn muốn xóa thẻ này?"
              : isAccountPage &&
                !isAnyUserInfoUpdateFail &&
                typeof isAnyUserInfoUpdateFail !== "undefined"
              ? "Cập nhật thông tin người dùng thành công"
              : (isCartPageLoaded || isSearchPage || isProductPage) &&
                (typeof deleteID !== "undefined" || isDeleteSelected)
              ? "Bạn chắc chắn muốn xóa (các) sản phẩm này khỏi giỏ hàng ?"
              : isCartPageLoaded && selectedItems?.length === 0
              ? "Bạn vẫn chưa chọn sản phẩm nào để mua."
              : isCartPageLoaded && isVariationChoose === false
              ? "Bạn vẫn chưa chọn loại hay kích cỡ sản phẩm để mua."
              : !Object.keys(shipUnit).length
              ? "Vui lòng chọn đơn vị vận chuyển."
              : paymentMethod?.length <= 0
              ? "Vui lòng chọn phương thức thanh toán."
              : isCardPayment && typeof defaultPaymentMethodID === "undefined"
              ? "Vui lòng điền thông tin hoặc chọn Thẻ Tín dụng/Ghi nợ ở mục Chọn thẻ"
              : succeeded
              ? "Đặt hàng thành công"
              : "Có lỗi xảy ra. Vui lòng thử lại sau hoặc liên hệ tổng đài"}
          </span>
        </div>
        <div className="cart-product__popup-footer">
          {(isAccountPage ||
            isCartPageLoaded ||
            isSearchPage ||
            isProductPage) &&
            (typeof shipInfoIndex !== "undefined" ||
              typeof paymentMethodID !== "undefined" ||
              typeof deleteID !== "undefined" || isDeleteSelected) && (
              <button
                className="btn cart-product__popup-cancle"
                onClick={handleBackClick}
              >
                Back
              </button>
            )}

          <button
            onClick={handleApplyClick}
            className="btn cart-product__popup-apply"
          >
            OK
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
