import React from 'react';
import { ErrorMessage} from 'formik';
import Select from 'react-select';

export const MultiSelect = ({ label, name, formik, onChange, isMulti, options, value, ...rest }) => {
  const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { isDisabled }) => {
      return {
        ...styles,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
      }
    },
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: "#727cf5",
        borderColor: "#727cf5",
        borderRadius: "3px"
      };
    },
    multiValueLabel: (styles) => ({
      ...styles,
      color: "white",
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: "#ffffff",
      cursor: "pointer",
      ':hover': {
        backgroundColor: "red",
        color: 'white',
      },
    }),

  };

  return (
    <div className="col-md-4 mb-3">
      <div className='form-control-sm'>
        <label htmlFor={name}>{label}</label>
        <Select
            // {...field} {...props} 
          name={name}
          styles={colourStyles}
          value={value}
          options={options}
          onChange={onChange}
          isMulti={isMulti}
          {...rest}
        />
        <ErrorMessage component="div" name={name} className="error" />
      </div>
    </div>
  )
}


