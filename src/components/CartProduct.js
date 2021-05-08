import React, { Component } from "react";

export default class CartProduct extends Component {
  state = {
    checked: [],
  };

  componentDidMount = () => {
    const { cartItems } = this.props;
    const defaultChecked = cartItems.map((item) => false);
    this.setState({ checked: defaultChecked });
  };

  selectAll = (event) => {
    const { cartItems } = this.props;
    const { checked } = event.target;
    this.setState({ checked: cartItems.map((item) => checked) });
  };

  selectOne = (index, event) => {
    const { checked } = this.state;
    checked[index] = event.target.checked;
    this.setState({ checked });
  };

  handelClick = (index, event) => {
    this.props.changeVariationDisPlayCartItems(index, event);
  };

  render() {
    let { cartItems } = this.props;
    let { checked } = this.state;
    return (
      <div className="container">
        <div className="grid cart-product">
          <div className="cart-product__notify">
            <svg
              height="12"
              viewBox="0 0 20 12"
              width="20"
              className="app__free-ship-icon"
            >
              <g fill="none" fillRule="evenodd" transform="">
                <rect
                  fill="#00bfa5"
                  fillRule="evenodd"
                  height="9"
                  rx="1"
                  width="12"
                  x="4"
                ></rect>
                <rect
                  height="8"
                  rx="1"
                  stroke="#00bfa5"
                  width="11"
                  x="4.5"
                  y=".5"
                ></rect>
                <rect
                  fill="#00bfa5"
                  fillRule="evenodd"
                  height="7"
                  rx="1"
                  width="7"
                  x="13"
                  y="2"
                ></rect>
                <rect
                  height="6"
                  rx="1"
                  stroke="#00bfa5"
                  width="6"
                  x="13.5"
                  y="2.5"
                ></rect>
                <circle cx="8" cy="10" fill="#00bfa5" r="2"></circle>
                <circle cx="15" cy="10" fill="#00bfa5" r="2"></circle>
                <path
                  d="m6.7082481 6.7999878h-.7082481v-4.2275391h2.8488017v.5976563h-2.1405536v1.2978515h1.9603297v.5800782h-1.9603297zm2.6762505 0v-3.1904297h.6544972v.4892578h.0505892c.0980164-.3134765.4774351-.5419922.9264138-.5419922.0980165 0 .2276512.0087891.3003731.0263672v.6210938c-.053751-.0175782-.2624312-.038086-.3762568-.038086-.5122152 0-.8758247.3017578-.8758247.75v1.8837891zm3.608988-2.7158203c-.5027297 0-.8536919.328125-.8916338.8261719h1.7390022c-.0158092-.5009766-.3446386-.8261719-.8473684-.8261719zm.8442065 1.8544922h.6544972c-.1549293.571289-.7050863.9228515-1.49238.9228515-.9864885 0-1.5903965-.6269531-1.5903965-1.6464843 0-1.0195313.6165553-1.6669922 1.5872347-1.6669922.9580321 0 1.5366455.6064453 1.5366455 1.6083984v.2197266h-2.4314412v.0351562c.0221328.5595703.373095.9140625.9169284.9140625.4110369 0 .6924391-.1376953.8189119-.3867187zm2.6224996-1.8544922c-.5027297 0-.853692.328125-.8916339.8261719h1.7390022c-.0158091-.5009766-.3446386-.8261719-.8473683-.8261719zm.8442064 1.8544922h.6544972c-.1549293.571289-.7050863.9228515-1.49238.9228515-.9864885 0-1.5903965-.6269531-1.5903965-1.6464843 0-1.0195313.6165553-1.6669922 1.5872347-1.6669922.9580321 0 1.5366455.6064453 1.5366455 1.6083984v.2197266h-2.4314412v.0351562c.0221328.5595703.373095.9140625.9169284.9140625.4110369 0 .6924391-.1376953.8189119-.3867187z"
                  fill="#fff"
                ></path>
                <path d="m .5 8.5h3.5v1h-3.5z" fill="#00bfa5"></path>
                <path d="m0 10.15674h3.5v1h-3.5z" fill="#00bfa5"></path>
                <circle cx="8" cy="10" fill="#047565" r="1"></circle>
                <circle cx="15" cy="10" fill="#047565" r="1"></circle>
              </g>
            </svg>
            <span className="cart-product__text">
              Nhấn vào mục Mã giảm giá ở cuối trang để hưởng miễn phí vận chuyển
              bạn nhé!
            </span>
          </div>
          <div className="cart-product__header">
            <input
              name="all"
              onChange={this.selectAll}
              type="checkbox"
              className="grid__col cart-product__checkbox"
            />
            <div className="grid__col cart-product__product">Sản Phẩm</div>
            <div className="grid__col cart-product__price">Đơn Giá</div>
            <div className="grid__col cart-product__amount">Số Lượng</div>
            <div className="grid__col cart-product__total">Số Tiền</div>
            <div className="grid__col cart-product__action">Thao Tác</div>
          </div>
          {/* <div className="cart-shop">
            <input
              type="checkbox"
              onChange={selectOne}
              className="grid__col cart-shop__checkbox"
            />
            <div className="grid__col cart-shop__name">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="62"
                height="16"
                fill="none"
                className="cart-shop__name-icon"
              >
                <path
                  fill="#EE4D2D"
                  fillRule="evenodd"
                  d="M0 2C0 .9.9 0 2 0h58a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V2z"
                  clipRule="evenodd"
                ></path>
                <g clipPath="url(#clip0)">
                  <path
                    fill="#fff"
                    d="M8.7 13H7V8.7L5.6 6.3A828.9 828.9 0 004 4h2l2 3.3a1197.3 1197.3 0 002-3.3h1.6L8.7 8.7V13zm7.9-1.7h1.7c0 .3-.2.6-.5 1-.2.3-.5.5-1 .7l-.6.2h-.8c-.5 0-1 0-1.5-.2l-1-.8a4 4 0 01-.9-2.4c0-1 .3-1.9 1-2.6a3 3 0 012.4-1l.8.1a2.8 2.8 0 011.3.7l.4.6.3.8V10h-4.6l.2 1 .4.7.6.5.7.1c.4 0 .7 0 .9-.2l.2-.6v-.1zm0-2.3l-.1-1-.3-.3c0-.2-.1-.2-.2-.3l-.8-.2c-.3 0-.6.2-.9.5l-.3.5a4 4 0 00-.3.8h3zm-1.4-4.2l-.7.7h-1.4l1.5-2h1.1l1.5 2h-1.4l-.6-.7zm8.1 1.6H25V13h-1.7v-.5.1H23l-.7.5-.9.1-1-.1-.7-.4c-.3-.2-.4-.5-.6-.8l-.2-1.3V6.4h1.7v3.7c0 1 0 1.6.3 1.7.2.2.5.3.7.3h.4l.4-.2.3-.3.3-.5.2-1.4V6.4zM34.7 13a11.2 11.2 0 01-1.5.2 3.4 3.4 0 01-1.3-.2 2 2 0 01-.5-.3l-.3-.5-.2-.6V7.4h-1.2v-1h1.1V5h1.7v1.5h1.9v1h-2v3l.2 1.2.1.3.2.2h.3l.2.1c.2 0 .6 0 1.3-.3v1zm2.4 0h-1.7V3.5h1.7v3.4a3.7 3.7 0 01.2-.1 2.8 2.8 0 013.4 0l.4.4.2.7V13h-1.6V9.3 8.1l-.4-.6-.6-.2a1 1 0 00-.4.1 2 2 0 00-.4.2l-.3.3a3 3 0 00-.3.5l-.1.5-.1.9V13zm5.4-6.6H44V13h-1.6V6.4zm-.8-.9l1.8-2h1.8l-2.1 2h-1.5zm7.7 5.8H51v.5l-.4.5a2 2 0 01-.4.4l-.6.3-1.4.2c-.5 0-1 0-1.4-.2l-1-.7c-.3-.3-.5-.7-.6-1.2-.2-.4-.3-.9-.3-1.4 0-.5.1-1 .3-1.4a2.6 2.6 0 011.6-1.8c.4-.2.9-.3 1.4-.3.6 0 1 .1 1.5.3.4.1.7.4 1 .6l.2.5.1.5h-1.6c0-.3-.1-.5-.3-.6-.2-.2-.4-.3-.8-.3s-.8.2-1.2.6c-.3.4-.4 1-.4 2 0 .9.1 1.5.4 1.8.4.4.8.6 1.2.6h.5l.3-.2.2-.3v-.4zm4 1.7h-1.6V3.5h1.7v3.4a3.7 3.7 0 01.2-.1 2.8 2.8 0 013.4 0l.3.4.3.7V13h-1.6V9.3L56 8.1c-.1-.3-.2-.5-.4-.6l-.6-.2a1 1 0 00-.3.1 2 2 0 00-.4.2l-.3.3a3 3 0 00-.3.5l-.2.5V13z"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0">
                    <path
                      fill="#fff"
                      d="M0 0h55v16H0z"
                      transform="translate(4)"
                    ></path>
                  </clipPath>
                </defs>
              </svg>
              <span className="cart-shop-text">Bảo Hà Shop</span>
              <span className="cart-shop__chat">
                <svg viewBox="0 0 16 16" className="cart-shop__chat-icon ">
                  <g fillRule="evenodd">
                    <path d="M15 4a1 1 0 01.993.883L16 5v9.932a.5.5 0 01-.82.385l-2.061-1.718-8.199.001a1 1 0 01-.98-.8l-.016-.117-.108-1.284 8.058.001a2 2 0 001.976-1.692l.018-.155L14.293 4H15zm-2.48-4a1 1 0 011 1l-.003.077-.646 8.4a1 1 0 01-.997.923l-8.994-.001-2.06 1.718a.5.5 0 01-.233.108l-.087.007a.5.5 0 01-.492-.41L0 11.732V1a1 1 0 011-1h11.52zM3.646 4.246a.5.5 0 000 .708c.305.304.694.526 1.146.682A4.936 4.936 0 006.4 5.9c.464 0 1.02-.062 1.608-.264.452-.156.841-.378 1.146-.682a.5.5 0 10-.708-.708c-.185.186-.445.335-.764.444a4.004 4.004 0 01-2.564 0c-.319-.11-.579-.258-.764-.444a.5.5 0 00-.708 0z"></path>
                  </g>
                </svg>
              </span>
            </div>
          </div> */}
          {cartItems.map((item, index) => (
            <div key={index} className="cart-product__item">
              <input
                type="checkbox"
                checked={!!checked[index]}
                onChange={this.selectOne.bind(this, index)}
                className="grid__col cart-product__checkbox"
              />
              <div className="grid__col cart-product__overview">
                <img
                  src={require(`../img/${item.imageUrl}`).default}
                  alt="cart-product"
                  className="cart-product__img"
                />
                <span className="cart-product__name">{item.name}</span>
              </div>
              <div
                data-name="variation"
                onClick={this.handelClick.bind(this, index)}
                className="grid__col cart-product__variation"
              >
                <span className="cart-product__variation-label">
                  Phân Loại Hàng:
                  <span href="# " className="cart-product__variation-icon">
                    icon
                  </span>
                </span>
                <span className="cart-product__variation-numb">2kg</span>
                {cartItems[index].variationDisPlay && (
                  <div className="cart-product__variation-notify">
                    <div className="cart-product__arrow-outer">
                      <div className="cart-product__notify-arrow"></div>
                    </div>
                    <div className="cart-product__notify-content">
                      <div className="cart-product__notify-label">Màu Sắc:</div>
                      <div className="cart-product__variation-container">
                        <div className="cart-product__notify-variation cart-product__notify-variation--active">
                          1kg
                          <div className="cart-product__variation-tick">
                            <svg
                              enableBackground="new 0 0 12 12"
                              viewBox="0 0 12 12"
                              x="0"
                              y="0"
                              className="cart-product__tick-icon"
                            >
                              <g>
                                <path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path>
                              </g>
                            </svg>
                          </div>
                        </div>
                        <div className="cart-product__notify-variation">
                          2kg
                        </div>
                      </div>
                    </div>
                    <div className="cart-product__notify-button">
                      <button className="btn cart-product__notify-back">
                        Trở Lại
                      </button>
                      <button className="btn cart-product__notify-ok">
                        Xác nhận
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="grid__col cart-product__price">
                {/* cart-product__price-item--before  */}
                {/* cart-product__price-item--after  */}
                <span className="cart-product__price-item cart-product__price-item--before">
                  {item.price}
                </span>
                <span className="cart-product__price-item">{item.price}</span>
              </div>
              <div className="grid__col cart-product__amount">
                <span href="# " className="cart-product__amount-desc">
                  -
                </span>
                <span className="cart-product__amount-numb">{item.amount}</span>
                <span href="# " className="cart-product__amount-incr">
                  +
                </span>
              </div>
              <div className="grid__col cart-product__total">
                {item.price * item.amount}
              </div>
              <div className="grid__col cart-product__action">
                <span href="# " className="cart-product__action-del">
                  Xóa
                </span>
                <span className="cart-product__action-find">
                  <span className="cart-product__action-label">
                    Tìm sản phẩm tương tự:
                  </span>
                  <span href="# " className="cart-product__action-icon">
                    icon
                  </span>
                </span>
              </div>
            </div>
          ))}

          <div className="cart-voucher">
            <svg
              fill="none"
              viewBox="0 -2 23 22"
              className="grid__col cart-voucher__icon"
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
            <span className="grid__col cart-voucher-label">
              Thêm mã giảm giá của Shop
            </span>
          </div>
          <div className="cart-shipping">
            <svg
              enableBackground="new 0 0 15 15"
              viewBox="0 0 15 15"
              x="0"
              y="0"
              className="grid__col cart-shipping__icon"
            >
              <g>
                <line
                  fill="none"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  x1="8.6"
                  x2="4.2"
                  y1="9.8"
                  y2="9.8"
                ></line>
                <circle
                  cx="3"
                  cy="11.2"
                  fill="none"
                  r="2"
                  strokeMiterlimit="10"
                ></circle>
                <circle
                  cx="10"
                  cy="11.2"
                  fill="none"
                  r="2"
                  strokeMiterlimit="10"
                ></circle>
                <line
                  fill="none"
                  strokeMiterlimit="10"
                  x1="10.5"
                  x2="14.4"
                  y1="7.3"
                  y2="7.3"
                ></line>
                <polyline
                  fill="none"
                  points="1.5 9.8 .5 9.8 .5 1.8 10 1.8 10 9.1"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                ></polyline>
                <polyline
                  fill="none"
                  points="9.9 3.8 14 3.8 14.5 10.2 11.9 10.2"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                ></polyline>
              </g>
            </svg>
            <span className="grid__col cart-shipping__label">
              Miễn Phí Vận Chuyển cho đơn hàng từ ₫50.000 (giảm tối đa ₫25.000);
              Miễn Phí Vận Chuyển cho đơn hàng từ ₫300.000 (giảm tối đa ₫70.000)
            </span>
            <span className="grid__col cart-shipping__more">Tìm hiểu thêm</span>
          </div>
        </div>
      </div>
    );
  }
}
