import React from "react";
import img from "../img/bag.png";
export default function DetailProduct() {
  return (
    <div className="container">
      <div className="grid detail-breadcrumb">breadcrumb</div>
      <div className="grid detail-product">
        <div className="detail-product__info">
          <div className="detail-product__info-left">
            <div className="detail-product__img-wrapper">
              <img src={img} alt="detail-img" className="detail-product__img" />
              <div className="detail-product__slider">
                <img
                  src={img}
                  alt="detail-img"
                  className="detail-product__slider-img"
                />
              </div>
            </div>
            <div className="detail-product__sharelike-wrapper">
              <div className="detail-product__share">
                <div className="detail-product__share-label">Chia sẻ:</div>
                <div className="detail-product__share-icon">icon</div>
              </div>
              <div className="detail-product__like">
                <div className="detail-product__like-icon">icon</div>
                <div className="detail-product__like-label">Đã thích (346)</div>
              </div>
            </div>
          </div>

          <div className="detail-product__info-right">
            <div className="detail-product__name">
              Tinh chất bôi tóc Kirkland chính hãng Mỹ, ngăn rụng hói và mọc
              tóc, râu, mày cho nam
            </div>
            <div className="detail-product__more">
              <div className="detail-product__rating">
                <span className="detail-product__rating-number">4.9</span>
                <span className="detail-product__rating-icon"></span>
              </div>
              <div className="detail-product__review">
                <span className="detail-product__review-number">1.2k</span>
                <span className="detail-product__review-label">đánh giá</span>
              </div>
              <div className="detail-product__sold">
                <span className="detail-product__sold-number">7.1k</span>
                <span className="detail-product__sold-label">đã bán</span>
              </div>
            </div>
            <div className="detail-product__price">₫45.000 - ₫159.000</div>
            <div className="detail-product__info-wrapper">
              <div className="detail-product__combo-label">
                Combo Khuyến Mãi
              </div>
              <div className="detail-product__combo-value">Mua 2 + giảm 2%</div>

              <div className="detail-product__ship-label">Vận Chuyển</div>
              <div className="detail-product__ship-wrapper">
                <span className="detail-product__ship-icon">icon</span>
                <span className="detail-product__ship-content">
                  Miễn Phí Vận Chuyển Miễn Phí Vận Chuyển khi đơn đạt giá trị
                  tối thiểu
                </span>
                <span className="detail-product__shipto-icon">icon</span>
                <span className="detail-product__shipto-label">
                  Vận Chuyển Tới
                </span>
                <span className="detail-product__shipto-content">
                  Quận Hoàng Mai, Hà Nội
                </span>
                <span className="detail-product__shipprice-label">
                  Phí Vận Chuyển
                </span>
                <span className="detail-product__shipprice-content">
                  ₫34.500 - ₫46.676
                </span>
              </div>

              <div className="detail-product__variation-label">Variation</div>
              <div className="detail-product__variation-list">
                <div className="detail-product__variation-item">item</div>
              </div>

              <div className="detail-product__amount-label">Số Lượng</div>
              <div className="detail-product__amount-wrapper">
                <button className="detail-product__amount-desc">-</button>
                <input type="text" className="detail-product__amount-input" />
                <button className="detail-product__amount-incre">+</button>
                <div className="detail-product__amount-left"></div>
              </div>
            </div>
            <button className="btn detail-product__btn-cart">
              thêm vào giỏ hàng
            </button>
            <button className="btn detail-product__btn-checkout">
              Mua ngay
            </button>
            <div className="detail-product__protect-wrapper">
              <div className="detail-product__protect-icon">icon</div>
              <div className="detail-product__protect-label">
                Shopee Đảm Bảo
              </div>
              <div className="detail-product__protect-detail">
                3 Ngày Trả Hàng / Hoàn Tiền
              </div>
            </div>
          </div>
        </div>

        <div className="detail-content">
          <div className="detail-content__left">
            <div className="detail-content__detail">
              <div className="detail-content__detail-label">
                CHI TIẾT SẢN PHẨM
              </div>
              <div className="detail-content__detail-breadcrumb">
                <div className="detail-content__breadcrumb-label">Danh Mục</div>
                <div className="detail-content__breadcrumb-item">
                  Shopee Sức Khỏe > Sắc Đẹp> Chăm sóc tóc
                </div>
              </div>
              <div className="detail-content__detail-brand">
                <div className="detail-content__brand-label">Thương hiệu</div>
                <div className="detail-content__brand-item">No Brand</div>
              </div>
              <div className="detail-content__detail-variation">
                <div className="detail-content__variation-label">
                  Khối lượng (g)
                </div>
                <div className="detail-content__variation-item">60</div>
              </div>
              <div className="detail-content__detail-gender">
                <div className="detail-content__gender-label">Giới tính</div>
                <div className="detail-content__gender-item">Dành cho Nam</div>
              </div>
              <div className="detail-content__detail-madeby">
                <div className="detail-content__madeby-label">Xuất xứ</div>
                <div className="detail-content__madeby-item">USA</div>
              </div>
              <div className="detail-content__detail-amount">
                <div className="detail-content__amount-label">Kho hàng</div>
                <div className="detail-content__amount-item">662</div>
              </div>
              <div className="detail-content__detail-location">
                <div className="detail-content__location-label">Gửi từ</div>
                <div className="detail-content__location-item">
                  Quận 12, TP. Hồ Chí Minh
                </div>
              </div>
            </div>
            <div className="detail-content__description">
              <div className="detail-content__description-label">
                MÔ TẢ SẢN PHẨM
              </div>
              <div className="detail-content__description-content">MÔ TẢ </div>
            </div>
            <div className="detail-content__rating">
              <div className="detail-content__rating-label">
                ĐÁNH GIÁ SẢN PHẨM
              </div>
              <div className="detail-content__rating-overview">
                <div className="detail-content__rating-score">
                  <div className="detail-content__score-result"></div>
                  <div className="detail-content__score-icon"></div>
                </div>
                <div className="detail-content__overview-list">
                  <div className="detail-content__overview-item"></div>
                </div>
              </div>
              <div className="detail-content__rating-list">
                <div className="detail-content__rating-item">
                  <div className="detail-content__rating-name"></div>
                  <div className="detail-content__rating-icon"></div>
                  <div className="detail-content__rating-variation"></div>
                  <div className="detail-content__rating-content"></div>
                  <div className="detail-content__rating-date"></div>
                  <div className="detail-content__rating-rate"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="detail-content__right">
            <div className="detail-content__right-label">Top Sản Phẩm Bán Chạy</div>
            <div className="detail-content__hot-list">
              <div className="detail-content__hot-item">
                <div className="detail-content__hot-img"></div>
                <div className="detail-content__hot-name"></div>
                <div className="detail-content__hot-price"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
