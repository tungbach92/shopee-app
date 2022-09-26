import React from "react";
import PropTypes from "prop-types";

export default function ProductContainer({
  isSearchPage,
  productCategory,
  productFilter,
  productList,
  pagination,
}) {
  return (
    <>
      <div className="grid">
        <div className="grid__row grid__row--padtb3">
          {isSearchPage ? null : productCategory}
          <div className={isSearchPage ? "grid__col-12x" : "grid__col-10x"}>
            {productFilter}
            <div className="grid__row grid__row-product">{productList}</div>
            {pagination}
          </div>
        </div>
      </div>
    </>
  );
}

ProductContainer.propTypes = {
  isSearchPage: PropTypes.bool,
  productCategory: PropTypes.func,
  productFilter: PropTypes.func,
  productList: PropTypes.func,
  pagination: PropTypes.func,
};

ProductContainer.defaultProps = {
  isSearchPage: false,
  productCategory: null,
  productFilter: null,
  productList: null,
  pagination: null,
};
