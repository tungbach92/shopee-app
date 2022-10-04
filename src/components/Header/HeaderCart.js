import React, { useState } from "react";
import noCartImg from "../../img/no-cart.png";
import classNames from "classnames";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import useModal from "../../hooks/useModal";
import PopupModal from "../Modal/PopupModal";
import PropTypes from "prop-types";
import { useMediaQuery } from "@mui/material";
import { useCartContext } from "../../context/CartProvider";

const HeaderCart = ({ isProductPage, isSearchPage }) => {
  const { cartItems, cartItemsLoading, delCartItem } = useCartContext();
  const [deleteID, setDeleteID] = useState();
  const { isPopupShowing, togglePopup } = useModal();
  const navigate = useNavigate();
  const location = useLocation();
  const xsBreakpointMatches = useMediaQuery("(max-width:600px)");

  const handleDeleteCartTrue = (id) => {
    delCartItem(id);
  };

  return (
    <div className="header__cart">
      <div
        className="header__cart-wrapper"
        onClick={() => {
          if (location.pathname !== "cart") {
            navigate("/cart");
          }
        }}
      >
        <div className="header__cart-icon-link">
          <i className="header__cart-icon bi bi-cart">
            {/* <!-- No cart: empty --> */}
            <div className="header__cart-numb">
              {!cartItemsLoading && cartItems.length}
            </div>
          </i>
        </div>
        {!xsBreakpointMatches && (
          <div
            className={classNames("header__cart-list", {
              "header__cart-list--empty": cartItems?.length === 0,
            })}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="header__cart-arrow"></div>
            <div className="header__cart-list-container">
              <div className="header__cart-title">Sản phẩm mới thêm</div>
              <div className="header__cart-list-item">
                {cartItems?.map((item) => (
                  <div key={item.id} className="header__cart-item">
                    <div className="header__cart-link">
                      <img
                        className="header__cart-img"
                        src={item.imageUrl}
                        alt="item-ao"
                      />
                      <div className="header__cart-name">{item.name}</div>
                      <div className="header__cart-price">
                        <NumericFormat
                          value={item.price}
                          prefix={"₫"}
                          thousandSeparator={true}
                          displayType="text"
                        ></NumericFormat>
                      </div>
                      <span>x</span>
                      <div className="header__cart-amount">{item.amount}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <img
              src={noCartImg}
              className="header__cart-empty-img"
              alt="no-cart"
            />
            <div className="header__cart-empty-info">Chưa có sản phẩm</div>
            <Link to="/cart" className="btn header__cart-button">
              Xem giỏ hàng
            </Link>
          </div>
        )}
      </div>
      {isPopupShowing && (
        <PopupModal
          isProductPage={isProductPage}
          isSearchPage={isSearchPage}
          isPopupShowing={isPopupShowing}
          togglePopup={togglePopup}
          deleteID={deleteID}
          setDeleteID={setDeleteID}
          handleDeleteCartTrue={handleDeleteCartTrue}
        ></PopupModal>
      )}
    </div>
  );
};

HeaderCart.propTypes = {
  isSearchPage: PropTypes.bool,
  isProductPage: PropTypes.bool,
};

HeaderCart.defaultProps = {
  isSearchPage: false,
  isProductPage: false,
};

export default HeaderCart;
