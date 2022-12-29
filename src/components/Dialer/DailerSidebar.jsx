import * as React from 'react';
import { Box } from '@mui/material';
import Dialer from './Dialer';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Softphone from '../SoftWebPhone/Softphone';
// import './style.css';

export default function DialerSidebar(props) {
    const [expanded, setExpanded] = useState(false);
    const { userInfo } = useSelector((state) => state?.user?.value);
    const Header = { headers: { Authorization: userInfo.data[0].UserToken } };
    const [callPtp, setCallPtp] = useState("");
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    async function getCallPtp(agentid, currenthour) {
        api.get(`mcrmdlr/getagentcallptptargetdata/${agentid}/${parseInt(new Date().getHours() + "00")}`, {
            headers: {
                Authorization: userInfo.data[0].UserToken,
            },
        })
            .then(async (res) => {
                await setCallPtp(res.data.data[0]);

            })
            .catch((error) => {
                console.log("ERROR", error)
                toast.error(
                    error.response.data.message ??
                    error.message ?? "OOPs, Something went wrong."
                )
            });
    }
    useEffect(async () => {
        await getCallPtp();

    }, [])

    return (
        // <div>
        //     <div className="card row mt-1 ml-1 bg-white text-dark mr-2 mb-3">
        //         <div className="col-md">
        //             <div className="row ">
        //                 <ul class="nav nav-pills nav-fill flex-column text-center  flex-sm-row">
        //                     <li class="nav-item me-sm-2">
        //                         <span class="text-left fw-bold  mb-3 mb-md-0 card-title pt-3 align-middle">
        //                             {callPtp.tc}
        //                         </span>
        //                     </li>
        //                     <li class="nav-item me-sm-2">
        //                         <span class="text-right fw-bold mb-3 mb-md-0 card-title pt-3 align-middle "  >
        //                             {callPtp.uc}

        //                         </span>
        //                     </li>
        //                 </ul>
        //             </div>
        //         </div>
        //     </div>
        //     <Accordion className='card row mt-1 ml-1 bg-white text-dark mr-2 mb-3' position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>x`
        //         <AccordionSummary
        //             expandIcon={<ExpandMoreIcon />}
        //             aria-controls="panel3bh-content"
        //             id="panel3bh-header"
        //         >
        //             <Box sx={{ width: '90%', flexShrink: 0 }}>
        //                 Notification
        //             </Box>
        //         </AccordionSummary>
        //         <AccordionDetails>
        //             <div class="accordion accordion-flush" id="accordionFlushExample">
        //                 <div class="accordion-item rounded">
        //                     <h2 class="accordion-header" id="flush-headingOne">
        //                         <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        //                             Waiver Information
        //                         </button>
        //                     </h2>
        //                     <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
        //                         <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
        //                     </div>
        //                 </div>
        //                 <div class="accordion-item">
        //                     <h2 class="accordion-header" id="flush-headingTwo">
        //                         <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
        //                             Team Leader Message
        //                         </button>
        //                     </h2>
        //                     <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
        //                         <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
        //                     </div>
        //                 </div>

        //             </div>
        //         </AccordionDetails>
        //     </Accordion>
        //     <div className='card row mt-7 ml-1 bg-white text-dark mr-2 mb-3 fixed-bottom'>
        //         <Dialer />
        //     </div>
        // </div>
        <div className="container m-3" >
            <div className="row" style={{margin:"-8px", marginTop:"-13px"}}>
                <div className="col-md card mt-1 m-0">
                    <div className="row  m-0">
                        <ul class="nav nav-pills nav-fill flex-column text-center  flex-sm-row p-0">
                            <li class="nav-item me-sm-2 m-0 p-0">
                                <span class="text-left fw-bold  mb-3 mb-md-0 card-title pt-3 align-middle " style={{fontSize:"0.9rem",padding:"0px"}}>
                                    {callPtp.tc}
                                </span>
                            </li>
                            <li class="nav-item me-sm-2 m-0">
                                <span class="text-right fw-bold mb-3 mb-md-0 card-title pt-3 align-middle " style={{fontSize:"0.9rem",padding:"0px"}}  >
                                    {callPtp.uc}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row" style={{margin:"-8px"}}>
                <div className="col-md card mt-3 m-0">
                    <div className="row m-0 ">
                        <ul class="nav nav-pills nav-fill flex-column text-center  flex-sm-row">
                            <li class="nav-item me-sm-2 m-0">
                                <span class="text-left  fw-bold    mb-md-0 card-title pt-1 align-middle" style={{fontSize:"0.9rem"}}>
                                    {/* {callPtp.tc} */} Notification
                                </span>
                            </li>
                        </ul>
                        <ul class="nav nav-pills nav-fill flex-column text-center  flex-sm-row m-0">
                            <li class="nav-item me-sm-2 m-0">
                                <span class="text-left fw-bold card-title pt-3 align-middle" style={{fontSize:"0.9rem"}}>
                                    {/* {callPtp.tc} */}Team Lead
                                </span>
                            </li>
                        </ul>
                      
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md">
                    <div className="row ">
                        <Dialer />
                    </div>
                </div>
            </div>
        </div>
    );
}



