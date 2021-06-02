import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import visaImg from "../img/visa.png";
import masterImg from "../img/master.png";
import jcbImg from "../img/jcb.png";
import expressImg from "../img/express.png";
import validCardCheck from "card-validator";
import classNames from "classnames";
export default function CardInfoModal(props) {
  const inputEl = useRef([]);
  const { isCardInfoShowing, toggleCardInfo, cardInfo, setCardInfo } = props;
  const [isNameValid, setIsNameValid] = useState(true);
  const [isNumberValid, setIsNumberValid] = useState(true);
  const [isExpireValid, setIsExpireValid] = useState(true);
  const [isCvvValid, setIsCvvValid] = useState(true);
  const [isPostalCodeValid, setIsPostalCodeValid] = useState(true);
  const [isVisa, setIsVisa] = useState(false);
  const [isMaster, setIsMaster] = useState(false);
  const [isJcb, setIsJcb] = useState(false);
  const [isExpress, setIsExpress] = useState(false);
  const handleClick = () => {
    toggleCardInfo(!isCardInfoShowing);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    if (name === "number") {
      let value = e.target.value;
      let newValue = "";
      value = value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
      for (let i = 0; i < value.length; i++) {
        if (i % 4 === 0 && i > 0) newValue = newValue.concat(" ");
        newValue = newValue.concat(value[i]);
      }
      e.target.value = newValue;
    }
    if (name === "expire") {
      let expdate = e.target.value;
      let expDateFormatter =
        expdate
          .replace(/[^0-9.]/g, "")
          .replace(/(\..*)\./g, "$1")
          .substring(0, 2) +
        (expdate.length > 2 ? "/" : "") +
        expdate
          .replace(/[^0-9.]/g, "")
          .replace(/(\..*)\./g, "$1")
          .substring(2, 4);
      e.target.value = expDateFormatter;
    }
    if (name === "cvv" || name === "postalcode") {
      e.target.value = e.target.value
        .replace(/[^0-9.]/g, "")
        .replace(/(\..*)\./g, "$1");
    }
  };

  const handleSubmit = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
    inputEl.current.forEach((item) => {
      item.focus();
      item.blur();
    });
    if (
      isNameValid &&
      isNumberValid &&
      isExpireValid &&
      isCvvValid &&
      isPostalCodeValid
    ) {
      const name = inputEl.current[0].value;
      const number = inputEl.current[1].value;
      const type = validCardCheck.number(number).card.type;
      const expire = inputEl.current[2].value;
      const cvv = inputEl.current[3].value;
      const address = inputEl.current[4].value;
      const postalCode = inputEl.current[5].value;

      const newCardInfo = {
        name,
        type,
        number,
        expire,
        cvv,
        address,
        postalCode,
      };
      setCardInfo(newCardInfo);
      toggleCardInfo(!isCardInfoShowing);
    } else {
      e.preventDefault();
    }
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };
  const handleBlur = (e) => {
    switch (e.target.name) {
      case "name":
        let nameValidation = validCardCheck.cardholderName(e.target.value);
        if (!nameValidation.isValid) {
          setIsNameValid(false);
        } else {
          setIsNameValid(true);
        }
        break;
      case "number":
        let numberValidation = validCardCheck.number(e.target.value);
        if (!numberValidation.isValid) {
          setIsNumberValid(false);
        } else {
          setIsNumberValid(true);
        }
        const type = numberValidation.card?.type;
        if (type === "visa") {
          setIsVisa((isVisa) => (isVisa = true));
        } else {
          setIsVisa((isVisa) => (isVisa = false));
        }
        if (type === "american-express") {
          setIsExpress((isExpress) => (isExpress = true));
        } else {
          setIsExpress((isExpress) => (isExpress = false));
        }
        if (type === "mastercard") {
          setIsMaster((isMaster) => (isMaster = true));
        } else {
          setIsMaster((isMaster) => (isMaster = false));
        }
        if (type === "jcb") {
          setIsJcb((isJcb) => (isJcb = true));
        } else {
          setIsJcb((isJcb) => (isJcb = false));
        }
        break;
      case "expire":
        let expireValidation = validCardCheck.expirationDate(e.target.value);
        if (!expireValidation.isValid) {
          setIsExpireValid(false);
        } else {
          setIsExpireValid(true);
        }
        break;
      case "cvv":
        let cvvValidation = validCardCheck.cvv(e.target.value);
        if (!cvvValidation.isValid) {
          setIsCvvValid(false);
        } else {
          setIsCvvValid(true);
        }
        break;
      case "postalcode":
        let postalcodeValidation = validCardCheck.postalCode(e.target.value);
        if (!postalcodeValidation.isValid) {
          setIsPostalCodeValid(false);
        } else {
          setIsPostalCodeValid(true);
        }
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    // effect
    const setInputCardInfo = () => {
      if (isCardInfoShowing === true) {
        inputEl.current[0].value =
          cardInfo.name === undefined ? "" : cardInfo.name;
        inputEl.current[1].value =
          cardInfo.number === undefined ? "" : cardInfo.number;
        inputEl.current[2].value =
          cardInfo.expire === undefined ? "" : cardInfo.expire;
        inputEl.current[3].value =
          cardInfo.cvv === undefined ? "" : cardInfo.cvv;
        inputEl.current[4].value =
          cardInfo.address === undefined ? "" : cardInfo.address;
        inputEl.current[5].value =
          cardInfo.postalCode === undefined ? "" : cardInfo.postalCode;
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
        <form onSubmit={handleSubmit}>
          <div className="cart-product__card-info">
            <label className="cart-product__card-label">Chi tiết thẻ</label>
            <input
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              ref={(el) => (inputEl.current[0] = el)}
              type="text"
              name="name"
              className="cart-product__card-name"
              placeholder="Họ tên trên thẻ"
              required
            />
            {!isNameValid && (
              <label className="cart-product__name-error">
                Tên thẻ không đúng
              </label>
            )}
            <div className="cart-product__number-wrapper">
              <input
                type="tel"
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                ref={(el) => (inputEl.current[1] = el)}
                name="number"
                className="cart-product__card-number"
                placeholder="Số thẻ"
                maxLength="19"
                required
              />
              <img
                src={visaImg}
                alt="visa"
                className={classNames("cart-product__card-visa", {
                  "cart-product__card-visa--enable": isVisa,
                })}
              />
              {/* if cardInfo.number => img */}
              <img
                src={masterImg}
                alt="master"
                className={classNames("cart-product__card-master", {
                  "cart-product__card-master--enable": isMaster,
                })}
              />
              <img
                src={jcbImg}
                alt="jcb"
                className={classNames("cart-product__card-jcb", {
                  "cart-product__card-jcb--enable": isJcb,
                })}
              />
              <img
                src={expressImg}
                alt="express"
                className={classNames("cart-product__card-express", {
                  "cart-product__card-express--enable": isExpress,
                })}
              />
            </div>
            {!isNumberValid && (
              <label className="cart-product__number-error">
                Số thẻ không đúng
              </label>
            )}
            <div className="cart-product__expirecvv-wrapper">
              <div className="cart-product__expire-wrapper">
                <input
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  onChange={handleChange}
                  ref={(el) => (inputEl.current[2] = el)}
                  type="text"
                  name="expire"
                  className="cart-product__card-expire"
                  placeholder="Ngày hết hạn (MM / YY)"
                  required
                />
                {!isExpireValid && (
                  <label className="cart-product__expire-error">
                    HSD không đúng
                  </label>
                )}
              </div>
              <div className="cart-product__cvv-wrapper">
                <input
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  onChange={handleChange}
                  ref={(el) => (inputEl.current[3] = el)}
                  type="text"
                  name="cvv"
                  className="cart-product__card-cvv"
                  placeholder="Mã CVV"
                  maxLength="3"
                  required
                />
                {!isCvvValid && (
                  <label className="cart-product__cvv-error">
                    Mã CVV không đúng
                  </label>
                )}
              </div>
            </div>
          </div>
          <div className="cart-product__card-address">
            <label className="cart-product__address-label">
              Billing Address
            </label>
            <input
              onKeyDown={handleKeyDown}
              ref={(el) => (inputEl.current[4] = el)}
              type="text"
              name="address"
              className="cart-product__address-text"
              placeholder="Address"
            />
            <input
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              ref={(el) => (inputEl.current[5] = el)}
              type="text"
              name="postalcode"
              className="cart-product__address-postalcode"
              placeholder="Postal Code"
              maxLength="5"
              required
            />
            {!isPostalCodeValid && (
              <label className="cart-product__postalcode-error">
                Mã Postal không đúng
              </label>
            )}
          </div>
          <div className="cart-product__modal-footer">
            <button
              onClick={handleClick}
              className="btn cart-product__modal-close"
            >
              Trở lại
            </button>
            <button type="submit" className="btn cart-product__modal-apply">
              OK
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
