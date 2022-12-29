import React, { useState } from "react";
import "./Softphone.css";
import Setting from "./Setting/Setting";
import HomePage from "./HomePage/HomePage";
import CallTransfer from "./CallTransfer/CallTransfer";
import Coach from "./Coach/Coach";
import Mailbox from "./Mailbox/Mailbox"
import Voicemail from "./VoiceMail/Voicemail";
import Smsinbox from "./SmsInbox/Smsinbox";
import CallConference from "./Conference/CallConference";
const Softphone = () => {
  const [showdata,setShowdata] = useState(true);

  return (
    <div className="">
      <section className="phoneView mt-3 overflow-auto  ">
  { showdata ? <HomePage setShowdata={setShowdata} />
  : <Setting   setShowdata={setShowdata} />}  
      </section>
    </div>
  );
};
export default Softphone;
