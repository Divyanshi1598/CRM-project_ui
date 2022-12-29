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

export default function ManageParameter(props) {
  const navigate = useNavigate();
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);
  const authToken = userInfo.token;
  const [tableData, setTableData] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [filterColumn, setFilterColumn] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [pageData, setpageData] = useState("");

  const dispatch = useDispatch();
  const Header = { headers: { Authorization: userInfo.data[0].UserToken } };
  async function deleteUser(e, Info) {
    e.preventDefault();
    Info.action_name = "DELETE";
    Info.keypointer = props.activemenu.keypointer;
    const updatePromise = api.post(`prm/managatsparameter`, Info, Header);
    toast
      .promise(updatePromise, {
        loading: "Deleting User",
        success: (updatePromise) => {
          return updatePromise.data.message;
        },
        error: "Error, Something went worng",
      })
      .then(() => {
        getParameter();
      });
  }
  async function pageInfo() {
    await DaynmicApicall(`/appuser/getcomponetbyid/${props.activemenu.keypointer}/${props.activemenu.componentid}`, '', 'get', userInfo.data[0].UserToken).then((data) => {
      setpageData(data[0].DATA);
    })
  }

  const columns = [
    { field: "paracode", headerName: " Parameter Code ", width: 150 },
    { field: "paravalue", headerName: " Parameter Value ", width: 150 },
    {
      field: "paradesc",
      headerName: "Para. Description.",
      width: 300,
    },
    {
      field: "active_status",
      headerName: "Status",
      width: 250,
      flex: 1,
      renderCell: (params) =>
        params.value === 1 ? (
          <Chip label="Active" color="success" size="small" />
        ) : params.value === 0 ? (
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
                  url: "managatsparameter",
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
            deleteUser(e, params.row);
          }}
          showInMenu
        />,
      ],
    },
  ];


  async function getParameter(key) {
    await DaynmicApicall(`prm/getParamdata/ALL/${key}`, '', 'get', userInfo.data[0].UserToken).then((res) => {
      setTableData(res);
    })
  }
  async function getParaGroup(e) {
    await DaynmicApicall(`prm/getparameterall/PARA_CODE/PARA_PROP`, '', 'get', userInfo.data[0].UserToken).then((res) => {
      let uniqueCamp = [
        ...new Map(
          res?.map((item) => [item["para_prop"], item])
        ).values(),
      ];
      setGroupList (uniqueCamp);
    })
  }

  useEffect(async () => {
    await pageInfo();
    await getParaGroup();
    await getParameter();
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
              <span className="text-left text-light ">{pageData.title}</span>
              <span className="text-right">
                <button
                  type="btn"
                  className="btn btn-success btn-sm float-right"
                  onClick={() => {
                    dispatch(
                      setParems({
                        data: { action: "INSERT", url: "managatsparameter" },
                      })
                    );
                  }}
                >
                  {pageData.addButton}
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="card card-body border-light shadow">
        <div className="row mt-3">
          <div className="mb-4">
            <label for="password">{pageData.label}</label>
            <select
              class="form-select"
              name="keypointer"
              aria-label="Default select example"
              onChange={async (e) => {
                await getParameter(e.target.value);
              }}
            >
              <option selected disabled>
                {" "}
                {pageData.option}
              </option>
              {groupList?.map((data) => (
                <option key={data.value} value={data.para_prop}>
                  {data.para_prop}
                </option>
              ))}
            </select>
          </div>
        </div>
        {tableData.length > 0 ? (
          <div className="table-settings mb-4">
            <div className="my-2">
              <DataGrid
                //loading={loadingData}
                getRowId={(r) => r.paracode}
                rows={tableData}
                columns={columns}
                //rowCount={totalUsers}
                pageSize={10}
                rowsPerPageOptions={[10, 25, 25, 50, 100]}
                onFilterModelChange={onFilterChange}
                autoHeight={true}
                className="bg-white"
                components={{
                  Toolbar: CustomToolbar,
                }}
                density="compact"
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
