

import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const popover = (
  <Popover id="popover-basic" className='card '>
    <Popover.Header as="h3">SMS</Popover.Header>
    <Popover.Body>
      Please write a message
      <div className=" d-flex justify-content-end ">
        <button type="submit" className="btn btn-primary btn-sm m-2 ml-4">
          Save
        </button>
        <button type="submit" className="btn btn-primary btn-sm m-2 ">
          clear
        </button></div>
    </Popover.Body>
  </Popover>
);
const Example = () => (
  <>
    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
      <Button variant=" success" className='mt-2'> SMS</Button>
    </OverlayTrigger>
    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
      <Button variant=" success" className='mt-2'>Whatsapp</Button>
    </OverlayTrigger>
    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
      <Button variant=" success" className='mt-2'>Email</Button>
    </OverlayTrigger>
    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
      <Button variant=" success" className='mt-2'> History</Button>
    </OverlayTrigger>

  </>
);
export default Example;

