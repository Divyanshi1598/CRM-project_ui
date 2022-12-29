import React from "react";
import { Formik, Form } from "formik";
import { TextArea } from "../../formValidation/TextArea";
import { MultiSelect } from "../../formValidation/MultiSelect";
import { TextField } from "../../formValidation/TextField";

export default function Sms() {
  let templates = [
    { value: "2", label: "Payment Remainder" },
    { value: "3", label: "Late Payment" },
    { value: "4", label: "Due Date" },
  ];
  let language = [
    { value: "2", label: "Hindi" },
    { value: "3", label: "English" },
    { value: "4", label: "Gujrati" },
  ];
  const pageData = {
    text1: {
      label: "Select Template",
      name: "template",
      placeholder: "Select Tamplate",
      tooltip: "Select Tamplate For User",
    },
    text2: {
      label: "Select Language",
      name: "sendlanguage",
      placeholder: "Select Language",
      tooltip: "Select Language For User",
    },
    text3: {
      row: "5",
      name: "arearow",
      placeholder: "Template Show",
      tooltip: "Show Selected Template",
      type: "text",
    },
    text4: {
      label: "WhatsApp Number",
      name: "whatsapp",
      placeholder: "Enter WhatsApp Number",
      tooltip: "Enter WhatsApp Number Here..",
      type: "text",
    },
    button: {
      label: "send",
    },
    cancelButton: {
      label: "cancel",
    },
  };
  let initial = {
    arearow:"",
    whatsapp:"",
  }
  
  return (
    <Formik
    initialValues={initial}
    // // validationSchema={validate}
    // onSubmit={onSubmit}
    >
      {(formik) => (
        <div className="card card-body text-dark shadow-sm ">
          <Form>
            <div className="row">
              <MultiSelect
                label={pageData.text1.label}
                name={pageData.text1.name}
                tooltip={pageData.text1.tooltip}
                placeholder={pageData.text1.placeholder}
                isMulti={false}
                formik={formik}
                options={templates}
              />
              <MultiSelect
                label={pageData.text2.label}
                name={pageData.text2.name}
                isMulti={false}
                formik={formik}
                options={language}
                tooltip={pageData.text2.tooltip}
                placeholder={pageData.text2.placeholder}
              />
              <TextArea
                rows={pageData.text3.row}
                name={pageData.text3.name}
                type={pageData.text3.type}
                tooltip={pageData.text3.tooltip}
                placeholder={pageData.text3.placeholder}
              />
            </div>
            <TextField
              label={pageData.text4.label}
              placeholder={pageData.text4.placeholder}
              type={pageData.text4.type}
              name={pageData.text4.name}
            />
            <div className="d-flex justify-content-end mt-1">
              <button type="submit" className="btn btn-primary p-2 m-2">
                {pageData?.button?.label}
              </button>
              <button
                type="reset"
                className="btn btn-primary p-2 m-2"
                // style={pageData?.cancelButton?.style}
              >
                {pageData?.cancelButton?.label}
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}
