import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import validCardCheck from "card-validator";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "../axios";
export default function CardInfoModal(props) {
  const stripe = useStripe();
  const elements = useElements();
  const inputEl = useRef([]);
  const {
    isCardInfoShowing,
    toggleCardInfo,
    setCard4digits,
    setCardBrand,
    setPaymentMethodID,
    setCustomerID,
  } = props;
  const [nameIsValid, setNameIsValid] = useState(false);
  const [numberIsValid, setNumberIsValid] = useState(false);
  const [errorNumberMsg, setErrorNumberMsg] = useState(null);
  const [errorNameMsg, setErrorNameMsg] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [successed, setSuccessed] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleClick = () => {
    toggleCardInfo(!isCardInfoShowing);
  };

  const handleCardElChange = (e) => {
    setNumberIsValid(!e.error && e.complete ? true : false);
    setErrorNumberMsg(e.error ? e.error.message : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    if (!stripe || !elements) {
      return;
    }
    const cardEl = elements.getElement(CardElement);

    const response = await axios({
      method: "GET",
      url: "/create-setup-intent",
    });
    setCustomerID(response.data.customerID);

    const setUpIntentResult = await stripe.confirmCardSetup(
      response.data.setUpIntentSecret,
      {
        payment_method: {
          card: cardEl,
        },
      }
    );
    if (
      setUpIntentResult.setupIntent &&
      setUpIntentResult.setupIntent.status === "succeeded"
    ) {
      const paymentMethodID = setUpIntentResult.setupIntent.payment_method;
      console.log("create payment method success", paymentMethodID);
      setPaymentMethodID(paymentMethodID);

      const token = await stripe.createToken(cardEl);
      console.log(token);
      setCard4digits(token.token.card.last4);
      setCardBrand(token.token.card.brand);

      toggleCardInfo(!isCardInfoShowing);
      window.scrollTo({ top: 1000, left: 0, behavior: "smooth" });
      alert("Save card information success!");
    } else {
      console.log(setUpIntentResult);
      alert(setUpIntentResult.error.message);
      setProcessing(false);
    }
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };
  const handleInputChange = (e) => {
    switch (e.target.name) {
      case "name":
        let nameValidation = validCardCheck.cardholderName(e.target.value);
        if (e.target.value) {
          if (!nameValidation.isValid) {
            setNameIsValid(false);
            setErrorNameMsg(
              "The value must be alphabet characters or the following characters: apostrophe('), minus(-) and dot(.)."
            );
          } else {
            setNameIsValid(true);
            setErrorNameMsg("");
          }
        } else {
          setNameIsValid(false);
          setErrorNameMsg("Please enter credit card holder's name.");
        }
        break;
      default:
        break;
    }
  };
  // useEffect(() => {
  //   //create setup intent and get intent secret for Confirm later in client
  //   if (!setUpIntentSecret) {
  //     const getSetUpIntentSecret = async () => {
  //       const response = await axios({
  //         method: "GET",
  //         url: "/create-setup-intent",
  //       });
  //       setSetUpIntentSecret(response.data.setUpIntentSecret);
  //       setCustomerID(response.data.customerID);
  //     };
  //     getSetUpIntentSecret();
  //   }
  // }, [setCustomerID, setSetUpIntentSecret, setUpIntentSecret]);
  // set saved customer card info
  useEffect(() => {
    // effect
    const setInputCardInfo = () => {
      if (isCardInfoShowing === true) {
        // inputEl.current[0].value =
        //   cardInfo.name === undefined ? "" : cardInfo.name;
        // inputEl.current[1].value =
        //   cardInfo.number === undefined ? "" : cardInfo.number;
        // inputEl.current[2].value =
        //   cardInfo.expire === undefined ? "" : cardInfo.expire;
        // inputEl.current[3].value =
        //   cardInfo.cvv === undefined ? "" : cardInfo.cvv;
        // inputEl.current[4].value =
        //   cardInfo.address === undefined ? "" : cardInfo.address;
        // inputEl.current[5].value =
        //   cardInfo.postalCode === undefined ? "" : cardInfo.postalCode;
      }
    };
    setInputCardInfo();
  }, [isCardInfoShowing]);

  // Set submit button disabled
  useEffect(() => {
    setDisabled(nameIsValid && numberIsValid ? false : true);
  }, [nameIsValid, numberIsValid]);
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
              onKeyDown={handleKeyDown}
              onChange={handleInputChange}
              onBlur={handleInputChange}
              ref={(el) => (inputEl.current[0] = el)}
              type="text"
              name="name"
              className="cart-product__card-name"
              placeholder="Họ tên trên thẻ"
              required
            />
            {errorNameMsg && (
              <label className="cart-product__name-error">{errorNameMsg}</label>
            )}
            <div className="cart-product__number-wrapper">
              <CardElement onChange={handleCardElChange}></CardElement>
            </div>
            {errorNumberMsg && (
              <label className="cart-product__number-error">
                {errorNumberMsg}
              </label>
            )}
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
            {/* <input
              onKeyDown={handleKeyDown}
              onChange={handleInputChange}
              onBlur={handleInputChange}
              ref={(el) => (inputEl.current[5] = el)}
              type="text"
              name="postalcode"
              className="cart-product__address-postalcode"
              placeholder="Postal Code"
              maxLength="5"
              required
            />
            {errorPostalCodeMsg && (
              <label className="cart-product__postalcode-error">
                {errorPostalCodeMsg}
              </label>
            )} */}
          </div>
          <div className="cart-product__modal-footer">
            <button
              disabled={processing}
              onClick={handleClick}
              className="btn cart-product__modal-close"
            >
              Trở lại
            </button>
            <button
              disabled={processing || disabled || successed}
              type="submit"
              className="btn cart-product__modal-apply"
            >
              {processing ? "Processing" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
