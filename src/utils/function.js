import toast from "react-hot-toast";
import api from "./api";

const userInfo = localStorage.support_use ? JSON.parse(localStorage?.getItem("support_user"))?.userInfo.data[0] : ""
const validate = { headers: { Authorization: userInfo?.UserToken } }
const logdetails = {}
export async function getdetails(data) {
    logdetails.userid = data?.userid
    logdetails.custid = data?.custid
    logdetails.campid = data?.campid
    logdetails.sessionid = data?.sessionid
    logdetails.createdby = data?.userid
}

export default async function DaynmicApicall(url, parameter, method, UserToken) {
    try {
        let apiresponse
        const header = { headers: { Authorization: UserToken } }
        const validateHeader = userInfo?.UserToken ? userInfo?.UserToken : header;
        switch (method) {
            case 'get':
                apiresponse = await api[method](url, validateHeader)
                return apiresponse.data.data;
            case 'post':
                apiresponse = await api[method](url, parameter, validateHeader)
                return apiresponse.data;
        }
    } catch (error) {
        console.log("error ", error.message)
        toast.error(
            error.message ??
            error?.response.data.message ??
            "OOPs, something went wrong."
        );
    }
}

export async function ManageEventLog(data) {
    logdetails.eventname = data?.eventname
    logdetails.actionname = data?.actionname
    logdetails.actioncate = data?.actioncate ? data?.actioncate : "NA"
    logdetails.action_name = "INSERT"
    if (logdetails) {
        api.post(`err/manageactionlog`, logdetails, validate)
            .then(async (result) => { console.log("ManageEventLog", result.message) })
            .catch((error) => {
                toast.error(
                    error.response.data.message ??
                    error.message ??
                    "OOPs, something went wrong."
                );
            });
    } else {
        console.log("massage: Enter a valid Infomation");
    }
}

export async function pageInfoJson(keypointer, component_id, token) {
    const response = await DaynmicApicall(`/appuser/getcomponetbyid/${keypointer}/${component_id}`, '', 'get', token)
    return response[0]
}


export async function checkValidateJSON(text) {
    if (typeof text !== "string") {
        return false;
    }
    try {
        JSON.parse(text);
        return true;
    } catch (error) {
        return false;
    }
}




