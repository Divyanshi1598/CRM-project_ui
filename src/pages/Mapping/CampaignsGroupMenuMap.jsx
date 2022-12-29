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
import { MultiSelect } from "../../components/formValidation/MultiSelect";
import { Form, Formik } from "formik";
import PageHeader from "../../components/PageHeader";
import Cardpopup from "../../components/formValidation/Cardpopup";
import DaynmicApicall from "../../utils/function";

export default function CampaignGroupMenuMap(props) {
  const navigate = useNavigate();
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);
  const [campList, setCampList] = useState([]);
  const [poetal, setPortal] = useState([]);
  const [menudata, setMenudata] = useState([]);
  const [userGroup, setuUerGroup] = useState();
  const [tableData, setTableData] = useState([]);
  const [filterColumn, setFilterColumn] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const dispatch = useDispatch();
  const Header = { headers: { Authorization: userInfo.data[0].UserToken } };
  let getApiconstat;
  const [pageData, setPageData] = useState("");
async function pageInfo() {
  await DaynmicApicall(`/appuser/getcomponetbyid/${props.activemenu.keypointer}/${props.activemenu.componentid}`, '', 'get', userInfo.data[0].UserToken).then((data) => {
    setPageData(data[0].DATA);
  })
}
  async function tableInfo() {
    getApiconstat = `appuser/getallusermapgroup`;
    api
      .get(getApiconstat, Header)
      .then((res) => {
        setTableData(res.data.data);
      })
      .catch((error) => {
        toast.error(
          error.response.data.message ??
          error.message ??
          "OOPs, something went wrong."
        );
      });
  }

  async function groupmenudata(campid, usergroup, setFieldValue) {
    api
      .get(`appuser/getmenumap/${campid}/${usergroup}`, {
        headers: {
          Authorization: userInfo.data[0].UserToken, //the token is a variable which holds the token
        },
      })
      .then((res) => {
        let response = res.data.data;
        let data = [];
        let a = response.map((d1) => {
          data.push(d1.menu_id);
        });
        Promise.all(a).then((values) => {
          setMenudata(data);
          setFieldValue(
            "menuid",
            poetal?.filter((v) => data.includes(v.value))
          );
        });
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        toast.error(
          error.response.data.message ??
          error.message ??
          "OOPs, Something went wrong."
        );
      });
  }

  const columns = [
    { field: "user_group", headerName: "User Group", minWidth: 150, flex: 1 },
    {
      field: "menu_display_name",
      headerName: "Menu Name",
      minWidth: 150,
      flex: 1,
    },
    { field: "campname", headerName: "Camp Name", minWidth: 150, flex: 1 },
    { field: "created_by",headerName: "Created_By", minWidth: 100, flex: 1 },
    {
      field: "is_active",
      headerName: "Status",
      width: 150,
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
          label={params.row.is_active === "Y" ? "Inactive" : "Active"}
          // {params.row.is_active === "Y" ? color="success" : "active"} 
          className={params.row.is_active === "Y" ? "text-warning" : "text-success"}
          onClick={async (e) => {
            let values = {
              "isactive": params.row.is_active === "Y" ? "N" : "Y",
              "campid": params.row.camp_id,
              "usergroup": params.row.user_group,
              "menuid": params.row.menu_id,
              "action": "UPDATE"
            }
            await manageusergroupmenumap(values)
          }} showInMenu />,

        <GridActionsCellItem
          label="Delete"
          data-bs-toggle="modal"
          data-bs-target={`#cardtoggeldel}`}
          size="sm" variant="white"
          onClick={async (e) => {
            console.log("DELETEValue")
            let values = {
              "isactive": params.row.is_active === "Y" ? "N" : "Y",
              "campid": params.row.camp_id,
              "usergroup": params.row.user_group,
              "menuid": params.row.menu_id,
              "action": "UPDATE"
            }
            await conformpopup()
            // alert("Click on OK for Delete")
            .then(async() =>{
            await manageusergroupmenumap(values)

            })
          }}
          showInMenu
        />,
      ],
    },
  ];

  async function conformpopup() {
    return (
      <Cardpopup data={{
        id: "del",
        name: "DELETE",
        Script: "Are You Want to delete this item"
      }} />
    )
  }

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
        let camp = uniqueCamp.map((item) => {
          return {
            value: item.campid,
            label: item.campname,
          };
        });
        setCampList(camp);
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        toast.error(
          error.response.data.message ??
          error.message ??
          "OOPs, Something went wrong."
        );
      });
  }
  async function manageusergroupmenumap(values) {
    const Info = api.post("appuser/managegroupmanumap/", values, {
      headers: { Authorization: userInfo.data[0].UserToken },
    });
    toast
      .promise(Info, {
        loading: "Authenticating member.",
        success: (Info) => {
          return Info.data.message;
        },
        error: (err) => {
          return (
            err?.response?.data?.errors ??
            err?.response?.data?.message ??
            err?.message ??
            "OOPs something went wrong."
          );
        },
      }).then(async () => {
        // window.location.reload(true)
        await tableInfo()
      })
  }

  async function portalmenu() {
    api
      .get(`appuser/getportalmenu`, {
        headers: {
          Authorization: userInfo.data[0].UserToken, //the token is a variable which holds the token
        },
      })
      .then((res) => {
        let data = res.data.data;
        let portel = [];
        portel = data.map((item) => {
          return {
            value: item.menu_id,
            label: item.menu_name,
          };
        });
        Promise.all(portel).then((values) => {
          setPortal(values);
        });
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        toast.error(
          error.response.data.message ??
          error.message ??
          "OOPs, Something went wrong."
        );
      });

    api
      .get(`/appuser/usergrpmaster/`, {
        headers: {
          Authorization: userInfo.data[0].UserToken, //the token is a variable which holds the token
        },
      })
      .then(async (res) => {
        let user = res.data.data.map((item) => {
          return {
            value: item.usergrpid,
            label: item.usergrpname,
          };
        });
        setuUerGroup(user);
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
    pageInfo();
    await tableInfo();
    await getCampaign();
    await portalmenu();
  }, []);

  let initial = {
    mapid: "NEW",
    campid: "",
    campname: "",
    usergroup: "",
    menuid: poetal?.filter((v) => menudata.includes(v.value)),
    templatedata: "{}",
    active: "Y",
    createdby: userInfo.data[0].userid,
    action_name: "INSERT",
  };
  const onSubmit = async (values, { resetForm }) => {
    let camp = values.campid;
    values.campid = camp.value;
    values.campname = camp.label;
    values.usergroup = values.usergroup.label;
    const Info = api.post("appuser/mapcampugroupmap/", values, {
      headers: { Authorization: userInfo.data[0].UserToken },
    });
    toast.promise(Info, {
      loading: "Campagin Adding..",
      success: (Info) => {
        return Info.data.message;
      },
      error: (err) => {
        return (
          err?.response?.data?.errors ??
          err?.response?.data?.message ??
          err?.message ??
          "OOPs something went wrong."
        );
      },
    });
  };
  
const PageData ={
  "multi1":{
    "label":"Campaign",
    "name":"campid"
  },
  "multi2":{
    "label":"User Group",
    "name":"usergroup"
  },
  "multi3":{
    "label":"Menu Id",
    "name":"menuid"
  },
  "btn1":"Map",
  "btn2":"Cancel"

}
  return (
    <>
      <PageHeader heading={pageData.Header} />

      <div className="card card-body border-light shadow">
        <div className="row mt-3">
          <div className="mb-4">
            <Formik initialValues={initial} onSubmit={onSubmit}>
              {(formik) => (
                <Form>
                  <div className="row mt-3">
                    <MultiSelect
                      label={PageData.multi1.label}
                      value={formik.values.campid}
                      name={PageData.multi1.name}
                      isMulti={false}
                      formik={formik}
                      options={campList}
                      onChange={(value) =>
                        formik.setFieldValue("campid", value)
                      }
                    />
                    <MultiSelect
                      label={PageData.multi2.label}
                      value={formik.values.usergroup}
                      name={PageData.multi2.label}
                      isMulti={false}
                      formik={formik}
                      options={userGroup}
                      onChange={async (value) => {
                        formik.setFieldValue("usergroup", value);
                        await groupmenudata(
                          formik.values.campid.value,
                          formik.values.usergroup.label,
                          formik.setFieldValue
                        );
                      }}
                    />
                    <MultiSelect
                      label={PageData.multi3.label}
                      value={formik.values.menuid}
                      name={PageData.multi3.label}
                      isMulti={true}
                      formik={formik}
                      options={poetal}
                      onChange={(value) =>
                        formik.setFieldValue("menuid", value)
                      }
                    />
                  </div>

                  <div className="d-flex justify-content-end w-100">
                    <button
                      type="submit"
                      className="btn btn-primary btn-sm m-2"
                    >
                      {PageData.btn1}
                    </button>
                    <button type="reset" className="btn btn-primary btn-sm m-2">
                     {PageData.btn2}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className="table-settings mb-4">
          <div className="my-2">
            <DataGrid
              getRowId={(r) => r.map_id}
              rows={tableData}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 25, 50, 100]}
              // checkboxSelection
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
      </div>
    </>
  );
}
