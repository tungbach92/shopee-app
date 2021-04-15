import React from "react";

export default function ProductFilter() {
  return (
    <div class="app__filter">
      <div class="app__filter-label">Sắp xếp theo</div>
      <div class="app__filter-list">
        {/* <!-- active: btn--active --> */}
        <button class="btn app__filter-item app__filter-popular btn--active">
          Phổ biến
        </button>
        <button class="btn app__filter-item app__filter-newest">
          Mới nhất
        </button>
        <button class="btn app__filter-item app__filter-bestSell">
          Bán chạy
        </button>
        <div class="select-input">
          <span class="app__input-lable">Giá</span>
          <i class="app__input-icon bi bi-chevron-down"></i>
          <ul class="app__input-list">
            {/* <!-- icon: <i class="app__input-item-icon bi bi-check"></i> --> */}
            {/* <!-- active: app__input-item--active  --> */}
            <li class="app__input-item app__price-default app__input-item--active">
              Giá<i class="app__input-item-icon bi bi-check"></i>
            </li>
            <li class="app__input-item app__price-asc">Giá: Thấp đến Cao</li>
            <li class="app__input-item app__price-desc">Giá: Cao đến Thấp</li>
          </ul>
        </div>
      </div>
      <div class="app__filter-page">
        <div class="app__page-number">
          {/* <!-- render --> */}
          {/* <!--  app__pre-page--disabled --> */}
        </div>
        <div class="app__filter-page-item app__pre-page app__pre-page--disabled">
          <i class="app__pre-icon bi bi-chevron-left"></i>
        </div>
        <div class="app__filter-page-item app__next-page">
          <i class="app__next-icon bi bi-chevron-right"></i>
        </div>
      </div>
    </div>
  );
}
