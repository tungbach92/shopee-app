import React from "react";
import PropTypes from "prop-types";
import { FastField, Field, Form, Formik } from "formik";
import InputField from "../custom-fields/InputField/InputField";
import RadioGroupField from "../custom-fields/RadioGroupField/RadioGroupField";
import { Link } from "react-router-dom";
import ImageUploadField from "../custom-fields/ImageUploadField/ImageUploadField";
import * as yup from "yup";

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
    handleInfoSubmit,
  } = props;

  const phoneRegex = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;
  const validationSchema = yup.object().shape({
    user: yup
      .string()
      .min(2, "Tên user phải có tối thiểu 2 ký tự")
      .max(20, "Tên user không vượt quá 20 ký tự")
      .required("Vui lòng nhập tên user"),
    name: yup
      .string()
      .min(2, "Tên phải có tối thiểu 2 ký tự")
      .max(20, "Tên không vượt quá 20 ký tự")
      .required("Vui lòng nhập họ tên"),
    phone: yup
      .string()
      .required("Vui lòng nhập SĐT")
      .matches(phoneRegex, "SĐT không hợp lệ!"),
    gender: yup.string().required("Vui lòng chọn giới tính"),
    birthday: yup.string().required("Vui lòng chọn ngày sinh"),
    previewImage: yup.string().nullable(),
  });
  const handleSubmit = (values) => {
    handleInfoSubmit(values);
  };
  return (
    <Formik
      enableReinitialize
      initialValues={{
        user: userName,
        name,
        phone,
        gender,
        birthday,
        previewImage,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      {(formikProps) => {
        const { values, errors, touched } = formikProps;
        console.log({ values, errors, touched });
        console.log(formikProps);
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
                  invalidClassName="user-profile__user-invalid"
                ></FastField>
                <FastField
                  name="name"
                  component={InputField}
                  type="text"
                  label="Tên"
                  placeholder=""
                  disabled={false}
                  labelClassName="user-profile__name-label"
                  inputClassName="user-profile__name-input"
                  invalidClassName="user-profile__name-invalid"
                ></FastField>
                <label className="user-profile__email-label">Email</label>
                <div className="user-profile__email-input">
                  {email}
                  <Link
                    to="/user/account/email"
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
                  invalidClassName="user-profile__phone-invalid"
                ></FastField>
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
                {errors.gender && touched.gender && (
                  <div className="user-profile__radio-invalid">
                    {errors.gender}
                  </div>
                )}
                <FastField
                  name="birthday"
                  component={InputField}
                  type="date"
                  label="Ngày Sinh"
                  placeholder=""
                  disabled={false}
                  labelClassName="user-profile__birthday-label"
                  inputClassName="user-profile__birthday-input"
                  invalidClassName="user-profile__birthday-invalid"
                ></FastField>
                <button
                  disabled={uploadProceesing}
                  type="submit"
                  className="btn user-profile__info-submit"
                >
                  Lưu
                </button>
              </div>

              <Field
                name="previewImage"
                component={ImageUploadField}
                type="file"
                label=""
                disabled={false}
                userAvatar={userAvatar}
                setPreviewImage={setPreviewImage}
                setFileImage={setFileImage}
                uploadProceesing={uploadProceesing}
              ></Field>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

AccountForm.propTypes = {
  userName: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  gender: PropTypes.string,
  birthday: PropTypes.string,
  userAvatar: PropTypes.string,
  previewImage: PropTypes.string,
  setPreviewImage: PropTypes.func,
  setFileImage: PropTypes.func,
  uploadProceesing: PropTypes.bool,
  handleInfoSubmit: PropTypes.func,
  isAnyUserInfoUpdateFail: PropTypes.bool,
};

AccountForm.defaultProps = {
  userName: null,
  name: null,
  email: null,
  phone: null,
  gender: null,
  birthday: null,
  userAvatar: null,
  previewImage: null,
  setPreviewImage: null,
  setFileImage: null,
  uploadProceesing: false,
  handleInfoSubmit: null,
  isAnyUserInfoUpdateFail: true,
};

export default AccountForm;
