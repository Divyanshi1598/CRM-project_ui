import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Toggle } from "../../components/formValidation/Toggle";
import { TextField } from "../../components/formValidation/TextField";
import { MultiSelect } from "../../components/formValidation/MultiSelect";
import * as Yup from "yup";
import { setParems } from "../../redux/Campaign";


import api from "../../utils/api";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import DaynmicApicall from "../../utils/function";
import { Link } from "react-router-dom";


const MasterDailerQueue = (props) => {

  const { userInfo } = useSelector((state) => state?.user?.value);
  const [playlist, setPlaylist] = useState([]);
  const [joinempty, setjoinEmpty] = useState([]);
  const [strategy, setstrategy] = useState([]);
  const [leavewhenempty, setLeavempty] = useState([]);
  const authToken = userInfo.token;
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const Header = { headers: { Authorization: userInfo.data[0].UserToken } };
  const [getQueue, setqueue] = useState("");
  const getqueueList = async () => {
    let Info = await DaynmicApicall(
      `/dialer/getdialerqueue`,
      "",
      "get",
      userInfo.data[0].UserToken
    );
    setqueue(Info);
    // console.log(Info,"data")
   
  };
  console.log(props,"hello div")
  function AudioPlayList() {
    api
      .get(`prm/getParamdata/ALL/BIRLA_HEALTH_AUD`, {
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
        setPlaylist(bData);
      })
      .catch((error) => {
        toast.error(
          error.response.data.message ??
            error.message ??
            "OOPs, something went wrong."
        );
      });
  }
  function getStrategy() {
    api
      .get(`prm/getParamdata/ALL/DIALER_QUEUE_STRATEGY`, {
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
        setstrategy(bData);
      })
      .catch((error) => {
        toast.error(
          error.response.data.message ??
            error.message ??
            "OOPs, something went wrong."
        );
      });
  }
const handleChange =() =>{
  return setToggle(!toggle);
}
    
 

 
  function joinEmptydata() {
    api
      .get(`prm/getParamdata/ALL/DIALER_QUEUE_JOINEMPTY`, {
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
        setjoinEmpty(bData);
      })
      .catch((error) => {
        toast.error(
          error.response.data.message ??
            error.message ??
            "OOPs, something went wrong."
        );
      });
  }

  function LeaveEmpty() {
    api
      .get(`prm/getParamdata/ALL/DIALER_QUEUE-LEAVEEMPTY`, {
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
        setLeavempty(bData);
      })
      .catch((error) => {
        toast.error(
          error.response.data.message ??
            error.message ??
            "OOPs, something went wrong."
        );
      });
  }
 
  useEffect ( async () => {
   await AudioPlayList();
   await getStrategy();
   await joinEmptydata();
   await LeaveEmpty();
   await  getqueueList();
  }, []);

  let action = props?.data?.paremsData.action === "UPDATE";
  console.log(props?.data?.paremsData.comp1.joinempty,"datadadadad");

  console.log(props?.data?.paremsData?.comp1?.strategy,"divyanshi");
  // console.log(strategy.find( (v) => v?.value ===  props?.data?.paremsData.comp1.strategy),"hello userrrr")
  let initial = {

    name: action ? props?.data?.paremsData.comp1.musiconhold:"",
    queue_id: action ? props?.data?.paremsData.comp1.name :"",
    entry: action ? props?.data?.paremsData.comp1.entry :"",
    queue_name: action ? props?.data?.paremsData.comp1.queue_name: "",
    musiconhold: action ? props?.data?.paremsData.comp1.musiconhold: "",
    timeout: action ? props?.data?.paremsData.comp1.timeout: "",
    ringinuse: action ? props?.data?.paremsData.comp1.ringinuse: "",
    autofill: action ? props?.data?.paremsData.comp1.autofill: "",
    maxlen:  action ? props?.data?.paremsData.comp1.maxlen:"",
    strategy:  action ? strategy?.find( (v) => v?.value ===  props?.data?.paremsData?.comp1?.strategy): "",
    // joinempty:  action ? props?.data?.paremsData.comp1.joinempty: "",
    joinempty: action? joinempty?.find( (v) => v?.value === props?.data?.paremsData?.comp1?.joinempty): "",
    leavewhenempty:  action ? props?.data?.paremsData.comp1.leavewhenempty: "",
    reportholdtime: action ? props?.data?.paremsData.comp1.reportholdtime: "",
    announcementstatus: action ? props?.data?.paremsData.comp1.announcementstatus: "",
    annoucement_path: action ? props?.data?.paremsData.comp1.annoucement_path: "",
    action_name:  action ? "UPDATE" : "INSERT",
  };

  // console.log(initial,"giiiiiiii")
  const validate = Yup.object({
    name: Yup.string().required("name  is required"),
  });
  const onSubmit = async (values ,{ resetForm }) => {
    // console.log(values, "valueWDDD data");
    let entry = values.entry.map((v) => v.value);
    values.entry = entry;
    values.joinempty = values.joinempty.value;
    values.leavewhenempty = values.leavewhenempty.value;
    values.strategy = values.strategy.value;
    values.musiconhold = values.name;
    values.reportholdtime = values.reportholdtime === true ? "yes" : "no";
    values.autofill = values.autofill === true ? "yes" : "no";
    values.announcementstatus = values.announcementstatus === true ? "yes" : "no";
    values.ringinuse = values.ringinuse === true ? "yes" : "no";
     if (props.data.paremsData.action === "INSERT") {
      const Info = api.post("/dialer/managedialerdata", values, {
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
      const Info = api.post("/dialer/updateQdata", values, {
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

  //   if (props.data.paremsData.action === "INSERT") {
  //   let Info = await DaynmicApicall(
  //     `/dialer/managedialerdata`,values,"post",userInfo.data[0].UserToken
  //   );
  //   toast.success(Info.message);
  //   getqueueList();
  // }
};
  return (
    <>
      <div className="container-fluid py-3 bg ">
        <div className="row">
          <div className="card col-xl-12 bg-dark">
            <div className="row row-cols-md-2 m-2 p-1 row-cols-lg-2 row-cols-xl-2 font-weight-bold">
              <span className="text-left text-light ">Add Dialer queue</span>
            </div>
          </div>
        </div>
      </div>
      {Object.length > 0 ? (
        <Formik
          initialValues={initial}
          validationSchema={validate}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <div className="card card-body  border-light shadow ml-2">
              <Form>
                <div className="row">
                  Queue
                  <div
                    style={{
                      borderBottom: "1px solid #d5d9de ",
                      height: "5px",
                    }}
                  ></div>
                  <TextField
                    title="Dialer Queue Name"
                    data-toggle="tooltip"
                    label="Dialer Queue Name"
                    placeholder="Enter Dialer Queue Name"
                    type="text"
                    name="queue_name"
                    disabled={props?.data?.paremsData.action === "UPDATE"}
                  />
                  <TextField
                    title="Please Enter Agents Ringing Duration in second"
                    data-toggle="tooltip"
                    label="Agent Ringing Duration"
                    placeholder="Enter Duration Time"
                    type="text"
                    name="timeout"
                  />
                  <TextField
                    title=" Please Enter Maxmum Incoming Call"
                    data-toggle="tooltip"
                    label="Maxmum Incoming Call"
                    placeholder="Enter Maximum Length"
                    type="text"
                    name="maxlen"
                  />
                  <MultiSelect
                    label="Automatic Call Distribution"
                    name="strategy"
                    isMulti={false}
                    formik={formik}
                    options={strategy}
                    placeholder="Select Audio "
                    type="select"
                    value={formik.values.strategy}
                    onChange={(value) =>
                      formik.setFieldValue("strategy", value)
                    }
                  />
                  <MultiSelect
                    label="Join Empty"
                    name="joinempty"
                    isMulti={false}
                    formik={formik}
                    options={joinempty}
                    placeholder="Select Audio "
                    type="select"
                    value={formik.values.joinempty}
                    onChange={(value) =>
                      formik.setFieldValue("joinempty", value)
                    }
                  />
                  <MultiSelect
                    label="Leave Empty"
                    name="leavewhenempty"
                    isMulti={false}
                    formik={formik}
                    options={leavewhenempty}
                    placeholder="Select Leave Empty"
                    type="select"
                    value={formik.values.leavewhenempty}
                    onChange={(value) =>
                      formik.setFieldValue("leavewhenempty", value)
                    }
                  />
                
                      <Toggle
                      label="Announcement"
                      name="announcementstatus"
                      type="switch"
                      value={formik.values.announcementstatus}
                      defaultChecked={formik.values.announcementstatus}
                      onChange={(e) =>
                        formik.setFieldValue(
                          "announcementstatus",
                          e.target.checked
                        )
                      }
                      onClick={()=>  handleChange()}
                    />
                    {toggle  && (
                      <TextField
                      title=" Please Enter Annoucement Path"
                      data-toggle="tooltip"
                      label="Annoucement Path"
                      placeholder="Enter Annoucement Path"
                      type="text"
                      name="annoucement_path"
                    />)
                    }
                  <Toggle
                    label=" Call Waiting"
                    name="ringinuse"
                    type="switch"
                    value={formik.values.ringinuse}
                    defaultChecked={formik.values.ringinuse}
                    onChange={(e) =>
                      formik.setFieldValue("ringinuse", e.target.checked)
                    }
                  />
                  <Toggle
                    label="AutoFill"
                    name="autofill"
                    type="switch"
                    value={formik.values.autofill}
                    defaultChecked={formik.values.autofill}
                    onChange={(e) =>
                      formik.setFieldValue("autofill", e.target.checked)
                    }
                  />
                  <Toggle
                    label="Report Hold"
                    name="reportholdtime"
                    type="switch"
                    value={formik.values.reportholdtime}
                    defaultChecked={formik.values.reportholdtime}
                    onChange={(e) =>
                      formik.setFieldValue("reportholdtime", e.target.checked)
                    } />
                  <hr />
                  <div className="d-flex">
                    <TextField
                      title="Please Enter Music On Hold Name"
                      data-toggle="tooltip"
                      label="Music On Hold Name"
                      placeholder="Enter  Name"
                      type="text"
                      name="name"
                      disabled={props?.data?.paremsData.action === "UPDATE"}
                    />
                    <MultiSelect
                      label=" Audio Play List"
                      name="entry"
                      isMulti={true}
                      formik={formik}
                      options={playlist}
                      placeholder="Select Audio "
                      type="select"
                      value={formik.values.entry}
                      onChange={(value) => {
                        formik.setFieldValue("entry", value);
                      }}
                    />

                    <div className="row ml-6 mt-4">
                      <div className="col-2 ">
                      
                        <button type="submit" className="btn btn-primary btn-sm m-2  ">
                          Save
                        </button>
                      </div>
                      <div className="col-7" style={{ marginLeft: "-90px" }}>
                        <Link
                        to="MNU_MANAGE_DIALER_Q"
                        className="btn btn-primary btn-sm m-2"
                       
                        onClick={(e) => {
                          dispatch(setParems({ data: "MNU_MANAGE_DIALER_Q" }));
                        }}
                      >
                        Cancel
                      </Link>
                      </div>
                    </div>
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
};
export default MasterDailerQueue;