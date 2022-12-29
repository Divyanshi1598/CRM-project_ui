import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SmsIcon from '@mui/icons-material/Sms';
import MailIcon from '@mui/icons-material/Mail';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import { useState } from 'react';



export default function LabelBottomNavigation({setShowdata}) {
  const [value, setValue] =useState('recents');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
    <h1>bottom navbar</h1>
    <BottomNavigation  value={value} onChange={handleChange}>
      <BottomNavigationAction
      label="Voice Mail"
      data-toggle="tooltip"
      title="Voice Mail"
        value="recents"
         color="primary" badgeContent={99}
        icon={<RecordVoiceOverIcon />} 
      />
      <BottomNavigationAction
      label="SMS Inbox"
      data-toggle="tooltip"
      title="SMS Inbox"
        value="favorites"
        icon={<SmsIcon />}
      />
      <BottomNavigationAction 
      label="Mail Box"
      data-toggle="tooltip"
      title=" Mail Box"
      value="folder"
       icon={< MailIcon />} /> 
    </BottomNavigation> 
    </div>
  );
}



