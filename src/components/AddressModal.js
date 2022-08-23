import React, { useContext, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { ProductContext } from "../context";
import { Autocomplete, Button, styled, TextField } from "@mui/material";

const StyleAutocomplete = styled(Autocomplete, {
  shouldForwardProp: (props) => props !== "isValid",
})(({ isValid }) => ({
  "& .MuiFormLabel-root, & .MuiInputLabel-root": {
    fontSize: "1.3rem",
  },
  "& .MuiInputBase-root, & .MuiOutlinedInput-root": {
    fontSize: "1.3rem",
  },
  "& .MuiAutocomplete-endAdornment": {
    top: "calc(50% - 10px)",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: isValid === false && "red",
  },
  "& .Mui-disabled": {
    cursor: "not-allowed",
  },
}));

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
  provinces,
  districts,
  wards,
  handleDistrictChoose,
  handleProvinceChoose,
  handleWardChoose,
  shipInfoIndex,
}) => {
  const { shipInfos, updateShipInfoToFirebase } = useContext(ProductContext);
  const [errors, setErrors] = useState({});
  const [isProvinceValid, setIsProvinceValid] = useState();
  const [isDistrictValid, setIsDistrictValid] = useState();
  const [isWardsValid, setIsWardsValid] = useState();
  const buttonRef = useRef();

  const validateName = () => {
    let isValid = true;
    let error;
    // contain atleast 3 space
    if (!name) {
      isValid = false;
      error = "Vui lòng nhập Họ tên!";
    }

    const nameRegex = /(\D*[\s]){2,}/; // contain atleast 2 space, only char
    if (name && !nameRegex.test(name)) {
      isValid = false;
      error = "Nhập đầy đủ cả họ và tên, không chứa số!";
    }
    setErrors((prev) => ({ ...prev, name: error }));
    return isValid;
  };

  const validatePhone = () => {
    let isValid = true;
    let error;
    if (!phone) {
      isValid = false;
      error = "Vui lòng nhập Số điện thoại";
    }

    const phoneRegex = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/; // đầu số 03, 05, 07, 08, 09, bắt đầu với +84 hoặc 84
    if (phone && !phoneRegex.test(phone)) {
      isValid = false;
      error = "Số điện thoại không hợp lệ!";
    }
    setErrors((prev) => ({ ...prev, phone: error }));
    return isValid;
  };

  const validateProvince = () => {
    let isValid = true;
    let error;
    setIsProvinceValid(true);
    if (!province) {
      isValid = false;
      error = "Vui lòng chọn Tỉnh/thành phố";
      setIsProvinceValid(false);
    }
    setErrors((prev) => ({ ...prev, province: error }));
    return isValid;
  };

  const validateDistrict = () => {
    let isValid = true;
    let error;
    setIsDistrictValid(true);
    if (!district) {
      isValid = false;
      setIsDistrictValid(false);
      error = "Vui lòng chọn Quận/huyện";
    }
    setErrors((prev) => ({ ...prev, district: error }));
    return isValid;
  };

  const validateWard = () => {
    let isValid = true;
    let error;
    setIsWardsValid(true);
    if (!ward) {
      setIsWardsValid(false);
      isValid = false;
      error = "Vui lòng chọn Phường/xã/thị trấn";
    }
    setErrors((prev) => ({ ...prev, ward: error }));
    return isValid;
  };

  const validateStreet = () => {
    let isValid = true;
    let error;
    if (!street) {
      isValid = false;
      error = "Vui lòng nhập Tổ dân phố, ngõ, số nhà, đường(thôn, xóm)";
    }
    setErrors((prev) => ({ ...prev, street: error }));
    return isValid;
  };

  const handleBack = () => {
    toggleAddressAdd(!isAddressAddShowing);
    setErrors({});
  };

  const handleApply = (e) => {
    e.preventDefault();
    const isNameValid = validateName();
    const isPhoneValid = validatePhone();
    const isProvinceValid = validateProvince();
    const isDistrictValid = validateDistrict();
    const isWardValid = validateWard();
    const isStreetValid = validateStreet();

    if (
      isNameValid &&
      isPhoneValid &&
      isProvinceValid &&
      isDistrictValid &&
      isWardValid &&
      isStreetValid
    ) {
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
            <form
              className="address-profile__modal-content"
              onSubmit={handleApply}
            >
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={(e) => {
                  validateName();
                }}
                className="address-profile__name"
                placeholder="Họ và tên"
              />
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={handlePhoneChange}
                onBlur={() => {
                  validatePhone();
                }}
                className="address-profile__phone"
                placeholder="Số điện thoại"
              />
              <div className="address-profile__name-error">{errors.name}</div>
              <div className="address-profile__phone-error">{errors.phone}</div>
              <div className="address-profile__province">
                <StyleAutocomplete
                  isValid={isProvinceValid}
                  ListboxProps={{
                    sx: { fontSize: "1.3rem" },
                  }}
                  value={province?.name || null}
                  onChange={handleProvinceChoose}
                  onBlur={() => {
                    validateProvince();
                  }}
                  disablePortal
                  id="province"
                  options={provinces.map((province) => province.name)}
                  renderInput={(params) => (
                    <TextField {...params} label="Thành phố" />
                  )}
                />
              </div>
              <div className="address-profile__district">
                <StyleAutocomplete
                  sx={{ cursor: "not-allowed !important" }}
                  isValid={isDistrictValid}
                  ListboxProps={{
                    sx: { fontSize: "1.3rem" },
                  }}
                  disabled={!province}
                  value={district?.name || null}
                  onChange={handleDistrictChoose}
                  onBlur={() => {
                    validateDistrict();
                  }}
                  size="medium"
                  disablePortal
                  id="district"
                  options={districts.map((district) => district.name)}
                  renderInput={(params) => (
                    <TextField {...params} label="Quận/Huyện" />
                  )}
                />
              </div>
              <div className="address-profile__ward">
                <StyleAutocomplete
                  isValid={isWardsValid}
                  ListboxProps={{
                    sx: { fontSize: "1.3rem" },
                  }}
                  disabled={!district}
                  value={ward?.name || null}
                  onChange={handleWardChoose}
                  onBlur={() => {
                    validateWard();
                  }}
                  size="medium"
                  disablePortal
                  id="ward"
                  options={wards.map((ward) => ward.name)}
                  renderInput={(params) => (
                    <TextField {...params} label="Phường/Xã" />
                  )}
                />
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
                onBlur={() => {
                  validateStreet();
                }}
                className="address-profile__address-detail"
                placeholder="Tổ dân phố, ngõ, số nhà, đường(thôn, xóm)"
              />
              <div className="address-profile__street-error">
                {errors.street}
              </div>
              <Button
                sx={{ display: "none" }}
                ref={buttonRef}
                type="submit"
              ></Button>
            </form>

            <div className="address-profile__popup-footer">
              <button
                onClick={handleBack}
                className="btn address-profile__popup-back "
              >
                Trở lại
              </button>
              <button
                onClick={() => {
                  buttonRef.current.click();
                }}
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
