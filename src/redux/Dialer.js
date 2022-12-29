import { createSlice } from "@reduxjs/toolkit";
const userInfo = JSON.parse(localStorage.getItem("support_user"))?.userInfo.data[0]
const dialerinfo = localStorage.dialerinfo ? JSON.parse(localStorage?.dialerinfo) : ""
const initialValue = {
    dialerInfo: { dialerinfo: '' },
    crmsaveandexit: {
        "cust_id": "",
        "contact_by":" ",
        "resp_code": "",
        "sub_resp_code": "",
        "sub_code2": "NA",                 // desporsition descriptition  code 
        "dialer_connected_ph": "",
        "revertto_date": "",               // revert call date from fronend 
        "revertto_time": null,             // revert call date from fronend 
        "remarks": "",                     // remarks careat text box default NA
        "prod_id": null,                   // policy no is product id ==> customerinfo.productid
        "amount": 0,                       // disporsation base component amount
        "payment_option": "NA",            // disporsation base component payment opation
        "contact_no": "",
        "fe_status": "NA",
        "followup_date": null,             // revert date is a followup date
        "alt_phone": "NA",                 // customer info update 
        "rpc": "NA",                       // resp_lavel from t_response master or vw_get_script
        "email": "NA",                     // from multimedia
        "date1": null,                     //  null
        "tlno":"",           // aget
        "tl": " ",
        "call_mode": " ",
        "my_best_call": "NA",
        "pay_trans_refid": 0,
        "multi_media_refid": 0,
        "dialer_session_id": " ",
        "action_name": "INSERT",
        "ndncdata": "0"
    }
}
export const dialerSlice = createSlice({
    name: "dialer",
    initialState: initialValue,


    reducers: {
        setdialerInfo: (state, action) => {
            state.dialerInfo = action.payload.data;
        },
        setSaveandExit: (state, action) => {
            state.crmsaveandexit[Object.entries(action.payload)[0][0]] = Object.entries(action.payload)[0][1];
        }
    }
})

export const { setdialerInfo, setSaveandExit } = dialerSlice.actions;
export default dialerSlice.reducer;