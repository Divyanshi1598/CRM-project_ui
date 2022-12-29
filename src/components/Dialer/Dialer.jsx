import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import socketIOClient from "socket.io-client";
import HomePage from "../SoftWebPhone/HomePage/HomePage";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import DailPadboad from "../SoftWebPhone/DailPad/DailPadboad";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import CallMergeIcon from "@mui/icons-material/CallMerge";
import "./style.css";
import { BottomNavigation } from "@mui/material";
import Profile from "../SoftWebPhone/Profile";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";

export default function Dialer() {
  const [disposition, setdisposition] = useState("");
  const endpoint = "https://wpsocket.a10s.in/";
  const socket = socketIOClient(endpoint, { path: "/socket.io" });
  const { userInfo } = useSelector((state) => state?.user?.value);
  let { crmsaveandexit } = useSelector((state) => state?.dialer);
  const [managedata, Setmanagedata] = useState(false);
  const [showdata, setShowdata] = useState(true);
  const [data, setData] = useState(true);
  const [confrence, setConference] = useState(true);
  const [transfer, setTransfer] = useState(false);
  const [callholdUnhold, setCallholdUnhold] = useState(false);
  const [callmuteUnmute, setcallmuteUnmute] = useState(false);
  const [wepphoneconnect, setWebphoneconnect] = useState("Waiting for call");
  const handleClick = (event) => {
    setData((current) => !current);
  };
  const Conference = (event) => {
    setConference((current) => !current);
  };

  const TransferData = (event) => {
    setTransfer((current) => !current);
  };
  const Header = { headers: { Authorization: userInfo.data[0].UserToken } };

  function openRightMenu() {
    document.getElementById("rightMenu").style.display = "block";
  }

  function closeRightMenu() {
    document.getElementById("rightMenu").style.display = "none";
  }

  async function callholdAndUnhold(event) {
    let holdUnhold = {
      agent_token: userInfo.data[0]?.dlrAgentId,
      action: "toggle_hold",
      event_data: {
        call_session_id: crmsaveandexit?.dialer_session_id, // CALL UNIQUE SESSION ID OR UUID
        hold_action: callholdUnhold === true ? "hold" : "unhold", // value "hold" or "unhold" will be based on control action
      },
    };
    // socket.emit('crmdialerdata', holdUnhold)
  }

  async function callMuteAndUnmute() {
    setcallmuteUnmute(callmuteUnmute === false ? true : false);
    let muteunmute = {
      agent_token: userInfo.data[0]?.dlrAgentId,
      action: "toggle_mute",
      event_data: {
        call_session_id: crmsaveandexit?.dialer_session_id, // CALL UNIQUE SESSION ID OR UUID
        mute_action: callmuteUnmute === true ? "mute" : "unmute", // value "mute" or "unmute" will be based on control action

        // call_session_id: crmsaveandexit?.dialer_session_id, // CALL UNIQUE SESSION ID OR UUID
        // hold_action: callholdUnhold === true ? "hold" : "unhold" // value "hold" or "unhold" will be based on control action
      },
    };
    socket.emit("crmdialerdata", muteunmute);
  }
  useEffect(() => {
    // return () => {
    socket.on("respfromdialer", async (data) => {
      switch (data.action) {
        case "get_call_transfer":
          console.log("get_call_transfer", data);
          const l1 = document.getElementById("calltransfer");
          l1.click();
          break;
        case "register_state":
          setWebphoneconnect(
            "Agent Rgeistraction: " + data.event_data.register_state
          );
        case "call_state":
          if (data.agent_token == userInfo.data[0]?.dlrAgentId) {
            setWebphoneconnect("Call Status: " + data.event_data.call_status);
          }
          break;
        case "toggle_mute":
          break;
        case "attx_xfer":
          break;
        case "toggle_hold":
          break;
        case "send_dtmf":
          break;
        default:
        // cccccccc
      }
    });
    // };
  }, [""]);

  async function sendcalltransferdatatodialer() {
    let callinfo = {
      action: "call_attx_transfer",
      call_transfer_to: "AGENT|SUPERVISOR|EXTERNAL_NUMBER|QUEUE",
      call_session_id: crmsaveandexit?.dialer_session_id,
      call_transfer_number: 245,
    };

    socket.emit("crmdialerdata", callinfo);
  }

  return (
    <>
      <div className="container">
        {/* Slider */}
        {/* <div className="">
                    <div class="w3-sidebar w3-bar-block w3-card w3-animate-right"
                        style={{ display: "none", right: "0", width: "20%", height: "45%", marginBottom: "300px", marginRight: "39px" }}
                        id="rightMenu">
                        <button onClick={closeRightMenu} class="w3-bar-item w3-button w3-large">&times;</button>
                        <div className='card'>
                            <button className="btn-sm" onClick={sendcalltransferdatatodialer}>
                                send call trnafer details
                            </button>

                        </div>
                    </div>
                    <div>
                        <button class="w3-button  w3-xlarge w3-right invisible" id='calltransfer' onClick={openRightMenu} />
                    </div>
                </div> */}
        {/* Iframe */}
        <div className="">
          <iframe
             hidden
            title="webphone"
            // src={`https://sipphone.store/ats-webphone/dist1.1/?${userInfo.data[0].UserToken.split(" ")[1]}`}
            src={`https://sipphone.store/ats-webphone/dist1.1/?${userInfo.data[0].dlrAgentId}`}
            allow="microphone"
            style={{ width: "270px", height: "400px" }}
          ></iframe>
        </div>
        <div className="mt-3">
          <section className="phoneView mt-1 overflow-auto md">
            <div className="overflow-auto">
            <p style={{ fontSize: "11px" }}>
                <SignalCellularAltIcon style={{ height: "15px" }} />
              ...
              </p>
              <div className="d-flex" style={{marginTop:"-25px"}}>
                <div className="header-phone">{wepphoneconnect}</div>
                <div className="mt-1">
                  <Profile setShowdata={setShowdata} />
                </div>
              </div>
              <div className="row ml-1 ">
                <div className="col-2  ">
                  <button
                    className="btn"
                    data-toggle="tooltip"
                    title="Re-Dail Call"
                  >
                    <AddIcCallIcon />
                  </button>
                </div>
                <div className="col-2  ml-3">
                  <button
                    className="btn "
                    type="button"
                    toggle="tooltip"
                    title=" Call Conference"
                    onClick={Conference}
                  >
                    <CallMergeIcon />
                  </button>
                </div>
                <div className="col-2 ml-3 ">
                  <button
                    className="btn"
                    type="button"
                    data-toggle="tooltip"
                    title="Call Transfer"
                    onClick={TransferData}
                  >
                    <AddIcCallIcon />
                  </button>
                </div>
              </div>
              <div className="row ml-1">
                <div className="col-2 ml-2 ">
                  <button
                    id="dialpad"
                    onClick={(e) => {
                      setCallholdUnhold(
                        callholdUnhold === false ? true : false
                      );
                      callholdAndUnhold();
                    }}
                    className={`${
                      callholdUnhold === true ? "bg-success" : "bg-white"
                    } btn rounded-5`}
                  >
                    <img
                      src="Images/pause-call (1).png"
                      data-toggle="tooltip"
                      title="Call hold"
                      alt="mute image"
                      style={{ height: "25px" }}
                    />
                  </button>
                </div>
                <div className="col-2 ml-3">
                  <button
                    id="dialpad"
                    className={`${
                      callmuteUnmute === true ? "bg-success" : "bg-white"
                    } btn rounded-5`}
                    data-toggle="tooltip"
                    title=" Mute"
                    onClick={callMuteAndUnmute}
                  >
                    <img
                      src="Images/microphone.png"
                      alt="mute image"
                      style={{ height: "25px" }}
                    />
                  </button>
                </div>
                <div className="col-2  ml-3">
                  <button
                    className="btn"
                    type="button"
                    data-toggle="tooltip"
                    title="Coach"
                    onClick={handleClick}
                  >
                    <AddIcCallIcon />
                  </button>
                </div>
              </div>
              <div className="CallSummary  overflow-auto">
                <div>
                  <div className="row ml-1">
                    <div className="col-2 ml-2">
                      <button
                        id="dialpad"
                        className="btn btn-success rounded-5"
                      >
                        <span>1</span>
                      </button>
                    </div>
                    <div className="col-2 ml-3">
                      <button
                        id="dialpad"
                        className="btn btn-success rounded-5"
                      >
                        <span>2</span>
                      </button>
                    </div>
                    <div className="col-2 ml-3 ">
                      <button
                        id="dialpad"
                        className="btn btn-success rounded-5"
                      >
                        <span>3</span>
                      </button>
                    </div>
                  </div>
                  <div className="row ml-1">
                    <div className="col-2 ml-2">
                      <button
                        id="dialpad"
                        className="btn btn-success rounded-5"
                      >
                        <span>4</span>
                      </button>
                    </div>
                    <div className="col-2 ml-3">
                      <button
                        id="dialpad"
                        className="btn btn-success rounded-5"
                      >
                        <span>5</span>
                      </button>
                    </div>
                    <div className="col-2 ml-3 ">
                      <button
                        id="dialpad"
                        className="btn btn-success rounded-5"
                      >
                        <span>6</span>
                      </button>
                    </div>
                  </div>
                  <div className="row ml-1">
                    <div className="col-2 ml-2">
                      <button
                        id="dialpad"
                        className="btn btn-success rounded-5"
                      >
                        <span>7</span>
                      </button>
                    </div>
                    <div className="col-2 ml-3">
                      <button
                        id="dialpad"
                        className="btn btn-success rounded-5"
                      >
                        <span>8</span>
                      </button>
                    </div>
                    <div className="col-2 ml-3 ">
                      <button
                        id="dialpad"
                        className="btn  btn-success rounded-5"
                      >
                        <span>9</span>
                      </button>
                    </div>
                  </div>

                  <div className="row ml-1">
                    <div className="col-2 ml-2">
                      <button
                        id="dialpad"
                        className="btn btn-success rounded-5"
                      >
                        <span>0</span>
                      </button>
                    </div>
                    <div className="col-2 ml-3">
                      <button
                        id="dialpad"
                        className="btn btn-success rounded-5"
                      >
                        <span>*</span>
                      </button>
                    </div>
                    <div className="col-2 ml-3 ">
                      <button
                        id="dialpad"
                        className="btn btn-success rounded-5"
                      >
                        <span>#</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="data">
                <div className="" id="summary">
                  ATS Summary View
                </div>
              </div>
              <div id="tablesummaryats" className="mt-1 card">
                <Table responsive bordered className="overflow-auto">
                  <tr>
                    <td>Name</td>
                    <td>ATM Call </td>
                    <td> SMS</td>
                  </tr>
                  <tr>
                    <td>Ram</td>
                    <td>0</td>
                    <td>No</td>
                  </tr>
                  <tr>
                    <td>Ram</td>
                    <td>0</td>
                    <td>No</td>
                  </tr>
                  <tr>
                    <td>Ram</td>
                    <td>0</td>
                    <td>No</td>
                  </tr>
                  <tr>
                    <td>Ram</td>
                    <td>0</td>
                    <td>No</td>
                  </tr>
                  <tr>
                    <td>Ram</td>
                    <td>0</td>
                    <td>No</td>
                  </tr>
                  <tr>
                    <td>Ram</td>
                    <td>0</td>
                    <td>No</td>
                  </tr>
                  <tr>
                    <td>Ram</td>
                    <td>0</td>
                    <td>No</td>
                  </tr>
                  <tr>
                    <td>Deva</td>
                    <td>0</td>
                    <td>No</td>
                  </tr>
                  <tr>
                    <td>John</td>
                    <td>1</td>
                    <td>Yes</td>
                  </tr>
                </Table>
              </div>
              <div
                style={{ height: "70px", backgroundColor: "red" }}
                className=" border-rounded"
              >
                <BottomNavigation />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
