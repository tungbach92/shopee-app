import React from "react";
import PropTypes from "prop-types";
import { ErrorMessage } from "formik";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";
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
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  // console.log(field);
  // const {name, value, onChange, onBlur} = field;
  return (
    <>
      {label && (
        <Label for={name} className={labelClassName}>
          {label}
        </Label>
      )}
      <Input
        id={name}
        {...field}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        // className={showError ? inputClassName + " is-invalid" : inputClassName}
        className={inputClassName}
        invalid={showError}
      />
      <ErrorMessage name={name} component={FormFeedback}></ErrorMessage>
      {/* Error msg Formik, FormFeedBack reactstrap */}
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
