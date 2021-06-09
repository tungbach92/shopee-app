import React from "react";

export default function DetailProduct() {
  return (
    <div className="container">
      <div className="detail-breadcrumb">breadcrumb</div>
      <div className="detail-product">
        <div className="detail-product__info">
          <div className="detail-product__info-left">
            <div className="detail-product__img-wrapper">
              <div className="detail-product__img"></div>
              <div className="detail-product__slider"></div>
            </div>
            <div className="detail-product__share"></div>
            <div className="detail-product__like"></div>
          </div>
        </div>
        <div className="detail-product__info-right">
          <div className="detail-product__name"></div>
          <div className="detail-product__more">
            <div className="detail-product__rating"></div>
            <div className="detail-product__review"></div>
            <div className="detail-product__sold"></div>
          </div>
          <div className="detail-product__price"></div>
          <div className="detail-product__combo-wrapper">
            <div className="detail-product__combo-label"></div>
            <div className="detail-product__combo-value"></div>
          </div>
          <div className="detail-product__ship-wrapper">
            <div className="detail-product__free-label"></div>
            <div className="detail-product__free-icon"></div>
            <div className="detail-product__free-content"></div>
            <div className="detail-product__ship-label"></div>
            <div className="detail-product__ship-icon"></div>
            <div className="detail-product__ship-content"></div>
          </div>
          <div className="detail-product__variation-wrapper">
            <div className="detail-product__variation-label"></div>
            <div className="detail-product__variation-list"></div>
          </div>
          <div className="detail-product__amount-wrapper">
            <div className="detail-product__amount-label"></div>
            <div className="detail-product__amount-desc">-</div>
            <input type="text" className="detail-product__amount-input" />
            <div className="detail-product__amount-incre">+</div>
            <div className="detail-product__amount-left"></div>
          </div>
          <div className="detail-product__btn-wrapper">
            <div className="detail-product__btn-cart"></div>
            <div className="detail-product__btn-checkout"></div>
          </div>
          <div className="detail-product__protect-wrapper">
            <div className="detail-product__protect-icon"></div>
            <div className="detail-product__protect-label"></div>
            <div className="detail-product__protect-detail"></div>
          </div>
        </div>
      </div>
      <div className="detail-content">
        <div className="detail-content__left">
          <div className="detail-content__detail">
            <div className="detail-content__detail-label"></div>
            <div className="detail-content__detail-breadcrumb"></div>
            <div className="detail-content__detail-brand"></div>
            <div className="detail-content__detail-variation"></div>
            <div className="detail-content__detail-gender"></div>
            <div className="detail-content__detail-madeby"></div>
            <div className="detail-content__detail-variation"></div>
            <div className="detail-content__detail-amount"></div>
            <div className="detail-content__detail-location"></div>
          </div>
          <div className="detail-content__description">
            <div className="detail-content__description-label"></div>
            <div className="detail-content__description-content"></div>
          </div>
          <div className="detail-content__rating">
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
          <div className="detail-content__right-label"></div>
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
  );
}
