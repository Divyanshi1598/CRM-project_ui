import React from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const CallTransfer = () => {
  const BackHome =() =>{

  }
  return (
    <div className="mt-5">
    <div className='row'>
    <div className='col-3'><ChevronLeftIcon  fontSize="large"  onClick={BackHome}/></div>
    <div className='col-7'> Call Transfer</div>
    </div>
    <hr></hr>
      <div className="row mt-4">
        <div className="ml-3">Internal Team</div>
        
        <div className="col-5 mt-3 ml-4 ">
          <button>Leave</button>
        </div>
        <div className="col-5 mt-3">
          <button>Stay</button>
        </div>
        <div className="mt-4">
          <ul>Agent</ul>
          <ul>Team Leader </ul> <ul>Manager</ul>
          <ul>Language</ul>
        </div>
      </div>
    </div>
  );
};

export default CallTransfer;
