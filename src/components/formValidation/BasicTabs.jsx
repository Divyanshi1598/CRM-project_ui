import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DespositionCompo from './Desposition/DespositionCompo';
import { ManageEventLog } from '../../utils/function';
import { useDispatch, useSelector } from 'react-redux';
import { setSaveandExit } from '../../redux/Dialer';
import { logDOM } from '@testing-library/react';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function BasicTabs(props) {
  let { userInfo } = useSelector((state) => state?.user?.value);
  const dispatch = useDispatch()
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  var ReplaceObjeWithScript = {
    Customer_Surname: props.customer.policy_owner,
    policy_name: props.customer.policy,
    Agent_Name: userInfo.data[0]?.userid
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          value={value} onChange={handleChange}
        >
          {
            props.subscript.subscript.map((s, i) => (
              <Tab onClick={(e) => {
                dispatch(setSaveandExit({ sub_resp_code: s.script_code }))
                let actionlog =
                {
                  "Rowed": "NEW",
                  "custid": props.customer.custid.slice(3),
                  "campid": props.camp,
                  "eventname": `OnClick`,
                  "actionname": `${s.script_name} Sub-Disposition Called`,
                  "actioncate": "SUB-D",
                  "createdby": userInfo.data[0].userid
                }
                ManageEventLog(actionlog);
              }} label={s.script_name} {...a11yProps({ i })} />
            ))
          }
        </Tabs>
      </Box>
      {props.subscript.subscript.map((s, i) => (
        <TabPanel value={value} index={i}>
          {s.script_temp_body.replace(/Customer_Surname|Policy_Name/gi, function (matched) {
            return ReplaceObjeWithScript[matched];
          })}
          {s.component_id !== '9999' ? (
            <>
              <DespositionCompo componentid={s.component_id} customer={props.customer} />
            </>
          ) : ""}
        </TabPanel>
      ))}
    </Box>
  );
}
