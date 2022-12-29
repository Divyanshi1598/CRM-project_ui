import { React, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { checkValidateJSON, getdetails, pageInfoJson } from '../../utils/function';
import CardDetails from './CardDetails';
import AgentAction from './AgentAction';
import socketIOClient from 'socket.io-client';
import DailerSidebar from '../Dialer/DailerSidebar';
import AgentScript from '../../components/CrmServices/AgentScript';
import DashboardAreaNav from '../../pages/dashboard/DashboardAreaNav';
import AgetDashboard from '../../pages/dashboard/AgetDashboard';
import CustomerSearchPage from './searchpage/CustomerSearchPage';
import DaynmicApicall from '../../utils/function';
import api from '../../utils/api';
import './Style.css';
import { setSaveandExit } from '../../redux/Dialer';

export default function CrmHomePage(props) {
    // const endpoint = 'http://127.0.0.1:4001'
    // const endpoint = 'http://216.48.177.28:3003'
    const endpoint = 'https://wpsocket.a10s.in/'
    const socket = socketIOClient(endpoint, { path: "/socket.io" });
    let { userInfo } = useSelector((state) => state?.user?.value);
    const [customerDetail, setCustomerDetail] = useState('');
    const [customerSearch, setCustomerSearch] = useState("");
    const [connectedCamp, setConnectedCamp] = useState('');
    const [pageData, setpageData] = useState([]);
  
    const [dialerdata, setDialerdata] = useState('');
    const [getqueue, setQueue] = useState([]);
    const dispatch = useDispatch()
    const heandelDialerCustomer = (customer) => setCustomerSearch(customer);
    const heandelDialerdata = (dialer) => setDialerdata(dialer)

    const f_getConnectedCamp = async (campid, userid) => {
        const camp = await api.get(`appuser/getcampbycampid/${campid}/${userid}`, {
            headers: {
                Authorization: userInfo.data[0].UserToken
            }
        })
        return camp.data.data
    }

    async function getCustomer(custid) {
        if (custid) {
            const customer = await api.get(`mcrmdlr/getcustomer/${custid}`, {
                headers: {
                    Authorization: userInfo.data[0].UserToken
                }
            })
            dispatch(setSaveandExit({
                contact_no: customer.data.data[0].mobile_no,
            }))
            await setCustomerDetail(customer.data.data[0])
            return customer.data.data[0]
        }
    }

    async function dialerscrmlog(data) {
        if (data.call_status === 'ringing') {
            await api.post("/mcrmdlr/managedialercrminput/", data,
                {
                    headers: {
                        Authorization: userInfo.data[0].UserToken
                    }
                }).then(async (res) => { });
        }
    }

    async function getDialerServer() {
        let dlrserver = await f_getConnectedCamp("ALL", userInfo.data[0].userid)
        let allqueue
        allqueue = dlrserver?.map((data) => {
            return {
                queue_name: data.campname,                 // queue 
                queue_number: data.queue_name
            }
        })
        let agentSIPConfig = {
            "wp_config": {
                "auto_answer": "true",
                "queue_login_code": "*40",
                "queue_logout_code": "*41"
            },
            "wp_sip_config": {
                "sip_username": userInfo.data[0]?.dlrAgentId,                     // 
                // "sip_password": "ATS@123$",
                // "sip_server": "wpdlr.a10s.in",              // dialer serverip address  campid   
                "wss_server": dlrserver[0]?.wss_server_path,             // dialer server websocket address/port
                "sip_password": userInfo.data[0]?.sippassword,
                "sip_server": dlrserver[0]?.dlr_server_ip,
            },
            "wp_queue_list": allqueue,
            "agent_token": userInfo.data[0]?.dlrAgentId
            // "agent_token": userInfo.data[0].UserToken.split(" ")[1]
        }
        socket.emit('crmdialerdata', agentSIPConfig)
    }

    // for --demo testing 
    // sip server: demo.onlinevoipcalls.com
    // wss server: wss://demo.onlinevoipcalls.com:8089/ws
    // sip username: 101
    // sip password: 101@demo

    useEffect(() => {
        (async () => {
            await socketConnection();
        })()
    }, [])



    async function socketConnection() {
        socket.on('welcome', data => {
            // console.log("Socket data", data)
            socket.on('respfromdialer', async (data) => {
                switch (data.action) {
                    case "get_agent_config":
                        getDialerServer()
                        break;
                    case "call_state":
                        socket.on('respfromdialer', async (data) => {
                            let checkvalidjson =  await checkValidateJSON(data?.event_data?.crm_data)
                            console.log("checkvalidjson", checkvalidjson)
                            if (data?.event_data?.crm_data && data?.event_data?.call_status === "ringing") {
                               data.event_data.crm_data = JSON.parse(data?.event_data?.crm_data)
                                // data.event_data.crm_data = JSON.parse(data?.event_data?.crm_data)
                                await crmhomepageprerequisite(data)
                            }
                        })
                        break;
                    default:
                    // cccccccc
                }
                // if (data.action === "get_agent_config") {
                //     socket.emit('crmdialerdata', agentSIPConfig)
                // }
            })
            socket.on('respfromdialer', async (data) => {
                console.log("data", data)
                await crmhomepageprerequisite(data)
            })
        })
        if (customerSearch) {
            await crmhomepageprerequisite(customerSearch)
        }
    }

    async function gettlno(logdata) {
        await DaynmicApicall(`appuser/getprocesstlid/${logdata.campid}`, '', 'get', userInfo.data[0].UserToken).then((data) => {
            let val = {
                cust_id: logdata?.custid?.slice(3),
                contact_by: userInfo.data[0]?.userid,
                dialer_connected_ph: logdata?.phone,
                tlno: data?.tlid,
                tl: data.tlname,
                call_mode: logdata?.callmode,
                dialer_session_id: logdata?.sessionid,
            }
            Object.entries(val).map((data) => {
                let aa = `{"${data[0]}": "${data[1]}"}`
                dispatch(setSaveandExit(JSON.parse(aa)))
            })
        })
    }
    async function crmhomepageprerequisite(data) {
        // if ((data.call_stop - data.call_start) < 1000 * 10) {
        //     await autoRNR()
        // }
        let getcamp
        let dialerresp = data.event_data.crm_data
        if (data.event_data.agent_token == userInfo.data[0]?.dlrAgentId && dialerresp.custid && dialerresp.phone) {
            console.log("call_state",data)
            let logdata = {
                custid: dialerresp.custid,
                campid: dialerresp.custid?.length > 0 ? dialerresp.custid?.slice(0, 3) : "",
                agentid: dialerresp.agentid,
                phone: dialerresp.phone,
                dialerrespose: data.event_data.call_direction,
                clientid: dialerresp.clientid,
                callmode: dialerresp.callmode,
                // callmode: data.call_direction,
                sessionid: data.event_data.call_session_id,
                notifyurl: window.location.origin + window.location.pathname,
                call_status: data.event_data.call_status,
                call_start: data.event_data.call_start,
                call_stop: data.event_data.call_stop,
                event_data: data.event_data,
                active: "Y",
                action_name: "INSERT",
            }
            let answercall = {
                agent_token: userInfo.data[0]?.dlrAgentId,
                action: "answer_call",
                event_data: {
                    call_session_id: logdata.sessionid // Call Session ID which needs to be answered
                }
            }
            socket.emit('crmdialerdata', answercall)
            dialerscrmlog(logdata)
            setDialerdata(data)
            await getCustomer(logdata.custid);
            if (logdata.campid) {
                getcamp = await f_getConnectedCamp(logdata.campid, userInfo.data[0].userid);
            }
            logdata.userid = userInfo.data[0]?.userid
            await gettlno(logdata)
            await getdetails(logdata)
            await setConnectedCamp(logdata.campid ? getcamp[0] : "");
            await pageInfoJson(getcamp[0].keypointer, 33, userInfo.data[0].UserToken).then((data) => {
                setpageData(data)
            })
        }
    }

    async function autoRNR() {
        console.log("Auto RNR")
    }
    if (!pageData) {
        return <div>Loadding...</div>;
    }
    let parentTOChields = { custinfo: customerDetail, campinfo: connectedCamp }
    return (
        <>
            {
                Object.keys(pageData) && (
                    <div className="container-fulid">
                        <>
                            <div className="row bg-dark mt-1 font-weight-bold rounded" style={{ color: "white" }}>
                                {/* Header Section */}
                                <span className="text-left mt-3 col-3" id={`${connectedCamp ? 'header' : ''}`}>{connectedCamp ? connectedCamp?.campname : "Agent Dashboard"}</span>
                                <span className="text-center mt-3 col-4  " >Welcome {userInfo.data[0].userid}</span>
                                <span className="text-right mt-3 col-4">{(new Date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                <div className='col-1'>
                                <DashboardAreaNav Value={""} />
                                </div>
                            </div>
                            <div className='row'>
                                {
                                    dialerdata ? dialerdata && (
                                        connectedCamp ? connectedCamp && (
                                            <div className='col-9'>
                                                <div className="row">
                                                    {/* Agent Script */}
                                                    <AgentScript data={parentTOChields} />
                                                    <CardDetails data={parentTOChields} aftersave={heandelDialerdata} />
                                                    {/* Agent Action button */}
                                                    <AgentAction data={parentTOChields} />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className='col-9'>
                                                <CustomerSearchPage
                                                    searchTOCrm={heandelDialerCustomer}
                                                    dialerdata={dialerdata}
                                                />
                                            </div>
                                        )
                                    ) : (
                                        <div className="col-9">
                                            <AgetDashboard
                                            />
                                        </div>
                                    )
                                }
                                <div className='col-3'>
                                    <DailerSidebar />
                                </div>
                            </div>
                            {/*</div> */}
                        </>
                    </div>
                )
            }
        </>
    );
}






