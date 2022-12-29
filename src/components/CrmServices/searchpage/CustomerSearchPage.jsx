import { Form, Formik } from 'formik'
import React from 'react'
import { TextField } from '../../formValidation/TextField'
import { DataGrid } from "@mui/x-data-grid";
import DaynmicApicall from '../../../utils/function';
import { useState } from 'react';
import {  useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


export default function CustomerSearchPage(props) {
    const { userInfo } = useSelector((state) => state?.user?.value);
    const [tableData, setTableData] = useState("")

    const handleChildToProp = (event, cellValues) => {
        let searchdata = props.dialerdata
        searchdata.custid = cellValues.row.cuid
        props.searchTOCrm(searchdata);
    };

    const columns = [
        { field: "cuid", headerName: "Customer Id", width: 100 },
        { field: "policy_no", headerName: "Policy No", width: 200 },
        { field: "productname", headerName: "Product Name", width: 200 },
        { field: "policy_owner", headerName: "Customer Name", width: 200 },
        { field: "email_id", headerName: "Email", width: 200 },
        { field: "contact_no", headerName: "Phone Number", width: 180 },
        { field: "agent_broker_name", headerName: "Agent Name", width: 150 },
        {
            field: "Action",
            width: 200,
            renderCell: (cellValues) => {
                return (
                    <Link
                        to="/dashboard"
                        variant="contained"
                        color="info"
                        onClick={async (event) => {handleChildToProp(event, cellValues)}}
                    >
                        Go To Home Page
                    </Link>
                );
            }
        },
    ];



    const initial = {
        cuid: "",
        campid: "",
        dob: "",
        policyno: "",
    }

    const onSubmit = async (values, { resetForm }) => {
        console.log("Values", values);
        await DaynmicApicall(`mcrmdlr/getcustomer/${values.cuid}`, '', 'get', userInfo.data[0].UserToken).then((res) => {
            setTableData(res);
            //   console.log("res",res);
        })
    }
    const sendData = async (values) => {
        // let values.cuid = custid;
        await DaynmicApicall(`mcrmdlr/getuatdialerdata/`, '', 'get', userInfo.data[0].UserToken).then((res) => {
            // setTableData(res);
            console.log("res", res[1]);
        })
    }

    // "custid": "111V0000001",
    // "campid": "111",
    // "agentid": "Divyanshi",
    // "phone": "9871558121",
    // "dialerrespose": "ANSWER",
    // "clientid": "L001",
    // "callmode": "OUTGOING",
    // "sessionid": "S093400001"

    return (
        <div>
            <div className='card card-body'>
                <Formik
                    initialValues={initial}
                    //  validationSchema={validate}
                    onSubmit={onSubmit}
                >
                    {(formik) => (

                        <Form>
                            <div className="row mt-2">
                                <TextField
                                    label="Customer id"
                                    placeholder="Coustomer id"
                                    type="text"
                                    tooltip="customer"
                                    name="cuid"
                                />
                                <TextField
                                    label="Phone Number"
                                    placeholder="Enter Phone No"
                                    type="text"
                                    name="campid"
                                />
                                <TextField
                                    label="Date of Birth"
                                    placeholder="Enter Date of birth"
                                    type="date"
                                    name="dob"
                                />
                                <TextField
                                    label="Policy Number"
                                    placeholder="Enter Policy Number"
                                    type="text"
                                    name="policyno"
                                />
                                <TextField
                                    label="Agent Id"
                                    placeholder="Enter Agent Id"
                                    type="text"
                                    name="agentid"
                                />
                                <div className='justify-content-end'>
                                    <button
                                        type="submit"
                                        className="btn btn-primary p-2 m-2"

                                    >Submit</button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>

            <div className=' card mt-3'>
                <div className="card card-body border-light shadow">
                    <div className="table-settings mb-4">
                        <div className="my-2">
                            <DataGrid
                                getRowId={(r) => r.cuid}
                                rows={tableData}
                                columns={columns}
                                autoHeight={true}
                                className="bg-white"
                            />
                            <div className="d-flex justify-content-end">
                                <button type="submit" className="btn btn-primary btn-sm m-2"
                                    onClick={sendData}
                                >
                                    Send
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
