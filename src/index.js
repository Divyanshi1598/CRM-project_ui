/*
'-------------------------------------------------------------------------------------------------------------------- 
'Project Name		  :  Call Center CRM UI   |   Purpose          :  CRM & Dialer                    |    
'Created By		    :  Harshit Dubey        |   Change Request No:                                  |
'Creation Date 	  :  22-Jul-2022		      |   Description      :                                  |
'Changed By		    :  Harshit Dubey	      |   Change Date 	   :  22-AUG-2022                     |
'Revision History	:  No Change            |                                                       |
'Name				      :  Harshit Dubey        |   Date             :  22-AUG-2022                     |                  
'----------------------------------------------------------------------------------------------------------------------			
'----------------------------------------------------------------------------------------------------------------------*/

import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/User";
import manageuserReducer from "./redux/manageUser";
import mappingReducer from "./redux/Mapping";
import campReducer from "./redux/Campaign";
import dialerReducer from "./redux/Dialer";
import "./utils/i18n";
import Loading from "./components/Loading";

const store = configureStore({
  reducer: {
    user: userReducer,
    campaign: campReducer,
    manageuser: manageuserReducer,
    managemaping: mappingReducer,
    dialer : dialerReducer
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <Suspense fallback={<Loading />}>
          <App />
        </Suspense>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);


reportWebVitals();
