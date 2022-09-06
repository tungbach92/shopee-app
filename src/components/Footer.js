import React from "react";
import qrCodeNavImg from "../img/qr-code-home.png";
import appShopeeImg from "../img/app-shopee.png";
import ggShopeeImg from "../img/gg-shopee.png";
import appGalShopeeImg from "../img/app-gal-shopee.png";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      className="footer"
      sx={{ display: { xs: "none", sm: "block" } }}
    >
      {/* <div className="footer__ads"></div> */}
      <div className="grid footer__grid">
        <div className="grid__row grid__row--padtb3">
          <div className="grid__col-2c4x">
            <h3 className="footer__heading">Chăm sóc khách hàng</h3>
            {/* <ul className="footer__list">
              <li className="footer__item">
                <a href="# " className="footer__item-link">
                  Trung tâm trợ giúp
                </a>
              </li>
              <li className="footer__item">
                <a href="# " className="footer__item-link">
                  Shopee Blog
                </a>
              </li>
              <li className="footer__item">
                <a href="# " className="footer__item-link">
                  Shopee Mall
                </a>
              </li>
              <li className="footer__item">
                <a href="# " className="footer__item-link">
                  Hướng dẫn mua hàng
                </a>
              </li>
              <li className="footer__item">
                <a href="# " className="footer__item-link">
                  Hướng dẫn bán hàng
                </a>
              </li>
              <li className="footer__item">
                <a href="# " className="footer__item-link">
                  Thanh toán
                </a>
              </li>
              <li className="footer__item">
                <a href="# " className="footer__item-link">
                  Shopee Xu
                </a>
              </li>
              <li className="footer__item">
                <a href="# " className="footer__item-link">
                  Vận chuyển
                </a>
              </li>
              <li className="footer__item">
                <a href="# " className="footer__item-link">
                  Trả hàng Hoàn tiền
                </a>
              </li>
              <li className="footer__item">
                <a href="# " className="footer__item-link">
                  Chăm sóc khách hàng
                </a>
              </li>
              <li className="footer__item">
                <a href="# " className="footer__item-link">
                  Chính sách bảo hành
                </a>
              </li>
            </ul> */}
          </div>
          <div className="grid__col-2c4x">
            <h3 className="footer__heading">Về Shopee</h3>
            {/* <ul className="footer__list">
              <li className="footer__item">
                <a href="# " className="footer__item-link">
                  Giới thiệu về Shopee Việt Nam
                </a>
              </li>
              <li className="footer__item">
                <a href="# " className="footer__item-link">
                  Tuyển dụng
                </a>
              </li>
              <li className="footer__item">
                <a href="# " className="footer__item-link">
                  Điều Khoản Shopee
                </a>
              </li>
              <li className="footer__item">
                <a href="# " className="footer__item-link">
                  Chính sách bảo mật
                </a>
              </li>
              <li className="footer__item">
                <a href="# " className="footer__item-link">
                  Chính Hãng
                </a>
              </li>
              <li className="footer__item">
                <a href="# " className="footer__item-link">
                  Kênh Người bán
                </a>
              </li>
              <li className="footer__item">
                <a href="# " className="footer__item-link">
                  Flash Sales
                </a>
              </li>
              <li className="footer__item">
                <a href="# " className="footer__item-link">
                  Chương trình Tiếp thị liên kết Shopee
                </a>
              </li>
              <li className="footer__item">
                <a href="# " className="footer__item-link">
                  Liên Hệ Với Truyền Thông
                </a>
              </li>
            </ul> */}
          </div>
          <div className="grid__col-2c4x">
            <h3 className="footer__heading">THANH TOÁN</h3>
            <ul className="footer__list-payment">
              <li className="footer__payment-item">
                <div className="footer__payment-backround footer__payment-visa"></div>
              </li>
              <li className="footer__payment-item">
                <div className="footer__payment-backround footer__payment-master"></div>
              </li>
              <li className="footer__payment-item">
                <div className="footer__payment-backround footer__payment-jcb"></div>
              </li>
              <li className="footer__payment-item">
                <div className="footer__payment-backround footer__payment-amex"></div>
              </li>
              <li className="footer__payment-item">
                <div className="footer__payment-backround footer__payment-cod"></div>
              </li>
              <li className="footer__payment-item">
                <div className="footer__payment-backround footer__payment-installment"></div>
              </li>
              <li className="footer__payment-item">
                <div className="footer__payment-backround footer__payment-airpay"></div>
              </li>
            </ul>
            <h3 className="footer__heading">ĐƠN VỊ VẬN CHUYỂN</h3>
            <ul className="footer__list-shipping">
              <li className="footer__payment-item">
                <div className="footer__payment-backround footer__payment-express"></div>
              </li>
              <li className="footer__payment-item">
                <div className="footer__payment-backround footer__payment-ghtk"></div>
              </li>
              <li className="footer__payment-item">
                <div className="footer__payment-backround footer__payment-ghn"></div>
              </li>
              <li className="footer__payment-item">
                <div className="footer__payment-backround footer__payment-viettel"></div>
              </li>
              <li className="footer__payment-item">
                <div className="footer__payment-backround footer__payment-vnpost"></div>
              </li>
              <li className="footer__payment-item">
                <div className="footer__payment-backround footer__payment-jnt"></div>
              </li>
              <li className="footer__payment-item">
                <div className="footer__payment-backround footer__payment-grab"></div>
              </li>
              <li className="footer__payment-item">
                <div className="footer__payment-backround footer__payment-now"></div>
              </li>
              <li className="footer__payment-item">
                <div className="footer__payment-backround footer__payment-ninja"></div>
              </li>
              <li className="footer__payment-item">
                <div className="footer__payment-backround footer__payment-best"></div>
              </li>
            </ul>
          </div>
          <div className="grid__col-2c4x">
            <h3 className="footer__heading">THEO DÕI CHÚNG TÔI TRÊN</h3>
            <ul className="footer__list">
              <li className="footer__item">
                <a href="# " className="footer__item-link">
                  <i className="footer__item-icon bi bi-facebook"></i>Facebook
                </a>
              </li>
              <li className="footer__item">
                <a href="# " className="footer__item-link">
                  <i className="footer__item-icon bi bi-instagram"></i>Instagram
                </a>
              </li>
              <li className="footer__item">
                <a href="# " className="footer__item-link">
                  <i className="footer__item-icon bi bi-linkedin"></i>LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <div className="grid__col-2c4x">
            <h3 className="footer__heading">TẢI ỨNG DỤNG SHOPEE NGAY THÔI</h3>
            <a href="# " className="footer__app-wrapper">
              <img
                src={qrCodeNavImg}
                alt="qr-code"
                className="footer__qr-img"
              />
              <div className="footer__app">
                <img
                  src={appShopeeImg}
                  alt="qr-code"
                  className="footer__app-img"
                />
                <img
                  src={ggShopeeImg}
                  alt="qr-code"
                  className="footer__app-img"
                />
                <img
                  src={appGalShopeeImg}
                  alt="qr-code"
                  className="footer__app-img"
                />
              </div>
            </a>
          </div>
        </div>
        <div className="grid__row">
          <p className="footer__lisence">
            © 2015 - Bản quyền thuộc về Công ty TNHH Shopee
          </p>
        </div>
      </div>
    </Box>
  );
}
