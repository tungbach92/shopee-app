import React, { useState } from "react";
import PropTypes from "prop-types";
import ImageUpload from "../../components/ImageUpload/ImageUpload";

const ImageUploadField = (props) => {
  const {
    field,
    form,

    label,
    disabled,
    userAvatar,
    setPreviewImage,
    setFileImage,
    uploadProceesing,
    setUploadSuccess,
  } = props;
  const { name, value, onBlur } = field;

  const handleImageInputChange = (fileImage) => {
    if (uploadProceesing) {
      return;
    }
    setFileImage(fileImage);
    if (fileImage.size > 1048576) {
      alert("File is larger than 1048576. Please try again.");
    } else {
      const previewImage = URL.createObjectURL(fileImage);
      form.setFieldValue(name, previewImage);
      setPreviewImage(previewImage);
      setUploadSuccess(false);
    }
  };

  return (
    <>
      {label && <label htmlFor={name} className="user-profile__image-label">{label}</label>}
      <ImageUpload
        name={name}
        previewImage={value}
        onImageInputChange={handleImageInputChange}
        onImageBtnBlur={onBlur}

        userAvatar={userAvatar}
        uploadProceesing={uploadProceesing}
        disabled={disabled}
      ></ImageUpload>
    </>
  );
};

ImageUploadField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

ImageUploadField.defaultProps = {
  type: "file",
  label: "",
  disabled: false,
};

export default ImageUploadField;
