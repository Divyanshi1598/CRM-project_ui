import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import AgentDashTable from "./AgentDashTable";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function AgetDashboard() {
  const [value, setValue] = useState(0);
  const [progress, setProgress] = useState(10);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div>
      <div class="app-main">
        <div class="app-main__outer">
          <div class="app-main__inner">
            <div>
              <div className="row">
                <div
                  className="card col-md-5 mt-1"
                  style={{ height: "25rem", width: "48%" }}
                >
                  <div
                    style={{
                      height: "120px",
                      width: "503px",
                      backgroundColor: "#ecf0f3",
                    }}
                  >
                    <div
                      style={{
                        width: "120px",
                        height: "35px",
                        marginLeft: "-13px",
                        borderRadius: "5px 14px 1px 5px ",
                        color: "white",
                        borderTopRightRadius: "17px",
                      }}
                      className="p-1 bg-dark "
                    >
                      Performence
                    </div>
                  </div>
                  <div className="mt-2">
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                      >
                        <Tab label="Top 10 Agents" {...a11yProps(0)} />
                        <Tab label="Bottom 10 Agents" {...a11yProps(1)} />
                      </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                      <AgentDashTable />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <AgentDashTable />
                    </TabPanel>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-3 ml-4">
                      <CircularProgressWithLabel value={progress} />
                    </div>
                    <div style={{ fontSize: "14px" }} className="col-md-5">
                      Agent Sentiment
                    </div>
                    <div className="col-md-3">
                      <CircularProgressWithLabel value={progress} />
                    </div>
                  </div>
                </div>
                <div
                  className="card col-md-5 mt-1 "
                  style={{ height: "25rem", marginLeft: "26px", width:"424.5px" }}
                >
                  <div
                    style={{
                      height: "130px",
                      width: "503px",
                      backgroundColor: "#ecf0f3",
                    }}
                  >
                    <div
                      style={{
                        width: "140px",
                        height: "35px",
                        marginLeft: "-13px",
                        borderRadius: "5px 14px 1px 5px ",
                        color: "white",
                        borderTopRightRadius: "17px",
                      }}
                      className="p-1 bg-dark "
                    >
                      Sales calls
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-3  p-1">
                      <i class="fa fa-phone ml-2" aria-hidden="true"></i>

                      <p
                        class=" ml-2"
                        style={{
                          fontSize: "14px",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        Total Calls
                      </p>
                      <p style={{ fontSize: "14px" }} class=" ml-2">
                        853
                      </p>
                    </div>
                    <div className="col-md-3 mt-2">
                      <i class="fa fa-address-book " aria-hidden="true"></i>
                      <p
                        style={{
                          fontSize: "14px",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        Total Agents
                      </p>
                      <p style={{ fontSize: "14px" }}>853</p>
                    </div>
                    <div className="col-md-3 mt-2">
                      <i class="fa fa-phone" aria-hidden="true"></i>

                      <p
                        data-toggle="tooltip"
                        title="Total Calls Hours"
                        style={{
                          fontSize: "14px",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        Total Calls Hours
                      </p>
                      <p style={{ fontSize: "14px" }}>853</p>
                    </div>
                    <div className="col-md-3 mt-2">
                      <i class="fa fa-address-book" aria-hidden="true"></i>
                      <p
                        style={{
                          fontSize: "14px",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        Total Work
                      </p>
                      <p style={{ fontSize: "14px" }}>853</p>
                    </div>
                    <hr></hr>
                    <div className="row">
                      <div className="col-md-4">
                        <div style={{ fontSize: "14px" }}>
                          Effectiveness of call etiquette compliance
                        </div>
                      </div>
                      <div className="col-md-2">
                        <CircularProgressWithLabel value={progress} />
                      </div>
                      <div className="col-md-4" style={{ fontSize: "14px" }}>
                        sales effectiveness
                      </div>
                      <div className="col-md-2">
                        <CircularProgressWithLabel value={progress} />
                      </div>
                    </div>
                    <hr></hr>
                    <b style={{ fontSize: "14px" }}>Customer intent to buy</b>
                    <div className="row" style={{ marginBottom: "120px" }}>
                      <div className="col-md-3">
                        <p style={{ fontSize: "14px" }}> 14% </p>
                        <LinearProgressWithLabel value={progress} />
                      </div>
                      <div className="col-md-6">
                        <p style={{ fontSize: "14px" }}> 73% </p>
                        <div>
                          <LinearProgressWithLabel value={progress} />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <p style={{ fontSize: "14px" }}>13%</p>
                        <LinearProgressWithLabel value={progress} />
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card mt-2 ">
                  <div
                    style={{
                      width: "130px",
                      height: "35px",
                      marginLeft: "-13px",
                      borderRadius: "5px 14px 1px 5px ",
                      color: "white",
                      borderTopRightRadius: "17px",
                    }}
                    className="p-1 bg-dark "
                  >
                    Misconduct
                  </div>

                  <div className="d-flex mt-4" style={{ fontSize: "14px" }}>
                    Misconduct Frequency
                    <div className="ml-3">
                      <CircularProgressWithLabel value={progress} />
                    </div>
                    <div className="ml-6">
                      <b>Word cloud for Misconduct</b>
                      <p style={{ fontSize: "14px" }}>
                        Do not get any commision
                        <br />
                        DIt will be helpful in promotion
                        <br />I will share my number
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
