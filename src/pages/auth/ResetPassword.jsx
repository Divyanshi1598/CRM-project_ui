import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {  useSelector } from 'react-redux';
import { useEffect } from "react";
import { getFormData } from '../../helpers/helpers';
import api from '../../utils/api';


const ResetPassword = (props) => {
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);
  const [pageData, setpageData] = useState([]);
  const [tableData, setTableData] = useState([]);

  function resetPassword(e) {
    e.preventDefault();
    const formData = getFormData(e.target);
    console.log("formData",formData)
    const signinRes = api.post("appuser/managepassword/", formData, {
      headers: {
        Authorization: userInfo.data[0].UserToken //the token is a variable which holds the token
      }
    });
    toast
      .promise(signinRes, {
        loading: "Authenticating member.",
        success: (data) => {
          return `User Reset Password Successfully .`;
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
  }
  async function getCampaign(e) {
    api.get(`appuser/getcamp/ALL`, {
      headers: {
        Authorization: userInfo.data[0].UserToken //the token is a variable which holds the token
      }
    })
      .then((res) => {
        let unique = [
          ...new Map(res?.data?.data?.map((item) => [item["campname"], item])).values(),
        ];
        setTableData(unique);
      })
      .catch((error) => {
        console.log("ERROR: ", error)
        toast.error(
          error.response.data.message ??
          error.message ??
          "OOPs, Something went wrong."
        );
      });
  }
  async function getUserNAme(campData) {
    api.get(`appuser/userlist/${campData}/ALL`, {
      headers: {
        Authorization: userInfo.data[0].UserToken //the token is a variable which holds the token
      }
    })

      .then((res) => {
        setpageData(res.data.data);
      })
      .catch((error) => {
        console.log("ERROR: ", error)
        toast.error(
          error.response.data.message ??
          error.message ??
          "OOPs, Something went wrong."
        );
      });
  }

useEffect(async () => {
    await getCampaign()
}, []);

  const resetPass = {
    "title": "Reset Password",
    "cardstyle": {
      "backgroundColor": " "
    },
    "campaign": {
      "label": "Campaign Name",
      "placeholder": "Select User campaign",
      "tooltip": "Select User campaign",
      "name": "campaign",
      "type": "text"
    },
    "UserName": {
      "label": "User Name",
      "placeholder": "Select User",
      "tooltip": "Select User ",
      "name": "UserName",
      "type": "text"
    },
    
    "resetbtn": {
      "value": "Reset Password",
      "style": {
        "backgroundColor": "#639"
      },
      "tooltip": "Click here For Reset Password"
    },
  }
  return (
  <section className="vh-lg-90 mb-5  d-flex align-items-center"> 
<div className="col-6 ml-8">
          <div className="col">
            <div className="col-sm  ml-9">
              <div className="wrapper">
                <div className="log">
                  <div class="nav-wrapper position-relative mb-2">
              <h1 className="h3 mb-4">{resetPass?.title}</h1>
              <form  onSubmit={resetPassword}>
                <div className="mb-4">
                  <label>{resetPass.campaign.label}</label> 
                  <select class="form-select" name="keypointer" aria-label="Default select example"
                    onChange={async(e) => {
                      await getUserNAme(e.target.value)
                    }}>
                    {tableData?.map((data) => (
                      <option key={data.value} value={data.keypointer}>{data.campname}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label>{resetPass?.UserName?.label}</label>
                  <select class="form-select" name="userid" aria-label="Default select example">
                    <option selected >{resetPass?.UserName?.placeholder}</option>
                    {pageData?.map((data) => (
                      <option key={data.value}  value={data.userid}>{data.username}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-block btn-primary text-white"
                title={resetPass?.resetbtn?.tooltip}
                >
                   {resetPass?.resetbtn?.value}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    </section>
  )
}

export default ResetPassword
