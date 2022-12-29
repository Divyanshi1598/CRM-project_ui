import { Form, Formik } from 'formik';
import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { MultiSelect } from '../../components/formValidation/MultiSelect';
import { useSelector } from 'react-redux';
import DaynmicApicall from '../../utils/function';
import toast from 'react-hot-toast';

export default function ManageServerConfig(props) {
    const { userInfo } = useSelector((state) => state?.user?.value);
    const [getDialerserver, setDialerServer] = useState([]);
    const [getSocketServer, setSocketServer] = useState([]);
    console.log("ManageServerConfig", props)
    // prm/getParamdata/ALL/DIALER-SERVER-URL




    async function getserverconfig() {
        await DaynmicApicall(`prm/getParamdata/ALL/DIALER-SERVER-URL`, '', 'get', userInfo.data[0].UserToken).then(async (data) => {
            console.log("getserverconfig", data)
            let bData = [];
            bData = await data.map((item) => {
                return {
                    value: item.paravalue,
                    label: item.paracode,
                };
            });
            setDialerServer(bData)
        })
    };
    async function getSocketServerConfig() {
        await DaynmicApicall(`prm/getParamdata/ALL/WSS-SERVER-URL`, '', 'get', userInfo.data[0].UserToken).then(async (data) => {
            console.log("getserverconfig", data)
            let bData = [];
            bData = await data.map((item) => {
                return {
                    value: item.paravalue,
                    label: item.paracode,
                };
            });
            setSocketServer(bData)
        })
    };


    useEffect(() => {
        (async () => {
            await getserverconfig();
            await getSocketServerConfig()
        })()
    }, [])

    let initial = {
        camp_id: props.rowdata.campid,
        dlr_server_ip: "",
        wss_server_path: "",
    }

    const onSubmit = async (values) => {
        console.log("VALUES", values)
        values.dlr_server_ip = values.dlr_server_ip.value
        values.wss_server_path = values.wss_server_path.value
        // /appuser/manageserveroncrm/

        let Info = await DaynmicApicall(
            `/appuser/manageserveroncrm/`,
            values,
            "post",
            userInfo.data[0].UserToken
        );
        toast.success(Info.message);


    }
    return (
        <>
            <div class="modal fade" id="cardtoggel1" tabindex="-1" role="dialog" aria-labelledby="modalTitleNotify" aria-hidden="true" >
                <div class="modal-dialog modal-dialog-centered ml-1" role="document">
                    <div class="modal-content " style={{ marginTop: "250px" }}>
                        <div class="modal-header">
                            <Formik initialValues={initial} onSubmit={onSubmit}>
                                {(formik) => (
                                    <div
                                        className="card card-body border-light shadow mb-4"
                                    >
                                        <h6 className="text-light card-header  rounded bg-dark">
                                            Manage Server Configraction
                                        </h6>
                                        <Form>
                                            <div className="row mt-3 m-1 p-1">
                                                <MultiSelect
                                                    label="Dialer Server"
                                                    name="dlr_server_ip"
                                                    placeholder="Select Queue"
                                                    isMulti={false}
                                                    options={getDialerserver}
                                                    formik={formik}
                                                    value={formik.values.dlr_server_ip}
                                                    onChange={async (value) => {
                                                        formik.setFieldValue("dlr_server_ip", value);
                                                    }}
                                                />
                                                <MultiSelect
                                                    label="Queue"
                                                    name="wss_server_path"
                                                    placeholder="Select Queue"
                                                    isMulti={false}
                                                    options={getSocketServer}
                                                    formik={formik}
                                                    value={formik.values.wss_server_path}
                                                    onChange={async (value) => {
                                                        formik.setFieldValue("wss_server_path", value);
                                                    }}
                                                />

                                            </div>
                                            <div className="d-flex justify-content-end mt-1">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-sm m-2"
                                                // style={pageData.fieldsData.button.style}
                                                >
                                                    Submit
                                                </button>
                                                <Link
                                                    to="/dashboard"
                                                    className="btn btn-primary btn-sm m-2"
                                                // style={pageData.fieldsData.cancelButton.style}
                                                // onClick={(e) => {
                                                //     dispatch(setParems({ data: "" }));
                                                // }}
                                                >
                                                    Cancle
                                                </Link>
                                            </div>
                                        </Form>
                                    </div>
                                )}
                            </Formik>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
