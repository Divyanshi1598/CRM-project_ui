import { ErrorMessage, Field } from "formik";
import React from "react";
// import TextError from "./TextError";

function SimpleSelect(props) {
  const {
    label,
    labelClass,
    name,
    wrapperClass,
    options,
    ...rest
  } = props;
  return (
    <div
      className={
        wrapperClass ? "form-group row " + wrapperClass : "form-group row"
      }
    >
      {label && (
        <label
          htmlFor={name}
          className={
            labelClass
              ? labelClass + " col-sm-3 col-form-label"
              : "col-sm-3 col-form-label"
          }
        >
          {label}
        </label>
      )}
      <div className="col-sm-9">
        <Field as="select" className="form-control" name={name} {...rest}>
            <option>Select {label}</option>
            {options.map(item=>(
                <option value={item.value}>{item.label}</option>
            ))}
        </Field>
        <ErrorMessage name={name} className="error" />
      </div>
    </div>
  );
}

export default SimpleSelect;
