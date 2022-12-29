import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Sms from './Sms';
import WhatsAppPopup from './WhatsAppPopup';
import EmailPopup from './EmailPopup';


function UncontrolledExample() {
  return (
    <Tabs
      defaultActiveKey="home"
      id="uncontrolled-tab-example"
      className="mb-1 mt-0"
      tabSize="2"
    >
      <Tab eventKey="home" title="SMS">
        <Sms />
      </Tab>
      <Tab eventKey="profile" title="WhatsApp">
        <WhatsAppPopup />
      </Tab>
      <Tab eventKey="contact" title="Email">
        <EmailPopup />
      </Tab>
    </Tabs>
  );
}

export default UncontrolledExample; 