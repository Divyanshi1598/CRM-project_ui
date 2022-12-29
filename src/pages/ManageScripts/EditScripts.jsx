import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/api";
import { toast } from "react-hot-toast";
import { Toggle } from "../../components/formValidation/Toggle";
import { MultiSelect } from "../../components/formValidation/MultiSelect";
import { TextArea } from "../../components/formValidation/TextArea";
import { useEffect } from "react";
import { setParems } from "../../redux/Campaign";
import { TextField } from "../../components/formValidation/TextField";
import DaynmicApicall from "../../utils/function";

export default function EditScripts(props) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state?.user?.value);
  const { campdetail, component } = useSelector((state) => state.campaign);
  const [language, setLanguage] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [globleScriptCode, setGlobleScriptCode] = useState([]);
  const [scripttype, setScripttype] = useState([]);
  const [flag, setFlag] = useState([]);
  const [disposition, setDisposition] = useState([]);
  const [subDisposition, setSubDisposition] = useState([]);
  const [masterScript, setMasterScript] = useState([]);

  // const [global, setGlobal] = useState(false);
  const Header = { headers: { Authorization: userInfo.data[0].UserToken } };
  let allComps = []; let allCamps = [];
  if (campdetail && campdetail.length > 0) {
    allCamps = campdetail.map((item) => {
      return {
        value: item.campid,
        label: item.campname,
      };
    });
  }
  if (component && component?.length > 0) {
    allComps = component?.map((item) => {
      return {
        value: `${item.componentid}`,
        label: item.componentname,
      };
    });
    allComps.push({
      value: "9999",
      label: "NA",
    })
  }

  async function f_setall_parameter() {
    let CATEGORY = await get_parameter("SCRIPT-CATEGORY")
    setGlobleScriptCode(CATEGORY)
    let SCRIPT = await get_parameter("SCRIPT-TYPE")
    setScripttype(SCRIPT)
    let LANGUAGE = await get_parameter("LANGUAGE")
    setLanguage(LANGUAGE)
    let FLAG = await get_parameter("FLAG")
    setFlag(FLAG)
  }

  async function f_disposition() {
    api
      .get(`appuser/getrespmaster`, Header)
      .then(async (res) => {
        let master = "";
        let subDes = ""
        let data = res.data.data.filter(e => e.resp_type === 'PRI')
        master = await data.map((item) => {
          return {
            value: item.resp_code,
            label: item.resp_desc,
          };
        });
        let data1 = res.data.data
        subDes = await data1.map((item) => {
          return {
            value: item.resp_code,
            label: item.resp_desc,
          };
        });
        setDisposition(master);
        setSubDisposition(subDes)
      })
      .catch((error) => {
        toast.error(
          error?.response?.data.message ??
          error?.message ??
          "OOPs, something went wrong."
        );
      });
  }


  async function get_parameter(paraprop) {
    let parameter = []
    let apiresp = await api.get(`prm/getParamdata/ALL/${paraprop}`, {
      headers: {
        Authorization: userInfo.data[0].UserToken, //the token is a variable which holds the token
      },
    })
    parameter = await apiresp.data.data.map((item) => {
      return {
        value: item.paravalue,
        label: item.paracode,
      };
    })
    return parameter
  }

  async function getmasterscript() {
    api
      .get(`mcrmdlr/agentscripts/${props.data.activeMenu.campid}`, Header)
      .then(async (res) => {
        let master = "";
        let data = res.data.data.filter(e => e.script_type === 'PRI')
        master = await data.map((item) => {
          return {
            value: item.script_code,
            label: item.script_code,
          };
        });
        master.push({
          value: "NA",
          label: "NA",
        })
        setMasterScript(master);
      })
      .catch((error) => {
        toast.error(
          error?.response?.data.message ??
          error?.message ??
          "OOPs, something went wrong."
        );
      });
  }


  // async function pageInfo() {
  //   await DaynmicApicall(`/appuser/getcomponetbyid/${props?.data?.activeMenu?.keypointer}/${props?.data?.activeMenu?.subcompid}`, '', 'get', userInfo.data[0].UserToken).then((data) => {
  //     setPageData(data[0].DATA);
  //   })
  // }
  // useEffect(async () => {
  //   await pageInfo();
  // }, []);



  async function pageInfo() {
    api
      .get(
        `/appuser/getcomponetbyid/${props.data.activeMenu.keypointer}/${props.data.activeMenu.subcompid}`,
        {
          // props.data.activeMenu.subcompid
          headers: {
            Authorization: userInfo.data[0].UserToken,
          },
        }
      )
      .then(async (data) => {
        await setPageData(data.data.data[0].DATA);
      })
      .catch((error) => {
        console.log("ERROR: ", error)
        toast.error(
          error.response.data.message ??
          error.message ??
          "OOPs, Something went wrong."
        );
      });
  }

  useEffect(async () => {
    await f_setall_parameter();
    await getmasterscript();
    await f_disposition()
    // await getLanguage();
    // await f_script_category();
    await pageInfo();
  }, []);
  const action = props?.data?.paremsData.action === "UPDATE";
  const initial = {
    sno: action ? props?.data?.paremsData.rowdata.sno : "NEW",
    scriptcode: action ? (props.data.paremsData.rowdata.script_code.split("-")[0] === "G" ? props.data.paremsData.rowdata.script_code : allCamps?.find((v) => v.value === props.data.paremsData.rowdata.script_code)) : "",
    scriptbody: action ? props.data.paremsData.rowdata.script_temp_body : "",
    scriptvariablename: action ? props.data.paremsData.rowdata.script_variable_name : "",


    scriptcate: action ?
      props.data.paremsData.rowdata.script_code.split("-")[0] === 'G' ?
        (globleScriptCode?.find((v) => v?.value === (props.data.paremsData.rowdata.script_cate
          ? props.data.paremsData.rowdata.script_cate
          : props.data.paremsData.rowdata.script_code.split("-")[0])))
        : (globleScriptCode?.find((v) => v.value === 'D'))
      : "",
    scriptparentcode: action ?
      ((props.data.paremsData.rowdata.script_code.split("-")[0] === "G") ?
        (masterScript?.find((v) => v.value === props.data.paremsData.rowdata.script_parent_code)) :
        (disposition?.find((v) => v.value === props.data.paremsData.rowdata.script_parent_code))) : "",
    campid: action ? allCamps?.find((v) => v.value === props.data.paremsData.rowdata.process_id) : "",
    scripttype: action ? scripttype?.find((v) => v?.value === props?.data?.paremsData?.rowdata?.script_type) : "",
    componentid: action ? allComps?.find((v) => v?.value === props.data.paremsData.rowdata.component_id) : "NA",
    scriptlanguage: action ? language?.find((v) => v?.value === props?.data?.paremsData?.rowdata?.script_language) : "",
    remarks: action ? props?.data?.paremsData.rowdata.remarks : "",
    scriptFlag: "",
    scriptorder: "",
    active: action ? props?.data?.paremsData.rowdata.is_active === "Y" ? true : false : true,
    createdby: userInfo.data[0].userid,
    action_name: props.data.paremsData.action,
    yesnoflag: action ? flag?.find((v) => v?.value === props?.data?.paremsData?.rowdata?.yes_no_flag) : "",
    nextbuttonflag: action ? flag?.find((v) => v?.value === props?.data?.paremsData?.rowdata?.next_button_flag) : "",
    processid: action ? allCamps?.find((v) => v.value === props.data.paremsData.rowdata.process_id) : ""
    // campname: action ? props?.data?.paremsData?.rowdata.script_cate : "",
  };

  const validate = Yup.object({
    scriptcode: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    scriptvariablename: Yup.string().required("Required"),
  });


  const manageMasterScript = async (values, { resetForm }) => {
    delete values.campid;
    delete values.componentid;
    delete values.scriptbody;
    delete values.scriptvariablename;
    delete values.campname;
    delete values.scriptparentcode;
    delete values.scripttype;
    values.nextbuttonflag = values.nextbuttonflag.value;
    values.processid = values.processid.value;
    values.campname = values.processid.label;
    values.scriptcate = values.scriptcate.value;
    values.yesnoflag = values.yesnoflag.value;
    values.scriptlanguage = values.scriptlanguage.value;
    values.active = values.active === true ? "Y" : "N";
    if (props.data.paremsData.action === "INSERT") {
      const Info = api.post("mcrmdlr/managescriptcodemaster", values, {
        headers: { Authorization: userInfo.data[0].UserToken },
      });
      toast
        .promise(Info, {
          loading: "Adding",
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
        .then(() => { })
        .catch((error) => {
          console.log("ERROR: ", error)
          toast.error(
            error.response.data.message ??
            error.message ??
            "OOPs, Something went wrong."
          );
        });
    } else {
      const Info = api.post("mcrmdlr/managescriptcodemaster", values, {
        headers: { Authorization: userInfo.data[0].UserToken },
      });
      toast
        .promise(Info, {
          loading: "Updating",
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
        })
        .catch((error) => {
          console.log("ERROR: ", error)
          toast.error(
            error.response.data.message ??
            error.message ??
            "OOPs, Something went wrong."
          );
        });
    }
  };

  const manageScript = async (values, { resetForm }) => {
    delete values.yesnoflag
    delete values.nextbuttonflag
    delete values.processid
    values.campid = values.campid.value;
    values.scriptbody = values.scriptbody.replace("'", "`")
    values.componentid = values.componentid.value;
    values.scriptlanguage = values.scriptlanguage.value;
    values.scripttype = values.scripttype.value;
    values.scriptcate = values.scriptcate.value;
    values.scriptFlag = values.scriptFlag.value;
    values.scriptcode = typeof (values.scriptcode) === 'object' ?
      values.scriptcode.value :
      (values.scriptcate + "-" + values.scriptlanguage + "-" + values.scriptorder + (values.scriptFlag === 'NA' ? '' : "-" + values.scriptFlag));
    values.scriptparentcode = values.scriptparentcode.value != null ? values.scriptparentcode.value : values.scriptcode;
    values.active = values.active === true ? "Y" : "N";
    delete values.scriptFlag
    if (props.data.paremsData.action === "INSERT") {
      const Info = api.post("mcrmdlr/manageagentscripts", values, {
        headers: { Authorization: userInfo.data[0].UserToken },
      });
      toast
        .promise(Info, {
          loading: "Adding",
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
          dispatch(setParems({ data: "" }))
            .catch((error) => {
              console.log("ERROR: ", error)
              toast.error(
                error.response.data.message ??
                error.message ??
                "OOPs, Something went wrong."
              );
            });
        });
    } else {
      const Info = api.post("mcrmdlr/manageagentscripts", values, {
        headers: { Authorization: userInfo.data[0].UserToken },
      });
      toast
        .promise(Info, {
          loading: "Updating",
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
        })
        .catch((error) => {
          console.log("ERROR: ", error)
          toast.error(
            error.response.data.message ??
            error.message ??
            "OOPs, Something went wrong."
          );
        });
    }
  };



  return (
    <>
      {Object.keys(pageData).length > 0 && language.length > 0 && (
        <div className="card card-body border-light shadow-sm mb-4">
          <div className="col-xl-12">
            <div className="row row-cols-md-2 row-cols-lg-2 row-cols-xl-2 font-weight-bold">
              <span className="text-left text-dark ">
                {props?.data?.paremsData.action === "INSERT"
                  ? "CRM Detail Script Form"
                  : !props?.data?.paremsData?.rowdata.script_cate
                    ? "UPDATE CRM Detail Script Form"
                    : "UPDATE Script Master List Form"}
              </span>
            </div>
            <hr />
          </div>
          {(props?.data?.paremsData.action !== 'INSERT' ?
            !props?.data?.paremsData?.rowdata.script_cate :
            props?.data?.paremsData.action === 'INSERT') ?
            (
              <Formik
                initialValues={initial}
                // validationSchema={validate}
                onSubmit={manageScript}
              >
                {(formik) => (
                  <div>
                    <Form>
                      <div className="row mt-2">
                        <MultiSelect
                          label={pageData?.campname?.label}
                          placeholder={pageData?.campname?.placeholder}
                          type={pageData?.campname?.type}
                          name={pageData?.campname?.name}
                          value={formik.values.campid}
                          isMulti={false}
                          options={allCamps}
                          tooltip={pageData?.campname?.tooltip}
                          onChange={(value) =>
                            formik.setFieldValue("campid", value)
                          }
                        />
                        <MultiSelect
                          label={pageData?.scriptcate?.label}
                          placeholder={pageData?.scriptcate?.placeholder}
                          type={pageData?.scriptcate?.type}
                          name={pageData?.scriptcate?.name}
                          tooltip={pageData?.scriptcate?.tooltip}
                          value={formik.values.scriptcate}
                          isMulti={false}
                          options={globleScriptCode}
                          onChange={(value) =>
                            formik.setFieldValue("scriptcate", value)
                          }
                        />
                        {formik.values.scriptcate.value === 'G' && (
                          <>
                            <MultiSelect
                              label={pageData?.scriptflag?.label}
                              placeholder={pageData?.scriptflag?.placeholder}
                              type={pageData?.scriptflag?.type}
                              name={pageData?.scriptflag?.name}
                              tooltip={pageData?.scriptflag?.tooltip}
                              value={formik.values?.scriptFlag}
                              isMulti={false}
                              options={flag}
                              onChange={(value) =>
                                formik.setFieldValue("scriptFlag", value)
                              }
                            />
                          </>
                        )}
                        <MultiSelect
                          label={pageData?.scripttype?.label}
                          placeholder={pageData?.scripttype?.placeholder}
                          type={pageData?.scripttype?.type}
                          name={pageData?.scripttype?.name}
                          tooltip={pageData?.scripttype?.tooltip}
                          value={formik.values.scripttype}
                          isMulti={false}
                          options={scripttype}
                          onChange={(value) =>
                            formik.setFieldValue("scripttype", value)
                          }
                        />
                        <TextField
                          label={pageData?.scriptorder?.label}
                          placeholder={pageData?.scriptorder?.placeholder}
                          type={pageData?.scriptorder?.type}
                          name={pageData?.scriptorder?.name}
                          tooltip={pageData?.scriptorder?.tooltip}
                        // value={formik.values?.scriptorder}
                        />
                        <MultiSelect
                          label={pageData?.scriptparentcode?.label}
                          placeholder={pageData?.scriptparentcode?.placeholder}
                          type={pageData?.scriptparentcode?.type}
                          name={pageData?.scriptparentcode?.name}
                          tooltip={pageData?.scriptparentcode?.tooltip}
                          value={formik?.values?.scriptparentcode}
                          isMulti={false}
                          options={formik.values.scriptcate.value === 'G' ? masterScript : disposition}
                          onChange={(value) =>
                            formik.setFieldValue("scriptparentcode", value)
                          }
                        />
                        {formik.values.scriptcate.value === 'D' && (
                          <MultiSelect
                            label="Script Code"
                            placeholder={pageData?.scriptcode?.placeholder}
                            type={pageData?.scriptcode?.type}
                            name="scriptcode"
                            // tooltip={pageData?.scriptcode?.tooltip}
                            value={formik.values?.scriptcode}
                            isMulti={false}
                            options={subDisposition}
                            onChange={(value) =>
                              formik.setFieldValue("scriptcode", value)
                            }
                          />
                        )
                        }
                        <MultiSelect
                          label={pageData?.script_language?.label}
                          placeholder={pageData?.script_language?.placeholder}
                          type={pageData?.script_language?.type}
                          name={pageData?.script_language?.name}
                          tooltip={pageData?.script_language?.tooltip}
                          value={formik?.values?.scriptlanguage}
                          isMulti={false}
                          options={language}
                          onChange={(value) =>
                            formik.setFieldValue("scriptlanguage", value)
                          }
                        />
                        <TextField
                          label={pageData?.script_variable?.label}
                          placeholder={pageData?.script_variable?.placeholder}
                          type={pageData?.script_variable?.type}
                          tooltip={pageData?.script_variable?.tooltip}
                          name={pageData?.script_variable?.name}
                        />
                        <MultiSelect
                          label={pageData?.componentid?.label}
                          placeholder={pageData?.componentid?.placeholder}
                          type={pageData?.componentid?.type}
                          tooltip={pageData?.componentid?.tooltip}
                          name={pageData?.componentid?.name}
                          value={formik.values.componentid}
                          isMulti={false}
                          options={allComps}
                          onChange={(value) =>
                            formik.setFieldValue("componentid", value)
                          }
                        />
                        <TextField
                          label={pageData?.remarks?.label}
                          placeholder={pageData?.remarks?.placeholder}
                          type={pageData?.remarks?.type}
                          name={pageData?.remarks?.name}
                          tooltip={pageData?.remarks?.tooltip}
                        />
                        <TextArea
                          rows="7"
                          label={pageData?.scriptbody?.label}
                          default={formik.values.compdata}
                          name={pageData?.scriptbody?.name}
                          type={pageData?.scriptbody?.type}
                          tooltip={pageData?.scriptbody?.tooltip}
                          placeholder={pageData?.scriptbody?.placeholder}
                        />
                      </div>

                      <Toggle
                        label={formik.values.active === "Y" ? "Active" : ""}
                        name={pageData?.active?.name}
                        type={pageData?.active?.type}
                        tooltip={pageData?.active?.tooltip}
                        defaultChecked={formik.values.active}
                        onChange={(e) =>
                          formik.setFieldValue("active", e.target.checked)
                        }
                      />
                      <div className="d-flex justify-content-end">
                        <button
                          type={pageData?.button?.type}
                          className="btn btn-primary p-2 m-2"
                        // style={pageData?.button?.style}
                        >
                          {pageData?.button?.label}
                        </button>
                        <button
                          type={pageData?.cancelButton?.type}
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
            ) : (
              <Formik
                initialValues={initial}
                // validationSchema={validate}
                onSubmit={manageMasterScript}
              >
                {(formik) => (
                  <div >
                    <Form>
                      <div className="row mt-2">
                        <TextField
                          label={pageData?.script_code?.label}
                          placeholder={pageData?.script_code?.placeholder}
                          type={pageData?.script_code?.type}
                          tooltip={pageData?.script_code?.tooltip}
                          name={pageData.script_code.name}
                        />
                        <MultiSelect
                          label={pageData?.scriptcate?.label}
                          placeholder={pageData?.scriptcate?.placeholder}
                          type={pageData?.scriptcate?.type}
                          name={pageData.scriptcate.name}
                          tooltip={pageData?.scriptcate?.tooltip}
                          value={formik.values.scriptcate}
                          isMulti={false}
                          options={globleScriptCode}
                          onChange={(value) =>
                            formik.setFieldValue("scriptcate", value)
                          }
                        />
                        <MultiSelect
                          label={pageData?.script_language?.label}
                          placeholder={pageData?.script_language?.placeholder}
                          type={pageData?.script_language?.type}
                          name={pageData.script_language.name}
                          value={formik.values.scriptlanguage}
                          isMulti={false}
                          options={language}
                          tooltip={pageData?.script_language?.tooltip}
                          onChange={(value) =>
                            formik.setFieldValue("scriptlanguage", value)
                          }
                        />
                        <MultiSelect
                          label={pageData?.flag?.label}
                          placeholder={pageData?.flag?.placeholder}
                          type={pageData?.flag?.type}
                          name={pageData.flag.name}
                          tooltip={pageData?.flag?.tooltip}
                          value={formik.values.yesnoflag}
                          isMulti={false}
                          options={flag}
                          onChange={(value) =>
                            formik.setFieldValue("yesnoflag", value)
                          }
                        />
                        <MultiSelect
                          label={pageData?.nextflag?.label}
                          placeholder={pageData?.nextflag?.placeholder}
                          type={pageData?.nextflag?.type}
                          name={pageData?.nextflag?.name}
                          tooltip={pageData?.nextflag?.tooltip}
                          value={formik.values.nextbuttonflag}
                          isMulti={false}
                          options={flag}
                          onChange={(value) =>
                            formik.setFieldValue("nextbuttonflag", value)
                          }
                        />
                        <MultiSelect
                          label={pageData?.proname?.label}
                          placeholder={pageData?.proname?.placeholder}
                          type={pageData?.proname?.type}
                          name={pageData?.proname?.name}
                          tooltip={pageData?.proname?.tooltip}
                          value={formik.values.processid}
                          isMulti={false}
                          options={allCamps}
                          onChange={(value) =>
                            formik.setFieldValue("processid", value)
                          }
                        />
                        <TextField
                          label={pageData?.remarks?.label}
                          placeholder={pageData?.remarks?.placeholder}
                          type={pageData?.remarks?.type}
                          name={pageData.remarks.name}
                          tooltip={pageData?.remarks?.tooltip}
                        />
                        <Toggle
                          label={pageData?.active?.label}
                          name="active"
                          key={pageData?.active?.key}
                          type={pageData?.active?.type}
                          // id={pageData?.active?.id}
                          defaultChecked={formik.values.active}
                          value={formik.values.active}
                          onChange={(e) =>
                            formik.setFieldValue("active", e.target.checked)
                          }
                        />
                      </div>

                      <div className="d-flex justify-content-end mt-1">
                        <button
                          type={pageData?.verifybtn?.type}
                          className="btn btn-sm btn-primary p-2 m-2"
                        // style={pageData?.button?.style}
                        >{pageData?.verifybtn?.label}</button>
                      </div>
                    </Form>
                  </div>
                )}
              </Formik>
            )}
        </div>
      )}
    </>
  );
}
