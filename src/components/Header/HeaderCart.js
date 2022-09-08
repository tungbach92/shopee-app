import React, { useContext, useState } from "react";
import noCartImg from "../../img/no-cart.png";
import { ProductContext } from "../../context";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import useModal from "../../hooks/useModal";
import PopupModal from "../PopupModal";
import PropTypes from "prop-types";
import { useMediaQuery } from "@mui/material";

const HeaderCart = ({ isProductPage, isSearchPage }) => {
  const { cartItems, delCartItem } = useContext(ProductContext);
  const [deleteID, setDeleteID] = useState();
  const { isPopupShowing, togglePopup } = useModal();
  const [isCartShowing, setIsCartShowing] = useState(false);
  const xsBreakpointMatches = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  const handleDeleteCartTrue = (id) => {
    delCartItem(id);
  };

  return (
    <div className="header__cart">
      <div
        className="header__cart-wrapper"
        tabIndex="0"
        onClick={() =>
          xsBreakpointMatches
            ? navigate("/cart")
            : setIsCartShowing(!isCartShowing)
        }
        onBlur={() =>
          setTimeout(() => {
            setIsCartShowing(false);
          }, 200)
        }
      >
        <div className="header__cart-icon-link">
          <i className="header__cart-icon bi bi-cart">
            {/* <!-- No cart: empty --> */}
            <div className="header__cart-numb">{cartItems?.length}</div>
          </i>
        </div>
        {isCartShowing && (
          <div
            className={classNames("header__cart-list", {
              "header__cart-list--empty": cartItems?.length === 0,
            })}
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
                        <CurrencyFormat
                          decimalScale={2}
                          value={item.price}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₫"}
                        ></CurrencyFormat>
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
