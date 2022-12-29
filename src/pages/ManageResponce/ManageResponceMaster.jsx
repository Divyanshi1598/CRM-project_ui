import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Chip, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { setParems } from "../../redux/Campaign";
import DaynmicApicall from "../../utils/function";

export default function ManageResponceMaster(props) {
  const navigate = useNavigate();
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);
  const [tableData, setTableData] = useState([]);
  const [filterColumn, setFilterColumn] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [pageData, setpageData] = useState([]);
  const dispatch = useDispatch();
  const Header = { headers: { Authorization: userInfo.data[0].UserToken } };

  async function getResponseList() {
    await DaynmicApicall(`appuser/getrespmaster`, '', 'get', userInfo.data[0].UserToken).then((res) => {
      setTableData(res);
    })
  }
  async function deleteComponent(e, compInfo) {
    e.preventDefault();
    compInfo.mode = "DELETE";
    console.log(compInfo);
    const updatePromise = api.post("appuser/managemenumaster/", Header);
    toast
      .promise(updatePromise, {
        loading: "Deleting User",
        success: (updatePromise) => {
          return updatePromise.data.message;
        },
        error: "Error, Something went worng",
      })
      .then(() => {
        getResponseList();
      });
  }

  const columns = [
    { field: "resp_code", headerName: "Response Code", minWidth: 150, flex: 1 },
    { field: "resp_desc", headerName: "Response Name", minWidth: 200, flex: 1 },
    { field: "user_eligible",headerName: "Eligible For",minWidth: 100, flex: 1,},
    { field: "resp_type",headerName: "Response Type",minWidth: 50,flex: 1,},
    { field: "parent_resp_code", headerName: "Parent Response", minWidth: 50, flex: 1 },
    { field: "client_resp_code",headerName: "Client Response",minWidth: 100,flex: 1,},
    { field: "is_active",headerName: "Status",width: 200,flex: 1, renderCell: (params) =>
        params.value === "Y" ? (
          <Chip label="Active" color="success" size="small" />
        ) : params.value === "N" ? (
          <Chip label="InActive" color="warning" size="small" />
        ) : (
          <Chip label="Block" size="small" />
        ),
    },
    { field: "Action",type: "actions",headerName: "Action",width: 80,flex: 1,getActions: (params) => [
        <GridActionsCellItem
          label="Edit"
          onClick={(e) => {
            dispatch(
              setParems({
                data: {
                  CAMP_ID: params.row.CAMP_ID,
                  action: "UPDATE",
                  url: "addresponse",
                  comp: params.row,
                },
              })
            );
          }}
          showInMenu
        />,
        <GridActionsCellItem
          label="Delete"
          onClick={(e) => {
            deleteComponent(e, params.row);
          }}
          showInMenu
        />,
      ],
    },
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
  async function pageInfo() {
    await DaynmicApicall(`/appuser/getcomponetbyid/${props.activemenu.keypointer}/${props.activemenu.componentid}`, '', 'get', userInfo.data[0].UserToken).then((data) => {
      setpageData(data[0].DATA);
    })
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

  useEffect(async () => {
    await getResponseList();
    await pageInfo();
  }, []);

  return (
    <>
      <div className="container-fluid py-4 bg ">
        <div className="row">
          <div className="card col-xl-12 bg-dark">
            <div className="row row-cols-md-2 m-2 p-2 row-cols-lg-2 row-cols-xl-2 font-weight-bold">
              <span className="text-left text-light ">{pageData?.title}</span>
              <span className="text-right">
                <button
                  type="btn"
                  className="btn btn-success btn-sm float-right"
                  onClick={() => {
                    dispatch(
                      setParems({
                        data: { action: "INSERT", url: "addresponse" },
                      })
                    );
                  }}
                >
                  {pageData?.addBtn?.label}
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="card card-body border-light shadow">
        <div className="table-settings mb-4">
          <div className="my-2">
            <DataGrid
              //loading={loadingData}
              getRowId={(r) => r.resp_code}
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
