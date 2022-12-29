import React from "react";
import { Formik, Form } from "formik";
import { TextField } from "../TextField";
import { useState, useEffect } from "react";
import api from "../../../utils/api";
import { MultiSelect } from "../MultiSelect";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setSaveandExit } from "../../../redux/Dialer";
import DaynmicApicall from "../../../utils/function";


const DespositionCompo = (props) => {
  const { userInfo } = useSelector((state) => state?.user?.value);
  let { crmsaveandexit } = useSelector((state) => state?.dialer);
console.log("propssdf0",props);
  const dispatch = useDispatch()
  const [paymentMode, setPaymentMode] = useState("");
    async function getPaymentMode() {
    api
      .get(`prm/getParamdata/ALL/paymentmode`, {
        headers: {
          Authorization: userInfo.data[0].UserToken, //the token is a variable which holds the token
        },
      })
      .then(async (res) => {
        let bData = [];
        bData = await res.data.data.map((item) => {
          return {
            value: item.paracode,
            label: item.paravalue,
          };
        });
        setPaymentMode(bData);
      })
      .catch((error) => {
        toast.error(
          error.response.data.message ??
          error.message ??
          "OOPs, something went wrong."
        );
      });
  }
   async function pageInfo(keypointer) {
    await DaynmicApicall(`appuser/getcomponetbyid/bc0asd101oo/45`, '', 'get',userInfo.data[0].UserToken).then((res) => {
        })
  }
  useEffect(async () => {
    await getPaymentMode();
    await pageInfo();
  }, []);

  const pageData = {
    datetime: {
      "label": "Date And Time",
      "placeholder": " Enter Date And Time",
      "type": "dateTime-local",
      "name": "paiddate",
    },
    amount: {
      "label": "Amount",
      "placeholder": " Enter Amount",
      "type": "text",
      "name": "paidamount",
    },
    reference: {
      "label": "Refrence /Receipt Number",
      "placeholder": " Enter Refrence /Receipt Number",
      "type": "text",
      "name": "refreceiptno",
    },
    paymentMode: {
      "label": "Payment Mode",
      "placeholder": " Enter Payment Mode ",
      "type": "text",
      "name": "paymode"
    },
    bankName: {
      "label": "Bank Name",
      "placeholder": " Enter Your Bank Name ",
      "type": "text",
      "name": "bankbranchname"
    },
    bankaddress: {
      "label": "Bank Address",
      "placeholder": " Enter Bank Address",
      "type": "text",
      "name": "bankaddress"
    },
    ignorebtn:{
      "label": "Ignore this Action",
      "className":"ingbtn btn-primary btn-sm m-2",
      "datatoggle":"tooltip",
      style: {
        "background": "#05A677",
        "color": "#fff"
      },

    },
    submitbtn:{
      "type":"submit",
      "className":"btn btn-primary btn-sm m-2",
      "label":"Submit"
    }

  }

  const differFields = {
    40: {
      label: "Reference/Reciept No",
      name: "refreceiptno",
    },
    41: {
      label: "Renewal Number",
      name: "renewalid",

    },
    42: {
      label: "Transaction Id",
      name: "transactionid",
    },
    43: {
      label: "Mode of Payment",
      name: "paymode",
    },
    55 :{
      label: "Mode of Payment",
      name: "paymode",
    }
  }

  let date = new Date()


  let initial = {
    custid: props.customer.custid,
    agentid: userInfo.data[0].userid,
    paiddate: "",
    paidtime: 1300,
    paidamount: 0,
    refreceiptno: "NA",
    paymode: "",
    bankbranchname: "NA",
    bankaddress: "NA",
    callid: 1,
    calldate: "0" + date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear(),
    policyloanno: props.customer.policy,
    renewalid: "NA",
    respcode: crmsaveandexit.resp_code,
    subrespcode: crmsaveandexit.sub_resp_code,
    transactionid: "NA",
    paidstatus: "NA",
    folloupdatetime: + date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear(),
    fcontactno: "NA",
    active: "Y",
    sessionid: crmsaveandexit?.dialer_session_id,
    // createdby : "HARSHIT",
    createdby: props.customer.custid,
    action_name: "INSERT"
  };

  const onSubmit = async (values, { resetForm }) => {
    const data = await DaynmicApicall(`mcrmdlr/getagetaction/vw_payment_transaction_trail/*/dialer_session='${crmsaveandexit?.dialer_session_id}' and isactive = 'Y'/dialer_session/`, '', 'get', userInfo.data[0].UserToken)
    if (!data[0] && data.length === 0) {
      const paid_date = new Date(values.paiddate.split("T")[0])
      values.paiddate = paid_date.getDate() + "-" + parseInt(paid_date.getMonth() + 1) + "-" + paid_date.getFullYear();
      values.refreceiptno = values.refreceiptno
      values.paymode = values.paymode.label;
      const Info = api.post("mcrmdlr/managerpaymenttransaction", values, {
        headers: { Authorization: userInfo.data[0].UserToken },
      });
      toast
        .promise(Info, {
          loading: "Adding data",
          success: (Info) => {
            return Info.data.message;
          },
          error: (err) => {
            return (
              err?.response?.data?.errors ??
              err?.response?.data?.message ??
              err?.message ??
              "OOPs something went wrong."
            );
          },
        })
    } else {
      toast.success('First ignore previous record and then new entry will be allowed', {
        position: "top-right",
        style: {
          background: '#0948B3',
          color: "#fff"
        },
      })
    }
    let val = {
      prod_id: values.policyloanno,
      // prod_id: 122334,
      amount: values.paidamount,
      payment_option: values.paymode.value,
      followup_date: values.folloupdatetime
    }
    Object.entries(val).map((data) => {
      let aa = `{"${data[0]}": "${data[1]}"}`
      dispatch(setSaveandExit(JSON.parse(aa)))
    })
  };
  return (
    <>
      {pageData && (
 <div>
 <Formik
   initialValues={initial}
   // // validationSchema={validate}
   onSubmit={onSubmit}>
   {(formik) => (
     <div className="mt-3">
       {/* {componentSwitch("40", formik)} */}
       {(function () {
         switch (props.componentid.toString()) {
           case "40":
             return (
               <Form className="card card-body border-light shadow ">
                 <div className="row mt-3 text-left">
                   <TextField
                     label={pageData?.datetime?.label}
                     placeholder={pageData?.datetime?.placeholder}
                     type={pageData?.datetime?.type}
                     name={pageData?.datetime?.name}
                   />
                   <TextField
                     label={pageData?.amount?.label}
                     placeholder={pageData?.amount?.placeholder}
                     type={pageData?.amount?.type}
                     name={pageData?.amount?.name}
                   />
                   <TextField
                     label={differFields?.[props?.componentid]?.label}
                     placeholder={differFields?.[props?.componentid]?.label}
                     type="text"
                     name={differFields?.[props?.componentid]?.name}
                   />
                   <MultiSelect
                     label={pageData?.paymentMode?.label}
                     placeholder={pageData?.paymentMode?.placeholder}
                     type={pageData?.paymentMode?.type}
                     name={pageData?.paymentMode?.name}
                     isMulti={false}
                     options={paymentMode}
                     value={formik.values.paymode}
                     onChange={async (value) => {
                       formik.setFieldValue("paymode", value);
                     }}
                   />


                   <div className="d-flex justify-content-end">
                   <button
                       type={pageData?.submitbtn?.type}
                       className={pageData?.submitbtn?.className}
                     >
                      {pageData?.submitbtn?.label}
                     </button>
                     <button
                      type="button"
                        className={pageData?.ignorebtn?.className}
                        data-toggle={pageData?.ignorebtn?.datatoggle}
                       size="sm" variant="white"
                       onClick={async (e) => {
                         let action = {
                           custid: props.customer.custid,
                           agentid: userInfo.data[0].userid,
                           active: "N",
                           sessionid: crmsaveandexit?.dialer_session_id,
                           createdby: userInfo.data[0].userid,
                           action_name: "DELETE"
                         }
                         let res = await DaynmicApicall(`mcrmdlr/managerpaymenttransaction`, action, 'post', userInfo.data[0].UserToken)
                         toast.success(`Ignore ${res.message}`, {
                           position: "top-right",
                           style: {
                             background: '#05A677',
                             color: "#fff"
                           },
                         })
                       }}
                     >
                       {pageData?.ignorebtn?.label}
                     </button>
                   
                   </div>
                 </div>
               </Form>
             );
           case '41':
             return (
               <Form className="card card-body border-light shadow ">
                 <div className="row mt-3 text-left">
                   <TextField
                     label={pageData?.datetime?.label}
                     placeholder={pageData?.datetime?.placeholder}
                     type={pageData?.datetime?.type}
                     name={pageData?.datetime?.name}
                   />
                   <TextField
                     label={pageData?.amount?.label}
                     placeholder={pageData?.amount?.placeholder}
                     type={pageData?.amount?.type}
                     name={pageData?.amount?.name}
                   />
                   <TextField
                     label={differFields?.[props?.componentid]?.label}
                     placeholder={differFields?.[props?.componentid]?.label}
                     type="text"
                     name={differFields?.[props?.componentid]?.name}
                   />
                   {/* <TextField
                                        label={pageData?.reference.label}
                                        placeholder={pageData?.reference.placeholder}
                                        type={pageData?.reference.type}
                                        name={pageData?.reference.name}
                                      /> */}

                   <MultiSelect
                     label={pageData?.paymentMode?.label}
                     placeholder={pageData?.paymentMode?.placeholder}
                     type={pageData?.paymentMode?.type}
                     name={pageData?.paymentMode?.name}
                     isMulti={false}
                     options={paymentMode}
                     value={formik.values.paymode}
                     onChange={async (value) => {
                       formik.setFieldValue("paymode", value);
                     }}
                   />
                   <TextField
                     label={pageData?.bankName?.label}
                     placeholder={pageData?.bankName?.placeholder}
                     type={pageData?.bankName?.type}
                     name={pageData?.bankName?.name}
                   />
                   <TextField
                     label={pageData?.bankaddress?.label}
                     placeholder={pageData?.bankaddress?.placeholder}
                     type={pageData?.bankaddress?.type}
                     name={pageData?.bankaddress?.name}
                   />
                   <div className="d-flex justify-content-end">
                   <button
                       type={pageData?.submitbtn?.type}
                       className={pageData?.submitbtn?.className}
                     >
                      {pageData?.submitbtn?.label}
                     </button>
                     <button
                      type="button"
                       className={pageData?.ignorebtn?.className}
                       data-toggle={pageData?.ignorebtn?.datatoggle}
                       size="sm" variant="white"
                       onClick={async (e) => {
                         let action = {
                           custid: props.customer.custid,
                           agentid: userInfo.data[0].userid,
                           active: "N",
                           sessionid: crmsaveandexit?.dialer_session_id,
                           createdby: userInfo.data[0].userid,
                           action_name: "DELETE"
                         }
                         let res = await DaynmicApicall(`mcrmdlr/managerpaymenttransaction`, action, 'post', userInfo.data[0].UserToken)
                         toast.success(`Ignore ${res?.message}`, {
                           position: "top-right",
                           style: {
                             background: '#05A677',
                             color: "#fff"
                           },
                         })
                       }}
                     >
                      {pageData?.ignorebtn?.label}
                     </button>
                    
                   </div>
                 </div>
               </Form>

             );
           case '42':
             return (
               <Form className="card card-body border-light shadow ">
                 <div className="row mt-3 text-left">
                   <TextField
                     label={pageData?.datetime?.label}
                     placeholder={pageData?.datetime?.placeholder}
                     type={pageData?.datetime?.type}
                     name={pageData?.datetime?.name}
                   />
                   <TextField
                     label={pageData?.amount?.label}
                     placeholder={pageData?.amount?.placeholder}
                     type={pageData?.amount?.type}
                     name={pageData?.amount?.name}
                   />
                   <TextField
                     label={differFields?.[props?.componentid]?.label}
                     placeholder={differFields?.[props?.componentid]?.label}
                     type="text"
                     name={differFields?.[props?.componentid]?.name}
                   />
                   <div className="d-flex justify-content-end">
                   <button
                       type={pageData?.submitbtn?.type}
                       className={pageData?.submitbtn?.className}
                     >
                      {pageData?.submitbtn?.label}
                     </button>
                     <button
                       type="button"
                        className={pageData?.ignorebtn?.className}
                        data-toggle={pageData?.ignorebtn?.datatoggle}
                       size="sm" variant="white"
                       onClick={async (e) => {
                         let action = {
                           custid: props.customer.custid,
                           agentid: userInfo.data[0].userid,
                           active: "N",
                           sessionid: crmsaveandexit?.dialer_session_id,
                           createdby: userInfo.data[0].userid,
                           action_name: "DELETE"
                         }
                         let res = await DaynmicApicall(`mcrmdlr/managerpaymenttransaction`, action, 'post', userInfo.data[0].UserToken)
                         toast.success(`Ignore ${res.message}`, {
                           position: "top-right",
                           style: {
                             background: '#05A677',
                             color: "#fff"
                           },
                         })
                       }}
                     >
                      {pageData?.ignorebtn?.label}
                     </button>
                    
                   </div>
                 </div>
               </Form>
             );
             
             case '49':
              return (
               <div>hello user</div>
              );
              
           default:
             break;
         }
       })()}
       {/* <div className="d-flex justify-content-end">
       <button
       type="button"
         className="btn-sm btn-dark fw-bold mt-2"
         data-toggle="tooltip"
         size="sm" variant="white"
         onClick={async (e) => {
           let action = {
             custid: props.customer.custid,
             agentid: userInfo.data[0].userid,
             active: "N",
             sessionid: dialerinfo.sessionid,
             createdby: userInfo.data[0].userid,
             action_name: "DELETE"
           }
           let res = await DaynmicApicall(`mcrmdlr/managerpaymenttransaction`, action, 'post')
           toast.success(`Ignore ${res.message}`, {
             position: "top-right",
             style: {
               background: '#05A677',
               color: "#fff"
             },
           })
         }}
       >
         Ignor this Action
       </button>
       </div> */}
     </div>
   )}
 </Formik>
</div>
      )}
     
    </>
  );
};

export default DespositionCompo;
