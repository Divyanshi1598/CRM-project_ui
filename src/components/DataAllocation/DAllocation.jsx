import React from "react";
import { Formik } from "formik";
import { TextField } from "../formValidation/TextField";
import Form from "react-bootstrap/Form";
import { MultiSelect } from "../formValidation/MultiSelect";
import { Toggle } from "../formValidation/Toggle";

const DAllocation = () => {
  const PageData ={
    title:"Manage Data use",
    "multi1" :{
      "label":"Select Ques option",
      "name":"Select question"
    },
    "textfeild1":{
      "label":"Question",
      "placeholder":"write a question",
      "type":"text",
      "name":"payment"
    },
    "textfeild2":{
      "label":"Description",
      "placeholder":"write a description",
      "type":"text",
      "name":"payment"
    },

    "mult2":{
      "label":"Question Type",
      "name":"Select question"
    },
    "mult3":{
      "label":"Control Type",
      "name":"send"
    },
    "mult4":{
      "label":"Question Order",
      "name":"send"
    },
    "toggle":{
      "label":"Active",
       "name":"consent",
        "key":"key",
        "type":"switch"

    },
    "btn":"Save"


  }
  return (
    <div>
      <div
        class="modal fade"
        id="paymentDetails"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modalTitleNotify"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered ml-1" role="document">
          <div class="modal-content" style={{ marginTop: "275px" }}>
            <div class="modal-header" style={{ width: "950px" }}>
              <p class="modal-title display-5" id="modalTitleNotify">
                Manage Data use
              </p>
              <button
                type="button"
                class="btn-close mt-2"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div>
              <div>
                {Object.length > 0 ? (
                  <Formik>
                    {(formik) => (
                      <Form>
                        <div className="row">
                          <MultiSelect
                            label="Select Ques option"
                            name="Select question"
                            isMulti={false}
                            formik={formik}
                          />
                          <TextField
                            label="Question "
                            placeholder="write a question"
                            type="text"
                            name="payment"
                          />
                          <TextField
                            label="Description"
                            placeholder="write a description "
                            type="text"
                            name="payment"
                          />
                          <MultiSelect
                            label="Question Type"
                            name="Select question"
                            isMulti={false}
                            formik={formik}
                          />
                          <MultiSelect
                            label="Control Type"
                            name="send"
                            isMulti={false}
                            formik={formik}
                          />
                          <MultiSelect
                            label="Question Order"
                            name="send"
                            isMulti={false}
                            formik={formik}
                          />
                          <Toggle
                            label="Active"
                            name="consent"
                            key="key"
                            type="switch"
                          />
                          <div className="d-flex justify-content-end">
                            <button
                              type="submit"
                              className="btn btn-primary btn-sm m-2 mt-1"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DAllocation;
