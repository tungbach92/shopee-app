import React, { useContext, useEffect } from "react";
import qrCodeNavImg from "../img/qr-code-home.png";
import appShopeeImg from "../img/app-shopee.png";
import ggShopeeImg from "../img/gg-shopee.png";
import appGalShopeeImg from "../img/app-gal-shopee.png";
import shirtImg from "../img/ao.png";
import { Link, useHistory } from "react-router-dom";
import { ProductContext } from "../context";
import { auth } from "../firebase";

export default function HeaderNav() {
  const history = useHistory();
  const {
    user,
    cartItems,
    checkoutItems,
    saveCartItemsToFirebase,
    saveCheckoutItemsToFirebase,
    setCartProduct,
    setCheckoutProduct,
    userAvatar,
  } = useContext(ProductContext);
  const handleLogout = () => {
    if (user) {
      saveCartItemsToFirebase(user, cartItems);
      saveCheckoutItemsToFirebase(user, checkoutItems);
      setCartProduct([]);
      setCheckoutProduct([]);
      auth.signOut();
      history.replace("/login");
    }
  };
  return (
    <nav className="header__nav">
      <div className="header__nav-list">
        <li className="header__nav-item">
          <a href="# " className="header__nav-item-link">
            Kênh Người Bán
          </a>
        </li>
        <li className="header__nav-item header__nav-item--qr">
          <a href="# " className="header__nav-item-link">
            Tải ứng dụng
          </a>
          <div className="header__nav-qr">
            <img
              src={qrCodeNavImg}
              alt="qr-code"
              className="header__nav-qr-img"
            />
            <a href="https://www.google.com/" className="header__nav-app">
              <img
                src={appShopeeImg}
                alt="qr-code"
                className="header__nav-app-img"
              />
              <img
                src={ggShopeeImg}
                alt="qr-code"
                className="header__nav-app-img"
              />
              <img
                src={appGalShopeeImg}
                alt="qr-code"
                className="header__nav-app-img header__nav-app-img--smaller"
              />
            </a>
          </div>
        </li>

        <li className="header__nav-item">
          Kết nối
          <a href="# " className="header__nav-item-link">
            <i className="header__nav-icon bi bi-facebook"></i>
          </a>
          <a href="# " className="header__nav-item-link">
            <i className="header__nav-icon bi bi-instagram"></i>
          </a>
        </li>
      </div>
      <ul className="header__nav-list">
        <li className="header__nav-item-right header__nav-item-right--notify">
          <a href="# " className="header__nav-item-link">
            <i className="header__nav-icon bi bi-bell"></i>Thông Báo
          </a>
          <div className="header__notify">
            <div className="header__notify-arrow"></div>
            <div className="header__notify-title">Thông Báo Mới Nhận</div>
            <div className="header__notify-news">
              <a href="# " className="header__notify-link">
                <div className="header__notify-img">
                  <img src={shirtImg} alt="" />
                </div>
                <div className="header__notify-info">
                  <p>Xem bài đăng của shoppevn:</p>
                  <p>CHIA SẺ KẾT QUẢ LẮC XU - TẶNG THƯỞNG THÊM...</p>
                </div>
              </a>
            </div>
            <div className="header__notify-news">
              <a href="# " className="header__notify-link">
                <div className="header__notify-img">
                  <img src={shirtImg} alt="" />
                </div>
                <div className="header__notify-info">
                  <p>Xem bài đăng của shoppevn:</p>
                  <p>CHIA SẺ KẾT QUẢ LẮC XU - TẶNG THƯỞNG THÊM...</p>
                </div>
              </a>
            </div>
            <div className="header__notify-news">
              <a href="# " className="header__notify-link">
                <div className="header__notify-img">
                  <img src={shirtImg} alt="" />
                </div>
                <div className="header__notify-info">
                  <p>Xem bài đăng của shoppevn:</p>
                  <p>CHIA SẺ KẾT QUẢ LẮC XU - TẶNG THƯỞNG THÊM...</p>
                </div>
              </a>
            </div>
            <div className="header__notify-user">
              <a href="# " className="header__notify-link">
                <div className="header__notify-img">
                  <img src={shirtImg} alt="" />
                </div>
                <div className="header__notify-info">
                  <p>Xem bài đăng của shoppevn:</p>
                  <p>CHIA SẺ KẾT QUẢ LẮC XU - TẶNG THƯỞNG THÊM...</p>
                </div>
              </a>
            </div>
            <div className="header__notify-user">
              <a href="# " className="header__notify-link">
                <div className="header__notify-img">
                  <img src={shirtImg} alt="" />
                </div>
                <div className="header__notify-info">
                  <p>Xem bài đăng của shoppevn:</p>
                  <p>CHIA SẺ KẾT QUẢ LẮC XU - TẶNG THƯỞNG THÊM...</p>
                </div>
              </a>
            </div>
            <a href="# " className="header__notify-showAll">
              Xem tất cả
            </a>
          </div>
        </li>
        <li className="header__nav-item-right">
          <a href="# " className="header__nav-item-link">
            <i className="header__nav-icon bi bi-question-circle"></i>Trợ Giúp
          </a>
        </li>
        {/* Logged:  header__nav-item-right--user */}
        <div
          className={
            user
              ? "header__nav-item-right header__nav-item-right--user"
              : "header__nav-item-right header__nav-item-right--reg"
          }
        >
          <div className="header__nav-reg">
            <Link to="/register" className="header__nav-login">
              Đăng ký
            </Link>
            <Link to="/login" className="header__nav-register">
              Đăng nhập
            </Link>
          </div>
          <a href="# " className="header__nav-login-link">
            {userAvatar ? (
              <img
                src={userAvatar}
                alt="userAvater"
                className="header__nav-avatar"
              />
            ) : (
              <div className="header__nav-noavatar">
                <svg
                  enableBackground="new 0 0 15 15"
                  viewBox="0 0 15 15"
                  x="0"
                  y="0"
                  className="header__noavatar-svg"
                >
                  <g>
                    <circle
                      cx="7.5"
                      cy="4.5"
                      fill="none"
                      r="3.8"
                      strokeMiterlimit="10"
                    ></circle>
                    <path
                      d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6"
                      fill="none"
                      strokeLinecap="round"
                      strokeMiterlimit="10"
                    ></path>
                  </g>
                </svg>
              </div>
            )}

            {user?.displayName}
          </a>

          <div className="header__user-list">
            <div className="header__user-arrow"></div>
            <Link to="/user/account" className="header__user-item">
              Tài khoản của tôi
            </Link>
            <Link to="/user/purchase" className="header__user-item">
              Đơn mua
            </Link>
            <div onClick={handleLogout} className="header__user-item">
              Đăng xuất
            </div>
          </div>
        </div>
      </ul>
    </nav>
  );
}
