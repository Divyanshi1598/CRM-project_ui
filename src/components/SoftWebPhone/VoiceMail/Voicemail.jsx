import { Avatar } from '@mui/material'
import React from 'react'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import BottomNavigation from "../BottomNavigation"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';


const Voicemail = ({setShowdata}) => {
  const BackHome =() =>{
    setShowdata(true);
  }
  return (
    <>
    <div className='mt-3 ml-3'>
    <div className='row'>
    <div className='col-3'><ChevronLeftIcon  fontSize="large"  onClick={BackHome}/></div>
    <div className='col-7'>Voice  Mail</div>
    </div>
    <hr></hr> 
<div className='row' style={{backgroundColor:"lightpink",marginRight:"8px"}}>
<div className='col-2' ><Avatar>A</Avatar></div>
<div className='col-8'>
<p style={{fontSize:"12px"}}> 
<VolumeUpIcon fontSize='large' style={{marginLeft:"20px"}} />
</p>
</div>
</div>
<hr></hr>
<div className='row' style={{backgroundColor:"lightgreen",marginRight:"8px"}}>
<div className='col-2'><Avatar>R</Avatar></div>
<div className='col-8'><p style={{fontSize:"12px"}}><VolumeUpIcon fontSize='large' style={{marginLeft:"20px"}} /></p></div>
</div>
<hr></hr>
<div className='row' style={{backgroundColor:"lightgreen",marginRight:"8px"}}>
<div className='col-2'><Avatar>C</Avatar></div>
<div className='col-8'><p style={{fontSize:"12px"}}><VolumeUpIcon fontSize='large' style={{marginLeft:"20px"}} /></p></div>
</div>
<hr></hr>
<div className='row' style={{backgroundColor:"lightgreen",marginRight:"8px"}}>
<div className='col-2'><Avatar>D</Avatar></div>
<div className='col-8'><p style={{fontSize:"12px"}}><VolumeUpIcon fontSize='large' style={{marginLeft:"20px"}} /></p></div>
</div>
<hr></hr>

    </div>
    <div className='mt-5'>
     <BottomNavigation /></div>
    
    
    </>
  )
}

export default Voicemail;