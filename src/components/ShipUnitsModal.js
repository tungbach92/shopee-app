import React from "react";
import ReactDOM from "react-dom";
export default function ShipUnitsModal(props) {
  const {
    shipChecked,
    setShipChecked,
    shipUnit,
    setShipUnit,
    shipUnitList,
    isShipUnits,
    toggleShipUnits,
  } = props;

  const handleClick = () => {
    toggleShipUnits(!isShipUnits);
    //setCheckedByShipUnit
    let checked = [];
    shipUnitList.forEach((item) => {
      if (item.id === shipUnit.id) {
        checked[item.id] = true;
      } else {
        checked[item.id] = false;
      }
    });
    setShipChecked(checked);
  };

  const handleShipUnitClick = (item, e) => {
    console.log(e);
    let checked = [];
    shipUnitList.forEach((shipUnititem) => {
      if (shipUnititem.id === item.id) {
        checked[item.id] = e.target.checked;
      } else {
        checked[shipUnititem.id] = false;
      }
    });
    setShipChecked(checked);
  };

  const handleShipUnitSubmit = (e) => {
    let selectedShipUnit = {};
    shipUnitList.forEach((item) => {
      if (shipChecked[item.id]) {
        selectedShipUnit = item;
      }
    });
    if (selectedShipUnit !== null) {
      setShipUnit(selectedShipUnit);
      toggleShipUnits(!isShipUnits);
    }
  };
  return ReactDOM.createPortal(
    <div className="cart-product__modal">
      <div className="cart-product__modal-overlay"></div>
      <div className="cart-product__modal-container">
        <div className="cart-product__modal-header">
          <span className="cart-product__shipunit-label">
            Chọn đơn vị vận chuyển
          </span>
        </div>
        <ul className="cart-product__shipunit-list">
          {shipUnitList.map((item, index) => (
            <div key={index} className="cart-product__shipunit-wrapper">
              <li className="cart-product__shipunit-item">
                <input
                  onChange={handleShipUnitClick.bind(this, item)}
                  type="checkbox"
                  className="cart-product__shipunit-checkbox"
                  name="giaohangtietkiem"
                  value={item.name}
                  checked={!!shipChecked[index]}
                />
                <label className="cart-product__shipunit-name">
                  {item.name}
                </label>
                <span className="cart-product__shipunit-price">
                  {Number(item.price)}
                </span>
                <span className="cart-product__shipunit-date">{item.date}</span>
                <span className="cart-product__shipunit-pay">
                  {item.method}
                </span>
              </li>
            </div>
          ))}
        </ul>
        <div className="cart-product__modal-footer">
          <button
            onClick={handleClick}
            className="btn cart-product__modal-close"
          >
            Trở lại
          </button>
          <button
            onClick={handleShipUnitSubmit}
            className="btn cart-product__modal-apply"
          >
            OK
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
