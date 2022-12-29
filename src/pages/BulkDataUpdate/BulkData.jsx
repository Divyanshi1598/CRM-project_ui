import React from "react";
import {
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Chip, Stack } from "@mui/material";
import { useState } from "react";
import "../../pages/BulkDataUpdate/Style.css";
import { MultiSelect } from "../../components/formValidation/MultiSelect";
import { TextField } from "../../components/formValidation/TextField";
import PageHeader from "../../components/PageHeader";
import { Form, Formik } from "formik";

import * as XLSX from "xlsx";

export const BulkData = () => {
  const [filterColumn, setFilterColumn] = useState("");
  const [filterValue, setFilterValue] = useState("");

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
  const handleshowdata = (e) => {
    const showUser = e.target.value;
    console.log(showUser);
  };

  const onFilterChange = React.useCallback(async (filterModel) => {
    if (
      filterModel?.items?.[0]?.value &&
      filterModel?.items?.[0]?.value.length > 0
    ) {
      setFilterColumn(filterModel?.items?.[0]?.columnField);
      setFilterValue(filterModel?.items?.[0]?.value);
    }
  }, []);
  const tableData = [];
  const columns = [
    { field: "campname", headerName: "Camp Name", minWidth: 150, flex: 1 },
    { field: "componentname", headerName: "Comp Name", minWidth: 150, flex: 1 },
    { field: "comp_id", headerName: "Component ID", minWidth: 150, flex: 1 },
    { field: "CREATED_ON", minWidth: 200, flex: 1 },
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
        <GridActionsCellItem label="Edit" onClick={(e) => {}} showInMenu />,

        <GridActionsCellItem label="Delete" showInMenu />,
      ],
    },
  ];

  const exelOpation = [
    { value: "1", label: "Agent Deatail" },
    { value: "2", label: "customer Deatail" },
    { value: "3", label: "Team-Lead Deatail" },
    { value: "4", label: "Manager Deatail" },
  ];

  async function getexceinfo(value) {
    console.log("valueee: ", value);
    var wb = XLSX.readFile(value);
    var sheetName = wb.SheetNames[0];
    var sheetValue = wb.Sheets[sheetName];
    var excelData = XLSX.utils.sheet_to_json(sheetValue);
    console.log("excelData", excelData);
  }

  const initial = {
    exceltype: "",
    file: "",
  };
  const PageData ={
   "multi" :{
      "lable":"Upload Form",
      "name":"exceltype"
    },
    "textFeild" :{
      "label":"Uplode file",
      "placeholder":"upload your file",
   
      "type":"file",
      "name":"file",
      "id":"myDropify",
    },
    "btn1":"Upload",
    "btn2":"Cancel"
  }

  return (
    <>
      <PageHeader heading="DATA UPLOAD" />
      <div className="card card-body border-light shadow m-3">
        <div className="row mt-3">
          <div className="justify-content-center mt-1 mb-4">
            <Formik initialValues={initial}>
              {(formik) => (
                <Form>
                  <div className="row mt-3">
                    <MultiSelect
                      label={PageData.multi.lable}
                      value={formik.values.exceltype}
                      name={PageData.multi.name}
                      isMulti={false}
                      options={exelOpation}
                      onChange={(value) =>
                        formik.setFieldValue("exceltype", value)
                      }
                    />
                  </div>
                  <div className="  main-wrapper p-0 mb-3">
                    <div className="page-wrapper ml-0 ">
                      <div className="container my-auto p-0 mb-5 ">
                        <div className="card shadow-lg">
                          <div className="card-body">
                            <div className="row d-flex align-items-center">
                              <div className="justify-content-center col-12 col-sm-6 col-sm-6">
                                <div className="col">
                                  <div className="form-group files">
                                    <TextField
                                      className="border"
                                      label={PageData.textFeild.label}
                                      placeholder={PageData.textFeild.placeholder}
                                      type={PageData.textFeild.type}
                                      name={PageData.textFeild.name}
                                      id={PageData.textFeild.id}
                                      onChange={(e) => {
                                        getexceinfo(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="d-flex justify-content-end mt-1 ml-2">
            <button type="submit" className="btn btn-primary p-2 m-2">
             {PageData.btn1}
            </button>
            <button type="reset" className="btn btn-primary p-2 m-2">
             {PageData.btn2}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
