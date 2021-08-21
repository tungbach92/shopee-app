import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { ProductContext } from "../context";
import { db } from "../firebase";
import useProvinceDistrict from "../hooks/useProvinceDistrict";

const AddressAddPopup = ({
  isAddressAddShowing,
  toggleAddressAdd,
  name,
  setName,
  address,
  setAddress,
  phone,
  setPhone,
  shipInfos,
  setShipInfos,
}) => {
  const { user } = useContext(ProductContext);
  const [detailAddress, setDetailAddress] = useState("");
  const {
    isProvince,
    isDistrict,
    isWard,
    provinces,
    districts,
    wards,
    province,
    district,
    ward,
    toggleDistrict,
    toggleProvince,
    toggleWard,
    handleDistrictChoose,
    handleProvinceChoose,
    handleWardChoose,
  } = useProvinceDistrict();

  const handleBack = () => {
    toggleAddressAdd(!isAddressAddShowing);
  };

  const handleApply = () => {
    saveInfoToFirebase();
    toggleAddressAdd(!isAddressAddShowing);
  };

  const saveInfoToFirebase = () => {
    try {
      const created = Date.now();
      const address = `${detailAddress}, ${ward.name}, ${district.full_name}`;
      setAddress(address);
      const shipInfo = {
        name: name,
        phone: phone,
        address: address,
        isDefault: false,
        created: created,
      };
      let updatedShipInfos = [];
      updatedShipInfos = shipInfos ? [...shipInfos, shipInfo] : [shipInfo];
      setShipInfos(updatedShipInfos);

      db.collection("users")
        .doc(user?.uid)
        .collection("shipInfos")
        .doc("shipInfoDoc")
        .set({
          shipInfos: updatedShipInfos,
        });
    } catch (error) {
      console.log(error);
    }
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
                onChange={(e) => setPhone(e.target.value)}
                className="address-profile__phone"
                placeholder="Số điện thoại"
              />
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
                        className="checkout-product__provinces-item"
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
                        className="checkout-product__districts-item"
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
                        className="checkout-product__wards-item"
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <input
                type="text"
                value={detailAddress}
                onChange={(e) => setDetailAddress(e.target.value)}
                className="address-profile__address-detail"
                placeholder="Địa chỉ cụ thể"
              />
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
                OK
              </button>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
};

export default AddressAddPopup;
