import React from 'react';
// import PromisPaymentUpdate from './PromisPaymentUpdate';
import TabModel from './Multimedia/TabModel';
// import PaymentDetails from './PaymentDetails';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../utils/api';
import { useEffect } from 'react';
import Select from 'react-select';
// import CustomerInfoUpdate from './CustomerInfoUpdate';
import UpdateInformation from './UpdateInformation';
import DaynmicApicall from '../../utils/function';

const AgentAction = (props) => {
    const { userInfo } = useSelector((state) => state?.user?.value);
    const [pageData, setpageData] = useState("");
    //   async function pageInfo() {
    //     await DaynmicApicall(`/appuser/getcomponetbyid/${props.data.campinfo.keypointer}/35`, '', 'get', userInfo.data[0].UserToken).then((data) => {
    //     console.log("agent pagedatadada agent",data.data[0].DATA);
    //       setpageData(data.data.data[0].DATA)
    //     })
    //   }
    async function pageInfo(keypointer) {
        api.get(`appuser/getcomponetbyid/${props?.data?.campinfo?.keypointer}/35`,
            {
                headers: {
                    Authorization: userInfo.data[0].UserToken
                }
            }).then(async (data) => {
                await setpageData(data.data.data[0].DATA)
            });
    }
    useEffect(async () => {
        await pageInfo();
    }, []);

    const options = [
        {
            value: "Happy Calculator",
            label: "calculator"
        },
        {
            value: "Branch Locator ",
            label: "locator"
        },
        {
            value: "Products One Pager",
            label: "products"
        },

    ]

    return (
        <>
            {
                Object.keys(pageData).length > 0 ? (
                    <div className="mt-2 card d-inline ml-1">
                        {/* <button type="button" class="btn btn-primary-sm mb-3" 
                     title={pageData.button1} data-toggle="tooltip"  data-bs-toggle="modal" data-bs-target="#paymentDetails" >{pageData.button1}</button>
                    <button type="button" class="btn btn-primary-sm mb-3" data-bs-toggle="modal" data-bs-target="#modalPayment"  title="Promise Payment Update" data-toggle="tooltip">Promise Payment Update</button>*/}
                        <button
                            type="button"
                            class="btn btn-primary-sm mb-3"
                            data-bs-toggle="modal"
                            data-bs-target="#modalMultimedia"
                            title={pageData.button3}
                            data-toggle="tooltip">
                            {pageData.button3}
                        </button>
                        <button type="button"
                            class="btn btn-primary-sm mb-3"
                            data-bs-toggle="modal"
                            data-bs-target="#modalUpdate"
                            title="Customer Information"
                            data-toggle="tooltip"
                        >
                            Customer Information
                        </button>
                        <button type="button" class="btn btn-primary-sm mb-3" data-bs-toggle="modal" data-bs-target="#Pdf script" title="Tool" data-toggle="tooltip">
                            <div>
                                <div class="dropdown">
                                    <button
                                        class="btn dropdown-toggle"
                                        type="button"
                                        id="dropdownMenuButton"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        Tools
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {/*enter the url you want inside href atribute*/}
                                        <a class="dropdown-item" href="http://172.16.1.161/script/script.aspx"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Products One Pager
                                        </a>
                                        <a
                                            class="dropdown-item"
                                            href="https://www.adityabirlacapital.com/healthinsurance/our-branches"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Branch Locator
                                        </a>
                                        <a class="dropdown-item" href="https://happy.adityabirlacapital.com/abhiqq"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Happy Calculator
                                        </a>
                                        <a class="dropdown-item" href="https://www.adityabirlacapital.com/healthinsurance/faqs"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            FAQs
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </button>
                        <div class="modal fade"
                            id="modalUpdate"
                            tabindex="-1"
                            role="dialog"
                            aria-labelledby="modalTitleNotify"
                            aria-hidden="false"
                        >
                            <div class="modal-dialog modal-dialog-centered ml-1" role="document">
                                <div class="modal-content " style={{ marginTop: "250px" }}>
                                    <div class="modal-header">
                                        <p class="modal-title" id="modalTitleNotify">
                                            Update Customer Information
                                        </p>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body" style={{ padding: " 0.6rem" }}>
                                        <UpdateInformation userInfo={props} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal fade" id="modalMultimedia" tabindex="-1" role="dialog" aria-labelledby="modalTitleNotify" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered ml-1" role="document">
                                <div class="modal-content" style={{ marginTop: "250px" }}>
                                    <div class="modal-header">
                                        <p class="modal-title" id="modalTitleNotify">{pageData.Multimedia.header}</p>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <TabModel />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : ""}
        </>
    )
}
export default AgentAction;