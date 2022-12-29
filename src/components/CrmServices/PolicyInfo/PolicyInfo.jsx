
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { object } from 'yup';
import DaynmicApicall from '../../../utils/function';
import { Card, Col, Container, Row } from "react-bootstrap";


const PolicyInfo = (props) => {
    const { userInfo } = useSelector((state) => state?.user?.value);
    const [tableData, setTableData] = useState("");
    async function policyInformation(cuid) {
        await DaynmicApicall(`mcrmdlr/getpolicyinformation/${props.userInfo.userInfo.data.custinfo.cuid}`, '', 'get', userInfo.data[0].UserToken).then((data) => {
            setTableData(data[0]);
        })
    }

    useEffect(async () => {
        await policyInformation();
    }, []);

    return (
        <div className='row'>
            <div>
                <div className="col-10">
                    <div className='card-responsive'>
                        <div class="row"  >
                        <Row className="ml-2" xs={6} xl={3} >
                            {
                                Object.entries(tableData).map((data , i) => (
                                    <Col className="p-1 m-0" index={i}>
                                    <ul class="list-group">
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            {data[0].replaceAll("_"," ").charAt(0).toUpperCase() + data[0].replaceAll("_"," ").slice(1)}:
                                            <span class="badge text-dark">{data[1]}</span>
                                        </li>
                                    </ul>
                                    </Col>
                                ))
                            }
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PolicyInfo
