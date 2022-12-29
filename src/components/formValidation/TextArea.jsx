import React from 'react';
import { ErrorMessage, useField } from 'formik';

export const TextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="col-md-8 mb-2">
      <div className="form-control-sm">
        <label htmlFor={field.name}>{label}</label>
        <textarea
          className={`form-control form-control-sm rounded ${meta.touched && meta.error && 'is-invalid'}`}
          {...field} {...props}
          autoComplete="off"
        />
        <ErrorMessage component="div" name={field.name} className="error" />
      </div>
    </div>
  )
}