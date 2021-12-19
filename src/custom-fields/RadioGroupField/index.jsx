import React from "react";
import PropTypes from "prop-types";

const RadioGroupField = (props) => {
  const {
    field,
    form,

    id,
    type,
    label,
    disabled,
    labelClassName,
    inputClassName,
  } = props;

  const { name, value, checked,...rest } = field; // checked set by Formik
  console.log(field);
  return (
    <>
      <input
        value={id}
        name={name}
        checked={checked}
        {...rest}

        id={id}
        type={type}
        className={inputClassName}
        disabled={disabled}
      />
      {label && (
        <label for={value} className={labelClassName}>
          {label}
        </label>
      )}
    </>
  );
};

RadioGroupField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
};

RadioGroupField.defaultProps = {
  type: "text",
  label: "",
  disabled: false,
  labelClassName: "",
  inputClassName: "",
};

export default RadioGroupField;
