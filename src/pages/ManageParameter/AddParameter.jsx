import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "../../components/formValidation/TextField";
import { Link, useNavigate } from "react-router-dom";
import { Toggle } from "../../components/formValidation/Toggle";
import api from "../../utils/api";
import { setParems } from "../../redux/Campaign";
import DaynmicApicall from "../../utils/function";

export default function AddParameter(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state?.user?.value);
  const [pageData, setpageData] = useState("");

  let initial = {
    paracode:
      props?.data?.paremsData.action === "UPDATE"
        ? props?.data?.paremsData.user.paracode
        : "",
    paradesc:
      props?.data?.paremsData.action === "UPDATE"
        ? props?.data?.paremsData.user.paradesc
        : "",
    paravalue:
      props?.data?.paremsData.action === "UPDATE"
        ? props?.data?.paremsData.user.paravalue
        : "",
    paraprop:
      props?.data?.paremsData.action === "UPDATE"
        ? props?.data?.paremsData.user.paraprop
        : "",

    isactive:props?.data?.paremsData.action === "UPDATE" ? props?.data?.paremsData.user.isactive === 1 ? true : false : true,
    action_name: props?.data?.paremsData.action === "UPDATE" ? "UPDATE" : "ADD",
    keypointer: "u001dlr",
  };
  const validate = Yup.object({
    paracode: Yup.string().required("Para Code is required"),
    paradesc: Yup.string().required("Para Description is required"),
    paravalue: Yup.string().required("Paravalue is required"),
    paraprop: Yup.string().required("Paraprop is required"),
  });
  const onSubmit = async (values, { resetForm }) => {

    values.isactive = values.isactive === true ? 1 : 0;
    if (props.data.paremsData.action === "INSERT") {
      const Info = api.post("prm/managatsparameter/", values, {
        headers: { Authorization: userInfo.data[0].UserToken },
      });
      toast
        .promise(Info, {
          loading: "Authenticating member.",
          success: (Info) => {
            return Info.data.message;
          },
          error: (err) => {
            return (
              err?.response?.data?.errors ??
              err?.response?.data?.message ??
              err?.message ??
              "OOPs something went wrong."
            );
          },
        })
        .then(() => {
          dispatch(setParems({ data: "" }));
        });
    } else {
      const Info = api.post("prm/managatsparameter/", values, {
        headers: { Authorization: userInfo.data[0].UserToken },
      });
      toast
        .promise(Info, {
          loading: "Authenticating member.",
          success: (Info) => {
            return Info.data.message;
          },
          error: (err) => {
            return (
              err?.response?.data?.errors ??
              err?.response?.data?.message ??
              err?.message ??
              "OOPs something went wrong."
            );
          },
        })
        .then(() => {
          dispatch(setParems({ data: "" }));
        });
    }
  };
  async function pageInfo() {
    await DaynmicApicall(`/appuser/getcomponetbyid/${props?.data?.activeMenu?.keypointer}/${props?.data?.activeMenu?.subcompid}`, '', 'get', userInfo.data[0].UserToken).then((data) => {
      setpageData(data[0].DATA);
    })
  }
  useEffect(async () => {
    await pageInfo();
  }, []);

  return (
    <>
      {Object.keys(pageData).length > 0 ? (
        <Formik
          initialValues={initial}
          validationSchema={validate}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <div
              className="card card-body border-light shadow mb-4"
              style={pageData.style}
            >
              <h6 className="text-light card-header rounded bg-dark">
                {" "}
                {props?.data?.paremsData.action === "INSERT"
                  ? pageData.fieldsData.titleAdd
                  : pageData.fieldsData.titleUpdate}
              </h6>
              <Form>
                <div className="row mt-3 m-1 p-1">
                  <TextField
                    label={pageData.fieldsData.paracode.label}
                    name={pageData.fieldsData.paracode.name}
                    placeholder={pageData.fieldsData.paracode.placeholder}
                    type={pageData.fieldsData.paracode.type}
                    disabled={props?.data?.paremsData.action === "UPDATE"}
                  />
                  <TextField
                    label={pageData.fieldsData.paravalue.label}
                    name={pageData.fieldsData.paravalue.name}
                    placeholder={pageData.fieldsData.paravalue.placeholder}
                    type={pageData.fieldsData.paravalue.type}
                  />
                  <TextField
                    label={pageData.fieldsData.paradescription.label}
                    name="paradesc"
                    placeholder={
                      pageData.fieldsData.paradescription.placeholder
                    }
                    type={pageData.fieldsData.paradescription.type}
                  />
                  <TextField
                    label={pageData.fieldsData.paraprops.label}
                    name={pageData.fieldsData.paraprops.name}
                    placeholder={pageData.fieldsData.paraprops.placeholder}
                    type={pageData.fieldsData.paraprops.type}
                    disabled={props?.data?.paremsData.action === "UPDATE"}
                  />
                  <Toggle
                    label={pageData.fieldsData.active.label}
                    name="isactive"
                    key={pageData.fieldsData.active.key}
                    type={pageData.fieldsData.active.type}
                    value={formik.values.isactive}
                    defaultChecked={formik.values.isactive}
                    onChange={(e) =>
                      formik.setFieldValue("isactive", e.target.checked)
                    }
                  />
                </div>
                <div className="d-flex justify-content-end mt-1">
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm m-2"
                    style={pageData.fieldsData.button.style}
                  >
                    {pageData.fieldsData.button.label}
                  </button>
                  <Link
                    to="/dashboard"
                    className="btn btn-primary btn-sm m-2"
                    style={pageData.fieldsData.cancelButton.style}
                    onClick={(e) => {
                      dispatch(setParems({ data: "" }));
                    }}
                  >
                    {pageData.fieldsData.cancelButton.label}
                  </Link>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      ) : (
        ""
      )}
    </>
  );
}
