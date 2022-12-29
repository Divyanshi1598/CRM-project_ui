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
import DaynmicApicall from "../../utils/function";

export default function MapComanyBranchDepartment(props) {
  const navigate = useNavigate();
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);
  const [poetal, setPortal] = useState([]);
  const [menudata, setMenudata] = useState([]);
  const [branch, setBreanch] = useState([]);
  const [department, setDepartment] = useState([]);
  const [company, setCompany] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [filterColumn, setFilterColumn] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const dispatch = useDispatch();
  const [pageData, setPageData] = useState("");
  const Header = { headers: { Authorization: userInfo.data[0].UserToken } };
  let getApiconstat;
  async function tableInfo() {
    getApiconstat = `appuser/getcampBranchdep`;
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

  async function pageInfo() {
    await DaynmicApicall(`/appuser/getcomponetbyid/${props.activemenu.keypointer}/${props.activemenu.componentid}`, '', 'get', userInfo.data[0].UserToken).then((data) => {
      setPageData(data[0].DATA);
    })
  }


  // async function getBranchData() {
  //   await DaynmicApicall(`appuser/getmasterdata/vw_branch_master/*/1=1/para_code/`, '', 'get', userInfo.data[0].UserToken).then((res) => {
  //     let bData = [];
  //     bData = res.data.map((item) => {
  //       return {
  //         value: item.para_value,
  //         label: item.para_code,
  //       };
  //     });

  //     setBreanch(bData);
  //   })
  // }

  async function getBranchData() {
    api
      .get(`appuser/getmasterdata/vw_branch_master/*/1=1/para_code/`, {
        headers: {
          Authorization: userInfo.data[0].UserToken, //the token is a variable which holds the token
        },
      })
      .then(async (res) => {
        let bData = [];
        bData = await res.data.map((item) => {
          return {
            value: item.para_value,
            label: item.para_code,
          };
        });

        setBreanch(bData);
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
  async function getCompanyData() {
    api
      .get(`appuser/getmasterdata/vw_company_master/*/1=1/para_code/`, {
        headers: {
          Authorization: userInfo.data[0].UserToken, //the token is a variable which holds the token
        },
      })
      .then(async (res) => {
        let bData = [];
        bData = await res.data.map((item) => {
          return {
            value: item.para_value,
            label: item.para_code,
          };
        });

        setCompany(bData);
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
  async function getDepartmentData() {
    api
      .get(`appuser/getmasterdata/vw_department_master/*/1=1/para_code/`, {
        headers: {
          Authorization: userInfo.data[0].UserToken, //the token is a variable which holds the token
        },
      })
      .then(async (res) => {
        let bData = [];
        bData = await res.data.map((item) => {
          return {
            value: item.para_value,
            label: item.para_code,
          };
        });

        setDepartment(bData);
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

  useEffect(async () => {
    pageInfo();
    await getBranchData();
    await getCompanyData();
    await getDepartmentData();
  }, []);
  const columns = [
    { field: "company_code", headerName: "Company", minWidth: 150, flex: 1 },
    { field: "branch_code", headerName: "Branch", minWidth: 150, flex: 1 },
    {
      field: "services_code",
      headerName: "Department",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "is_active",
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
  ];

  async function portalmenu(url) {
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
    await tableInfo();
    await portalmenu();
  }, []);
  let initial = {
    mapid: "NEW",
    companycode: "",
    branchcode: "",
    servicecode: "",
    active: "Y",
    createdby: userInfo.data[0].userid,
    action_name: "INSERT",
  };
  const onSubmit = async (values, { resetForm }) => {
    values.companycode = values.companycode.value;
    values.branchcode = values.branchcode.value;

    const Info = api.post("appuser/mapping/", values, {
      headers: { Authorization: userInfo.data[0].UserToken },
    });
    toast.promise(Info, {
      loading: "Mapping..",
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
    title:"Mapping",
    "multi1":{
      "label":"Company",
      "name":"companycode"

    },
    "multi2":{
      "label":"Branch",
      "name":"branchcode"
    },
    "multi3":{
      "label":"Department",
      "name":"servicecode"
    },
    "btn1":"Map",
    "btn2":"Add Branch ",
    "btn3":"Cancle",
  }
  return (
    <>
      <PageHeader heading={pageData.title} />
      <div className="card card-body border-light shadow">
        <div className="card card-body border-light shadow m-3">
          <div className="row mt-3">
            <h5>{PageData.title}</h5>
            <hr />
            <div className="mb-4">
              <Formik initialValues={initial} onSubmit={onSubmit}>
                {(formik) => (
                  <Form>
                    <div className="row mt-3">
                      <MultiSelect
                        label={PageData.multi1.label}
                        value={formik.values.companycode}
                        name={PageData.multi1.name}
                        isMulti={false}
                        formik={formik}
                        options={company}
                        onChange={(value) =>
                          formik.setFieldValue("companycode", value)
                        }
                      />
                      <MultiSelect
                        label={PageData.multi2.label}
                        value={formik.values.branchcode}
                        name={PageData.multi2.name}
                        isMulti={false}
                        formik={formik}
                        options={branch}
                        onChange={async (value) => {
                          formik.setFieldValue("branchcode", value);
                        }}
                      />
                      <MultiSelect
                        label={PageData.multi3.label}
                        value={formik.values.servicecode}
                        name={PageData.multi3.name}
                        isMulti={true}
                        formik={formik}
                        options={department}
                        onChange={(value) =>
                          formik.setFieldValue("servicecode", value)
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
                      <button
                        type="reset"
                        className="btn btn-primary btn-sm m-2"
                      >
                      {PageData.btn2}
                      </button>
                      <button
                        type="reset"
                        className="btn btn-primary btn-sm m-2"
                      >
                      {PageData.btn3}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
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
            checkboxSelection
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
    </>
  );
}
