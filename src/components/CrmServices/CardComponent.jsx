import React from 'react';
import PaymentDetails from './PaymentDetails'


const CardComponent = () => {
    return (
        <div>
            <div class="modal fade" size="lg" id="modalNotification" tabindex="-1" role="dialog" aria-labelledby="contained-modal-title-vcenter" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog modal-xl ml-1" role="document">
                    <div class="modal-content sticky mt-10"  >
                        {/* header Section */}
                        <div class="modal-header">
                            <div className="container-fluid " >
                                <div className="row" >
                                    <div className="card col-xl-12" style={{ backgroundColor: " rgb(38, 43, 64)" }}>
                                        <div className="row  font-weight-bold">
                                            <div className="text-center" style={{ color: "white", fontSize: "22px" }}> HISTORY</div>
                                        </div>
                                    </div>
                                </div></div>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        {/* body Section */}
                        <div class="modal-body">
                            {/* <PaymentDetails /> */}
                            {/* <TableDetail /> */}


                        </div>
                        {/* footer Section */}
                        <div class="modal-footer">
                            <div className="container-fluid " >
                                <div className="row">
                                    <div className="card col-xl-12" style={{ backgroundColor: " rgb(38, 43, 64)" }}>
                                        <div className="row font-weight-bold">
                                            © 2022 Ats Services Pvt Ltd | All rights reserved
                                        </div>
                                    </div>
                                </div></div>
                        </div>

                    </div>
                </div>
            </div>


        </div>
    )
}

export default CardComponent