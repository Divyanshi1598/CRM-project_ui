import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "../../components/formValidation/TextField";
import api from "../../utils/api";
import { Link } from "react-router-dom";
import { Toggle } from "../../components/formValidation/Toggle";
import { setParems } from "../../redux/Campaign";
import DaynmicApicall from "../../utils/function";

export default function EditGlobal(props) {
  const dispatch = useDispatch();
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);
  const [pageData, setpageData] = useState("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    async function pageInfo() {
      await DaynmicApicall(`/appuser/getcomponetbyid/${props.data.activeMenu.keypointer}/${props.data.activeMenu.subcompid}`, '', 'get', userInfo.data[0].UserToken).then((data) => {
        setpageData(data[0].DATA);
      })
    }
    await pageInfo();
  }, [userInfo.data]);

  let action = props?.data?.paremsData.action === "UPDATE";

  let initial = {
    sno: action ? props?.data?.paremsData.user.sno : "NEW",
    servername: action ? props?.data?.paremsData.user.server_host_name : "",
    serverip: action ? props?.data?.paremsData.user.server_local_ip : "",
    serverpublicip: action ? props?.data?.paremsData.user.server_public_ip : "",
    dbusername: action ? props?.data?.paremsData.user.db_user : "",
    userpwd: action ? props?.data?.paremsData.user.user_pwd : "",
    databasename: action ? props?.data?.paremsData.user.database_name : "",
    port: action ? props?.data?.paremsData.user.server_port : "",
    amiuser: action ? props?.data?.paremsData.user.ami_username : "",
    amipwd: action ? props?.data?.paremsData.user.ami_password : "",
    amiport: action ? props?.data?.paremsData.user.ami_port : "",
    wssurl: action ? props?.data?.paremsData.user.wss_url : "",
    wssport: action ? props?.data?.paremsData.user.wss_port : "",
    wsspath: action ? props?.data?.paremsData.user.wss_path : "",
    action_name: action ? "UPDATE" : "INSERT",
    active: action
      ? props?.data?.paremsData.user.is_active === "Y"
        ? true
        : false
      : "N",
    createdby: userInfo.data[0].userid,
  };

  const validate = Yup.object({
    userpwd: Yup.string().required("Field is required"),
    servername: Yup.string().required("Field is required"),
    serverip: Yup.string().required("Field is required"),
    serverpublicip: Yup.string().required("Field is required"),
    dbusername: Yup.string().required("Field is required"),
    databasename: Yup.string().required("Field is required"),
    port: Yup.string().required("Field is required"),
    amiuser: Yup.string().required("Field is required"),
    amipwd: Yup.string().required("Field is required"),
    amiport: Yup.string().required("Field is required"),
    wsspath: Yup.string().required("Field is required"),
    wssport: Yup.string().required("Field is required"),
    wssurl: Yup.string().required("Field is required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    values.active = values.active === true ? "Y" : "N";
    if (props.data.paremsData.action === "INSERT") {
      const Info = api.post("appuser/managedialerparameter/", values, {
        headers: { Authorization: userInfo.data[0].UserToken },
      });
      toast
        .promise(Info, {
          loading: "Campagin Adding..",
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
      const Info = api.post("appuser/managedialerparameter/", values, {
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
                {props?.data?.paremsData?.action === "INSERT"
                  ? pageData.fieldsData.titleAdd
                  : pageData.fieldsData.titleUpdate}
              </h6>
              <Form>
                <div className="row mt-3 m-1 p-1">
                  <TextField
                    label={pageData.fieldsData.ServerhostName.label}
                    name={pageData.fieldsData.ServerhostName.name}
                    placeholder={pageData.fieldsData.ServerhostName.placeholder}
                    type={pageData.fieldsData.ServerhostName.type}
                  />
                  <TextField
                    label={pageData.fieldsData.serverLocalIP.label}
                    name={pageData.fieldsData.serverLocalIP.name}
                    placeholder={pageData.fieldsData.serverLocalIP.placeholder}
                    type={pageData.fieldsData.serverLocalIP.type}
                    disabled={props.data.paremsData.action === "UPDATE"}
                  />
                  <TextField
                    label={pageData.fieldsData.serverPublicIP.label}
                    name={pageData.fieldsData.serverPublicIP.name}
                    placeholder={pageData.fieldsData.serverPublicIP.placeholder}
                    type={pageData.fieldsData.serverPublicIP.type}
                  />
                  <TextField
                    label={pageData.fieldsData.DailerDatabaseUser.label}
                    name={pageData.fieldsData.DailerDatabaseUser.name}
                    placeholder={
                      pageData.fieldsData.DailerDatabaseUser.placeholder
                    }
                    type={pageData.fieldsData.DailerDatabaseUser.type}
                  />
                  <TextField
                    label={pageData.fieldsData.DailerDatabasePWD.label}
                    name={pageData.fieldsData.DailerDatabasePWD.name}
                    placeholder={
                      pageData.fieldsData.DailerDatabasePWD.placeholder
                    }
                    type={pageData.fieldsData.DailerDatabasePWD.type}
                  />
                  <TextField
                    label={pageData.fieldsData.DailerDatabaseName.label}
                    name={pageData.fieldsData.DailerDatabaseName.name}
                    placeholder={
                      pageData.fieldsData.DailerDatabaseName.placeholder
                    }
                    type={pageData.fieldsData.DailerDatabaseName.type}
                  />
                  <TextField
                    label={pageData.fieldsData.DailerServerPort.label}
                    name={pageData.fieldsData.DailerServerPort.name}
                    placeholder={
                      pageData.fieldsData.DailerServerPort.placeholder
                    }
                    type={pageData.fieldsData.DailerServerPort.type}
                  />
                  <TextField
                    label={pageData.fieldsData.AMIUser.label}
                    name={pageData.fieldsData.AMIUser.name}
                    placeholder={pageData.fieldsData.AMIUser.placeholder}
                    type={pageData.fieldsData.AMIUser.type}
                  />
                  <TextField
                    label={pageData.fieldsData.AMIPwd.label}
                    name={pageData.fieldsData.AMIPwd.name}
                    placeholder={pageData.fieldsData.AMIPwd.placeholder}
                    type={pageData.fieldsData.AMIPwd.type}
                  />
                  <TextField
                    label={pageData.fieldsData.AMIPort.label}
                    name={pageData.fieldsData.AMIPort.name}
                    placeholder={pageData.fieldsData.AMIPort.placeholder}
                    type={pageData.fieldsData.AMIPort.type}
                  />
                  <TextField
                    label={pageData.fieldsData.WSSUrl.label}
                    name={pageData.fieldsData.WSSUrl.name}
                    placeholder={pageData.fieldsData.WSSUrl.placeholder}
                    type={pageData.fieldsData.WSSUrl.type}
                  />
                  <TextField
                    label={pageData.fieldsData.WSSPort.label}
                    name={pageData.fieldsData.WSSPort.name}
                    placeholder={pageData.fieldsData.WSSPort.placeholder}
                    type={pageData.fieldsData.WSSPort.type}
                  />
                  <TextField
                    label={pageData.fieldsData.WSSPath.label}
                    name={pageData.fieldsData.WSSPath.name}
                    placeholder={pageData.fieldsData.WSSPath.placeholder}
                    type={pageData.fieldsData.WSSPath.type}
                  />
                  <Toggle
//  label={pageData.fieldsData.status.label}
//  name={pageData.fieldsData.status.name}
//  key={pageData.fieldsData.status.key}
//  type={pageData.fieldsData.status.type}
//  id={pageData.fieldsData.status.id}
//  value={formik.values.active}
//  defaultChecked={formik.values.active}
//  onChange={(e) =>
//    formik.setFieldValue("status", e.target.checked)
//  }



                    label={pageData.fieldsData.status.label}
                    name={pageData.fieldsData.status.name}    
                    type={pageData.fieldsData.status.type}

                    // key={pageData.fieldsData.status.key}
                    // type={pageData.fieldsData.status.type}
                    // id={pageData.fieldsData.status.id}
                    value={formik.values.active}
                    defaultChecked={formik.values.active}
                    onChange={(e) =>
                      formik.setFieldValue("status", e.target.checked)
                    }




                  />
                </div>
                <div className="d-flex justify-content-end mt-1">
                  <button
                    type={pageData.fieldsData.button.type}
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
