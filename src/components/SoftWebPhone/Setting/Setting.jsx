import React from 'react';
import { Formik } from "formik";
import { Toggle } from '../../formValidation/Toggle';
import Settings from '@mui/icons-material/Settings';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const Setting = ({ setShowdata}) => {

  const BackHome = () =>{
    setShowdata(true);

  }
  return (
    <div>
    <Formik initialValues={{ consent: false , scriptyesno: "" }}
   
    >
      {({formik, errors, touched, isValidating }) => (
      
    
        <div className="">
        <div className='row mt-5'>
        <div className='col-5  ml-2'>
        <ChevronLeftIcon  fontSize="large"  onClick={BackHome}/>
        
        
        </div>
        <div className='col-6'><div className='ml-4  d-flex'> 
        <Settings fontSize="small"  position="start" /><div className='ml-2'>Setting</div></div></div>
        </div>
        <hr></hr>
          <div className="row ml-1 ">
          <div className='col-6'>
          <Toggle
          label="Redail"
          name="name"
          key="key"
          type="switch"
          onChange={async (e) => {
            formik.setFieldValue("consent", e.target.checked);
          }} />
          <Toggle
          label="Conference "
          name="name"
          key="key"
          type="switch"
          onChange={async (e) => {
            formik.setFieldValue("consent", e.target.checked);
          }} />
          </div>
          <div className='col-6'>
          <Toggle
              label="Transfer"
              name="name"
              key="key"
              type="switch"
              onChange={async (e) => {
                formik.setFieldValue("consent", e.target.checked);
              }} />
              <Toggle
              label="Coach"
              name="name"
              key="key"
              type="switch"
              onChange={async (e) => {
                formik.setFieldValue("consent", e.target.checked);
              }} />
          </div>
          <div className='col-6'>
          <Toggle
          label="ATM View"
          name="name"
          key="key"
          type="switch"
          onChange={async (e) => {
            formik.setFieldValue("consent", e.target.checked);
          }} />
          <Toggle
          label="Voice Mail"
          name="name"
          key="key"
          type="switch"
          onChange={async (e) => {
            formik.setFieldValue("consent", e.target.checked);
          }} />
          </div>
          <div className='col-6'>
          <Toggle
          label="SMS Mail"
          name="name"
          key="key"
          type="switch"
          onChange={async (e) => {
            formik.setFieldValue("consent", e.target.checked);
          }} />
          <Toggle
          label="Mail Box"
          name="name"
          key="key"
          type="switch"
          onChange={async (e) => {
            formik.setFieldValue("consent", e.target.checked);
          }} />
          
          </div>
              <Toggle
              label="Person Information"
              name="name"
              key="key"
              type="switch"
              onChange={async (e) => {
                formik.setFieldValue("consent", e.target.checked);
              }} />
          </div>
        </div>
      )
    }
  </Formik>

   


    
    
    </div>
  )
}

export default Setting;