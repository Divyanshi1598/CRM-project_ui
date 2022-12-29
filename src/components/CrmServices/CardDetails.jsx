import React from "react";
import { TextField } from "../formValidation/TextField";
import { Formik, Form } from "formik";
import { MultiSelect } from "../formValidation/MultiSelect";
import { useState } from "react";
import "./Style.css";
import { Toggle } from "../formValidation/Toggle";
import TabHistoryModel from "./EngageHistory/TabHistoryModel";
import PolicyInfoModel from "./PolicyInfo/PolicyInfoModel";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import DaynmicApicall from "../../utils/function";
import { ManageEventLog } from "../../utils/function";
import toast from "react-hot-toast";
import { setSaveandExit } from "../../redux/Dialer";
import { Col, Row } from "react-bootstrap";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

// import  AlertPopUp from "../CrmServices/Alert";


const CardDetails = (props, { label }) => {
  const { userInfo } = useSelector((state) => state?.user?.value);
  let { crmsaveandexit } = useSelector((state) => state?.dialer);
  const dispatch = useDispatch()
  const [assume, setAssume] = useState(false);
  const [showdata, setShowdata] = useState(false);
  const [days, setDays] = useState([]);
  const [pageData, setpageData] = useState("");
  const [logdata, setLogdata] = useState("");

  let actionlog = {
    "Rowed": "NEW",
    "custid": props?.data?.custinfo?.cust_id,
    "campid": props?.data?.campinfo?.campid,
    "eventname": ``,
    "actionname": "",
    "createdby": userInfo.data[0].userid
  }
  async function getDays() {
    await DaynmicApicall(`prm/getParamdata/ALL/DAYS`, '', 'get', userInfo.data[0].UserToken).then(async (res) => {
      let bData = [];
      bData = await res?.map((item) => {
        return {
          value: item.paracode,
          label: item.paravalue,
        };
      });
      setDays(bData);
    })
  }
  const handleChange = async (value) => {
    actionlog.eventname = `OnChange`
    actionlog.actionname = `Select Date from ${value === true ? "calender" : "dropdown"}`
    ManageEventLog(actionlog)
    setShowdata(value);
  };
  const initial = {
    consent: "",
    scripttype: "",
    date: ""
  };
  const handleAssume = (value) => {
    actionlog.eventname = `OnChange`
    actionlog.actionname = `Assign to me`
    ManageEventLog(actionlog)
    setAssume(value);
  };
  async function caseblock() {
    let parameter = {
      custuniqid: props.data.custinfo.cuid,
      custid: props.data.custinfo.cuid,
      userid: userInfo.data[0].userid,
      processid: props.data.campinfo.campid,
      actionname: "UPDATE",
      createdby: userInfo.data[0].userid
    }
    actionlog.eventname = `OnClick`
    actionlog.actionname = `click on caseblock`
    actionlog.actioncat = "CASE-BLOCK"
    ManageEventLog(actionlog)

    const Info = await DaynmicApicall(`mcrmdlr/managecaseblock`, parameter, 'post', userInfo.data[0].UserToken)
    toast.success(Info.message);
  }
  async function assignToMe() {
    let parameter = {
      onClick: assume === true ? "No" : "yes",
      dialer_sessionid: crmsaveandexit.dialer_session_id,
      agentid: userInfo.data[0].userid,
      custid: props.data.custinfo.cust_id,
      respcode: crmsaveandexit.resp_code,
      subrespcode: crmsaveandexit.sub_resp_code,
      campid: props?.data?.campinfo?.campid,
      createdby: userInfo.data[0].userid,
      actionname: "UPDATE"
    }
    const Info = await DaynmicApicall(`mcrmdlr/manageatmcall`, parameter, 'post', userInfo.data[0].UserToken)
    toast.success(Info.message);
  }
  async function splitdatetime(value) {
    let d1 = value.split("T")[0].split("-")
    let date = d1[2] + "-" + d1[1] + "-" + d1[0]
    let t1 = value.split("T")[1].split(':')
    let time = parseInt(t1[0] + t1[1])
    let timeanddate = {
      revertto_date: date,
      revertto_time: time
    }

    Object.entries(timeanddate).map((data) => {
      let aa = `{"${data[0]}": "${data[1]}"}`
      dispatch(setSaveandExit(JSON.parse(aa)))
    })
  }
  async function finalCallSave() {
    const data = await DaynmicApicall(`mcrmdlr/getagetaction/vw_get_script/*/script_code='${crmsaveandexit.sub_resp_code}'/script_code`, '', 'get', userInfo.data[0].UserToken)
    if (data[0] && data[0].component_id !== '9999') {
      await DaynmicApicall(`mcrmdlr/getagetaction/vw_payment_transaction_trail/count(dialer_session) dialer_session/dialer_session='${crmsaveandexit?.dialer_session_id}' and isactive = 'Y'/dialer_session/`, '', 'get', userInfo.data[0].UserToken).then(async (data) => {
        if (data[0].dialer_session === "0") {
          toast.success(`Fill the ${crmsaveandexit.sub_resp_code} form`, {
            position: "top-right",
            style: {
              background: '#05A677',
              color: "#fff"
            },
          })
        } else {
          let Info = await DaynmicApicall(`mcrmdlr/managecallsave`, crmsaveandexit, 'post', userInfo.data[0].UserToken)
          const hangupdata = {
            server_host_name: userInfo.data[0].dlr_server_ip,
            custid: props?.data?.custinfo?.cuid,
            agentid: userInfo.data[0].AgentDidNo,
          }
          await DaynmicApicall(`dialer/dialerhangup`, hangupdata, 'post', userInfo.data[0].UserToken)
          toast.success(Info.message);
          if (Info.status === true) {
            actionlog.eventname = `OnClick`
            actionlog.actionname = `final call save`
            ManageEventLog(actionlog)
            props.aftersave('')
          }
        }
      })
    } else {
      let Info = await DaynmicApicall(`mcrmdlr/managecallsave`, crmsaveandexit, 'post', userInfo.data[0].UserToken)
      // let aa = Info.status === true ? props.aftersave('') : ""
      if (Info.status === true) {
        actionlog.eventname = `OnClick`
        actionlog.actionname = `final call save`
        ManageEventLog(actionlog)
        const hangupdata = {
          server_host_name: userInfo.data[0].dlr_server_ip,
          custid: props?.data?.custinfo?.cuid,
          agentid: userInfo.data[0].AgentDidNo,
        }
        await DaynmicApicall(`dialer/dialerhangup`, hangupdata, 'post', userInfo.data[0].UserToken)
        props.aftersave('');
      }
      toast.success(Info.message);
    }
  }
  async function pageInfo(keypointer) {
    await DaynmicApicall(`appuser/getcomponetbyid/${props?.data?.campinfo?.keypointer}/43`, '', 'get', userInfo.data[0].UserToken).then((res) => {
      setpageData(res[0].DATA);
    })
  }
  async function getActionLog() {
    await DaynmicApicall(`err/getactionlog/${crmsaveandexit.dialer_session_id}`, '', 'get', userInfo.data[0].UserToken).then((res) => {
      // console.log("getactionlog::::", res)
      // setpageData(res[0].DATA);
      setLogdata(res)
    })
  }
  async function IgnoreActionlog(data) {
    let parameter = {
      rowid: data.row_id,
      sessionid: data.dialer_session,
      action_name: "UPDATE",
      isactive: "N",
    }
    const Info = await DaynmicApicall(`err/manageactionlog`, parameter, 'post', userInfo.data[0].UserToken)
    toast.success(Info.message);
  }
  useEffect(() => {
    (async () => {
      await getDays();
      await pageInfo();
    })()
  }, [])

  return (
    <>
      {pageData && (
        <div className="card mt-2 ml-1 ">
          <Formik initialValues={initial}>
            {(formik) => (
              <div className="">
                <Form>
                  <div className="row">
                    {showdata === false ? (
                      <MultiSelect className="mb-0"
                        placeholder={pageData?.mult?.placeholder}
                        title={pageData?.mult?.title}
                        data-toggle="tooltip"
                        type={pageData?.mult?.type}
                        name={pageData?.mult?.name}
                        isMulti={false}
                        options={days}
                        onChange={(values) => {
                          let newdate = new Date(Date.now() + 1000 * 60 * 60 * 24 * values.value).toISOString("en-US", {
                            timeZone:
                              "Asia/Kolkata"
                          })
                          splitdatetime(newdate)
                        }}
                      />
                    ) : (
                      <TextField
                        placeholder={pageData.textfield.placeholder}
                        title={pageData.textfield.title}
                        // data-toggle="tooltip"
                        type={pageData.textfield.type}
                        name={pageData.textfield.name}
                        onClick={(e) => {
                          splitdatetime(e.target.value)
                        }}
                      />
                    )}
                    <div className="col  mt-4  text-bold ">
                      <Toggle
                        label={showdata === true ? "Day/Date" : "Calendar"}
                        name={pageData?.toggle1?.name}
                        title={pageData?.toggle1?.title}
                        data-toggle="tooltip"
                        key={pageData?.toggle1?.key}
                        type={pageData?.toggle1?.type}
                        defaultChecked={formik?.values?.consent}
                        onChange={(e) => {
                          formik.setFieldValue("consent", e.target.checked);
                          handleChange(e.target.checked);
                        }}
                      />
                    </div>
                    <div className="col-md-5  mr-6 d-flex mt-4">
                      <spna className="mr-2 display-6 mt-2">{pageData.text}</spna>
                      <Toggle
                        label={assume === false ? "No" : "yes"}
                        name={pageData?.toggle2?.name}
                        title={pageData?.toggle2?.title}
                        data-toggle="tooltip"
                        key={pageData?.toggle2?.key}
                        type={pageData?.toggle2?.type}
                        defaultChecked={formik.values.assignMeBtn}
                        onChange={(e) => {
                          if (assume === false) { assignToMe() }
                          formik.setFieldValue("assignMeBtn", e.target.checked);
                          handleAssume(e.target.checked);
                        }}
                      />
                      {/* <div className="ml-6">
                        <button class="btn  btn-primary-sm"
                          type={pageData?.caseblockbutton?.type}
                          title={pageData?.caseblockbutton?.title}
                          data-toggle="tooltip"
                          onClick={caseblock} >
                          {pageData?.caseblockbutton?.label}
                        </button>
                      </div> */}
                      {/* Case Block */}
                      <div className=" ml-6">
                        <button
                          className="btn btn-primary-sm "
                          type={pageData?.caseblockbutton?.type}
                          title={pageData?.caseblockbutton?.title}
                          data-toggle="tooltip"
                          data-bs-toggle="modal"
                          data-bs-target="#caseblock"
                        >
                          Case Block
                        </button>
                        <div class="modal fade" id="caseblock" tabindex="-1" role="dialog" aria-labelledby="caseblockTitle" aria-hidden="true">
                          <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content" style={{ width: "500px" }}>
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">Conformation</h5>
                              </div>
                              <div class="modal-body">
                                Do you make sure that  Id is to be blocked
                              </div>
                              <div class="modal-footer">
                                <button
                                  type="button"
                                  class="btn-sm btn-primary ml-6 m-2"
                                  data-bs-dismiss="modal"
                                  aria-label="Close">Cancel</button>
                                <button
                                  className="btn-sm btn-primary ml-6 m-2 "
                                  type={pageData?.savebutton?.type}
                                  title={pageData?.savebutton?.title}
                                  data-toggle="tooltip"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                  onClick={async (e) => {
                                    caseblock()
                                  }} >
                                  conform
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md">
                      <button
                        type={pageData?.engagementbutton?.type}
                        class="btn btn-primary-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#modalHistory"
                        title={pageData?.engagementbutton?.title}
                        data-toggle="tooltip"
                      >
                        {pageData?.engagementbutton?.label}
                      </button>
                      <div
                        class="modal fade"
                        id="modalHistory"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="modalTitleNotify"
                        aria-hidden="true"
                      >
                        <div
                          class="modal-dialog modal-dialog-centered ml-1"
                          role="document"
                        >
                          <div
                            class="modal-content "
                            style={{ marginTop: "250px" }}
                          >
                            <div class="modal-header" >
                              <p class="modal-title" id="modalTitleNotify">
                                {pageData?.engagementbutton?.header}
                              </p>
                              <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <TabHistoryModel userInfo={props} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md">
                      <button
                        type={pageData?.policybutton?.type}
                        class="btn btn-primary-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#modalPolicyInfo"
                        title={pageData?.policybutton?.title}
                        data-toggle="tooltip"
                      >
                        {pageData?.policybutton?.label}
                      </button>
                      <div
                        class="modal fade"
                        id="modalPolicyInfo"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="modalTitleNotify"
                        aria-hidden="true"
                      >
                        <div
                          class="modal-dialog modal-dialog-centered ml-1"
                          role="document"
                        >
                          <div
                            class="modal-content "
                            style={{ marginTop: "250px" }}
                          >
                            <div class="modal-header">
                              <p class="modal-title" id="modalTitleNotify">
                                {pageData?.policybutton?.header}
                              </p>
                              <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <PolicyInfoModel userInfo={props} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md">
                      <div className=" justify-content-end ml-6">
                        <div className="col-md">
                          <button
                            className="btn-sm btn-primary ml-6 m-2 "
                            type={pageData?.savebutton?.type}
                            title={pageData?.savebutton?.title}
                            data-bs-toggle="modal"
                            data-bs-target="#finalCallSave"
                            data-toggle="tooltip"
                            onClick={async (e) => {
                              getActionLog()
                              // AlertPopUp(finalCallSave())
                            }} >
                            Confirm & Save
                          </button>
                          <div class="modal fade" id="finalCallSave" tabindex="-1" role="dialog" aria-labelledby="finalCallSaveTitle" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title" id="finalCallSaveTitle">Call Summary</h5>
                                </div>
                                <div class="modal-body">
                                  <dl class="row p-2 overflow-scroll " style={{ height: "250px" }}>
                                    {
                                      Object.entries(crmsaveandexit).map((data) => (
                                        <>


                                          <dt class="col-3 text-info">{data[0].replaceAll("_", " ").toUpperCase()}</dt>
                                          <dd class="col-3" >{data[1]}</dd>






                                        </>
                                      ))
                                    }
                                  </dl>
                                  {/* </Row> */}
                                  {
                                    logdata.length > 0 && logdata?.map((data) => (
                                      <Row className="ml-2" xs={8} xl={8} key={data.row_id}>
                                        <Col className="p-1 m-0">
                                          <ul class="list-group">
                                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                              {data.action_name}
                                              <ul class="list-group list-group-horizontal">

                                                <li class="list-group-item"><button class="btn-sm btn-danger fw-bold" onClick={async (e) => {
                                                  IgnoreActionlog(data)
                                                  // AlertPopUp(finalCallSave())
                                                }}><CancelRoundedIcon /></button></li>
                                                <li class="list-group-item"><button className="btn-sm btn-success"><CheckCircleRoundedIcon /></button></li>
                                              </ul>
                                            </li>
                                          </ul>
                                        </Col>
                                      </Row>
                                    ))
                                  }
                                  {/* </Row> */}
                                </div>
                                <div class="modal-footer">
                                  <button
                                    type="button"
                                    class="btn-sm btn-primary ml-6 m-2"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  >Cancel</button>
                                  {/* <button type="button" class="btn btn-primary">Save Data</button> */}
                                  <button
                                    className="btn-sm btn-primary ml-6 m-2 "
                                    type={pageData?.savebutton?.type}
                                    title={pageData?.savebutton?.title}
                                    data-toggle="tooltip"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={async (e) => {
                                      finalCallSave()
                                    }} >
                                    {pageData?.savebutton?.label}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>











                        {/* <button
                          className="btn-sm btn-primary ml-6 m-2 "
                          type={pageData?.savebutton?.type}
                          title={pageData?.savebutton?.title}
                          data-toggle="tooltip"
                          onClick={async (e) => {
                            finalCallSave()
                            // AlertPopUp(finalCallSave())
                          }} >
                          {pageData?.savebutton?.label}
                        </button> */}
                      </div>
                    </div>

                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </div>
      )}

    </>
  );
};

export default CardDetails;
