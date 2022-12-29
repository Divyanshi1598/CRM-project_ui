import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import socketIOClient from 'socket.io-client';
// const endpoint = 'http://216.48.177.28:3003'
// const endpoint = 'http://127.0.0.1:4001'
const endpoint = 'https://wpsocket.a10s.in/'

export default function SendWebphoneDataTOCRM() {
    let { userInfo } = useSelector((state) => state?.user?.value);
    let { crmsaveandexit } = useSelector((state) => state?.dialer);

    const socket = socketIOClient(endpoint, { path: "/socket.io" });
    const [crmdata, setCrmdata] = useState("")
    useEffect(() => {
        console.log("SOCKET", socket)
        socket.on('welcome', data => {
            console.log("Socket data", data)
            // this.setState({ response: data.message })
        });

        socket.on("crmdialerdata", (data1) => {
            if (data1.action === 'call_attx_transfer') {
                setCrmdata(data1)

            }
        })
    }, [])
    async function senddatatosocketserver(dialerres) {
        socket.emit("respfromdialer", dialerres)

    }

    async function transferCall() {
        socket.emit("respfromdialer",
            {
                action: "get_call_transfer",
                agent_token: userInfo.data[0].UserToken.split(" ")[1],
                call_session_id: crmsaveandexit?.dialer_session_id
            });
    }
    async function fromClient(e) {
        console.log("EEEEE", e)
    }
    // const pageData = {
    //     "custid":{
    //         "className":"form-control form-control-sm  m-2 rounded",
    //         "placeholder":"Customer Id",
    //         "type":"text",
    //         "name":"custid",
    //         "autoComplete":"off"
    //     },
    //     "agentId":{
    //         "className":"form-control form-control-sm  m-2 rounded",
    //         "placeholder":"Agent Id",
    //         "type":"text",
    //         "name":"agentid",
    //         "autoComplete":"off"
    //     },
    //     "phone":{
    //         "className":"form-control form-control-sm  m-2 rounded",
    //         "placeholder":"Phone",
    //         "type":"text",
    //         "name":"phone",
    //         "autoComplete":"off"
    //     },
    //     "dialerResp":{
    //         "className":"form-control form-control-sm  m-2 rounded ",
    //         "placeholder":"Dialer Response",
    //         "type":"text",
    //         "name":"dialerrespose",
    //         "autoComplete":"off"
    //     },
    //     "clientId":{
    //         "className":"form-control form-control-sm  m-2 rounded ",
    //         "placeholder":"Client Id",
    //         "type":"text",
    //         "name":"clientid",
    //         "autoComplete":"off"
    //     },
    //     "callMode":{
    //         "className":"form-control form-control-sm  m-2 rounded ",
    //         "placeholder":"Call MODE",
    //         "type":"text",
    //         "name":"callmode",
    //         "autoComplete":"off"
    //     },
    //     "submitbtn":{
    //         "label":"Submit",
    //         "type":"submit",
    //         "className":"btn btn-primary btn-sm m-2",
    //     }
    // }

    return (
        <div>
            <h1 className='text-success text-center'>WEB PHONE</h1>
            {/* <h1>{crmdata.message}: {crmdata?.dialerdata?.agentid}</h1> */}
            <div className='justify-content-center'>
                <form className="card card-body border-light shadow " onSubmit={(e) => {
                    e.preventDefault();
                    let formData = new FormData(e.target);
                    formData = Object.fromEntries(formData.entries());
                    formData.sessionid = Date.now().toString(36).toUpperCase()
                    senddatatosocketserver(formData)
                }}>
                    <div className="card">
                        <div className="card-header">
                            <h4>{crmdata.action}</h4>
                            <h4>{crmdata.call_session_id}</h4>
                        </div>
                    </div>
                    <div className="row mt-3 text-left">
                        <div className="col-md-3 mb-2">
                            <div className="form-control-sm">
                                <input
                                    className="form-control form-control-sm  m-2 rounded"
                                    placeholder="Customer Id"
                                    type="text"
                                    name="custid"
                                    autoComplete="off"
                                />
                                <input
                                    className="form-control form-control-sm  m-2 rounded"
                                    placeholder="Agent Id"
                                    type="text"
                                    name="agentid"
                                    autoComplete="off"
                                />
                                <input
                                    className="form-control form-control-sm  m-2 rounded"
                                    placeholder="Phone"
                                    type="text"
                                    name="phone"
                                    autoComplete="off"
                                />
                                <input
                                    className="form-control form-control-sm  m-2 rounded "
                                    placeholder="Dialer Response"
                                    type="text"
                                    name="dialerrespose"
                                    autoComplete="off"
                                />
                                <input
                                    className="form-control form-control-sm  m-2 rounded "
                                    placeholder="Client Id"
                                    type="text"
                                    name="clientid"
                                    autoComplete="off"
                                />
                                <input
                                    className="form-control form-control-sm  m-2 rounded "
                                    placeholder="Call MODE"
                                    type="text"
                                    name="callmode"
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                        <div className="d-flex">
                            <button
                                type="submit"
                                className="btn btn-primary btn-sm m-2"
                            >
                                Submit
                            </button>
                            <button
                                className="btn btn-primary btn-sm m-2"
                                onClick={transferCall}
                            >
                                call transfer
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}