import React from "react";

const HeaderContent = () => {
  const handleInfoSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="container">
      <div className="grid user-profile">
        <div className="grid__row grid__row--padtb3">
          <div className="grid__col-2x">
            <div className="user-profile__name-container">
              <div className="user-profile__image-container">
                <svg
                  enableBackground="new 0 0 15 15"
                  viewBox="0 0 15 15"
                  x="0"
                  y="0"
                  className="user-profile__image"
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
              <div className="user-profile__name">sfsb3fax26</div>

              <div className="user-profile__name-btn">Sửa Hồ Sơ</div>
            </div>
            <div className="user-profile__category">
              <div className="user-profile__my-user">Tài Khoản Của Tôi</div>
              <div className="user-profile__my-info">Hồ sơ</div>
              <div className="user-profile__my-bank">Ngân hàng</div>
              <div className="user-profile__my-adress">Địa chỉ</div>
              <div className="user-profile__change-password">Đổi mật khẩu</div>
              <div className="user-profile__order">Đơn Mua</div>
            </div>
          </div>
          <div className="grid__col-10x">
            <div className="user-profile__title-container">
              <div className="user-profile__title">
                <div className="user-profile__label">Hồ Sơ Của Tôi</div>
                <div className="user-profile__label-detail">
                  Quản lý thông tin hồ sơ để bảo mật tài khoản
                </div>
              </div>
            </div>
            <div className="user-profile__content">
              <form
                className="user-profile__info-input"
                onSubmit={handleInfoSubmit}
              >
                <label className="user-profile__user-label">
                  Tên Đăng Nhập
                </label>
                <input type="text" className="user-profile__user-input" />
                <label className="user-profile__name-label">Tên</label>
                <input type="text" className="user-profile__name-input" />
                <label className="user-profile__email-label">Email</label>
                <input type="text" className="user-profile__email-input" />
                <label className="user-profile__phone-label">
                  Số Điện Thoại
                </label>
                <input type="text" className="user-profile__phone-input" />
                <label className="user-profile__gender-label">Giới Tính</label>
                <div className="user-profile__radio-container">
                  <input type="radio" className="user-profile__man-radio" />
                  <label className="user-profile__man-label">Nam</label>
                  <input type="radio" className="user-profile__woman-radio" />
                  <label className="user-profile__man-label">Nữ</label>
                  <input type="radio" className="user-profile__other-radio" />
                  <label className="user-profile__man-label">Khác</label>
                </div>
                <label className="user-profile__birthday-label">
                  Ngày Sinh
                </label>
                <input type="text" className="user-profile__birthday-input" />
                <button className="btn user-profile__info-submit">Lưu</button>
              </form>
              <div className="user-profile__image-input">
                <div className="user-profile__input-image">
                  <svg
                    enableBackground="new 0 0 15 15"
                    viewBox="0 0 15 15"
                    x="0"
                    y="0"
                    className="user-profile__input-svg"
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
                <button className="btn user-profile__image-btn">
                  Chọn ảnh
                </button>
                <div className="user-profile__image-size">
                  Dụng lượng file tối đa 1 MB
                </div>
                <div className="user-profile__image-format">
                  Định dạng:.JPEG, .PNG
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderContent;
