import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import toast from "react-hot-toast";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setParems } from "../../redux/Campaign";
import api from "../../utils/api";
import { useRef } from "react";
import DaynmicApicall from "../../utils/function";

export default function ManageScripts(props) {
  const navigate = useNavigate();
  let ref = useRef();
  const { userInfo } = useSelector((state) => state?.user?.value);
  const [tableData, setTableData] = useState([]);
  const [showMasterScript, setshowMasterScript] = useState(false);
  const [masterScript, setMasterScript] = useState([]);
  const [filterColumn, setFilterColumn] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const dispatch = useDispatch();

  const Header = { headers: { Authorization: userInfo.data[0].UserToken } };


  async function getscriptlist() {
    await DaynmicApicall(`mcrmdlr/agentscripts/${props.activemenu.campid}`, '', 'get', userInfo.data[0].UserToken).then((res) => {
      setTableData(res);
    })
  }
  async function getmasterscript() {
    await DaynmicApicall(`mcrmdlr/getmasterscript/`, '', 'get', userInfo.data[0].UserToken).then((res) => {
      setMasterScript(res);
    })
  }

  useEffect(async () => {
    await getscriptlist();
    await getmasterscript();
  }, []);

  async function deleteComponent(e, compInfo) {
    e.preventDefault();
    compInfo.mode = "DELETE";
    const updatePromise = api.post("appuser/setcampmaster/", Header);
    toast
      .promise(updatePromise, {
        loading: "Deleting User",
        success: (updatePromise) => {
          return updatePromise.data.message;
        },
        error: "Error, Something went worng",
      })
      .then(() => {
        getscriptlist();
      })
      .catch((error) => {
        toast.error(
          error?.response?.data.message ??
          error?.message ??
          "OOPs, something went wrong."
        );
      });
  }

  const pageData = {
    title: "Manage Agent Scripts",
    addBtn: {
      label: "Add Script",
    },
  };

  let columns = [
    { field: "process_id", headerName: "Process_Id", minWidth: 50, flex: 1 },
    { field: "script_code", headerName: "Script Code", minWidth: 50, flex: 1 },
    {
      field: "script_language",
      headerName: "Script Language",
      minWidth: 75,
      flex: 1,
    },
    { field: "script_temp_body", headerName: "Script", minWidth: 100, flex: 1 },
    {
      field: "script_variable_name",
      headerName: "Variable Name",
      minWidth: 100,
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
          label={showMasterScript === false ? "Edit" : "Verify"}
          onClick={(e) => {
            dispatch(
              setParems({
                data: {
                  CAMP_ID: params.row.CAMP_ID,
                  action: "UPDATE",
                  url: "managescripts",
                  rowdata: params.row,
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

  let mastercol = [
    { field: "script_code", headerName: "Script Code", minWidth: 50, flex: 1 },
    {
      field: "script_cate_name",
      headerName: "Script Category Name",
      minWidth: 50,
      flex: 1,
    },
    {
      field: "script_language",
      headerName: "Script Language",
      minWidth: 75,
      flex: 1,
    },
    { field: "process_id", headerName: "Process", minWidth: 100, flex: 1 },
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
            dispatch(
              setParems({
                data: {
                  CAMP_ID: params.row.CAMP_ID,
                  action: "UPDATE",
                  url: "managescripts",
                  rowdata: params.row,
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
              <span className="text-left text-light ">{pageData?.title}</span>
              <span className="text-right">
                <button
                  type="btn"
                  className="btn btn-success btn-sm float-right"
                  onClick={() => {
                    dispatch(
                      setParems({
                        data: { action: "INSERT", url: "managescripts" },
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
        <div className="row row-cols-md-2 row-cols-lg-2 row-cols-xl-2 font-weight-bold">
          <span className="text-left text-dark ">
            {showMasterScript === true
              ? "Script Master List"
              : "CRM Details Scripts"}
          </span>
          <span className="text-end text-light">
            <button
              type="btn"
              className="btn btn-success btn-sm float-right"
              onClick={(e) =>
                setshowMasterScript(showMasterScript === true ? false : true)
              }
            >
              {showMasterScript === false
                ? "Script Master List"
                : "CRM Details Scripts List"}
            </button>
          </span>
        </div>
        <div className="table-settings mb-4">
          <div className="my-2">
            <DataGrid
              //loading={loadingData}
              getRowId={(r) => r.sno}
              rows={showMasterScript === false ? tableData : masterScript}
              columns={showMasterScript === false ? columns : mastercol}
              // rowCount={
              //   showMasterScript === false
              //     ? tableData.length
              //     : masterScript.length
              // }
              pageSize={10}
              rowsPerPageOptions={[10, 25, 25, 50, 100]}
              // paginationMode="server"
              // onFilterModelChange={onFilterChange}
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
