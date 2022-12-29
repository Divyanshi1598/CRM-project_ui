import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CallHistory from './CallHistory';
import WhatsAppHistory from './WhatsAppHistory';
import EmailHistory from './EmailHistory';


function TabHistoryModel(props) {
  return (
    <Tabs
      defaultActiveKey="home"
      id="uncontrolled-tab-example"
      className="mb-1 mt-0"
    >
      <Tab eventKey="home" title="Call History">
        <CallHistory userInfo={props}/>
      </Tab>
      <Tab eventKey="SMS" title="SMS History">
        </Tab>
      <Tab eventKey="contact" title="Email History">
        {/* <EmailHistory /> */}
      </Tab> 
      <Tab eventKey="profile" title="What's App History">
        {/* <WhatsAppHistory /> */}
      </Tab>
    </Tabs>
  );
}

export default TabHistoryModel;