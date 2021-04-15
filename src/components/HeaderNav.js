import React from 'react'
import qrCodeNavImg from '../img/qr-code-home.png';
import appShopeeImg from '../img/app-shopee.png';
import ggShopeeImg from '../img/gg-shopee.png';
import appGalShopeeImg from '../img/app-gal-shopee.png';
import shirtImg from '../img/ao.png';


export default function HeaderNav() {
    return (
        <nav class="header__nav">
          <div class="header__nav-list">
            <li class="header__nav-item">
              <a href="# " class="header__nav-item-link">Kênh Người Bán</a>
            </li>
            <li class="header__nav-item header__nav-item--qr">
              <a href="# " class="header__nav-item-link">Tải ứng dụng</a>
              <div class="header__nav-qr">
                <img
                  src={qrCodeNavImg}
                  alt="qr-code"
                  class="header__nav-qr-img"
                />
                <a href="https://www.google.com/" class="header__nav-app">
                  <img
                    src={appShopeeImg}
                    alt="qr-code"
                    class="header__nav-app-img"
                  />
                  <img
                    src={ggShopeeImg}
                    alt="qr-code"
                    class="header__nav-app-img"
                  />
                  <img
                    src={appGalShopeeImg}
                    alt="qr-code"
                    class="header__nav-app-img header__nav-app-img--smaller"
                  />
                </a>
              </div>
            </li>

            <li class="header__nav-item">
              Kết nối
              <a href="# " class="header__nav-item-link"
                ><i class="header__nav-icon bi bi-facebook"></i
              ></a>
              <a href="# " class="header__nav-item-link"
                ><i class="header__nav-icon bi bi-instagram"></i
              ></a>
            </li>
          </div>
          <ul class="header__nav-list">
            <li class="header__nav-item-right header__nav-item-right--notify">
              <a href="# " class="header__nav-item-link"
                ><i class="header__nav-icon bi bi-bell"></i>Thông Báo</a
              >
              <div class="header__notify">
                <div class="header__notify-arrow"></div>
                <div class="header__notify-title">Thông Báo Mới Nhận</div>
                <div class="header__notify-news">
                  <a href="# " class="header__notify-link">
                    <div class="header__notify-img">
                      <img src={shirtImg} alt="" />
                    </div>
                    <div class="header__notify-info">
                      <p>Xem bài đăng của shoppevn:</p>
                      <p>CHIA SẺ KẾT QUẢ LẮC XU - TẶNG THƯỞNG THÊM...</p>
                    </div>
                  </a>
                </div>
                <div class="header__notify-news">
                  <a href="# " class="header__notify-link">
                    <div class="header__notify-img">
                      <img src={shirtImg} alt="" />
                    </div>
                    <div class="header__notify-info">
                      <p>Xem bài đăng của shoppevn:</p>
                      <p>CHIA SẺ KẾT QUẢ LẮC XU - TẶNG THƯỞNG THÊM...</p>
                    </div>
                  </a>
                </div>
                <div class="header__notify-news">
                  <a href="# " class="header__notify-link">
                    <div class="header__notify-img">
                      <img src={shirtImg} alt="" />
                    </div>
                    <div class="header__notify-info">
                      <p>Xem bài đăng của shoppevn:</p>
                      <p>CHIA SẺ KẾT QUẢ LẮC XU - TẶNG THƯỞNG THÊM...</p>
                    </div>
                  </a>
                </div>
                <div class="header__notify-user">
                  <a href="# " class="header__notify-link">
                    <div class="header__notify-img">
                      <img src={shirtImg} alt="" />
                    </div>
                    <div class="header__notify-info">
                      <p>Xem bài đăng của shoppevn:</p>
                      <p>CHIA SẺ KẾT QUẢ LẮC XU - TẶNG THƯỞNG THÊM...</p>
                    </div>
                  </a>
                </div>
                <div class="header__notify-user">
                  <a href="# " class="header__notify-link">
                    <div class="header__notify-img">
                      <img src={shirtImg} alt="" />
                    </div>
                    <div class="header__notify-info">
                      <p>Xem bài đăng của shoppevn:</p>
                      <p>CHIA SẺ KẾT QUẢ LẮC XU - TẶNG THƯỞNG THÊM...</p>
                    </div>
                  </a>
                </div>
                <a href="# " class="header__notify-showAll">Xem tất cả</a>
              </div>
            </li>
            <li class="header__nav-item-right">
              <a href="# " class="header__nav-item-link"
                ><i class="header__nav-icon bi bi-question-circle"></i>Trợ
                Giúp</a
              >
            </li>
            {/* Logged:  header__nav-item-right--user */}
            <div
              class="header__nav-item-right header__nav-item-right--reg header__nav-item-right--user"
            >
              <div class="header__nav-reg">
                <a href="# " class="header__nav-login">Đăng ký</a>
                <a href="# " class="header__nav-register">Đăng nhập</a>
              </div>
              <a href="# " class="header__nav-login-link"
                ><i class="header__nav-icon bi bi-question-circle"></i
                >User2131243</a
              >

              <div class="header__user-list">
                <div class="header__user-arrow"></div>
                <a href="# " class="header__user-item">Tài khoản của tôi</a>
                <a href="# " class="header__user-item">Đơn mua</a>
                <a href="# " class="header__user-item">Đăng xuất</a>
              </div>
            </div>
          </ul>
        </nav>
    )
}
