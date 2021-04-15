import React from "react";

export default function ProductCategory() {
  return (
    <div class="grid__col-2x">
      <div class="app__container-category">
        <div class="app__category-heading">
          <i class="app__heading-icon bi bi-list-ul"></i>Danh mục
        </div>
        <ul class="app__category-list">
          <li class="app__category-item app__category-default app__category-item--active">
            <div class="app__item-icon"></div>
            <div class="app__item-link">Sản phẩm</div>
          </li>
          <li class="app__category-item app__category-shirt">
            <div class="app__item-link">Quần, áo</div>
          </li>
          <li class="app__category-item app__category-shoe">
            <div class="app__item-link">Giày, dép</div>
          </li>
          <li class="app__category-item app__category-bag">
            <div class="app__item-link">Túi xách</div>
          </li>
          <li class="app__category-item app__category-set">
            <div class="app__item-link">Set</div>
          </li>
          <li class="app__category-item app__category-discount">
            <div class="app__item-link">Giảm giá</div>
          </li>
          <li class="app__category-item app__category-new">
            <div class="app__item-link">Hàng mới về</div>
          </li>
          <li class="app__category-item app__category-accessories">
            <div class="app__item-link">Phụ kiện</div>
          </li>
        </ul>
      </div>
    </div>
  );
}
