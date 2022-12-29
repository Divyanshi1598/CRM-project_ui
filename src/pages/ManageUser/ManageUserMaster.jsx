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

export default function ManageUserMaster(props) {
  const navigate = useNavigate();
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);
  const authToken = userInfo.token;
  const [tableData, setTableData] = useState([]);
  const [filterColumn, setFilterColumn] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const dispatch = useDispatch();
  const Header = { headers: { Authorization: userInfo.data[0].UserToken } };
  const [pageData, setPageData] = useState("");


  async function pageInfo() {
    await DaynmicApicall(`/appuser/getcomponetbyid/${props.activemenu.keypointer}/${props.activemenu.componentid}`, '', 'get', userInfo.data[0].UserToken).then((data) => {
      setPageData(data[0].DATA);
    })
  }
 
  async function deleteUser(e, userInfo) {
    e.preventDefault();
    userInfo.mode = "DELETE";
    const updatePromise = api.post("appuser/manageuser/", userInfo, Header);
    toast
      .promise(updatePromise, {
        loading: "Deleting User",
        success: (updatePromise) => {
          return updatePromise.data.message;
        },
        error: "Error, Something went worng",
      })
      .then(() => {
        getMembersList();
      });
  }

  async function resetPassword(values) {
    const updatePromise = api.post(
      `appuser/managepassword/`, values,
      Header
    );
    toast
      .promise(updatePromise, {
        loading: "Password Updating....",
        success: (updatePromise) => {
          return updatePromise.data.message;
        },
        error: "Error, Something went worng",
      })
      .then(() => {
        getMembersList();
      });
  }

  async function releaseUser(values) {
    const updatePromise = api.put(
      `appuser/lgout/`, values,
      Header
    );
    toast
      .promise(updatePromise, {
        loading: "User Releasing....",
        success: (updatePromise) => {
          return updatePromise.data.message;
        },
        error: "Error, Something went worng",
      })
      .then(() => {
        getMembersList();
      });
  }
  const columns = [
    {
      field: "empid",
      headerName: "Employee Id",
      editable: true,
      minWidth: 100,
      flex: 1,
    },
    {
      field: "userid",
      headerName: "User Id",
      editable: true,
      minWidth: 100,
      flex: 1,
    },
    {
      field: "username",
      headerName: "User Name",
      editable: true,
      minWidth: 100,
      flex: 1,
    },
    {
      field: "userrole",
      headerName: "User Role",
      editable: true,
      minWidth: 100,
      flex: 1,
    },
    { field: "userlastlogin", headerName: "Last Login", width: 100, flex: 1 },
    {
      field: "agent_pref_lan",
      headerName: "Language",
      editable: true,
      width: 120,
      flex: 1,
    },
    {
      field: "active",
      headerName: "Status",
      width: 80,
      flex: 1,
      renderCell: (params) =>
        params.value === "Y" ? (
          <Chip label="Active" color="success" size="small" />
        ) : params.value === "N" ? (
          <Chip label="InActive" color="warning" size="small" />
        ) : (
          <Chip label="Block" size="small" />
        ),
    },
    {
      field: "Action",
      type: "actions",
      width: 80,
      flex: 1,
      getActions: (params) => [
        <GridActionsCellItem
          label="Edit"
          onClick={(e) => {
            dispatch(
              setParems({
                data: {
                  userid: params.row.userid,
                  action: "UPDATE",
                  url: "manageuser",
                  user: params.row,
                },
              })
            );
          }}
          showInMenu
        />,
        <GridActionsCellItem
          label="Reset Password"
          onClick={(e) => {
            let values = {
              userid: params.row.userid,
              pwdtype: "RESET_PASSWORD"
            }
            resetPassword(values)
          }}
          showInMenu
        />,
        <GridActionsCellItem
          label="Release User"
          onClick={(e) => {
            let values = {
              userid: params.row.userid,
            }
            releaseUser(values)
          }}
          showInMenu
        />,
        <GridActionsCellItem
          label="Delete"
          onClick={(e) => {
            deleteUser(e, params.row);
          }}
          showInMenu
        />,
      ],
    },
  ];


  async function getMembersList() {
    await DaynmicApicall(`appuser/userlist/${props.activemenu.keypointer}/ALL`, '', 'get', userInfo.data[0].UserToken).then((res) => {
      setTableData(res);
    })
  }
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
    pageInfo();
    getMembersList();
  }, []);

  return (
    <>
      <div className="container-fluid py-4 bg ">
        <div className="row">
          <div className="card col-xl-12 bg-dark">
            <div className="row row-cols-md-2 m-2 p-2 row-cols-lg-2 row-cols-xl-2 font-weight-bold">
              <span className="text-left text-light "  title="Manage User"
              data-toggle="tooltip" >{pageData.title}</span>
              <span className="text-right">
                <button
                  type="btn"
                  title={pageData.addUserBtn}
                  data-toggle="tooltip" 
                  className="btn btn-success btn-sm float-right"
                  onClick={() => {
                    dispatch(
                      setParems({
                        data: { action: "INSERT", url: "manageuser" },
                      })
                    );
                  }}
                >
                  {pageData.addUserBtn}
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="card card-body border-light shadow">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mt-2">
          <div className="d-block mb-4 mb-md-0">
            <h2  
            title={pageData.heading}
            data-toggle="tooltip"  className="h4">{pageData.heading}</h2>
          </div>
        </div>
        <div className="table-settings mb-4">
          <div className="my-2">
            <DataGrid
            style={{overflow:'hidden',whiteSpace:"nowrap",textOverflow:"ellipsis"}}
            title="gstadfggg"
            data-toggle="tooltip" 
              getRowId={(r) => r.empid}
              rows={tableData}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 25, 50, 100]}
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
