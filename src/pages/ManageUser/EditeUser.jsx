import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "../../components/formValidation/TextField";
import api from "../../utils/api";
import { Toggle } from "../../components/formValidation/Toggle";
import { MultiSelect } from "../../components/formValidation/MultiSelect";
import { setParems } from "../../redux/Campaign";

export default function EditeUser(props) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state?.user?.value);
  const { campdetail } = useSelector((state) => state.campaign);
  const [userGroup, setUerGroup] = useState();
  const [pageData, setpageData] = useState("");
  const [branch, setBreanch] = useState([]);
  const [department, setDepartment] = useState([]);
  const [language, setLanguage] = useState([]);
  const [company, setCompany] = useState([]);
  const [reportinglist, setReportinglist] = useState([]);

  const userRight = [
    { value: "1", label: "Read" },
    { value: "2", label: "Write" },
    { value: "3", label: "Delete" },
  ];
  const URole = [
    { value: "1", label: "ADMIN" },
    { value: "2", label: "AGENT" },
    { value: "3", label: "TEAM-LEAD" },
    { value: "4", label: "MANAGER" },
  ];
  let allCamps = [];
  if (campdetail && campdetail.length > 0) {
    allCamps = campdetail.map((item) => {
      return {
        value: item.campid,
        label: item.campname,
      };
    });
  }
  async function getGroupInfo() {
    api
      .get(`/appuser/usergrpmaster/`, {
        headers: {
          Authorization: userInfo.data[0].UserToken,
        },
      })
      .then(async (res) => {
        let user = res.data.data.map((item) => {
          return {
            value: item.usergrpid,
            label: item.usergrpname,
          };
        });
        setUerGroup(user);
      });
  }
  async function getBranchData() {
    api
      .get(`appuser/getmasterdata/vw_branch_master/*/1=1/para_code/`, {
        headers: {
          Authorization: userInfo.data[0].UserToken,
        },
      })
      .then(async (res) => {
        let bData = [];
        bData = await res.data.map((item) => {
          return {
            value: item.para_value,
            label: item.para_code,
          };
        });
        setBreanch(bData);
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        toast.error(
          error.response.data.message ??
          error.message ??
          "OOPs, Something went wrong."
        );
      });
  }
  async function getCompanyData() {
    api
      .get(`appuser/getmasterdata/vw_company_master/*/1=1/para_code/`, {
        headers: {
          Authorization: userInfo.data[0].UserToken,
        },
      })
      .then(async (res) => {
        let bData = [];
        bData = await res.data.map((item) => {
          return {
            value: item.para_value,
            label: item.para_code,
          };
        });
        setCompany(bData);
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        toast.error(
          error.response.data.message ??
          error.message ??
          "OOPs, Something went wrong."
        );
      });
  }
  async function getDepartmentData() {
    api
      .get(`appuser/getmasterdata/vw_department_master/*/1=1/para_code/`, {
        headers: {
          Authorization: userInfo.data[0].UserToken,
        },
      })
      .then(async (res) => {
        let bData = [];

        bData = await res.data.map((item) => {
          return {
            value: item.para_value,
            label: item.para_code,
          };
        });

        setDepartment(bData);
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        toast.error(
          error.response.data.message ??
          error.message ??
          "OOPs, Something went wrong."
        );
      });
  }
  async function getreportingmemberList() {
    api
      .get(`appuser/getmasterdata/vw_reporting_ids/*/1=1/user_id/`, {
        headers: {
          Authorization: userInfo.data[0].UserToken,
        },
      })
      .then(async (res) => {
        let bData = [];
        bData = await res.data.map((item) => {
          return {
            // value: item.userid,
            // label: item.username,
            value: item.userid,
            label: item.username,
          };
        });

        setReportinglist(bData);
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        toast.error(
          error.response.data.message ??
          error.message ??
          "OOPs, Something went wrong."
        );
      });
  }
  async function getLanguage() {
    api
      .get(`prm/getParamdata/ALL/LANGUAGE`, {
        headers: {
          Authorization: userInfo.data[0].UserToken, //the token is a variable which holds the token
        },
      })
      .then(async (res) => {
        let bData = [];
        bData = await res.data.data.map((item) => {
          return {
            value: item.paracode,
            label: item.paravalue,
          };
        });
        setLanguage(bData);
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
    api
      .get(`/appuser/getcomponetbyid/${props.data.activeMenu.keypointer}/${props.data.activeMenu.subcompid}`, {
        headers: {
          Authorization: userInfo.data[0].UserToken,
        },
      })
      .then(async (data) => {
        await setpageData(data.data.data[0].DATA);
      });
  }
  useEffect(() => {
    (async() => {
      await getCompanyData();
      await getBranchData();
      await getDepartmentData();
      await getGroupInfo();
      await getreportingmemberList();
      await getLanguage();
      await pageInfo();
    })()
  }, []);

  let action = props?.data?.paremsData.action === "UPDATE";
  let initial = {
    empid: action ? props?.data?.paremsData.user.empid : "",
    userid: action ? props?.data?.paremsData.user.userid : "",
    username: action ? props?.data?.paremsData.user.username : "",
    companycode: action
      ? company?.find(
        (v) => v?.value === props?.data?.paremsData?.user?.company
      )
      : "",
    branchcode: action
      ? branch?.find((v) => v?.value === props?.data?.paremsData?.user?.branch)
      : "",
    servicecode: action
      ? department?.find(
        (v) => v?.value === props?.data?.paremsData?.user?.services
      )
      : "",
    usergroup: action
      ? userGroup?.find(
        (v) => v?.label === props?.data?.paremsData?.user?.usergroup
      )
      : "",
    userright: action
      ? userRight.filter((v) =>
        props?.data?.paremsData.user.userright.split("").includes(v.value)
      )
      : "",
    campaignids: action
      ? allCamps?.filter((v) =>
        props?.data?.paremsData.user.campaignids.includes(v.value)
      )
      : "",
    userrole: action
      ? URole?.find((v) =>
        v.label === props.data.paremsData.user.userrole) : "",
    verifier: action
      ? props?.data?.paremsData.user.verifier
      : userInfo.data[0].userid,
    reportingid: action ? props?.data?.paremsData.user.verifier : "",
    lockstatus: action ? props?.data?.paremsData.user.lockstatus : "UNLOCK",
    keypointer: "",
    loginstatus: action ? props?.data?.paremsData.user.loginstatus : "",
    active: action
      ? props?.data?.paremsData.user.active === "Y"
        ? true
        : false
      : true,
    remarks: action ? props?.data?.paremsData.user.remarks : "",
    createdby: userInfo.data[0].userid,
    dlragentid: action ? props?.data?.paremsData.user.dlragentid : "",
    drlagentpwd: "ATS@123$",
    agentdidno: action ? props?.data?.paremsData.user.agentdidno : "",
    action_name: props.data.paremsData.action,
    agent_language: action
      ? language?.find(
        (v) => v?.value === props?.data?.paremsData?.user?.agent_pref_lan
      )
      : "",
  };
  const validate = Yup.object({
    empid: Yup.string().required("Employee Id is required"),
    userid: Yup.string().required("user Id is required"),
    username: Yup.string().required("user name is required"),
    agentdidno: Yup.string().required("Field is required"),
    dlragentid: Yup.string().required("Field is required"),
  });
  const onSubmit = async (values, { resetForm }) => {
    let campid = values.campaignids.map((v) => parseInt(v.value));
    values.campaignids = JSON.stringify(campid);
    values.usergroup = values.usergroup.label;
    values.branchcode = values.branchcode.value;
    values.companycode = values.companycode.value;
    values.servicecode = values.servicecode.value;
    values.userrole = values.userrole.label;
    values.active = values.active === true ? "Y" : "N";
    values.reportingid = values.reportingid.value;
    values.agent_language = values.agent_language.value;
    values.lockstatus = values.lockstatus === false ? "LOCK" : "UNLOCK";
    values.loginstatus = values.loginstatus === false ? 0 : 1;
    let uRigt = values.userright.map((v) => parseInt(v.value));
    values.userright = uRigt.toString().replace(",", "").replace(",", "");

    if (props.data.paremsData.action === "INSERT") {
      const Info = api.post("appuser/manageuser/", values, {
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
      delete values.userpwd;
      const Info = api.post("appuser/manageuser/", values, {
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
            <div className="card card-body border-light shadow mb-4">
              <Form>
                <div className="row mt-3">
                  <h2 title={pageData?.title}
                    data-toggle="tooltip" >{pageData?.title}</h2>
                  <hr />
                  <TextField
                    title={pageData?.userCode?.label}
                    data-toggle="tooltip"
                    label={pageData?.userCode?.label}
                    placeholder={pageData?.userCode?.placeholder}
                    type={pageData?.userCode?.type}
                    name={pageData?.userCode?.name}
                  />
                  <TextField
                    title={pageData?.userId?.label}
                    data-toggle="tooltip"
                    label={pageData?.userId?.label}
                    placeholder={pageData?.userId?.placeholder}
                    type={pageData?.userId?.type}
                    name={pageData?.userId?.name}
                  />
                  <TextField
                    title={pageData?.userName?.label}
                    data-toggle="tooltip"
                    label={pageData?.userName?.label}
                    placeholder={pageData?.userName?.placeholder}
                    type={pageData?.userId?.type}
                    name={pageData?.userName?.name}
                  />
                  <MultiSelect
                    title={pageData?.Company?.label}
                    data-toggle="tooltip"
                    label={pageData?.Company?.label}
                    name={pageData?.Company?.name}
                    // defaultValue={initial.companycode}
                    value={formik.values.companycode}
                    placeholder={pageData?.Company?.placeholde}
                    isMulti={false}
                    options={company}
                    onChange={(value) =>
                      formik.setFieldValue("companycode", value)
                    }
                  />
                  <MultiSelect
                    title={pageData?.Branch?.label}
                    data-toggle="tooltip"
                    label={pageData?.Branch?.label}
                    value={formik.values.branchcode}
                    name={pageData?.Branch?.name}
                    placeholder={pageData?.Branch?.placeholder}
                    isMulti={false}
                    options={branch}
                    onChange={(value) =>
                      formik.setFieldValue("branchcode", value)
                    }
                  />
                  <MultiSelect
                    title={pageData?.Department?.label}
                    data-toggle="tooltip"
                    label={pageData?.Department?.label}
                    value={formik.values.servicecode}
                    name={pageData?.Department?.name}
                    placeholder={pageData?.Department?.placeholder}
                    isMulti={false}
                    options={department}
                    onChange={(value) =>
                      formik.setFieldValue("servicecode", value)
                    }
                  />
                  <MultiSelect
                    title={pageData?.userGroup?.label}
                    data-toggle="tooltip"
                    label={pageData?.userGroup?.label}
                    name={pageData?.userGroup?.name}
                    placeholder={pageData?.userGroup?.placeholder}
                    value={formik.values.usergroup}
                    isMulti={false}
                    options={userGroup}
                    onChange={(value) =>
                      formik.setFieldValue("usergroup", value)
                    }
                  />
                  <MultiSelect
                    title={pageData?.userRight?.label}
                    data-toggle="tooltip"
                    label={pageData?.userRight?.label}
                    name={pageData?.userRight?.name}
                    placeholder={pageData?.userRight?.placeholder}
                    value={formik.values.userright}
                    isMulti={true}
                    options={userRight}
                    formik={formik}
                    onChange={async (value) => {
                      formik.setFieldValue("userright", value);
                    }}
                  />
                  <MultiSelect
                    title={pageData?.CampiagnId?.label}
                    data-toggle="tooltip"
                    label={pageData?.CampiagnId?.label}
                    name={pageData?.CampiagnId?.name}
                    value={formik.values.campaignids}
                    isMulti={true}
                    options={allCamps}
                    onChange={(value) =>
                      formik.setFieldValue("campaignids", value)
                    }
                  />
                  <MultiSelect
                    title={pageData?.userDesignation?.label}
                    data-toggle="tooltip"
                    label={pageData?.userDesignation?.label}
                    name={pageData?.userDesignation?.name}
                    value={formik.values.userrole}
                    placeholder={pageData?.userDesignation?.placeholder}
                    type={pageData?.userDesignation?.type}
                    isMulti={false}
                    options={URole}
                    onChange={(value) =>
                      formik.setFieldValue("userrole", value)
                    }
                  />
                  <MultiSelect
                    title={pageData?.reportingid?.label}
                    data-toggle="tooltip"
                    label={pageData?.reportingid?.label}
                    name={pageData?.reportingid?.name}
                    value={formik.values.reportingid}
                    placeholder={pageData?.reportingid?.placeholder}
                    isMulti={false}
                    options={reportinglist}
                    onChange={(value) =>
                      formik.setFieldValue("reportingid", value)
                    }
                  />
                  <MultiSelect
                    title={pageData?.language?.label}
                    data-toggle="tooltip"

                    label={pageData?.language?.label}
                    name={pageData?.language?.name}
                    value={formik.values.agent_language}
                    placeholder={pageData?.language?.placeholder}
                    isMulti={false}
                    options={language}
                    onChange={(value) =>
                      formik.setFieldValue("agent_language", value)
                    }
                  />
                  <Toggle
                    title={pageData?.userStatus?.label}
                    data-toggle="tooltip"
                    label={pageData?.userStatus?.label}
                    name={pageData?.userStatus?.name}
                    type={pageData?.userStatus?.type}
                    defaultChecked={formik.values.active}
                    onChange={(e) =>
                      formik.setFieldValue("active", e.target.checked)
                    }
                  />
                  <Toggle
                    title={pageData?.lockStatus?.label}
                    data-toggle="tooltip"
                    label={pageData?.lockStatus?.label}
                    name={pageData?.lockStatus?.name}
                    type={pageData?.lockStatus?.type}
                    defaultChecked={formik.values.lockstatus}
                    onChange={(e) =>
                      formik.setFieldValue("lockstatus", e.target.checked)
                    }
                  />
                  <hr />
                  <h3>{pageData.header}</h3>
                  <hr />
                  <TextField
                    title={pageData?.agent?.label}
                    data-toggle="tooltip"
                    label={pageData?.agent?.label}
                    placeholder={pageData?.agent?.placeholder}
                    type={pageData?.agent?.type}
                    name={pageData?.agent?.name}
                  />
                  <TextField
                    title={pageData?.password?.label}
                    data-toggle="tooltip"
                    label={pageData?.password?.label}
                    name={pageData?.password?.name}
                    value={formik.values.drlagentpwd}
                    placeholder={pageData?.userId?.placeholder}
                    type={pageData?.userId?.type}
                    disabled
                  />
                  <TextField
                    title={pageData?.DailerExt?.label}
                    data-toggle="tooltip"
                    label={pageData?.DailerExt?.label}
                    placeholder={pageData?.DailerExt?.placeholder}
                    type={pageData?.DailerExt?.type}
                    name={pageData?.DailerExt?.name}
                  />

                  <div className="d-flex justify-content-end w-100">
                    <button
                      type="submit"
                      className="btn btn-primary btn-sm m-2"
                      title={pageData?.smtBtn?.label}
                      data-toggle="tooltip"
                    >
                      {pageData?.smtBtn?.label}
                    </button>
                    <button
                      title={pageData?.cancleBtn?.label}
                      data-toggle="tooltip"
                      type="cancle"
                      className="btn btn-primary btn-sm m-2"
                    >
                      {pageData?.cancleBtn?.label}
                    </button>
                  </div>
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
