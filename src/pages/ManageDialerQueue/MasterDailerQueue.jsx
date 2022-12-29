import React, { useEffect, useState } from "react";
import { setParems } from "../../redux/Campaign";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import {Stack } from "@mui/material";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import DaynmicApicall from "../../utils/function";

const MasterDailerQueue = (props) => {
  const { userInfo } = useSelector((state) => state?.user?.value);
  const authToken = userInfo.token;
  const [filterColumn, setFilterColumn] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const dispatch = useDispatch();
  const Header = { headers: { Authorization: userInfo.data[0].UserToken } };
  const [getQueue, setqueue] = useState("");
  const getqueueList = async () => {
    let Info = await DaynmicApicall(
      `/dialer/getdialerqueue`,
      "",
      "get",
      userInfo.data[0].UserToken
    );
    setqueue(Info);
    // console.log(Info,"data")
  };

  // delete function
  // async function deleteComponent(e, compInfo) {
  //   e.preventDefault();
  //   compInfo.mode = "DELETE";
  //   console.log(compInfo);
  //   const updatePromise = api.post("appuser/managemenumaster/", Header);
  //   toast
  //     .promise(updatePromise, {
  //       loading: "Deleting User",
  //       success: (updatePromise) => {
  //         return updatePromise.data.message;
  //       },
  //       error: "Error, Something went worng",
  //     })
  //     .then(() => {
        
  //     });
  // }

  const columns = [
    {
      field: "name",
      headerName: "Queue_Id",
      editable: true,
      minWidth: 10,
      flex: 1,
    },
    {
      field: "queue_name",
      headerName: "Dialer Queue Name",
      editable: true,
      minWidth: 100,
      flex: 1,
    },
    {
      field: "timeout",
      headerName: "Duration ",
      editable: true,
      minWidth: 20,
      flex: 1,
    },
    {
      field: "strategy",
      headerName: "Strategy",
      editable: true,
      width: 50,
      flex: 1,
    },
    {
      field: "annoucement_path",
      headerName: "Announcement Path",
      editable: true,
      width: 140,
      flex: 1,
    },
    {
      field: "Action",
      type: "actions",
      headerName: "Action",
      width: 80,
      flex: 1,
      getActions: (params) => [
        <GridActionsCellItem
          label="Edit"
          onClick={(e) => {
              console.log(params.row,"divyanshiiiii")
            dispatch(
              setParems({
                data: {
                  comp1: params.row.comp1,
                  action: "UPDATE",
                  url: "managedialerq",
                  comp1: params.row,
                },
              })
            );
          }}
          showInMenu
        />,
        <GridActionsCellItem
        label="Advance Edit"
        onClick={(e) => {
          // deleteComponent(e, params.row);
        }}
        showInMenu
      />,
        <GridActionsCellItem
          label="Delete"
          onClick={(e) => {
            // deleteComponent(e, params.row);
          }}
          showInMenu
        />,
      ],
    },
  ];
  useEffect(() => {
    getqueueList();
  }, []);
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

  return (
    <>
    <div className="container-fluid py-4 bg ">
    <div className="row">
      <div className="card col-xl-12 bg-dark">
        <div className="row row-cols-md-2 m-2 p-2 row-cols-lg-2 row-cols-xl-2 font-weight-bold">
          <span className="text-left text-light ">Manage Dialer Queue</span>
          <span className="text-right">
            <button
              type="btn"
              className="btn btn-success btn-sm float-right"
              onClick={() => {
                dispatch(
                  setParems({ data: { action: "INSERT", url: "managedialerq" } })
                );
              }}
            >
            Add Dialer Queue
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>        
            <div className="card card-body  border-light shadow ml-4">
              <div className=" border-light shadow mt-2">
                <div className="table-settings mb-4">
                  <div className="my-2">
                    <DataGrid
                      getRowId={(r) =>r.name}
                      rows={getQueue}
                      columns={columns}
                      pageSize={10}
                      paginationMode="server"
                      autoHeight={true}
                      className="bg-white"
                      onFilterModelChange={onFilterChange}
                      components={{
                        Toolbar: CustomToolbar,
                      }}
                      density="compact"
                    />
                  </div>
                </div>
              </div>
            </div>   
    </>
  );
};
export default MasterDailerQueue;








































