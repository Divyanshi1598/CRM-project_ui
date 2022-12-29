import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import PolicyInfo from "./PolicyInfo";

function PolicyInfoModel(props) {
  return (
    <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-1 mt-0"
    >
      <Tab eventKey="home" title="Policy_01">
        <PolicyInfo userInfo={props} />
      </Tab>
      <Tab eventKey="profile" title="Policy_02">
        {/* <PolicyInfo /> */}
      </Tab>
      <Tab eventKey="contact" title="Policy_03">
        {/* <PolicyInfo /> */}
      </Tab>
    </Tabs>
  );
}

export default PolicyInfoModel;
