import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "../../components/formValidation/TextField";
import api from "../../utils/api";
import { Link } from "react-router-dom";
import { Toggle } from "../../components/formValidation/Toggle";
import { MultiSelect } from "../../components/formValidation/MultiSelect";
import { setParems } from "../../redux/Campaign";
import DaynmicApicall from "../../utils/function";

export default function EditCampaigns(props) {
  const dispatch = useDispatch();
  const {userInfo } = useSelector((state) => state?.user?.value);
  const [queue, setQueue] = useState([]);
  const [pageData, setpageData] = useState("");
  



  async function getQueue() {
    await DaynmicApicall(`prm/getParamdata/ALL/DIALER-QUEUE`, '', 'get', userInfo.data[0].UserToken).then(async(res) => {
      let bData = [];
       bData = res?.map((item) => {
        return {
          label: item.paravalue,
          value: item.paracode
        };
      });
      setQueue(bData);
    })
  }




  // async function getQueue() {
  //   api
  //     .get(`appuser/getmasterdata/vw_dialer_queue_list/*/1=1/queue_id/`, {
  //       headers: {
  //         Authorization: userInfo.data[0].UserToken, //the token is a variable which holds the token
  //       },
  //     })
  //     .then(async (res) => {
  //       let bData = [];
  //       bData = await res.data.map((item) => {
  //         return {
  //           label: item.queue_name,
  //           value: item.queue_name
  //         };
  //       });
  //       setQueue(bData);
  //     })
  //     .catch((error) => {
  //       console.log("ERROR: ", error);
  //       toast.error(
  //         error.response.data.message ??
  //           error.message ??
  //           "OOPs, Something went wrong."
  //       );
  //     });
  // }

  async function pageInfo() {
    await DaynmicApicall(`/appuser/getcomponetbyid/${props?.data?.activeMenu?.keypointer}/${props?.data?.activeMenu?.subcompid}`, '', 'get', userInfo.data[0].UserToken).then((data) => {
      setpageData(data[0].DATA);
    })
  }
 

  let action = props?.data?.paremsData.action === "UPDATE";
  let initial = {
    campid: action ? props?.data?.paremsData.comp.campid : "NEW",
    campname: action ? props?.data?.paremsData.comp.campname : "",
    campdisplayname: action ? props?.data?.paremsData.comp.display_name : "",
    img_url: action ? props?.data?.paremsData.comp.imageurl : "",
    key1: action ? props?.data?.paremsData.comp.key1 : "",
    key2: action ? props?.data?.paremsData.comp.key2 : "",
    key3: action ? props?.data?.paremsData.comp.key3 : "",
    createdby: userInfo.data[0].userid,
    queue_name: action ? queue?.find((v)=>v.value === props?.data?.paremsData.comp.queue_name) : "",
    action_name: action ? "UPDATE" : "INSERT",
    isactive: action? props?.data?.paremsData.comp.isactive === "Y" ? true: false: true,
  }; 
  useEffect(()=>{
    (async () => {
      await getQueue();
      await pageInfo();
    })()
  }, []);
  const onSubmit = async (values, { resetForm }) => {

    values.queue_name = values.queue_name.value;
    values.isactive = values.isactive === true ? "Y" : "N";
    if (props.data.paremsData.action === "INSERT") {
      const Info = api.post("appuser/setcampmaster", values, {
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
      delete values.key1;
      delete values.key2;
      delete values.key3;
      // values.queue_name = values.queue_name.value;
      const Info = api.post("appuser/setcampmaster", values, {
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
        <Formik initialValues={initial} onSubmit={onSubmit}>
          {(formik) => (
            <div
              className="card card-body border-light shadow mb-4"
              style={pageData.style}
            >
              <h6 className="text-light card-header rounded bg-dark">
                {" "}
                {props?.data?.paremsData?.action === "INSERT"
                  ? pageData.fieldsData.titleAdd
                  : pageData.fieldsData.titleUpdate}
              </h6>
              <Form>
                <div className="row mt-3 m-1 p-1">
                  <TextField
                    label={pageData.fieldsData.campdisplayname.label}
                    name={pageData.fieldsData.campdisplayname.name}
                    placeholder={
                      pageData.fieldsData.campdisplayname.placeholder
                    }
                    type={pageData.fieldsData.campdisplayname.type}
                  />
                  <TextField
                    label={pageData.fieldsData.campname.label}
                    name={pageData.fieldsData.campname.name}
                    placeholder={pageData.fieldsData.campname.placeholder}
                    type={pageData.fieldsData.campname.type}
                  />
                  <TextField
                    label={pageData.fieldsData.img_url.label}
                    name={pageData.fieldsData.img_url.name}
                    placeholder={pageData.fieldsData.img_url.placeholder}
                    type={pageData.fieldsData.img_url.type}
                  />
                  <MultiSelect
                    label="Queue"
                    name="queue_name"
                    placeholder="Select Queue"
                    isMulti={false}
                    options={queue}
                    formik={formik}
                    value={formik.values.queue_name}
                    onChange={async (value) => {
                      formik.setFieldValue("queue_name", value);
                    }}
                  />
                  {props?.data?.paremsData.action === "UPDATE" ? (
                    ""
                  ) : (
                    <TextField
                      label={pageData.fieldsData.key1.label}
                      name={pageData.fieldsData.key1.name}
                      placeholder={pageData.fieldsData.key1.placeholder}
                      type={pageData.fieldsData.key1.type}
                    />
                  )}
                  {props?.data?.paremsData.action === "UPDATE" ? (
                    ""
                  ) : (
                    <TextField
                      label={pageData.fieldsData.key2.label}
                      name={pageData.fieldsData.key2.name}
                      placeholder={pageData.fieldsData.key2.placeholder}
                      type={pageData.fieldsData.key2.type}
                      disabled={props?.data?.paremsData.action === "UPDATE"}
                    />
                  )}
                  {props?.data?.paremsData.action === "UPDATE" ? (
                    ""
                  ) : (
                    <TextField
                      label={pageData.fieldsData.key3.label}
                      name={pageData.fieldsData.key3.name}
                      placeholder={pageData.fieldsData.key3.placeholder}
                      type={pageData.fieldsData.key3.type}
                      disabled={props?.data?.paremsData.action === "UPDATE"}
                    />
                  )}
                  <Toggle
                    label={pageData.fieldsData.active.label}
                    name={pageData.fieldsData.active.name}
                    type={pageData.fieldsData.active.type}
                    key={pageData.fieldsData.active.key}
                    value={formik.values.isactive}
                    defaultChecked={formik.values.isactive}
                    onChange={(e) =>
                      formik.setFieldValue("isactive", e.target.checked)
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
