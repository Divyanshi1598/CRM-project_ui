import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { setParems } from "../../redux/Campaign";
import DaynmicApicall from "../../utils/function";

export default function MasterGlobalDailer(props) {
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);
  const [tableData, setTableData] = useState([]);
  const dispatch = useDispatch();
  const Header = { headers: { Authorization: userInfo.data[0].UserToken } };
  const [pageData, setpageData] = useState("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    async function pageInfo() {
      await DaynmicApicall(`/appuser/getcomponetbyid/${props.activemenu.keypointer}/${props.activemenu.componentid}`, '', 'get', userInfo.data[0].UserToken).then((data) => {
        setpageData(data[0].DATA);
      })
    }
    await pageInfo();
  }, [userInfo.data]);
  async function getDailerList() {
    await DaynmicApicall(`appuser/getdialerglobalparameter`, '', 'get', userInfo.data[0].UserToken).then((res) => {
      setTableData(res);
    })
  }
  async function deleteComponent(e, compInfo) {
    e.preventDefault();
    compInfo.mode = "DELETE";
    const updatePromise = api.post("appuser/managedialerparameter", Header);
    toast
      .promise(updatePromise, {
        loading: "Deleting User",
        success: (updatePromise) => {
          return updatePromise.data.message;
        },
        error: "Error, Something went worng",
      })
      .then(() => {
        getDailerList();
      });
  }

  const columns = [
    {
      field: "server_host_name",
      headerName: "Server host name",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "server_local_ip",
      headerName: "Server Local IP",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "server_public_ip",
      headerName: "Server Public IP",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "db_user",
      headerName: "Dialer Database User",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "user_pwd",
      headerName: "Dialer Database PWD",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "database_name",
      headerName: "Dialer Database Name",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "server_port",
      headerName: "Dialer Server Port",
      minWidth: 150,
      flex: 1,
    },
    { field: "ami_username", headerName: "EMI User ", minWidth: 150, flex: 1 },
    { field: "ami_password", headerName: "EMI Pwd", minWidth: 150, flex: 1 },
    { field: "ami_port", headerName: "EMI Port", minWidth: 150, flex: 1 },
    { field: "wss_url", headerName: "WSS Url", minWidth: 150, flex: 1 },
    { field: "wss_path", headerName: "WSS Path", minWidth: 150, flex: 1 },
    { field: "wss_port", headerName: "WSS Port", minWidth: 150, flex: 1 },
    { field: "is_active", headerName: "Status", minWidth: 150, flex: 1 },
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
                  url: "masterglobal",
                  user: params.row,
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

  useEffect(async () => {
    await getDailerList();
  }, [""]);

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
                        data: { action: "INSERT", url: "masterglobal" },
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
           
              getRowId={(r) => r.server_local_ip}
              rows={tableData}
              columns={columns}
              pageSize={10}
              paginationMode="server"
              autoHeight={true}
              className="bg-white"
              density="compact"
            />
          </div>
        </div>
      </div>
    </>
  );
}
