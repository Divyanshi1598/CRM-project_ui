import React, { useState } from 'react'
import { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap';
export default function Popup() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    window.onload = function () {
      setShow(true)
    }
  })

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Modal show={show} centered >
        {/* <Modal.Header closeButton> */}
        <Modal.Header>
          <Modal.Title className="yamgo-blue darken-3 me-3 rounded shadow-sm py-3 px-5 fw-bold"> ATS Services Team</Modal.Title>
        </Modal.Header>
        <Modal.Body className='fw-bold fs-4'>Dear team we are under maintenance for next few hours & it might take upto 24 hours it becoz of some major updates on server so keep patience..

        </Modal.Body>
        <Modal.Footer>
          Thanks & Regards
          ATS Services Team
        </Modal.Footer>
      </Modal>
    </>
  )
}
