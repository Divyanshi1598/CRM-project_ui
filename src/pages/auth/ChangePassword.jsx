import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getFormData } from "../../helpers/helpers";
import api from "../../utils/api";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { TextField } from "../../components/formValidation/TextField";

export default function ChangePassword(props) {
  const navigate = useNavigate();
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);

  const changPass = {
    title: "Change Password",
    cardstyle: {
      backgroundColor: " ",
      width: "50rem",
      marginbottom: "5rem",
    },
    oldpassword: {
      label: "Old password",
      controlType: "input",
      style: {
        color: "#70657b",
      },
      tooltip: "Enter your old password",
    },
    newpassword: {
      label: "New password",
      controlType: "input",
      style: {
        color: "#70657b",
      },
      tooltip: "Enter your new password",
    },
    confermpassword: {
      label: "Conferm Password",
      controlType: "input",
      style: {
        color: "#70657b",
      },
      tooltip: "Enter your conferm password",
    },
    ChangePasswordbtn: {
      value: "Change Password",
      style: {
        backgroundColor: "#39",
        width: "17rem",
      },
      tooltip: "Click here For Change Password",
    },
  };
  let validate = Yup.object({
    usernewpwd: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),

    confermpassword: Yup.string()
      .oneOf([Yup.ref("usernewpwd"), null], "Password Must Match")
      .required("Confermpassword is must be same as New Password"),
  });

  let initial = {
    userid: isLoggedIn ? userInfo.data[0].userid : "",
    userpwd: "",
    usernewpwd: "",
    confermpassword: "",
    pwdtype: "CHANGE_PWD",
  };

  const onSubmit = async (values, { resetForm }) => {
    delete values.confermpassword;
    const Info = api.post("appuser/managepassword/", values);
    toast
      .promise(Info, {
        loading: "Changing password....",
        success: (Info) => {
          return `Congratulations, your password has been changed.`;
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
      .then((data) => {
        if (!isLoggedIn) {
          navigate("/", { replace: true });
        }
      });
      
  };
  return (
    <>
      <section className="d-flex align-items-center">
        <div className="col-6 ml-8">
          <div className="wrapper">
            <div className="log">
              <Formik
                initialValues={initial}
                validationSchema={validate}
                onSubmit={onSubmit}
              >
                {(formik) => (
                  <div style={changPass?.cardstyle}>
                    <h2>{changPass?.title}</h2>
                    <Form>
                      {!isLoggedIn ? (
                        <TextField
                          label="User Id"
                          name="userid"
                          placeholder="User Id"
                          type="text"
                        />
                      ) : (
                        ""
                      )}
                      <TextField
                        label="Old Password"
                        name="userpwd"
                        placeholder="Old Password"
                        type="password"
                      />
                      <TextField
                        label="New Password"
                        name="usernewpwd"
                        placeholder="User Password"
                        type="password"
                      />
                      <TextField
                        label="Conferm Password"
                        name="confermpassword"
                        placeholder="User Password"
                        type="password"
                      />
                      {/* </div> */}

                      <div className="mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary text-white "
                          style={changPass?.ChangePasswordbtn?.style}
                          title={changPass?.ChangePasswordbtn?.tooltip}
                        >
                          {changPass?.ChangePasswordbtn?.value}
                        </button>
                        {!isLoggedIn ? (
                          <Link
                            to="/"
                            style={changPass?.ChangePasswordbtn?.style}
                            className="btn mt-3 btn-block btn-primary text-white"
                            onClick={(e) => {
                              navigate("/");
                            }}
                          >
                            Back Login
                          </Link>
                        ) : (
                          ""
                        )}
                      </div>
                    </Form>
                  </div>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
