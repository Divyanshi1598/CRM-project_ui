import React, { useState } from "react";
import api from "../../utils/api";
import { useEffect } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "../formValidation/TextField";
import { Form, Formik } from "formik";
import { BsPencilSquare } from "react-icons/bs";
import { toast } from "react-hot-toast";
import DaynmicApicall, { ManageEventLog } from "../../utils/function";
import { login } from "../../redux/User";

export default function UpdateInformation(props) {
  let { userInfo } = useSelector((state) => state?.user?.value);
  const dispatch = useDispatch();
  const [showDatas, setShowDatas] = useState("");
  const [userDatas, setUserDatas] = useState({});
  const [action, setAction] = useState(false);
  const [customerbesicinfo, setCustomerbesicinfo] = useState(false);
  const [pageData, setpageData] = useState ("");
  let actionlog = {
    "Rowed":"NEW",
    "eventname": ``,
    "actionname": "",
    "custid": props.userInfo?.data?.custinfo?.cust_id,
    "campid": props.userInfo?.data?.campinfo?.campid,
    "createdby": props.userInfo?.data?.campinfo?.userid
  }
  async function getcustomer(cuid,campid) {
    await api
      .get(
        `mcrmdlr/getcustdata/${props?.userInfo?.data?.custinfo?.cuid}/${props.userInfo.data.campinfo.campid}`,
        {
          headers: {
            Authorization: userInfo.data[0].UserToken,
          },
        }
      )
      .then(async (data) => {
        actionlog.eventname = `OnClick`
        actionlog.actionname = "Show Customer Data"
        ManageEventLog(actionlog)
        await setShowDatas(data.data.data);
        await setCustomerbesicinfo({
          process_id: data?.data?.data[0]?.process_id,
          cust_id: data?.data?.data[0]?.cust_id,
          client_id: data?.data?.data[0]?.client_id,
          policy_no: data?.data?.data[0]?.policy_no,
        });
        // await setUserDatas(data.data.data[0])
      });
  }
  async function pageInfo(keypointer) {
    await DaynmicApicall(`appuser/getcomponetbyid/${props?.userInfo?.data?.campinfo?.keypointer}/44`, '', 'get', userInfo.data[0].UserToken).then((res) => {
      setpageData(res[0].DATA);
    })
  }

  useEffect(async () => {
    await getcustomer();
    await pageInfo();

  }, []);

  let initial = {
    sno: userDatas.sno,
    process_id: customerbesicinfo.process_id,
    cust_id: customerbesicinfo.cust_id,
    client_id: customerbesicinfo.client_id,
    policy_no: customerbesicinfo.policy_no,
    email: userDatas.email,
    phone: userDatas.phone,
    address_type: userDatas.address_type,
    address1: userDatas.address1,
    address2: userDatas.address2,
    address3: userDatas.address3,
    address4: userDatas.address4,
    address5: userDatas.address5,
    country: userDatas.country,
    c_state: userDatas.c_state,
    pin_code: userDatas.pin_code,
    is_active: action === false ? userDatas.is_active : "Y",
    created_by: "ADMIN",
    action_name: userDatas ? "UPDATE" : "INSERT",
  };
  const validate = Yup.object({
    address_type: Yup.string().required(
      "Address Type is required, Please Mention in Capital Letter"
    ),
    address1: Yup.string().required("House Number  is required"),
    address2: Yup.string().required("Village is required"),
    address3: Yup.string().required("Post is required"),
    address4: Yup.string().required("Distict is required"),
    // address5: Yup.string().required("Other Address is required"),
    country: Yup.string().required("country is required"),
    c_state: Yup.string().required("State is required"),
    pin_code: Yup.string().required("Pin Code is required"),
    email: Yup.string().matches(
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      "Email Id is Required"
    ),
    phone: Yup.string().matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    ),
  });
  async function submit(values, { resetForm }) {
    const Info = api.post("mcrmdlr/managemodificustinfo", values, {
      headers: { Authorization: userInfo.data[0].UserToken },
    });
    toast
      .promise(Info, {
        loading: "Data loading...",
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
      .then(async () => {
        await getcustomer();
        await setAction(false);
      });
  }

  // const pageData = {
  //   "text1": "House No.",
  //   "text2": "Village",
  //   "text3": "Post",
  //   "text4": "Distict",
  //   "text5": "Pin Code",
  //   "text6": "Other Address",
  //   "text7": "Country",
  //   "text8": "State",
  //   "text9": "Phone",
  //   "text10": "Email Id",
  //   button: {
  //     "label": "Add New Address",
  //     "title": "Please Add New Address",
  //   },
  //   addrestype: {
  //     "label": "Address Type",
  //     "title": "Please Enter Address Type",
  //     "type": "text",
  //     "placeholder": "Enter Address Type",
  //     "name": "address_type",
  //   },

  //   house: {
  //     "label": "House No.",
  //     "title": "Please  Enter House Number",
  //     "type": "text",
  //     "placeholder": "Enter House No.",
  //     "name": "address1",
  //   },
  //   village: {
  //     "label": "Village",
  //     "title": "Please Enter Village Name",
  //     "type": "text",
  //     "placeholder": "Enter Village Name",
  //     "name": "address2",
  //   },

  //   post: {
  //     "label": "Post",
  //     "title": "Please  Enter Post Name",
  //     "type": "text",
  //     "placeholder": "Enter Post",
  //     "name": "address3",
  //   },
  //   district:{
  //       "label":"District",
  //       "title":"Please Enter District Name",
  //       "placeholder":"Enter District Name",
  //       "type":"text",
  //       "name":"address4"
  //   },
  //   other:{
  //       "label":"Other",
  //       "title":"Please Enter Other Address",
  //       "placeholder":"Enter Other",
  //       "type":"text",
  //       "name":"address5",    
  //   },

  // state:{
  //       "label":"State",
  //       "title":"Please Enter State",
  //       "placeholder":"Enter State",
  //       "type":"text",
  //       "name":"c_state",    
  //   },
  //   pncode:{
  //       "label":"Pin Code",
  //       "title":"Please Enter Pin Code",
  //       "placeholder":"Enter Pin Code",
  //       "type":"text",
  //       "name":"pin_code", 

  //   },
  //   country:{
  //       "label":"Country",
  //       "title":"Please Enter Country",
  //       "placeholder":"Enter Country",
  //       "type":"text",
  //       "name":"country", 
  //   },
  //  email:{
  //       "label":"Email",
  //       "title":"Please Enter  Email Id ",
  //       "placeholder":"Enter Email Id",
  //       "type":"text",
  //       "name":"email", 
  //   },
  //  phone:{
  //       "label":"Phone",
  //       "title":"Please Enter  your Phone Number",
  //       "placeholder":"Enter  Phone Number",
  //       "type":"text",
  //       "name":"phone", 
  //   },
  //   button1:{
  //       "label":"Save",
  //       "type":"submit",
  //       "title":"Save"
  //   },
  //   button2:{
  //       "label":"Cancel",
  //       "type":"submit",
  //       "title":"Cancel"
  //   }


  // };
  return (
    <>
    {pageData && (
       <div>
       <div className="row">
         <div className="row row-cols-md-2  row-cols-lg-2 row-cols-xl-2 font-weight-bold">
           {showDatas &&
             showDatas?.map((data) => {
               return (
                 <div class="col-10 col-sm-2 ">
                   {action === false && (
                     <div>
                       <p>
                         <div className="card-body row row-cols-md-2 m-2 p-2 row-cols-lg-2 row-cols-xl-2 border-light shadow">
                           <span
                             className="d-flex fw-bold justify-content-start"
                             title={data.address_type}
                             data-toggle="tooltip"
                           >
                             {data.address_type}
                           </span>
                           <span className="d-flex justify-content-end">
                             <BsPencilSquare
                               title="Update information"
                               data-toggle="tooltip"
                               onClick={(e) => {
                                 setAction(action === true ? false : true);
                                 setUserDatas(data);
                               }}
                               size={20}
                             />
                           </span>
                           <li className="list-group-item">
                             {" "}
                             <label>{pageData.text1}</label>:- {data.address1}
                           </li>
                           <li className="list-group-item">
                             <label>{pageData.text2} </label>:- {data.address2}
                           </li>
                           <li className="list-group-item">
                             <label>{pageData.text3}</label>:- {data.address3}
                           </li>
                           <li className="list-group-item">
                             <label>{pageData.text4}</label>:-{data.address4}
                           </li>
                           <li className="list-group-item">
                             <label>{pageData.text5}</label>:- {data.pin_code}
                           </li>
                           <li className="list-group-item">
                             <label>{pageData.text6}</label>:-{data.address5}
                           </li>
                           <li className="list-group-item">
                             <label>{pageData.text7}</label> :- {data.country}
                           </li>
                           <li className="list-group-item">
                             <label>{pageData.text8}</label> :-{" "}
                             {userDatas.c_state}
                           </li>
                           <li className="list-group-item">
                             <label>{pageData.text9}</label> :- {data.phone}
                           </li>
                           <li className="list-group-item">
                             <label>{pageData.text10}</label>:- {data.email}
                           </li>
                         </div>
                       </p>
                     </div>
                   )}
                 </div>
               );
             })}
           {userDatas && (
             <span className="text-right">
               <button
                 className="ml-2 btn-sm btn-primary"
                 title={pageData.button.title}
                 data-toggle="tooltip"
                 onClick={(e) => {
                   setAction(true);
                   setUserDatas("");
                 }}
               >
                 {pageData.button.label}
               </button>
             </span>
           )}
         </div>
       </div>
       {/* 
               <div className=''>
                   <span className='d-flex justify-content-end'><BsPencilSquare onClick={e => setEditData(editData === true ? false : true)} size={20} /></span>
               </div> */}
       {action === true && (
         <div className="card card-body border-light shadow-sm mb-4">
           <Formik
             initialValues={initial}
             validationSchema={validate}
             onSubmit={submit}
           >
             {(formik) => (
               <div className="">
                 <Form>
                   <div className="row mt-2">
                     <TextField
                       data-toggle="tooltip"
                       title={pageData.addrestype.title}
                       label={pageData.addrestype.label}
                       placeholder={pageData.addrestype.placeholder}
                       type={pageData.addrestype.type}
                       defaultValues={showDatas.address_type}
                       name={pageData.addrestype.name}
                     />
                     <TextField 
                     data-toggle="tooltip"
                       title={pageData.house.title}
                       label={pageData.house.label}
                       placeholder={pageData.house.placeholder}
                       type={pageData.house.type}
                       name={pageData.house.name}
                       defaultValues={showDatas.address1}
                     />
                     <TextField
                     data-toggle="tooltip"
                       title={pageData.village.title}
                       label={pageData.village.label}
                       placeholder={pageData.village.placeholder}
                       type={pageData.village.type}
                       name={pageData.village.name}
                       defaultValues={showDatas.address2}
                     />
                     <TextField
                     data-toggle="tooltip"
                       title={pageData.post.title}
                       label={pageData.post.label}
                       placeholder={pageData.post.placeholder}
                       type={pageData.post.type}
                       name={pageData.post.name}
                       defaultValues={showDatas.address3}
                     />
                     <TextField
                     data-toggle="tooltip"
                       title={pageData.district.title}
                       label={pageData.district.label}
                       placeholder={pageData.district.placeholder}
                       type={pageData.district.type}
                       name={pageData.district.name}
                       defaultValues={showDatas.address4}
                     />
                     <TextField
                     data-toggle="tooltip"
                       title={pageData.other.title}
                       label={pageData.other.label}
                       placeholder={pageData.other.placeholder}
                       type={pageData.other.type}
                       name={pageData.other.name}
                       defaultValues={showDatas.address5}
                     />
                     <TextField
                     data-toggle="tooltip"
                     title={pageData.state.title}
                       label={pageData.state.label}
                       placeholder={pageData.state.placeholder}
                       type={pageData.state.type}
                       defaultValues={showDatas.c_state}
                       name={pageData.state.name}
                     />
                     <TextField
                     data-toggle="tooltip"
                     title={pageData.pncode.title}
                       label={pageData.pncode.label}
                       placeholder={pageData.pncode.placeholder}
                       type={pageData.pncode.type}
                       name={pageData.pncode.name}
                       defaultValues={showDatas.pin_code}
                     />
                     <TextField
                     data-toggle="tooltip"
                     title={pageData.country.title}
                       label={pageData.country.label}
                       placeholder={pageData.country.placeholder}
                       type={pageData.country.type}
                       defaultValues={showDatas.country}
                       name={pageData.country.name}
                     />
                     <TextField
                     data-toggle="tooltip"
                     title={pageData.email.title}
                       label={pageData.email.label}
                       placeholder={pageData.email.placeholder}
                       type={pageData.email.type}
                       name={pageData.email.name}
                       defaultValues={showDatas.email}
                     />
                     <TextField
                     data-toggle="tooltip"
                     title={pageData.phone.title}
                       label={pageData.phone.label}
                       placeholder={pageData.phone.placeholder}
                       type={pageData.phone.type}
                       name={pageData.phone.name}
                       defaultValues={showDatas.phone}
                     />
                     <div className="d-flex justify-content-end">
                       <button  className="btn btn-primary p-2 m-2"
                       data-toggle="tooltip"
                       title={pageData.button1.title}
                       type={pageData.button1.type}
                        
                       >
                       {pageData.button1.label}
                       </button>
                       <button  className="btn btn-primary p-2 m-2"
                       data-toggle="tooltip"
                       title={pageData.button2.title}
                       type={pageData.button2.type}
                       onClick={(e) => setAction(false)}
                       >
                       {pageData.button2.label}
                       </button>
                     </div>
                   </div>
                 </Form>
               </div>
             )}
           </Formik>
         </div>
       )}
     </div>
    )}
     
    </>
  );
}
