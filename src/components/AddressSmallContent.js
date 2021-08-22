import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from "../context";
import { db } from "../firebase";
import useModal from "../hooks/useModal";
import useProvinceDistrict from "../hooks/useProvinceDistrict";
import AddressAddPopup from "./AddressAddPopup";

const AddressSmallContent = ({ isAccountPage }) => {
  const { user } = useContext(ProductContext);
  const { isAddressAddShowing, toggleAddressAdd } = useModal();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [shipInfos, setShipInfos] = useState([]);
  const [shipInfoIndex, setShipInfoIndex] = useState();
  const [fullAddress, setFullAddress] = useState("");

  const {
    province,
    setProvince,
    district,
    setDistrict,
    ward,
    setWard,
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
  } = useProvinceDistrict();

  const handleDefaultClick = (index) => {
    let tempShipInfos = [...shipInfos];
    tempShipInfos.forEach((shipInfo) => (shipInfo.isDefault = false));
    tempShipInfos[index] = { ...tempShipInfos[index], isDefault: true };
    updateShipInfosToFirebase(tempShipInfos);
  };

  const handleAddressAddClick = () => {
    toggleAddressAdd(!isAddressAddShowing);
    setName("");
    setPhone("");
    setStreet("");
    setProvince(undefined);
    setDistrict(undefined);
    setWard(undefined);
    setShipInfoIndex(undefined);
  };

  const handleEditClick = (index) => {
    toggleAddressAdd(!isAddressAddShowing);
    const name = shipInfos[index].name;
    const phone = shipInfos[index].phone;
    const street = shipInfos[index].street;
    const province = shipInfos[index].province;
    const district = shipInfos[index].district;
    const ward = shipInfos[index].ward;
    setName(name);
    setPhone(phone);
    setStreet(street);
    setProvince(province);
    setDistrict(district);
    setWard(ward);
    setShipInfoIndex(index);
  };

  const handleDeleteClick = (index) => {
    let tempShipInfos = [...shipInfos];
    tempShipInfos = tempShipInfos.filter(
      (shipInfo) => tempShipInfos.indexOf(shipInfo) !== index
    );
    updateShipInfosToFirebase(tempShipInfos);
  };

  const updateShipInfosToFirebase = (shipInfos) => {
    try {
      db.collection("users")
        .doc(user?.uid)
        .collection("shipInfos")
        .doc("shipInfoDoc")
        .update({
          shipInfos: shipInfos,
        })
        .then(() => {
          setShipInfos(shipInfos);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("shipInfos")
        .doc("shipInfoDoc")
        .onSnapshot((doc) => {
          if (doc.exists) {
            const shipInfos = doc.data().shipInfos;
            setShipInfos(shipInfos);
          }
        });
    }
  }, [user]);

  return (
    <>
      <div className="user-profile__title-container">
        <div className="user-profile__title">
          <div className="user-profile__label">
            Địa Chỉ Của Tôi
            <button
              onClick={handleAddressAddClick}
              className="btn user-profile__address-add"
            >
              Thêm địa chỉ mới
            </button>
            <AddressAddPopup
              name={name}
              setName={setName}
              street={street}
              setStreet={setStreet}
              district={district}
              setDistrict={setDistrict}
              province={province}
              setProvince={setProvince}
              ward={ward}
              setWard={setWard}
              phone={phone}
              setPhone={setPhone}
              isProvince={isProvince}
              isDistrict={isDistrict}
              isWard={isWard}
              setIsProvince={setIsProvince}
              setIsDistrict={setIsDistrict}
              setIsWard={setIsWard}
              provinces={provinces}
              districts={districts}
              wards={wards}
              toggleDistrict={toggleDistrict}
              toggleProvince={toggleProvince}
              toggleWard={toggleWard}
              handleDistrictChoose={handleDistrictChoose}
              handleProvinceChoose={handleProvinceChoose}
              handleWardChoose={handleWardChoose}
              fullAddress={fullAddress}
              setFullAddress={setFullAddress}
              isAddressAddShowing={isAddressAddShowing}
              toggleAddressAdd={toggleAddressAdd}
              shipInfos={shipInfos}
              setShipInfos={setShipInfos}
              shipInfoIndex={shipInfoIndex}
            ></AddressAddPopup>
          </div>
        </div>
      </div>
      {shipInfos?.map((shipInfo, index) => (
        <div key={index} className="address-profile__content">
          <div className="address-profile__container">
            <label className="address-profile__name-label">Họ Và Tên</label>
            <span className="address-profile__name-text">
              {shipInfo.name}
              {shipInfo.isDefault && (
                <span className="address-profile__default-badge">Mặc định</span>
              )}
            </span>
            <label className="address-profile__phone-label">
              Số Điện Thoại
            </label>
            <span className="address-profile__phone-text">
              {shipInfo.phone}
            </span>
            <label className="address-profile__address-label">Địa Chỉ</label>
            <span className="address-profile__address-text">
              {shipInfo.fullAddress}
            </span>
          </div>
          <div className="address-profile__btn-container">
            <div>
              <span
                onClick={() => handleEditClick(index)}
                className="address-profile__edit-btn"
              >
                Sửa
              </span>
              {!shipInfo.isDefault && (
                <span
                  onClick={() => handleDeleteClick(index)}
                  className="address-profile__delete-btn"
                >
                  Xóa
                </span>
              )}
            </div>
            <button
              onClick={() => handleDefaultClick(index)}
              className={
                shipInfo.isDefault
                  ? "btn address-profile__btn-default address-profile__btn-default--disabled"
                  : "btn address-profile__btn-default"
              }
            >
              Thiết lập mặc định
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AddressSmallContent;
