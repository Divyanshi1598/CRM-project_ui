import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import SimpleSelect from "./SimpleSelect"

function FileUpload() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const initialValues = {
    doc_type: "",
    file: "",
    randstr: "randstr",
  };
  const validationSchema = Yup.object({
    doc_type: Yup.string().required("Document type is required."),
  });
  const onSubmit = (values) => {
    console.log(values);
    const data = new FormData();
    data.append("file", values.file);
    axios
      .post(
        `http://localhost:5000/api/appuser/upload`,
        data
      )
      
      .then((res) => {
        console.log(res,"responce");
        setSuccess(res.data.message);
        setTimeout(() => { setSuccess('') }, 5000);
      })
      .catch((err) => {
        setError(err.message)
        setTimeout(() => { setError('') }, 5000)
        console.log("image", err);
      });
  };

  const docArr = [
    { label: "Photo", value: "photo" },
    { label: "Aadhar Card", value: "aadhar-card" },
    { label: "PAN Card", value: "pan-card" },
    { label: "Bond Paper", value: "bond-paper" },
    { label: "Address Proof", value: "address-proff" },
    { label: "Document", value: "document" },
    { label: "Excel File", value: "excl-file" },
  ];

const pageData = {
  "title": "UPLOAD DOCUMENTS",
  "image": "https://cdnlib.a10s.in/cdndata/77755e565ef7ddbff2546231cd8732bf.png",
  "label": "Document Type",
  "button":"Upload"
}

  return (
    <div className="main-wrapper p-0 mb-5">
      <div className="page-wrapper ml-0">
        <div className="container my-auto p-0 mb-5">
          <div className="card shadow-lg">
            <div className="card-body">
              <div className="row d-flex align-items-center">
                <div className="col-12 col-sm-6 col-lg-6 text-center">
                  <img 
                  src={pageData.image}
                    className="w-100" alt="pic">
                    </img>                    
                </div>
                <div className="col-12 col-sm-6 col-lg-6">
                  <h3 className="mb-5">{pageData.title}</h3>
                  {
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={onSubmit}
                    >
                      {(formik) => {
                        const imageChange = (e) => {
                          const file = e.target.files[0];
                          formik.setFieldValue("file", file);
                        };
                        return (
                          <Form encType="multipart/form-data">
                            {success && <div className="alert alert-success text-white">{success}</div>}
                            {error && <div className="alert alert-danger text-white">{error}</div>}
                            <div className="form-group ">
                              <SimpleSelect
                                label={pageData.label}
                                value={formik.values.doc_type}
                                name="doc_type"
                                options={docArr}
                                wrapperClass={
                                  formik.errors.doc_type &&
                                    formik.touched.doc_type
                                    ? "has-error"
                                    : null
                                }
                              />
                            </div>
                            <div className="col">
                              <div className="form-group files" >
                                <input
                                  type="file"
                                  onChange={imageChange}
                                  id="myDropify"
                                  className="border"
                                />
                              </div>
                            </div>
                            <div className="col-md-4 mt-3 ml-10">
                              <button className="btn btn-primary" type="submit">
                               {pageData.button}
                              </button>
                            </div>
                          </Form>
                        );
                      }}
                    </Formik>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
