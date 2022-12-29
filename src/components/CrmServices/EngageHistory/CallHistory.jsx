import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import DaynmicApicall from '../../../utils/function';
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Chip, Stack } from "@mui/material";



export default function CallHistory(props) {
  const { userInfo } = useSelector((state) => state?.user?.value);
  const [tableData, setTableData] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filterColumn, setFilterColumn] = useState("");
  async function CallHistoryData(cust_id) {
    await DaynmicApicall(`mcrmdlr/getEngagementhistory/${props?.userInfo?.userInfo?.data?.custinfo?.cust_id}`, '', 'get', userInfo.data[0].UserToken).then((data) => {
      setTableData(data);
    })
  }

  const columns = [
    { field: "contactdate", headerName: "contact date", minWidth: 130, flex: 1 },
    { field: "customerid", headerName: "customer id", minWidth: 120, flex: 1 },
    { field: "policyno", headerName: "Policy No", minWidth: 115, flex: 1 },
    { field: "contactby", headerName: "Contact By", minWidth: 110, flex: 1 },
    { field: "callid", headerName: "Call Id", minWidth: 90, flex: 1 },
    { field: "dialer_session_id", headerName: "Dialer Session Id", minWidth: 150, flex: 1 },
    { field: "followupdate", headerName: "Followup Date ", minWidth: 130, flex: 1 },
    { field: "responsecode", headerName: "Response Code", minWidth: 150, flex: 1 },
    { field: "subresponsecode", headerName: "Sub Response Code", minWidth: 300, flex: 1 },
    { field: "revertdate", headerName: "Revert Date", minWidth: 130, flex: 1 },
    { field: "reverttime", headerName: "Revert Time", minWidth: 130, flex: 1 },
  ];
  
  function CustomToolbar() {
    return (
      <Stack direction="row" justifyContent="flex-end">
        <GridToolbarContainer className={gridClasses.toolbarContainer}>
          <GridToolbarExport />
          <GridToolbarFilterButton />
        </GridToolbarContainer>
      </Stack>
    );
  }

  const onFilterChange = React.useCallback(async (filterModel) => {
    if (
      filterModel?.items?.[0]?.value &&
      filterModel?.items?.[0]?.value.length > 0
    ) {
      setFilterColumn(filterModel?.items?.[0]?.columnField);
      setFilterValue(filterModel?.items?.[0]?.value);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await CallHistoryData();
    })()
  }, []);

  return (
    <>
      <div className="card card-body border-light shadow">
        <div className="table-settings mb-4">
          <div className="my-2">
            <DataGrid
              //loading={loadingData}
              getRowId={(r) => r.dialer_session_id}
              rows={tableData}
              columns={columns}
              //rowCount={totalUsers}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 25, 50, 100]}
              //checkboxSelection
              //paginationMode="server"
              onFilterModelChange={onFilterChange}
              // onPageChange={handlePageChange}
              autoHeight={true}
              className="bg-white"
              components={{
                Toolbar: CustomToolbar,
              }}
              density="compact"
            />
          </div>
        </div>
      </div>
    </>
  );
}
