import classNames from "classnames";
import React from "react";
import theme from "../themes/default";

const TextArea = React.forwardRef(function TextArea(props, ref) {
  const {
    valid,
    disabled,
    className,
    type = "text",
    label,
    ...other
  } = props;

  const input = theme.input;

  const baseStyle = input.base;
  const activeStyle = input.active;
  const disabledStyle = input.disabled;
  const validStyle = input.valid;
  const invalidStyle = input.invalid;
  const radioStyle = input.radio;
  const checkStyle = input.checkbox;

  function hasValidation(valid) {
    return valid !== undefined;
  }

  function validationStyle(valid) {
    if (hasValidation(valid)) {
      return valid ? validStyle : invalidStyle;
    }
    return "";
  }

  function typeStyle(type) {
    switch (type) {
    case "radio":
      return radioStyle;
    case "checkbox":
      return checkStyle;
    default:
      return baseStyle;
    }
  }

  const cls = classNames(
    typeStyle(type),
    // don't apply activeStyle if has valid or disabled
    !hasValidation(valid) && !disabled && activeStyle,
    // don't apply disabledStyle if has valid
    !hasValidation(valid) && disabled && disabledStyle,
    validationStyle(valid),
    className
  );

  return (
    <>
      <label>{label}</label>
      <textarea className={cls} type={type} ref={ref} {...other} />
    </>
  );
});

export default TextArea;
