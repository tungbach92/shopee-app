import React from "react";
import PropTypes from "prop-types";
import { FastField, Field, Form, Formik } from "formik";
import PopupModal from "../../../../components/PopupModal";
import useModal from "../../../../hooks/useModal";
import InputField from "../../../../custom-fields/InputField";
import RadioGroupField from "../../../../custom-fields/RadioGroupField";
import { Link, useRouteMatch } from "react-router-dom";
import ImageUploadField from "../../../../custom-fields/ImageUploadField";

const AccountForm = (props) => {
  const {
    userName,
    name,
    email,
    phone,
    gender,
    birthday,
    userAvatar,
    previewImage,
    setPreviewImage,
    setFileImage,
    uploadProceesing,
    setUploadSuccess,
    handleInfoSubmit,
  } = props;
  const { isPopupShowing, togglePopup } = useModal();
  const match = useRouteMatch();
  return (
    <Formik
      enableReinitialize
      initialValues={{
        user: userName,
        name,
        email,
        phone,
        gender,
        birthday,
        previewImage: null,
      }}
      onSubmit={handleInfoSubmit}
    >
      {(formikProps) => {
        const { values, errors, touched } = formikProps;
        console.log({ values, errors, touched });
        return (
          <Form className="user-profile__info-form">
            {/* onSubmit={handleInfoSubmit}> */}
            <div className="user-profile_info-container">
              <div className="user-profile__info-input">
                <FastField
                  name="user"
                  component={InputField}
                  type="text"
                  label="Tên Đăng Nhập"
                  placeholder=""
                  disabled={false}
                  labelClassName="user-profile__user-label"
                  inputClassName="user-profile__user-input"
                ></FastField>
                <FastField
                  name="name"
                  component={InputField}
                  type="text"
                  label="Tên"
                  placeholder=""
                  disabled={false}
                  labelClassName="user-profile__user-label"
                  inputClassName="user-profile__name-input"
                ></FastField>
                {/* <label className="user-profile__name-label">Tên</label>
            <input
              type="text"
              value={name}
              // onChange={(e) => setName(e.target.value)}
              className="user-profile__name-input"
            /> */}
                {/* <FastField
              name="email"
              component={InputField}
              type="text"
              label="Email"
              placeholder="..."
              disabled={false}
              labelClassName="user-profile__email-label"
              inputClassName="user-profile__email-input"
            ></FastField> */}
                <label className="user-profile__email-label">Email</label>
                <div className="user-profile__email-input">
                  {email}
                  <Link
                    to={`${match.url}/email`}
                    className="user-profile__email-btn"
                  >
                    Thay đổi
                  </Link>
                </div>
                <FastField
                  name="phone"
                  component={InputField}
                  type="text"
                  label="Số Điện Thoại"
                  placeholder=""
                  disabled={false}
                  labelClassName="user-profile__phone-label"
                  inputClassName="user-profile__phone-input"
                ></FastField>
                {/* <label className="user-profile__phone-label">Số Điện Thoại</label>
            <input
              type="text"
              // value={phone}
              // onChange={handlePhoneChange}
              className="user-profile__phone-input"
            /> */}
                <label className="user-profile__gender-label">Giới Tính</label>
                <div className="user-profile__radio-container">
                  <FastField
                    name="gender"
                    id="man"
                    component={RadioGroupField}
                    value="man"
                    type="radio"
                    label="Nam"
                    labelClassName="user-profile__man-label"
                    inputClassName="user-profile__man-radio"
                    disabled={false}
                  ></FastField>
                  <FastField
                    name="gender"
                    id="woman"
                    component={RadioGroupField}
                    value="woman"
                    type="radio"
                    label="Nữ"
                    labelClassName="user-profile__woman-label"
                    inputClassName="user-profile__woman-radio"
                    disabled={false}
                  ></FastField>
                  <FastField
                    name="gender"
                    id="other"
                    component={RadioGroupField}
                    value="other"
                    type="radio"
                    label="Khác"
                    labelClassName="user-profile__other-label"
                    inputClassName="user-profile__other-radio"
                    disabled={false}
                  ></FastField>
                </div>
                <FastField
                  name="birthday"
                  component={InputField}
                  type="date"
                  label="Ngày Sinh"
                  placeholder=""
                  disabled={false}
                  labelClassName="user-profile__birthday-label"
                  inputClassName="user-profile__birthday-input"
                ></FastField>
                {/* <label className="user-profile__birthday-label">Ngày Sinh</label>
            <input
              type="date"
              // value={birthday}
              // onChange={(e) => setBirthday(e.target.value)}
              className="user-profile__birthday-input"
            /> */}
                <button
                  type="submit"
                  className={
                    uploadProceesing
                      ? "btn user-profile__info-submit user-profile__info-submit--disabled"
                      : "btn user-profile__info-submit"
                  }
                >
                  Lưu
                </button>
              </div>

              <FastField
                name="previewImage"
                component={ImageUploadField}
                type="file"
                label=""
                disabled={false}
                userAvatar={userAvatar}
                setPreviewImage={setPreviewImage}
                setFileImage={setFileImage}
                uploadProceesing={uploadProceesing}
                setUploadSuccess={setUploadSuccess}
              ></FastField>
            </div>

            {/* {isPopupShowing && (
            <PopupModal
              isAnyUserInfoUpdateFail={isAnyUserInfoUpdateFail}
              isAccountPage={isAccountPage}
              isPopupShowing={isPopupShowing}
              togglePopup={togglePopup}
            ></PopupModal>
          )} */}
          </Form>
        );
      }}
    </Formik>
  );
};

AccountForm.propTypes = {};

export default AccountForm;
