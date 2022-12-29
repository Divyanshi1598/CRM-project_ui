import { Formik } from "formik";
import toast from "react-hot-toast";
import { Typography } from "@mui/material";
import { React, useState, useEffect } from "react";
import { MultiSelect } from "../formValidation/MultiSelect";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Toggle } from "../formValidation/Toggle";
import { setSaveandExit } from "../../redux/Dialer";
import Cardpopup from "../formValidation/Cardpopup";
import DaynmicApicall, { ManageEventLog } from "../../utils/function";
import api from "../../utils/api";


const AgentScript = (props) => {
  let { userInfo } = useSelector((state) => state?.user?.value);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [cresponse, setCresponse] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [yesNoResponse, setYesnoResponse] = useState("");
  const [globalScript, setGlobalScript] = useState("");
  const [disposition, setdisposition] = useState("");
  const [language, setLanguage] = useState([]);
  const [pageData, setPageData] = useState("");

  let actionlog = {
    "eventname": ``,
    "actionname": "",
    "actioncate": ""
  }

  async function getScript(campid, language) {
    const allscript = await DaynmicApicall(
      `mcrmdlr/getmasterscriptall/${campid}/${language ? language : "ENGLISH"}`,
      '',
      'get',
      userInfo.data[0].UserToken
    )
    let gScript = await allscript.filter(e => e?.script_code?.split("-")[0] === "G")
    let dScript = await allscript.filter(e => e?.script_code?.split("-")[0] !== "G")
    setGlobalScript(gScript)
    setdisposition(dScript)
  }

  async function pageInfo() {
    await DaynmicApicall(`/appuser/getcomponetbyid/${props?.data?.campinfo?.keypointer}/34`, '', 'get', userInfo.data[0].UserToken).then((data) => {
      setPageData(data[0].DATA)
    })
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

  async function yesnoresponse(val) {
    if (val) {
      actionlog.eventname = `OnChange`
      actionlog.actionname = "Global Script call Yes"
      actionlog.actioncat = "PRI-G-Y"
      ManageEventLog(actionlog)
      setYesnoResponse(globalScript[activeStep].subscript.find(e => e.script_code.split("-")[e.script_code.split("-").length - 1] === "N"))
    } else if (val === false) {
      actionlog.eventname = `OnChange`
      actionlog.actionname = "Global Script call No"
      actionlog.actioncat = "PRI-G-N"
      ManageEventLog(actionlog)
      setYesnoResponse(globalScript[activeStep].subscript.find(e => e.script_code.split("-")[e.script_code.split("-").length - 1] === "Y"))
    }
  }

  const maxSteps = globalScript.length;
  const handleNext = () => {
    actionlog.eventname = `handleNext`
    actionlog.actionname = "Next Global script Call"
    actionlog.actioncat = "PRI-G"
    ManageEventLog(actionlog)
    setYesnoResponse("")
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    actionlog.eventname = `handleBack`
    actionlog.actionname = "Previous Global script Call"
    ManageEventLog(actionlog)
    setYesnoResponse("")
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleData = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    (async () => {
      await pageInfo();
      await getLanguage();
      await getScript(props.data.campinfo.campid, props.data.custinfo.cust_language);
    })()
  }, [])

  const initial = {
    consent: "",
    scripttype: "",
  };

  var ReplaceObjeWithScript = {
    Customer_Surname: props.data?.custinfo?.policy_owner,
    policy_name: "POO23456",
    Agent_Name: userInfo.data[0]?.userid
  };

  return (
    <>
      {pageData && (
        <div className="card ml-1 mt-1">
          <div className="row">
            <div className="col-2"> <span className="display-5">{pageData.title}</span></div>
            <div className="col-8 d-flex justify-content-end">
              <Formik initialValues={{ consent: "", scriptyesno: "" }}>
                {
                  (formik) => (
                    <div className="row">
                      <div className="col-4">
                        <Toggle
                          label={cresponse === false ? " NO " : "Yes"}
                          name={pageData?.toggle?.name}
                          key={pageData?.toggle?.key}
                          type={pageData?.toggle?.type}
                          onChange={async (e) => {
                            formik.setFieldValue("consent", e.target.checked);
                            setCresponse(e.target.checked);
                            await yesnoresponse(e.target.checked);
                          }} />
                      </div>
                      <div className="col-8 d-flex justify-content-end" style={{ marginTop: "-20px" }}>
                        <MultiSelect
                          name="selectlanguage"
                          placeholder="Language"
                          isMulti={false}
                          options={language}
                          onChange={async (value) => {
                            getScript(props.data?.campinfo?.campid, value?.value)
                          }}
                        />
                      </div>
                    </div>
                  )
                }
              </Formik>
            </div>
            <div className="col-2">
              <div className="d-flex justify-content-end mt-1">
                <button
                  title="Back"
                  data-toggle="tooltip"
                  className="btn-sm "
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  Back
                </button>
                <button
                  className="btn-sm  ml-3"
                  title="Next"
                  // data-toggle="tooltip"
                  data-bs-original-title="tooltip"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  Next
                </button>
              </div>

            </div>
            <div>
              <Typography className="mb-2">
                {yesNoResponse ?
                  yesNoResponse.script_temp_body :
                  globalScript[activeStep]?.script_temp_body.replace(/Customer_Surname|Policy_Name|Agent_Name/gi, function (matched) {
                    return ReplaceObjeWithScript[matched];
                  })
                }
              </Typography>
            </div>
          </div>
        </div>
      )}
      <Container className="card mt-2 ml-1">
        <Row className='p-2 mb-0' xs={12} md={7}>
          {disposition && disposition?.map((data) => {
            return (
              <Col className="p-1 m-0">
                <Card className="p-0 m-0 " style={{ width: '9rem' }}>
                  <Button
                    className={`bg-${data.resp_color} text-white fw-bold`}
                    // className={`bg-${color[data.resp_level]} text-white fw-bold`}
                    title={data.script_name}
                    data-toggle="tooltip"
                    data-bs-toggle="modal"
                    data-bs-target={`#cardtoggel${data.sno}`} s
                    size="sm" variant="white"
                    onClick={async (e) => {
                      dispatch(setSaveandExit({ resp_code: data.script_code }))
                      actionlog.eventname = `OnClick`
                      actionlog.actionname = `${data.script_code + "-" + data.script_name} Disposition call`
                      actionlog.actioncate = "PRI-D"
                      await ManageEventLog(actionlog);
                    }}
                    style={{ fontSize: 10, overflow: 'hidden', whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                    {data.script_name}
                  </Button>

                  <Cardpopup data={data} customer={{ policy: props.data.custinfo.policy_no, custid: props.data.custinfo.cuid, policy_owner: props.data.custinfo.policy_owner }} camp={{ campid: props.data.campinfo.campid }} />
                </Card>
              </Col>

            )
          })}
        </Row>
      </Container>



    </>

  );
};
export default AgentScript;
