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

export default function ManageUIComponentMaster(props) {
  const navigate = useNavigate();
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);
  const authToken = userInfo.token;
  const [campList, setCampList] = useState([]);
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
  async function getCampiginList(componentid) {
    await DaynmicApicall(`appuser/getcomponetbyid/${componentid}/ALL`, '', 'get', userInfo.data[0].UserToken).then((res) => {
      setTableData(res);
    })
  }
  async function deleteComponent(e, compInfo) {
    e.preventDefault();
    compInfo.mode = "DELETE";
    const updatePromise = api.post(
      "appuser/managecomponent/",
      compInfo,
      Header
    );
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
    { field: "campname", headerName: "Camp Name", minWidth: 150, flex: 1 },
    { field: "componentname", headerName: "Comp Name", minWidth: 150, flex: 1 },
    { field: "comp_id", headerName: "Component ID", minWidth: 150, flex: 1 },
    { field: "CREATED_ON",headerName:"Created_On" ,minWidth: 200, flex: 1 },
    {
      field: "active",
      headerName: "Status",
      width: 200,
      flex: 1,
      renderCell: (params) =>
        params.value == "Y" ? (
          <Chip label="Active" color="success" size="small" />
        ) : params.value == "N" ? (
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
                  compid: params.row.comp_id,
                  action: "UPDATE",
                  url: "manageui",
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

  async function getCampaign(e) {
    api
      .get(`appuser/getcamp/ALL`, {
        headers: {
          Authorization: userInfo.data[0].UserToken, //the token is a variable which holds the token
        },
      })
      .then((res) => {
        let uniqueCamp = [
          ...new Map(
            res?.data?.data?.map((item) => [item["campname"], item])
          ).values(),
        ];
        setCampList(uniqueCamp);
      })
      .catch((error) => {
        toast.error(
          error.response.data.message ??
            error.message ??
            "OOPs, Something went wrong."
        );
      });
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

  useEffect(async () => {
    await getCampaign();
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
                      setParems({ data: { action: "INSERT", url: "manageui" } })
                    );
                  }}
                >
                  {" "}
                  {pageData?.addButton}
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="card card-body border-light shadow">
        <div className="row mt-3">
          <div className="mb-4">
            <label for="password">{pageData.dropDownName}</label>
            <select
              class="form-select"
              name="keypointer"
              aria-label="Default select example"
              onChange={async (e) => {
                await getCampiginList(e.target.value);
              }}
            >
              <option selected disabled>
                Select Campaign
              </option>
              {campList?.map((data) => (
                <option key={data.value} value={data.keypointer}>
                  {data.campname}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="table-settings mb-4">
          <div className="my-2">
            <DataGrid
              //loading={loadingData}
              getRowId={(r) => r.comp_id}
              rows={tableData}
              columns={columns}
              //rowCount={totalUsers}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 25, 50, 100]}
              //checkboxSelection
              //paginationMode="server"
              onFilterModelChange={onFilterChange}
              //onPageChange={handlePageChange}
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
