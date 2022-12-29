import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/api";
import { toast } from "react-hot-toast";
import { Toggle } from "../../components/formValidation/Toggle";
import { MultiSelect } from "../../components/formValidation/MultiSelect";
import { TextArea } from "../../components/formValidation/TextArea";
import { useEffect } from "react";
import { setParems } from "../../redux/Campaign";
import DaynmicApicall from "../../utils/function";

export default function EditUI(props) {
  const { userInfo } = useSelector((state) => state?.user?.value);
  const { campdetail, component } = useSelector((state) => state.campaign);
  const dispatch = useDispatch();
  // const [compData, setCompData] = useState({});
  // const [campData, setCampData] = useState("");
  const [pageData, setPageData] = useState("");
  let allComps = [];
  let allCamps = [];
  if (campdetail && campdetail.length > 0) {
    allCamps = campdetail.map((item) => {
      return {
        value: item.campid,
        label: item.campname,
      };
    });
  }
  if (component && component?.length > 0) {
    allComps = component?.map((item) => {
      return {
        value: `${item.componentid}`,
        label: item.componentname,
      };
    });
  }
  async function pageInfo() {
    await DaynmicApicall(`/appuser/getcomponetbyid/${props.data.activeMenu.keypointer}/${props.data.activeMenu.subcompid}`, '', 'get', userInfo.data[0].UserToken).then((data) => {
      setPageData(data[0].DATA);
    })
  }
  useEffect(async () => {
    await pageInfo();
  }, []);

  let action = props?.data?.paremsData.action === "UPDATE";
  const initial = {
    id: action ? props.data.paremsData.comp.uid : "NEW",
    keypointer: action ? props.data.paremsData.comp.keypointer : props.data.activeMenu.keypointer,
    campname: action
      ? allCamps?.find((v) => v.label === props?.data.paremsData.comp.campname)
      : "",
    compid: action
      ? allComps?.find((v) => v.value === `${props?.data?.paremsData.comp.comp_id}`)
      : "",
    compdata: action ? JSON.stringify(props?.data?.paremsData.comp.DATA) : "",
    active: action? props?.data?.paremsData.comp.active === "Y"? true : false : true,
    createdby: userInfo.data[0].userid,
    action_name: props.data.paremsData.action,
  };
  const onSubmit = async (values, { resetForm }) => {
    values.active = values.active === true ? "Y" : "N";
    let camp = values.campname;
    let comp = values.compid;
    values.compid = comp.value;
    values.campname = camp.label;
    values.compid = comp.value;
    if (props.data.paremsData.action === "INSERT") {
      const Info = api.post("appuser/managecomponent/", values, {
        headers: { Authorization: userInfo.data[0].UserToken },
      });
      toast
        .promise(Info, {
          loading: "Adding",
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
        })
        .then(() => {
          dispatch(setParems({ data: "" }));
        });
    } else {
      const Info = api.post("appuser/managecomponent/", values, {
        headers: { Authorization: userInfo.data[0].UserToken },
      });
      toast
        .promise(Info, {
          loading: "Updating",
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
        })
        .then(() => {
          dispatch(setParems({ data: "" }));
        });
    }
  };
  return (
    <>
      {Object.keys(pageData).length > 0 ? (
        <Formik
          initialValues={initial}
          // validationSchema={validate}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <div className="card card-body border-light shadow-sm mb-4">
              <h6 className="text-muted mb-3">
                {" "}
                {props?.data?.paremsData.action === "INSERT"
                  ? pageData?.title
                  : "Update"}
              </h6>
              <hr />
              <Form>
                <div className="row mt-3">
                  <MultiSelect
                    label={pageData?.campname?.label}
                    name={pageData?.campname?.name}
                    defaultValue={initial.campname}
                    tooltip={pageData?.campname?.tooltip}
                    placeholder={pageData?.campname?.placeholder}
                    isMulti={false}
                    value={formik?.values?.campname}
                    formik={formik}
                    options={allCamps}
                    disabled={props?.data?.paremsData.action === "UPDATE"}
                    onChange={(value) => {
                      formik.setFieldValue("campname", value);
                    }}
                  />
                  <MultiSelect
                    label={pageData?.compid?.label}
                    defaultValue={initial.compid}
                    name={pageData?.compid?.name}
                    value={formik?.values?.compid}
                    isMulti={false}
                    formik={formik}
                    options={allComps}
                    onChange={(value) => formik.setFieldValue("compid", value)}
                  />
                </div>
                <TextArea
                  rows="7"
                  label={pageData?.compData?.label}
                  default={formik.values.compdata}
                  name={pageData?.compData?.name}
                  type={pageData?.compData?.type}
                  tooltip={pageData?.compData?.tooltip}
                  placeholder={pageData?.compData?.placeholder}
                />
                <Toggle
                  label={pageData?.Active?.label}
                  name={pageData?.Active?.name}
                  key={pageData?.Active?.key}
                  type={pageData?.Active?.type}
                  id={pageData?.Active?.id}
                  defaultChecked={formik.values.active}
                  onChange={(e) =>
                    formik.setFieldValue("active", e.target.checked)
                  }
                />
                <div className="d-flex justify-content-end mt-1">
                  <button
                    type="submit"
                    className="btn btn-primary p-2 m-2"
                    style={pageData?.button?.style}
                  >
                    {pageData?.button?.label}
                  </button>
                  <button
                    type="reset"
                    className="btn btn-primary p-2 m-2"
                    style={pageData?.cancelButton?.style}
                  >
                    {pageData?.cancelButton?.label}
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      ) : (
        ""
      )}
    </>
  );
}
