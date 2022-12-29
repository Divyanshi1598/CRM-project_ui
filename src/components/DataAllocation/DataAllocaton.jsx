import React from 'react';
import { Formik } from "formik";
import { TextField } from '../formValidation/TextField';
import Form from 'react-bootstrap/Form';
import { DataGrid } from '@mui/x-data-grid';
import { MultiSelect } from '../formValidation/MultiSelect';
import DAllocation from './DAllocation';


const DataAllocation = () => {


    const Url = ""
    const rows = []
    const columns = [
        { field: "S_no", headerName: "RO Name", width: 80 },
        { field: "policy_number", headerName: "Allocated To", width: 220 },
        { field: "payment_date", headerName: "Survey", width: 220 },
        { field: "status", headerName: "Data Category", width: 220 },
        { field: "user_name", headerName: "Data Source", width: 220 },
        { field: "allocated", headerName: "Already Allocated", width: 220 },
        { field: "not_allocated", headerName: "Not Allocated", width: 220 }
    ];
    const Disportion = [

        { value: "PA", label: "Premium Amount" },
        { value: "custid", label: "Customer Id" },
        { value: "cn", label: "Customer Name" },
        
    ]
    return (
        <div>
          
            <div className='card'>
          
                <div>
                    {
                        Object.length > 0 ? (
                            <Formik
                           
                            >
                                {
                                    formik => (
                                        <div className="card card-body">
                                        <span className='display-5'>Data Allocaion</span>
                                        <hr></hr>
                                            <Form>
                                                <div className="row">
                                                <MultiSelect
                                                label="Agent Action:"
                                                placeholder="Select Despotion"
                                                type="text"
                                                name="Resion"
                                                isMulti={false}
                                                options={Disportion}
                                            />
                                            <MultiSelect
                                                label="Agent Action:"
                                                placeholder="Select Despotion"
                                                type="text"
                                                name="Resion"
                                                isMulti={false}
                                                options={Disportion}
                                            />
                                                    <TextField
                                                        label="Customer Id"
                                                        placeholder="Customer id"
                                                        type="text"
                                                        name="Resion"
                                                        options="name"
                                                    />
                                                    <div className=" justify-content-end">
                                                    <button type="submit" className="btn btn-primary btn-sm m-2">
                                                        Search
                                                    </button></div>
                                                    <MultiSelect
                                                    label="Agent Action:"
                                                    placeholder="Select Despotion"
                                                    type="text"
                                                    name="Resion"
                                                    isMulti={false}
                                                    options={Disportion}
                                                />
                                                <div className=" justify-content-end">           
                                                <button type="button" className="btn btn-primary btn-sm m-2" data-bs-toggle="modal" data-bs-target="#paymentDetails1">
                                                    Data Allocation
                                                </button>
                                                <button type="button" className="btn btn-primary btn-sm m-2" data-bs-toggle="modal" data-bs-target="#paymentDetails">
                                                    De-Allocation
                                                </button>
                                               <DAllocation/>
                                            </div>
                                                    <div>    
                                                    </div>
                                                </div>
                                            </Form>
                                        </div>
                                    )
                                }
                           </Formik>) : ""
                    }
                </div>
                <div className=' card mt-3'>
                    <div className="card card-body border-light shadow">
                        <a href={Url} style={{ color: "blue", fontSize: "15px" }}>Download Data</a>
                        <div className="table-settings mb-4">
                            <div className="my-2">
                                <DataGrid
                                    getRowId={(r) => r.STATUS}
                                    rows={rows}
                                    columns={columns}
                                    autoHeight={true}
                                    className="bg-white"
                                />
                                <div className="d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary btn-sm m-2">
                                        Save
                                    </button>
                                    <button type="submit" className="btn btn-primary btn-sm m-2">
                                        cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DataAllocation;