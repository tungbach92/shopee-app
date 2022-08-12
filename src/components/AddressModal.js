import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { ProductContext } from "../context";

const AddressModal = ({
  isAddressAddShowing,
  toggleAddressAdd,
  phone,
  setPhone,
  name,
  setName,
  street,
  setStreet,
  ward,
  province,
  district,
  isProvince,
  isDistrict,
  isWard,
  setIsProvince,
  setIsDistrict,
  setIsWard,
  provinces,
  districts,
  wards,
  toggleDistrict,
  toggleProvince,
  toggleWard,
  handleDistrictChoose,
  handleProvinceChoose,
  handleWardChoose,
  fullAddress,
  setFullAddress,
  shipInfoIndex,
}) => {
  const { shipInfos, updateShipInfoToFirebase } = useContext(ProductContext);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let isValid = true;
    let errors = {};
    // contain atleast 3 space

    if (!name) {
      isValid = false;
      errors["name"] = "Vui lòng nhập Họ tên!";
    }

    const nameRegex = /(\D*[\s]){2,}/; // contain atleast 2 space, only char
    if (name && !nameRegex.test(name)) {
      isValid = false;
      errors["name"] = "Nhập đầy đủ cả họ và tên, không chứa số!";
    }

    if (!phone) {
      isValid = false;
      errors["phone"] = "Vui lòng nhập Số điện thoại";
    }

    const phoneRegex = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/; // đầu số 03, 05, 07, 08, 09, bắt đầu với +84 hoặc 84
    if (phone && !phoneRegex.test(phone)) {
      isValid = false;
      errors["phone"] = "Số điện thoại không hợp lệ!";
    }

    if (!province) {
      isValid = false;
      errors["province"] = "Vui lòng chọn Tỉnh/thành phố";
    }

    if (!district) {
      isValid = false;
      errors["district"] = "Vui lòng chọn Quận/huyện";
    }

    if (!ward) {
      isValid = false;
      errors["ward"] = "Vui lòng chọn Phường/xã/thị trấn";
    }

    if (!street) {
      isValid = false;
      errors["street"] =
        "Vui lòng nhập Tổ dân phố, ngõ, số nhà, đường(thôn, xóm)";
    }

    setErrors(errors);
    return isValid;
  };

  const handleBack = () => {
    toggleAddressAdd(!isAddressAddShowing);
    setIsProvince(false);
    setIsDistrict(false);
    setIsWard(false);
    setErrors({});
  };

  const handleApply = () => {
    if (validate()) {
      toggleAddressAdd(!isAddressAddShowing);
      if (typeof shipInfoIndex !== "undefined") {
        updateShipInfo();
      } else {
        addNewShipInfo();
      }
    }
  };

  const updateShipInfo = () => {
    try {
      let tempShipInfos = [...shipInfos];
      const created = Date.now();
      const fullAddress = `${street}, ${ward.full_name}`;

      tempShipInfos = tempShipInfos.map((shipInfo) => {
        if (tempShipInfos.indexOf(shipInfo) === shipInfoIndex) {
          return {
            ...shipInfo,
            name: name,
            phone: phone,
            fullAddress: fullAddress,
            created: created,
            street: street,
            ward: ward,
            district: district,
            province: province,
          };
        } else return shipInfo;
      });

      setFullAddress(fullAddress);
      updateShipInfoToFirebase(tempShipInfos);
    } catch (error) {
      console.log(error);
    }
  };

  const addNewShipInfo = () => {
    try {
      let tempShipInfos = shipInfos ? [...shipInfos] : [];
      const created = Date.now();
      const fullAddress = `${street}, ${ward.full_name}`;

      const shipInfo = {
        name: name,
        phone: phone,
        fullAddress: fullAddress,
        isDefault: tempShipInfos.length === 0 ? true : false, // set defaul true when only have 1 shipinfo
        created: created,
        street: street,
        ward: ward,
        district: district,
        province: province,
      };

      tempShipInfos = [...tempShipInfos, shipInfo];
      setFullAddress(fullAddress);
      updateShipInfoToFirebase(tempShipInfos);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePhoneChange = (e) => {
    e.target.value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
    setPhone(e.target.value);
  };

  return isAddressAddShowing
    ? ReactDOM.createPortal(
        <div className="address-profile__modal">
          <div className="address-profile__modal-overlay"></div>
          <div className="address-profile__modal-container">
            <div className="address-profile__modal-header">
              <span className="address-profile__header-label">Địa Chỉ Mới</span>
            </div>
            <div className="address-profile__modal-content">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="address-profile__name"
                placeholder="Họ và tên"
              />
              <input
                type="text"
                value={phone}
                onChange={handlePhoneChange}
                className="address-profile__phone"
                placeholder="Số điện thoại"
              />
              <div className="address-profile__name-error">{errors.name}</div>
              <div className="address-profile__phone-error">{errors.phone}</div>
              <div
                onClick={toggleProvince}
                className={
                  province
                    ? "address-profile__province address-profile__province--selected"
                    : "address-profile__province"
                }
              >
                {province ? province.name : "Thành phố"}
                {isProvince && (
                  <div className="address-profile__provinces">
                    {provinces.map((item, index) => (
                      <div
                        key={index}
                        onClick={handleProvinceChoose}
                        className="address-profile__provinces-item"
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div
                onClick={toggleDistrict}
                className={
                  district
                    ? "address-profile__district address-profile__district--selected"
                    : !province
                    ? "address-profile__district address-profile__district--disabled"
                    : "address-profile__district"
                }
              >
                {district ? district.name : "Quận/Huyện"}
                {isDistrict && (
                  <div className="address-profile__districts">
                    {districts.map((item, index) => (
                      <div
                        key={index}
                        onClick={handleDistrictChoose}
                        className="address-profile__districts-item"
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div
                onClick={toggleWard}
                className={
                  ward
                    ? "address-profile__ward address-profile__ward--selected"
                    : !district
                    ? "address-profile__ward address-profile__ward--disabled"
                    : "address-profile__ward"
                }
              >
                {ward ? ward.name : "Phường/Xã"}
                {isWard && (
                  <div className="address-profile__wards">
                    {wards.map((item, index) => (
                      <div
                        key={index}
                        onClick={handleWardChoose}
                        className="address-profile__wards-item"
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="address-profile__province-error">
                {errors.province}
              </div>
              <div className="address-profile__district-error">
                {errors.district}
              </div>
              <div className="address-profile__ward-error">{errors.ward}</div>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="address-profile__address-detail"
                placeholder="Tổ dân phố, ngõ, số nhà, đường(thôn, xóm)"
              />
              <div className="address-profile__street-error">
                {errors.street}
              </div>
            </div>

            <div className="address-profile__popup-footer">
              <button
                onClick={handleBack}
                className="btn address-profile__popup-back "
              >
                Trở lại
              </button>
              <button
                onClick={handleApply}
                className="btn address-profile__popup-apply "
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
};

export default AddressModal;
