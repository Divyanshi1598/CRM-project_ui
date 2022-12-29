import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import Dialer from "./Dialer";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import DaynmicApicall from "../../utils/function";
import './style.css';

import { Dropdown } from "react-bootstrap";

export default function DialerSidebar(props) {
  const [expanded, setExpanded] = useState(false);
  const { userInfo } = useSelector((state) => state?.user?.value);
  const Header = { headers: { Authorization: userInfo.data[0].UserToken } };
  const [callPtp, setCallPtp] = useState("");
  

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  // async function getCallPtp(agentid,currenthour) {
  //     await DaynmicApicall(`mcrmdlr/getagentcallptptargetdata/${agentid}/${ parseInt(new Date().getHours() + "00")}`, '', 'get', userInfo.data[0].UserToken).then((res) => {
  //         setCallPtp(res);
  //     })
  //   }
  async function getCallPtp(agentid, currenthour) {
    api
      .get(
        `mcrmdlr/getagentcallptptargetdata/${agentid}/${parseInt(
          new Date().getHours() + "00"
        )}`,
        {
          headers: {
            Authorization: userInfo.data[0].UserToken,
          },
        }
      )
      .then(async (res) => {
        await setCallPtp(res.data.data[0]);
      })
      .catch((error) => {
        console.log("ERROR", error);
        toast.error(
          error.response.data.message ??
            error.message ??
            "OOPs, Something went wrong."
        );
      });
  }
  useEffect(async () => {
    await getCallPtp();
  }, []);







  return (
    <div>
      <div className="card row mt-1 ml-1 bg-white text-dark mr-2 mb-3">
        <div className="col-md">
          <div className="row ">
            <ul class="nav nav-pills nav-fill flex-column text-center  flex-sm-row">
              <li class="nav-item me-sm-2">
                <span class="text-left fw-bold  mb-3 mb-md-0 card-title pt-3 align-middle">
                  {callPtp.tc}
                </span>
              </li>
              <li class="nav-item me-sm-2">
                <span class="text-right fw-bold mb-3 mb-md-0 card-title pt-3 align-middle ">
                  {callPtp.uc}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

    {/*notification */}

    
    
    


      <div className="card row mt-7 ml-1 bg-white text-dark mr-2 mb-3 fixed-bottom">
        <Dialer />
      </div>
      <div className="mt-4">
        <div className="">
        <div className="sticky-container">
        <ul className="sticky">
            <li>
                <img src="images/facebook-circle.png" width="32" height="32" />
                <p><a href="https://www.facebook.com/codexworld" target="_blank">Like Us on<br/>Facebook</a></p>
            </li>
            <li>
                <img src="images/twitter-circle.png" width="32" height="32" />
                <p><a href="https://twitter.com/codexworldblog" target="_blank">Follow Us on<br/>Twitter</a></p>
            </li>
            <li>
                <img src="images/gplus-circle.png" width="32" height="32"/>
                <p><a href="https://plus.google.com/codexworld" target="_blank">Follow Us on<br/>Google+</a></p>
            </li>
            <li>
                <img src="images/linkedin-circle.png" width="32" height="32" />
                <p><a href="https://www.linkedin.com/company/codexworld" target="_blank">Follow Us on<br/>LinkedIn</a></p>
            </li>
            <li>
                <img src="images/youtube-circle.png" width="32" height="32"/>
                <p><a href="http://www.youtube.com/codexworld" target="_blank">Subscribe on<br/>YouYube</a></p>
            </li>
            <li>
                <img src="images/pin-circle.png" width="32" height="32"/>
                <p><a href="https://www.pinterest.com/codexworld" target="_blank">Follow Us on<br/>Pinterest</a></p>
            </li>
        </ul>
    </div>
        </div>
      </div>
    </div>
  );
}
