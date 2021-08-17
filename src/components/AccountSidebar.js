import React, { useContext } from "react";
import { ProductContext } from "../context";
import { Link } from "react-router-dom";
const AccountSidebar = () => {
  const { userAvatar } = useContext(ProductContext);
  return (
    <>
      <div className="user-profile__name-container">
        <div className="user-profile__image-container">
          {userAvatar ? (
            <img
              className="user-profile__image-user"
              src={userAvatar}
              alt="userImg"
            />
          ) : (
            <svg
              enableBackground="new 0 0 15 15"
              viewBox="0 0 15 15"
              x="0"
              y="0"
              className="user-profile__image-svg"
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
          )}
        </div>
        <div className="user-profile__name">sfsb3fax26</div>

        <div className="user-profile__name-btn">Sửa Hồ Sơ</div>
      </div>
      <div className="user-profile__category">
        <div className="user-profile__my-user">Tài Khoản Của Tôi</div>
        <div className="user-profile__my-info">Hồ sơ</div>
        <div className="user-profile__my-bank">Ngân hàng</div>
        <div className="user-profile__my-adress">Địa chỉ</div>
        <div className="user-profile__change-password">Đổi mật khẩu</div>
        <Link to="/user/order" className="user-profile__order">
          Đơn Mua
        </Link>
      </div>
    </>
  );
};

export default AccountSidebar;
