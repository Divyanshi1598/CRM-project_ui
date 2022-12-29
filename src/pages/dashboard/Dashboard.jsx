/*
'-------------------------------------------------------------------------------------------------------------------- 
'Module Name		  :  Dialer CRM Dashboard |   Purpose          :  Manage Every functionlty on CRM AND Dialer|    
'Created By		    :  Harshit Dubey        |   Change Request No:                                  |
'Creation Date 	  :  29-Jul-2022		      |   Description      :                                  |
'Changed By		    :  Harshit Dubey	      |   Change Date 	   :  15-SEP-2022                     |
'Revision History	:  No Change            |                                                       |
'Name				      :  Harshit Dubey        |   Date             :  15-AUG-2022                     |                  
'----------------------------------------------------------------------------------------------------------------------			
'---------------------------------- */

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import DashboardNav from "../../components/DashboardNav";
import api from "../../utils/api";
import SideBar from "./DashboardSidebar";
import DashboardHome from "./DashboardHome";
import DashboardFooter from "./DashboardFooter";
import EditeUser from "../ManageUser/EditeUser";
import EditUI from "../ManageUIComponent/EditUI";
import DashboardAreaNav from "./DashboardAreaNav";
import Resetpassword from "../auth/ResetPassword";
import AddMenu from "../ManageMenuMaster/AddMenu";
import ChangePassword from "../auth/ChangePassword";
import AddEditRes from "../ManageResponce/AddEditRes";
import EditScripts from "../ManageScripts/EditScripts";
import { setCampaignDetail } from "../../redux/Campaign";
import EditGlobal from "../ManageGlobaldailer/EditGlobal";
import AddParameter from "../ManageParameter/AddParameter";
import ManageScripts from "../ManageScripts/ManageScripts";
import EditCampaigns from "../ManageCampaigns/EditCampaigns";
import ManageUserMaster from "../ManageUser/ManageUserMaster";
import ManegeCampaigns from "../ManageCampaigns/ManageCampaigns";
import ManageParameter from "../ManageParameter/ManageParameter";
import CrmHomePage from "../../components/CrmServices/CrmHomePage";
import CampaignGroupMenuMap from "../Mapping/CampaignsGroupMenuMap";
import FileUpload from "../../components/formValidation/FileUpload";
import ManageMenuMaster from "../ManageMenuMaster/ManageMenuMaster";
import ManageResponceMaster from "../ManageResponce/ManageResponceMaster";
import MasterGlobalDailer from "../ManageGlobaldailer/MasterGlobalDailer";
import MapComanyBranchDepartment from "../Mapping/MapComanyBranchDepartment";
import ManageUIComponentMaster from "../ManageUIComponent/ManageUIComponentMaster";
import  MasterDialerQueue from '../ManageDialerQueue/MasterDailerQueue'; 
import {
  setActiveMenu,
  setComponentDetail,
  setParems,
} from "../../redux/Campaign";
import toast from "react-hot-toast";
import AddMenuqueue from "../ManageDialerQueue/AddMenuqueue";


export default function Dashboard() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state?.user?.value);
  const { activeMenu, paremsData } = useSelector((state) => state.campaign);
  const { page, userid } = useParams();

  useEffect(() => {
    (async () => {
      if (userInfo.data[0].usergroup !== "AGENT") {
        await setCampdata();
        await setComponent();
      }
    })()
  }, []);

  async function setCampdata() {

    // api.get(`appuser/getcamp/${userInfo.data[0].userid}`, {})
    api.get(`appuser/campmaster`, {
      headers: {
        Authorization: userInfo.data[0].UserToken, //the token is a variable which holds the token
      },
    })
      .then((res) => {
        dispatch(setCampaignDetail({ data: res.data.data }));
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        toast.error(
          error.response.data.message ??
          error.message ??
          "OOPs, Something went wrong."
        );
      });
  }
  async function setComponent() {
    api
      .get(`appuser/getcomponentlist/ALL`, {
        headers: {
          Authorization: userInfo.data[0].UserToken, //the token is a variable which holds the token
        },
      })
      .then((res) => {
        dispatch(setComponentDetail({ data: res.data.data }));
      })
      .catch((error) => {
        toast.error(
          error.response.data.message ??
          error.message ??
          "OOPs, Something went wrong."
        );
      });
  }
  const pages = {
    MNU_DASHBOART: <DashboardHome activemenu={activeMenu} />,
    MNU_RESET_PWD: <Resetpassword activemenu={activeMenu} />,
    MNU_UPLOAD_FILE: <FileUpload activemenu={activeMenu} />,
    MNU_HOLIDAY_UPD: <DashboardHome activemenu={activeMenu} />,
    MNU_CHANGE_PWD: <ChangePassword activemenu={activeMenu} />,
    MNU_CRUD_MENU: <ManageMenuMaster activemenu={activeMenu} />,
    MNU_MANAGE_CAMP: <ManegeCampaigns activemenu={activeMenu} />,
    MNU_MANAGE_SCRIPTS: <ManageScripts activemenu={activeMenu} />,
    MNU_CREATE_USER: <ManageUserMaster activemenu={activeMenu} />,
    MNU_MANAGE_PARAMETER: <ManageParameter activemenu={activeMenu} />,
    MNU_GLOBAL_DIALER: <MasterGlobalDailer activemenu={activeMenu} />,
    MNU_CBD_MAP: <MapComanyBranchDepartment activemenu={activeMenu} />,
    CAMP_GROUP_MENU_MAP: <CampaignGroupMenuMap activemenu={activeMenu} />,
    MNU_MANAGE_RESPONSE: <ManageResponceMaster activemenu={activeMenu} />,
    MNU_CRUD_UICOMP: <ManageUIComponentMaster activemenu={activeMenu} />,
    // MANAGE_DIALER_QUEUE: <MasterDialerQueue activemenu={activeMenu} />,
    MNU_MANAGE_DIALER_Q: <MasterDialerQueue activemenu={activeMenu} />,

  };

  const subpages = {
    manageui: <EditUI data={{ paremsData, activeMenu }} />,
    addmenu: <AddMenu data={{ paremsData, activeMenu }} />,
    manageuser: <EditeUser data={{ paremsData, activeMenu }} />,
    addresponse: <AddEditRes data={{ paremsData, activeMenu }} />,
    masterglobal: <EditGlobal data={{ paremsData, activeMenu }} />,
    managecamp: <EditCampaigns data={{ paremsData, activeMenu }} />,
    managescripts: <EditScripts data={{ paremsData, activeMenu }} />,
    managatsparameter: <AddParameter data={{ paremsData, activeMenu }} />,
    managedialerq: <AddMenuqueue data={{ paremsData, activeMenu }} />
    


   

   

   

  
  };

  return (
    <>
      {userInfo.data[0].usergroup !== "AGENT" ? (
        <>
          <SideBar>
            <DashboardNav />
            <div className="container-fluid">
              <div className="row">
                <div className="col-12" >
                  <DashboardAreaNav />
                  {subpages[paremsData.url] ? (
                    subpages[paremsData.url]
                  ) : pages?.[page] ? (
                    pages[page]
                  ) : (
                    <DashboardHome />
                  )}
                </div>
              </div>
            </div>
          </SideBar>
          <DashboardFooter />
        </>
      ) : (
        <div className="container-fluid">
          <CrmHomePage />
        </div>
      )}
    </>
  );
}
