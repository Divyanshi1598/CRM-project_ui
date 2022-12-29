import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MultiSelect } from "../../components/formValidation/MultiSelect";
import { TextField } from "../../components/formValidation/TextField";
import { Toggle } from "../../components/formValidation/Toggle";
import { setParems } from "../../redux/Campaign";
import api from "../../utils/api";
import DaynmicApicall from "../../utils/function";

export default function AddMenu(props) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state?.user?.value);
  const [pageData, setpageData] = useState("");
  const MenuType = [
    { value: "MENU", label: "MENU" },
    { value: "NA", label: "NA" },
  ];


  async function pageInfo() {
    await DaynmicApicall(`/appuser/getcomponetbyid/${props.data.activeMenu.keypointer}/${props.data.activeMenu.subcompid}`, '', 'get', userInfo.data[0].UserToken).then((data) => {
      setpageData(data[0].DATA);
    })
  }
  useEffect(async () => {
    await pageInfo();
  }, []);
  let action = props?.data?.paremsData.action === "UPDATE";
  let initial = {
    menuid: action ? props?.data?.paremsData.comp.menu_id : "",
    menulable: action ? props?.data?.paremsData.comp.menu_display_name : "",
    menuname: action ? props?.data?.paremsData.comp.menu_name : "",
    parentmenuid: action ? props?.data?.paremsData.comp.parent_id : "",
    menutype: action ? MenuType?.find((v) => v.value === props.data.paremsData.comp?.menu_type): "",
    menusno: action ? props?.data?.paremsData.comp.display_menu_order : "",
    imgurl: action ? props?.data?.paremsData.comp.url : "",
    createdby: userInfo.data[0].userid,
    action_name: action ? "UPDATE" : "INSERT",
    active: action? props?.data?.paremsData.comp.is_active === "Y" ? true : false : true,
  };
  const validate = Yup.object({
    menuid: Yup.string().required("menu id is required"),
    menulable: Yup.string().required("menu lable is required"),
    menuname: Yup.string().required("menu name is required"),
    parentmenuid: Yup.string().required("parent menu id is required"),
    menusno: Yup.number().positive().required("menu sno is required"),
    imgurl: Yup.string().required("imgurl is required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    console.log("VALUES:  ", values);
    values.active = values.active === true ? "Y" : "N";

    values.menutype = values.menutype.value;
    if (props.data.paremsData.action === "INSERT") {
      const Info = api.post("appuser/managemenumaster/", values, {
        headers: { Authorization: userInfo.data[0].UserToken },
      });
      toast
        .promise(Info, {
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
        })
        .then(() => {
          dispatch(setParems({ data: "" }));
        });
    } else {
      const Info = api.post("appuser/managemenumaster/", values, {
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
          validationSchema={validate}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <div
              className="card card-body border-light shadow mb-4"
              style={pageData?.style}
            >
              <h6 className="text-light card-header rounded bg-dark">
                {" "}
                {props?.data?.paremsData?.action === "INSERT"
                  ? pageData.fieldsData.titleAdd
                  : pageData.fieldsData.titleUpdate}
              </h6>
              <Form>
                <div className="row mt-3">
                  <TextField
                    label={pageData.fieldsData.MenuLabel.label}
                    name={pageData.fieldsData.MenuLabel.name}
                    placeholder={pageData.fieldsData.MenuLabel.placeholder}
                    type={pageData.fieldsData.MenuLabel.type}
                  />
                  <TextField
                    label={pageData.fieldsData.MenuName.label}
                    name={pageData.fieldsData.MenuName.name}
                    placeholder={pageData.fieldsData.MenuName.placeholder}
                    type={pageData.fieldsData.MenuName.type}
                  />
                  <TextField
                    label={pageData.fieldsData.menuid.label}
                    name={pageData.fieldsData.menuid.name}
                    placeholder={pageData.fieldsData.menuid.placeholder}
                    type={pageData.fieldsData.menuid.type}
                  />
                  <TextField
                    label={pageData.fieldsData.parentmenuid.label}
                    name={pageData.fieldsData.parentmenuid.name}
                    placeholder={pageData.fieldsData.parentmenuid.placeholder}
                    type={pageData.fieldsData.parentmenuid.type}
                  />
                  <TextField
                    label={pageData.fieldsData.imgurl.label}
                    name={pageData.fieldsData.imgurl.name}
                    placeholder={pageData.fieldsData.imgurl.placeholder}
                    type={pageData.fieldsData.imgurl.type}
                  />
                  <MultiSelect
                    label={pageData.fieldsData.MenuType.label}
                    name={pageData.fieldsData.MenuType.name}
                    isMulti={false}
                    formik={formik}
                    options={MenuType}
                    placeholder={pageData.fieldsData.MenuType.label}
                    type={pageData.fieldsData.MenuType.type}
                    value={formik.values.menutype}
                    onChange={(value) =>formik.setFieldValue("menutype",value)}
                  />
                  <TextField
                    label={pageData.fieldsData.DisplayOrder.label}
                    name={pageData.fieldsData.DisplayOrder.name}
                    placeholder={pageData.fieldsData.DisplayOrder.placeholder}
                    type={pageData.fieldsData.DisplayOrder.type}
                  />
                </div>
                <div className="row mt-3">
                  <Toggle
                    label={pageData.fieldsData.status.label}
                    name={pageData.fieldsData.status.name}
                    key={pageData.fieldsData.status.key}
                    type={pageData.fieldsData.status.type}
                    id={pageData.fieldsData.status.id}
                    value={formik.values.active}
                    defaultChecked={formik.values.active}
                    onChange={(e) =>
                      formik.setFieldValue("active", e.target.checked)
                    }
                  />
                </div>
                <div className="d-flex justify-content-end mt-1">
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm m-2"
                    style={pageData.fieldsData.button.style}
                  >
                    {pageData.fieldsData.button.label}
                  </button>
                  <Link
                    to="/dashboard"
                    className="btn btn-primary btn-sm m-2"
                    style={pageData.fieldsData.cancelButton.style}
                    onClick={(e) => {
                      dispatch(setParems({ data: "" }));
                    }}
                  >
                    {pageData.fieldsData.cancelButton.label}
                  </Link>
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
