import React from "react";
import PropTypes from "prop-types";

const InputField = (props) => {
  const {
    field,
    form, // for validation

    type,
    label,
    placeholder,
    disabled,
    labelClassName,
    inputClassName,
  } = props;
  const { name } = field;
  // console.log(field);
  // const {name, value, onChange, onBlur} = field;
  return (
    <>
      {label && (
        <label htmlFor={name} className={labelClassName}>
          {label}
        </label>
      )}
      <input
        id={name}
        {...field}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClassName}
      />
    </>
  );
};

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
};

InputField.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  disabled: false,
  labelClassName: "",
  inputClassName: "",
};

export default InputField;
