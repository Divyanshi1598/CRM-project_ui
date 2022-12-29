import React from 'react';
import { Dropdown } from 'react-bootstrap';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const CallConference = ({setShowdata}) => {
  const BackHome =() =>{
    setShowdata();
  }
  return (
    <div  className='mt-5'> 
    <div className='row'>
    <div className='col-3'><ChevronLeftIcon  fontSize="large"  onClick={BackHome}/></div>
    <div className='col-7'> Call Conference</div>
    </div>
<hr></hr>
    <div className='d-flex '>
    <Dropdown style={{width:"130px" }} >
        <Dropdown.Toggle  variant ="success"   style={{width:"130px"}}>
        Internal Team 
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#">
           Team Leader
          </Dropdown.Item>
          <Dropdown.Item href="#">
          Quality Analyser
          </Dropdown.Item>
          <Dropdown.Item href="#">
        Manager
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div className=' ml-1'> 
    <Dropdown style={{width:"120px", marginRight:'-20px'}} >
        <Dropdown.Toggle  variant ="success" style={{width:"130px"}} >
       External Team 
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#">
         RM
          </Dropdown.Item>
          <Dropdown.Item href="#">
          Field Executive
          </Dropdown.Item>
         
        </Dropdown.Menu>
      </Dropdown>
    </div>
    
    </div>
    
   
    </div>

   
    
   
  )
}

export default CallConference;