import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MultiSelect } from "../../components/formValidation/MultiSelect";
import { TextField } from "../../components/formValidation/TextField";
import { Toggle } from "../../components/formValidation/Toggle";
import { setParems } from "../../redux/Campaign";
import api from "../../utils/api";
import DaynmicApicall from "../../utils/function";

export default function AddMenu(props) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state?.user?.value);
  const [scripttype, setScriptType] = useState([]);
  const [pageData, setpageData] = useState("");
  async function getScriptType() {
    api
      .get(`prm/getParamdata/ALL/SCRIPT-TYPE`, {
        headers: {
          Authorization: userInfo.data[0].UserToken, //the token is a variable which holds the token
        },
      })
      .then(async (res) => {
        let bData = [];
        bData = await res.data.data.map((item) => {
          return {
            value: item.paravalue,
            label: item.paracode,
          };
        });
        setScriptType(bData);
      })
      .catch((error) => {
        toast.error(
          error.response.data.message ??
          error.message ??
          "OOPs, something went wrong."
        );
      });
  }

  async function pageInfo() {
    await DaynmicApicall(`/appuser/getcomponetbyid/${props.data.activeMenu.keypointer}/${props.data.activeMenu.subcompid}`, '', 'get', userInfo.data[0].UserToken)
      .then((data) => {
        setpageData(data[0].DATA);
      })
  }
  useEffect(async () => {
    await getScriptType();
    await pageInfo();
  }, []);
  let action = props?.data?.paremsData.action === "UPDATE";
  let initial = {
    respscore: action ? props?.data?.paremsData.comp.resp_score:"",
    respcolorcode: action ? props?.data?.paremsData.comp.resp_color: "",
    respcode: action ? props?.data?.paremsData.comp.resp_code : "",
    respname: action ? props?.data?.paremsData.comp.resp_desc : "",
    usereligible: action ? props?.data?.paremsData.comp.user_eligible : "",
    removestatus: action ? props?.data?.paremsData.comp.remove_status : "",
    leadstatus: action ? props?.data?.paremsData.comp.lead_status : "",
    responselevel: action ? props?.data?.paremsData.comp.resp_level : "",
    agentstatus: action ? props?.data?.paremsData.comp.agent_status : "",
    createdby: userInfo.data[0].userid,
    client_respcode: action ? props?.data?.paremsData.comp.client_resp_code : "",
    resp_type: action ? scripttype.find((v) => v.value === props?.data?.paremsData.comp.resp_type) : "",
    parent_respcode: action ? props?.data?.paremsData.comp.parent_resp_code : "",
    action_name: action ? "UPDATE" : "INSERT",
    active: action
      ? props?.data?.paremsData.comp.is_active === "Y"
        ? true
        : false
      : true,
  };
  const onSubmit = async (values, { resetForm }) => {
    values.active = values.active === true ? "Y" : "N";
    values.removestatus = values.removestatus === true ? 1 : 0;
    values.agentstatus = values.agentstatus === true ? 1 : 0;
    values.leadstatus = values.leadstatus === true ? 1 : 0;
    values.responselevel = values.responselevel === true ? 1 : 0;
    values.resp_type = values.resp_type.value;
    if (props.data.paremsData.action === "INSERT") {
      const Info = api.post("appuser/respcodemaster/", values, {
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
      const Info = api.post("appuser/respcodemaster/", values, {
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
        <Formik initialValues={initial} onSubmit={onSubmit}>
          {(formik) => (
            <div
              className="card card-body border-light shadow mb-4"
              style={pageData?.style}
            >
              <h6 className="text-light card-header rounded bg-dark">
                {" "}
                {props?.data?.paremsData?.action === "INSERT"
                  ? pageData.fieldsData.titleAdd
                  : pageData.fieldsData.titleUpdate}
              </h6>

              <Form>
                <div className="row mt-3">
                  <TextField
                    label={pageData.fieldsData.ResponseCode.label}
                    name={pageData.fieldsData.ResponseCode.name}
                    placeholder={pageData.fieldsData.ResponseCode.placeholder}
                    type={pageData.fieldsData.ResponseCode.type}
                    // defaultValue={props.data.ResponseCode.action === "UPDATE" ? userData?.ResponseCode : null}
                    disabled={props?.data?.paremsData.action === "UPDATE"}
                  />
                  <TextField
                    label={pageData.fieldsData.ResponseName.label}
                    name={pageData.fieldsData.ResponseName.name}
                    placeholder={pageData.fieldsData.ResponseName.placeholder}
                    type={pageData.fieldsData.ResponseName.type}
                  />
                  <TextField
                    label={pageData.fieldsData.Eligible.label}
                    name={pageData.fieldsData.Eligible.name}
                    placeholder={pageData.fieldsData.Eligible.placeholder}
                    type={pageData.fieldsData.Eligible.type}
                  />
                  <TextField
                    label={pageData?.clientRespcode?.label}
                    name={pageData?.clientRespcode?.name}
                    placeholder={pageData?.clientRespcode?.placeholder}
                    type={pageData?.clientRespcode?.type}
                 
                  />
                  <MultiSelect
                    label={pageData?.resptype?.label}
                    name={pageData?.resptype?.name}
                    placeholder={pageData?.resptype?.placeholder}
                    type={pageData?.resptype?.type}
                    value={formik.values.resp_type}
                    isMulti={false}
                    options={scripttype}
                    onChange={(value) =>
                      formik.setFieldValue("resp_type", value)
                    }
                  />
                  <TextField
                    label={pageData?.parentRespcode?.label}
                    name={pageData?.parentRespcode?.name}
                    placeholder={pageData?.parentRespcode?.placeholder}
                    type={pageData?.parentRespcode?.type}
                  />
                  <TextField
                    label={pageData?.respColorcode?.label}
                    name={pageData?.respColorcode?.name}
                    placeholder={pageData?.respColorcode?.placeholder}
                    type={pageData?.respColorcode?.type}
                  />
                  <TextField
                    label={pageData?.score?.label}
                    name={pageData?.score?.name}
                    placeholder={pageData?.score?.placeholder}
                    type={pageData?.score?.type}
                  />
                  <div className="row mt-4">
                    <Toggle
                      defaultChecked={formik.values.removestatus}
                      value={formik.values.removestatus}
                      onChange={(e) =>
                        formik.setFieldValue("removestatus", e.target.checked)
                      }
                      label={pageData?.fieldsData?.RemoveStatus?.label}
                      name={pageData?.fieldsData?.RemoveStatus?.name}
                      placeholder={pageData?.fieldsData?.RemoveStatus?.placeholder}
                    />
                    <Toggle
                      label={pageData?.fieldsData?.LeadStatus?.label}
                      name={pageData?.fieldsData?.LeadStatus?.name}
                      placeholder={pageData?.fieldsData?.LeadStatus?.placeholder}
                      type={pageData?.fieldsData?.LeadStatus?.type}
                      defaultChecked={formik.values.leadstatus}
                      value={formik.values.leadstatus}
                      onChange={(e) =>
                        formik.setFieldValue("leadstatus", e.target.checked)
                      }
                    />
                    <Toggle
                      label={pageData?.fieldsData?.ResLavel?.label}
                      name={pageData?.fieldsData?.ResLavel?.name}
                      type={pageData?.fieldsData?.ResLavel?.type}
                      defaultChecked={formik.values.responselevel}
                      value={formik.values.responselevel}
                      onChange={(e) =>
                        formik.setFieldValue("responselevel", e.target.checked)
                      }
                    />
                    <Toggle
                      label={pageData?.fieldsData?.AgentStatus?.label}
                      name={pageData?.fieldsData?.AgentStatus?.name}
                      type={pageData?.fieldsData?.AgentStatus?.type}
                      defaultChecked={formik.values.agentstatus}
                      value={formik.values.agentstatus}
                      onChange={(e) =>
                        formik.setFieldValue("agentstatus", e.target.checked)
                      }
                    />
                    <Toggle 
                    label={pageData?.fieldsData?.status?.label}
                    name={pageData?.fieldsData?.status?.name}
                    type={pageData?.fieldsData?.status?.type}
                    defaultChecked={formik.values.active}
                    value={formik.values.active}
                    onChange={(e) => 
                    formik.setFieldValue("active",e.target.checked)}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end mt-1">
                  <button
                    type={pageData?.fieldsData?.button.type}
                    className="btn btn-primary btn-sm m-2"
                    style={pageData?.fieldsData?.button.style}
                  >
                    {pageData?.fieldsData?.button.label}
                  </button>
                  <Link
                    to="/dashboard"
                    className="btn btn-primary btn-sm m-2"
                    style={pageData?.fieldsData?.cancelButton.style}
                    onClick={(e) => {
                      dispatch(setParems({ data: "" }));
                    }}
                  >
                    {pageData?.fieldsData?.cancelButton.label}
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
