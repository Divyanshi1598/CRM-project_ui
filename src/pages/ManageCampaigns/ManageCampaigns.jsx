import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Chip, Stack } from "@mui/material";
import api from "../../utils/api";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { setParems } from "../../redux/Campaign";
import { useDispatch, useSelector } from "react-redux";
import DaynmicApicall from "../../utils/function";
import ManageServerConfig from "./ManageServerConfig";

export default function ManegeCampaigns(props) {
  const { userInfo } = useSelector((state) => state?.user?.value);
  const [tableData, setTableData] = useState([]);
  const [filterColumn, setFilterColumn] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [rowdata, setRowdata] = useState('')
  const dispatch = useDispatch();
  const [pageData, setpageData] = useState("");

  const Header = { headers: { Authorization: userInfo.data[0].UserToken } };
  async function pageInfo() {
    await DaynmicApicall(`/appuser/getcomponetbyid/${props?.activemenu?.keypointer}/${props?.activemenu?.componentid}`, '', 'get', userInfo.data[0].UserToken).then((data) => {
      setpageData(data[0].DATA);
    })
  }
  useEffect(async () => {
    await pageInfo();
  }, []);
  async function getCampiginList() {
    await DaynmicApicall(`appuser/campmaster`, '', 'get', userInfo.data[0].UserToken).then((res) => {
      setTableData(res);
    })
  }
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
        getCampiginList();
      });
  }

  const columns = [
    {
      field: "display_name",
      headerName: "Camp Display Name",
      minWidth: 100,
      flex: 1,
    },
    { field: "campname", headerName: "Camp Name", minWidth: 100, flex: 1 },
    { field: "campid", headerName: "Campaign ID", minWidth: 75, flex: 1 },
    { field: "imageurl", headerName: "Image Url ", minWidth: 300, flex: 1 },

    {
      field: "isactive",
      headerName: "Status",
      width: 100,
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
                  url: "managecamp",
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
        <GridActionsCellItem
          label="Server Configraction"
          // className={`bg-${data.resp_color} text-white fw-bold`}
          // className={`bg-${color[data.resp_level]} text-white fw-bold`}
          title="Server Configraction"
          data-toggle="tooltip"
          data-bs-toggle="modal"
          data-bs-target="#cardtoggel1"
          size="sm" variant="white"
          showInMenu
          onClick={(e) => {
            setRowdata(params.row)
          }}
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

  useEffect(async () => {
    await getCampiginList();
  }, []);

  return (
    <>

      {rowdata && (<ManageServerConfig rowdata={rowdata} />)}
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
                        data: { action: "INSERT", url: "managecamp" },
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
              getRowId={(r) => r.campid}
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
