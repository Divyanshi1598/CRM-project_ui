import React from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "react-notifications/lib/notifications.css";
import {useDispatch } from "react-redux";
import SignIn from "./pages/auth/SignIn";
import Dashboard from "./pages/dashboard/Dashboard";
import Error404 from "./pages/error/Error404";
import Error500 from "./pages/error/Error500";
import { login } from "./redux/User";
import CrmHomePage from "./components/CrmServices/CrmHomePage";
import DataAllocation from "./components/DataAllocation/DataAllocaton";
import ChangePassword from "./pages/auth/ChangePassword";
import CustomerSearchPage from "./components/CrmServices/searchpage/CustomerSearchPage";
import SendWebphoneDataTOCRM from "./pages/SendWebphoneDataTOCRM";

const Router = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const pathName = location.pathname;
 
  const userI = JSON.parse(localStorage.getItem("support_user"));
  const isLoggedIn = userI?.isLoggedIn ?? false;
  dispatch(login({...userI}));
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route exact path="/error404" element={<Error404 />} />
        <Route exact path="/error500" element={<Error500 />} />
        <Route
          exact
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
        >
          <Route path=":page" element={<Dashboard />} />
          <Route path="edituser" element={<Dashboard />}>
            <Route path=":userid" element={<Dashboard />} />
          </Route>
        </Route>
        <Route exact path="/changepassword" element={<ChangePassword />} />
        <Route exact path="/data" element={<DataAllocation />} />
        <Route exact path="/webphone" element={<SendWebphoneDataTOCRM />} />
      </Routes>
      <div>
        <Toaster position="top-right" toastOptions={{
          success: {
            style: {
              background: '#05A677',
              color: "#fff"
            },
          },
          info: {
            style: {
              background: '#0948B3',
              color: "#fff"
            },
          },
          error: {
            style: {
              background: '#FA5252',
              color: "#fff"
            },
          },
        }} />
      </div>
    </>
  );
};

export default Router;
