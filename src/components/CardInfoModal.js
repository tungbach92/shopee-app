import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
export default function CardInfoModal(props) {
  const inputEl = useRef([]);
  const { isCardInfoShowing, toggleCardInfo, cardInfo, setCardInfo } = props;
  const handleClick = () => {
    toggleCardInfo(!isCardInfoShowing);
  };
  const handleApply = () => {
    const name = inputEl.current[0].value;
    const number = inputEl.current[1].value;
    const expire = inputEl.current[2].value;
    const cvv = inputEl.current[3].value;
    const address = inputEl.current[4].value;
    const postalCode = inputEl.current[5].value;
    const newCardInfo = {
      name,
      number,
      expire,
      cvv,
      address,
      postalCode,
    };
    setCardInfo(newCardInfo);
    toggleCardInfo(!isCardInfoShowing);
  };

  useEffect(() => {
    // effect
    const setInputCardInfo = () => {
      if (isCardInfoShowing === true) {
        inputEl.current[0].value = cardInfo.name;
        inputEl.current[1].value = cardInfo.number;
        inputEl.current[2].value = cardInfo.expire;
        inputEl.current[3].value = cardInfo.cvv;
        inputEl.current[4].value = cardInfo.address;
        inputEl.current[5].value = cardInfo.postalCode;
      }
    };
    setInputCardInfo();
    return () => {
      // cleanup
    };
  }, [cardInfo, isCardInfoShowing]);
  return ReactDOM.createPortal(
    <div className="cart-product__modal">
      <div className="cart-product__modal-overlay"></div>
      <div className="cart-product__modal-container">
        <div className="cart-product__modal-header">
          <span className="cart-product__header-label">Thêm thẻ</span>
        </div>
        <div className="cart-product__modal-protect">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cart-product__protect-icon"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.8918 5.24381C16.8918 5.00972 16.7356 4.85363 16.5016 4.77555L10.3362 3.05857C10.102 2.98048 9.78989 2.98048 9.6338 3.05857L3.46826 4.77555C3.23408 4.85354 3.15599 5.00964 3.07809 5.24379C3.07809 5.25036 3.07588 5.27348 3.07221 5.31193C3.0322 5.73092 2.81832 7.97093 3.39016 10.4729C3.78035 12.1119 4.40477 13.5167 5.3413 14.6871C6.434 16.092 7.91688 17.1066 9.71182 17.731C9.868 17.809 10.0241 17.809 10.2582 17.731C12.0532 17.1068 13.536 16.092 14.6287 14.6871C15.4872 13.5167 16.1896 12.1119 16.5797 10.4729C17.1515 7.97061 16.9377 5.7305 16.8977 5.31184L16.8977 5.31176C16.894 5.27341 16.8918 5.25036 16.8918 5.24381H16.8918ZM15.487 10.2385C14.7065 13.5163 12.8336 15.7017 9.9459 16.6382C7.05825 15.6236 5.1852 13.5163 4.40479 10.2385C3.93651 8.20937 4.0146 6.41441 4.09261 5.63389L9.9459 3.99502L15.7993 5.63389C15.8772 6.41441 15.9553 8.28755 15.487 10.2385L15.487 10.2385ZM7.0582 10.6288L9.00933 12.5017C9.08734 12.5798 9.24351 12.6579 9.39969 12.6579C9.55577 12.6579 9.71176 12.5797 9.78985 12.5017L13.3799 9.14591C13.614 8.91183 13.614 8.59956 13.3799 8.36548C13.1457 8.13131 12.8336 8.13131 12.5993 8.36548L9.3995 11.3311L7.83873 9.84834C7.60456 9.61417 7.29228 9.61417 7.0582 9.84834C6.82403 10.0824 6.82403 10.3947 7.0582 10.6288Z"
              fill="#66CC00"
            ></path>
          </svg>
          <div className="cart-product__protect-label">
            Thông tin thẻ của bạn được bảo mật.
          </div>
          <div className="cart-product__protect-info">
            Chúng tôi hợp tác với CyberSource để đảm bảo thông tin thẻ của bạn
            được giữ an toàn và bảo mật. Shopee sẽ không có quyền truy cập vào
            thông tin thẻ của bạn.
          </div>
        </div>
        <div className="cart-product__card-info">
          <label className="cart-product__card-label">Chi tiết thẻ</label>
          <input
            ref={(el) => (inputEl.current[0] = el)}
            type="text"
            className="cart-product__card-name"
            placeholder="Họ tên trên thẻ"
          />
          <div className="cart-product__number-wrapper">
            <input
              ref={(el) => (inputEl.current[1] = el)}
              type="text"
              className="cart-product__card-number"
              placeholder="Số thẻ"
            />
            <button className="btn cart-product__card-visa"></button>
            <button className="btn cart-product__card-master"></button>
            <button className="btn cart-product__card-jcb"></button>
            <button className="btn cart-product__card-express"></button>
          </div>
          <div className="cart-product__expire-wrapper">
            <input
              ref={(el) => (inputEl.current[2] = el)}
              type="text"
              className="cart-product__card-expire"
              placeholder="Ngày hết hạn (MM / YY)"
            />
            <input
              ref={(el) => (inputEl.current[3] = el)}
              type="text"
              className="cart-product__card-cvv"
              placeholder="Mã CVV"
            />
          </div>
        </div>
        <div className="cart-product__card-address">
          <label className="cart-product__address-label">Billing Address</label>
          <input
            ref={(el) => (inputEl.current[4] = el)}
            type="text"
            className="cart-product__address-text"
            placeholder="Address"
          />
          <input
            ref={(el) => (inputEl.current[5] = el)}
            type="text"
            className="cart-product__address-postalcode"
            placeholder="Postal Code"
          />
        </div>
        <div className="cart-product__modal-footer">
          <button
            onClick={handleClick}
            className="btn cart-product__modal-close"
          >
            Trở lại
          </button>
          <button
            onClick={handleApply}
            className="btn cart-product__modal-apply"
          >
            OK
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
