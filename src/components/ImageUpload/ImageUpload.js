import React from "react";
import PropTypes from "prop-types";
import { useRef, useEffect } from "react";

const ImageUpload = (props) => {
  const inputEl = useRef();
  const {
    name,
    previewImage,
    onImageInputChange,
    onImageBtnBlur,

    type,
    uploadProceesing,
    disabled,
  } = props;

  const handleImageInputChange = (e) => {
    if (onImageInputChange && e.target.files && e.target.files[0]) {
      const fileImage = e.target.files[0];
      onImageInputChange(fileImage);
    }
  };
  return (
    <div className="user-profile__image-input">
      <div
        onClick={() => {
          !uploadProceesing && inputEl.current.click();
        }}
        className="user-profile__input-image"
      >
        {!previewImage ? (
          <svg
            enableBackground="new 0 0 15 15"
            viewBox="0 0 15 15"
            x="0"
            y="0"
            className="user-profile__input-svg"
          >
            <g>
              <circle
                cx="7.5"
                cy="4.5"
                fill="none"
                r="3.8"
                strokeMiterlimit="10"
              ></circle>
              <path
                d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6"
                fill="none"
                strokeLinecap="round"
                strokeMiterlimit="10"
              ></path>
            </g>
          </svg>
        ) : (
          <div
            className="user-profile__preview-image"
            onClick={() => {
              inputEl.current.click();
            }}
            style={{ backgroundImage: `url(${previewImage})` }}
          ></div>
        )}
      </div>
      <button
        disabled={uploadProceesing}
        type="button" // formik treat as submit button ??
        onClick={() => {
          inputEl.current.click();
        }}
        className="btn user-profile__image-btn"
      >
        Chọn ảnh
      </button>
      <input
        name={name}
        type={type}
        ref={inputEl}
        onBlur={onImageBtnBlur}
        onChange={handleImageInputChange}
        className="user-profile__image-file"
        accept=".jpg,.jpeg,.png"
        disabled={disabled}
      />
      <div className="user-profile__image-size">
        Dụng lượng file tối đa 8 MB
      </div>
      <div className="user-profile__image-format">Định dạng:.JPEG, .PNG</div>
    </div>
  );
};

ImageUpload.propTypes = {
  previewImage: PropTypes.string,
  onImageInputChange: PropTypes.func,
  onImageBtnBlur: PropTypes.func,
  type: PropTypes.string,
  uploadProceesing: PropTypes.bool,
  disabled: PropTypes.bool,
};

ImageUpload.defaultProps = {
  previewImage: "",
  onImageInputChange: null,
  onImageBtnBlur: null,
  type: "file",
  uploadProceesing: false,
  disabled: false,
};

export default ImageUpload;
