import React, { useState, useEffect } from "react";
import ProvincesCitiesVN from "pc-vn";
export default function Picker({ setAddress, isPickerShow, togglePicker }) {
  const [isProvinceSelected, setIsProvinceSelected] = useState(false);
  const [isDistrictSelected, setIsDistrictSelected] = useState(false);
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const provinces = ProvincesCitiesVN.getProvinces();
  const districts = ProvincesCitiesVN.getDistrictsByProvinceCode(province?.code);
  console.log(provinces);
  console.log(districts);
  useEffect(() => {
    // effect
    if (province && district) {
      const address = district.full_name;
      setAddress(address);
    }

    return () => {
      if (isDistrictSelected) togglePicker(!isPickerShow);
      // cleanup
    };
  }, [
    district,
    province,
    setAddress,
    isPickerShow,
    togglePicker,
    isDistrictSelected,
  ]);

  const handleClick = (e) => {
    const value = e.target.innerText;
    const province = provinces.find((province) => province.name === value);
    const district = districts.find((district) => district.name === value);
    if (province) {
      setProvince(province);
      setIsProvinceSelected(true);
    }
    if (district) {
      setDistrict(district);
      setIsDistrictSelected(true);
    }
  };
  return (
    <>
      <div className="detail-product__picker">
        <input
          onChange={() => {
            console.log("sdds");
          }}
          placeholder="Tìm"
          value=""
          className="detail-product__picker-input"
        />

        <div className="detail-product__picker-list-wrapper">
          {isProvinceSelected && (
            <div className="detail-product__selected-item">
              <svg
                enableBackground="new 0 0 11 11"
                viewBox="0 0 11 11"
                x="0"
                y="0"
                className="detail-product__selected-icon"
              >
                <g>
                  <path d="m8.5 11c-.1 0-.2 0-.3-.1l-6-5c-.1-.1-.2-.3-.2-.4s.1-.3.2-.4l6-5c .2-.2.5-.1.7.1s.1.5-.1.7l-5.5 4.6 5.5 4.6c.2.2.2.5.1.7-.1.1-.3.2-.4.2z"></path>
                </g>
              </svg>
              {province.name}
            </div>
          )}
          <ul className="detail-product__picker-list">
            {isProvinceSelected === false
              ? provinces.map((province, index) => (
                  <li
                    key={index}
                    onClick={handleClick}
                    className="detail-product__picker-item"
                  >
                    {province.name}
                  </li>
                ))
              : districts.map((district, index) => (
                  <li
                    key={index}
                    onClick={handleClick}
                    className="detail-product__picker-item"
                  >
                    {district.name}
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </>
  );
}
