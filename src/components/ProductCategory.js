import React from "react";

export default function ProductCategory() {
  return (
    <div className="grid__col-2x">
      <div className="app__container-category">
        <div className="app__category-heading">
          <i className="app__heading-icon bi bi-list-ul"></i>Danh mục
        </div>
        <ul className="app__category-list">
          <li className="app__category-item app__category-default app__category-item--active">
            <div className="app__item-icon"></div>
            <div className="app__item-link">Sản phẩm</div>
          </li>
          <li className="app__category-item app__category-shirt">
            <div className="app__item-link">Quần, áo</div>
          </li>
          <li className="app__category-item app__category-shoe">
            <div className="app__item-link">Giày, dép</div>
          </li>
          <li className="app__category-item app__category-bag">
            <div className="app__item-link">Túi xách</div>
          </li>
          <li className="app__category-item app__category-set">
            <div className="app__item-link">Set</div>
          </li>
          <li className="app__category-item app__category-discount">
            <div className="app__item-link">Giảm giá</div>
          </li>
          <li className="app__category-item app__category-new">
            <div className="app__item-link">Hàng mới về</div>
          </li>
          <li className="app__category-item app__category-accessories">
            <div className="app__item-link">Phụ kiện</div>
          </li>
        </ul>
      </div>
    </div>
  );
}
