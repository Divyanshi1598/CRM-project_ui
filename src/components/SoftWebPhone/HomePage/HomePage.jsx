import React from 'react';
import { Table } from "react-bootstrap";
import "../Softphone.css";
// import "../style.css";
import BottomNavigation from "../BottomNavigation";
import Profile from "../Profile";
import MicOffIcon from '@mui/icons-material/MicOff';
import { useState } from "react";
import CallConference from '../Conference/CallConference';
import DailPadboad from "../DailPad/DailPadboad";
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import CallMergeIcon from '@mui/icons-material/CallMerge';


const HomePage = ({setShowdata}) => {
  const [managedata,Setmanagedata] = useState(false);
    const [data,setData] = useState(true);
  const [confrence,setConference] =useState(true)
  const [transfer,setTransfer] = useState(false);
 
  const  handleClick = event =>{
    setData(current => !current);
  }
  const  Conference = event =>{
    setConference(current => !current);
  }

  const TransferData = event =>{
    setTransfer(current => ! current);
  }
  return (
    <div>
    <div className="d-flex">
    <div className='header-phone'>Call Alarming Area </div>
    <div className="mt-1">
    <Profile setShowdata={setShowdata} />
    </div>
  </div>
 
    <div className="row ">
      <div className="col-2  ">
        <button className='btn ' type=""  
        data-toggle="tooltip" title="Re-Dail Call">
        <AddIcCallIcon    />
        </button>
      </div>
      <div className="col-2 ">
        <button     className='btn ' type="button"  toggle="tooltip" title=" Call Conference" onClick={Conference}>
          <CallMergeIcon />
        </button>
      </div>
      <div className="col-2 ">
        <button  className='btn' type="button"  data-toggle="tooltip" title="Call Transfer" onClick={TransferData}>
        <AddIcCallIcon />
        </button>
      </div>
      <div className="col-2 ">
        <button  className='btn ' type="button"  data-toggle="tooltip" title="Coach" onClick={handleClick}>
        <AddIcCallIcon  />
        </button>
      </div>
    </div>

  <div className="CallSummary  overflow-auto  ">   
<DailPadboad />
  </div>
  <div className="data">
    <div className="" id="summary">
     ATS Summary View
    </div>
  </div>
  <div  id= "tablesummaryats" className="mt-1 card">
    <Table  responsive bordered  className='overflow-auto' >
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
  <div style={{height:"40px",backgroundColor:"black"}} className="mt-4 border-rounded">
    <BottomNavigation  />
  </div>
    </div>
  )
}

export default HomePage;