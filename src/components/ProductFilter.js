import React from "react";

export default function ProductFilter() {
  return (
    <div className="app__filter">
      <div className="app__filter-label">Sắp xếp theo</div>
      <div className="app__filter-list">
        {/* <!-- active: btn--active --> */}
        <button className="btn app__filter-item app__filter-popular btn--active">
          Phổ biến
        </button>
        <button className="btn app__filter-item app__filter-newest">
          Mới nhất
        </button>
        <button className="btn app__filter-item app__filter-bestSell">
          Bán chạy
        </button>
        <div className="select-input">
          <span className="app__input-lable">Giá</span>
          <i className="app__input-icon bi bi-chevron-down"></i>
          <ul className="app__input-list">
            {/* <!-- icon: <i className="app__input-item-icon bi bi-check"></i> --> */}
            {/* <!-- active: app__input-item--active  --> */}
            <li className="app__input-item app__price-default app__input-item--active">
              Giá<i className="app__input-item-icon bi bi-check"></i>
            </li>
            <li className="app__input-item app__price-asc">Giá: Thấp đến Cao</li>
            <li className="app__input-item app__price-desc">Giá: Cao đến Thấp</li>
          </ul>
        </div>
      </div>
      <div className="app__filter-page">
        <div className="app__page-number">
          {/* <!-- render --> */}
          {/* <!--  app__pre-page--disabled --> */}
        </div>
        <div className="app__filter-page-item app__pre-page app__pre-page--disabled">
          <i className="app__pre-icon bi bi-chevron-left"></i>
        </div>
        <div className="app__filter-page-item app__next-page">
          <i className="app__next-icon bi bi-chevron-right"></i>
        </div>
      </div>
    </div>
  );
}
