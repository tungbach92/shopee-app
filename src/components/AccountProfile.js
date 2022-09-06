import React from "react";
import AccountForm from "./AccountForm";

const AccountProfile = ({
  userName,
  name,
  email,
  phone,
  gender,
  birthday,
  userAvatar,
  fileImage,
  previewImage,
  setPreviewImage,
  setFileImage,
  uploadProceesing,
  handleInfoSubmit,
}) => {
  return (
    <>
      <div className="user-profile__title-container">
        <div className="user-profile__title">
          <div className="user-profile__label">Hồ Sơ Của Tôi</div>
          <div className="user-profile__label-detail">
            Quản lý thông tin hồ sơ để bảo mật tài khoản
          </div>
        </div>
      </div>
      <div className="user-profile__content">
        <AccountForm
          userName={userName}
          name={name}
          email={email}
          phone={phone}
          gender={gender}
          birthday={birthday}
          userAvatar={userAvatar}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
          fileImage={fileImage}
          setFileImage={setFileImage}
          uploadProceesing={uploadProceesing}
          handleInfoSubmit={handleInfoSubmit}
        ></AccountForm>
      </div>
    </>
  );
};

export default AccountProfile;
