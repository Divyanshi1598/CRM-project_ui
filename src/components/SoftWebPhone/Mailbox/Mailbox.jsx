import { Avatar } from '@mui/material'
import React from 'react'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import BottomNavigation from "../BottomNavigation"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MailIcon from '@mui/icons-material/Mail';

const Mailbox = ({setShowdata}) => {
  const BackHome =() =>{
    setShowdata(false);
  }
  return (
    <>
    <div className='mt-3 ml-3'>
    <div className='row'>
    <div className='col-3'><ChevronLeftIcon  fontSize="large"  onClick={BackHome}/></div>
    <div className='col-7'>  Mail Box</div>
    </div>
    <hr></hr> 
<div className='row ' style={{backgroundColor:"lightpink",marginRight:"8px"}}>
<div className='col-2' ><Avatar style={{backgroundColor:"green"}}>A</Avatar></div>
<div className='col-8'>
<p style={{fontSize:"12px"}}>mentioned above, the column menu is a component</p>
</div>
</div>

<div className='row mt-2' style={{backgroundColor:"lightgreen",marginRight:"8px"}}>
<div className='col-2'><Avatar style={{backgroundColor:"red"}}>R</Avatar></div>
<div className='col-8'><p style={{fontSize:"12px"}}>mentioned above, the column menu is a component</p></div>
</div>

<div className='row mt-2' style={{backgroundColor:"lightgreen",marginRight:"8px"}}>
<div className='col-2'><Avatar style={{backgroundColor:"blue"}}>C</Avatar></div>
<div className='col-8'><p style={{fontSize:"12px"}}>mentioned above, the column menu is a component</p></div>
</div>

<div className='row mt-2' style={{backgroundColor:"lightgreen",marginRight:"8px"}}>
<div className='col-2'><Avatar style={{backgroundColor:"orange"}}>D</Avatar></div>
<div className='col-8'><p style={{fontSize:"12px"}}>mentioned above, the column menu is a component</p></div>
</div>
<hr></hr>

    </div>
    <div className='mt-5'>
     <BottomNavigation /></div>

    </>
  )
}

export default Mailbox