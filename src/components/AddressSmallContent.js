import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from "../context";
import { db } from "../firebase";
import useModal from "../hooks/useModal";
import AddressAddPopup from "./AddressAddPopup";

const AddressSmallContent = ({ isAccountPage }) => {
  const { user } = useContext(ProductContext);
  const { isAddressAddShowing, toggleAddressAdd } = useModal();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [shipInfos, setShipInfos] = useState([]);

  const handleDefaultClick = (index) => {
    shipInfos.forEach((shipInfo) => (shipInfo.isDefault = false));
    shipInfos[index] = { ...shipInfos[index], isDefault: true };
    setShipInfos(shipInfos);
    updateInfoToFirebase();
  };
  const updateInfoToFirebase = () => {
    try {
      db.collection("users")
        .doc(user?.uid)
        .collection("shipInfos")
        .doc("shipInfoDoc")
        .update({
          shipInfos: shipInfos,
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
              onClick={toggleAddressAdd}
              className="btn user-profile__address-add"
            >
              Thêm địa chỉ mới
            </button>
            <AddressAddPopup
              isAddressAddShowing={isAddressAddShowing}
              toggleAddressAdd={toggleAddressAdd}
              name={name}
              setName={setName}
              phone={phone}
              setPhone={setPhone}
              address={address}
              setAddress={setAddress}
              shipInfos={shipInfos}
              setShipInfos={setShipInfos}
            ></AddressAddPopup>
          </div>
        </div>
      </div>
      {shipInfos?.map((shipInfo, index) => (
        <div key={index} className="address-profile__content">
          <div className="address-profile__container">
            <label className="address-profile__name-label">Họ Và Tên</label>
            <span className="address-profile__name-text">{shipInfo.name}</span>
            <label className="address-profile__phone-label">
              Số Điện Thoại
            </label>
            <span className="address-profile__phone-text">
              {shipInfo.phone}
            </span>
            <label className="address-profile__address-label">Địa Chỉ</label>
            <span className="address-profile__address-text">
              {shipInfo.address}
            </span>
          </div>
          <div className="address-profile__btn-container">
            <div>
              <span className="address-profile__edit-btn">Sửa</span>
              <span className="address-profile__delete-btn">Xóa</span>
            </div>
            <button
              onClick={() => handleDefaultClick(index)}
              className="btn address-profile__btn-default"
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
