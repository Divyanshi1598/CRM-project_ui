import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getFormData } from "../../helpers/helpers";
import api from "../../utils/api";
import { ranks } from "./data";

export default function Settings() {
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);
  const [userData, setUserData] = useState({});
  const [directChilds, setDirectChilds] = useState([]);

  async function getUsersInfo() {
    api
      .post("appuser/resetuserpwd", { userid: userInfo.data[0].userid, keypointer: "IN9j123101ss" })
      .then((res) => {
        setUserData({ ...res.data.data });
      })
      .catch((error) => {
        toast.error(
          error.response.data.message ??
          error.message ??
          "OOPs, Something went wrong."
        );
      });
  }

  async function changePassword(e) {
    e.preventDefault();
    const formData = getFormData(e.target);
    console.log(formData);
    const fundRes = api.post("/change_password", formData);

    toast.promise(fundRes, {
      loading: "Changing password....",
      success: (data) => {
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
    });
  }
  useEffect(async () => {
    await getUsersInfo();
  }, []);

  const ResetPass = {
    "title": "Reset Password",
    "cardstyle": {
      "backgroundColor": " "
    },
    "campaingName": {
      "label": " campaing name ",
      "tooltip": "select your campaing",
    },
    "userName": {
      "label": " user name ",
      "tooltip": "select user",
    },
    "ResetPasswordbtn": {
      "value": "Rerset Passwod",
      "style": {
        "backgroundColor": "#639"
      },
      "tooltip": "Click here For Reset Password"
    },
    "TablebtnUrl": {
          "ReleaseImgUrl": "",
          "ResetImgUrl": "",
          "style": {
            "height": "",
            "weight": ""
          },
  }
}


  return (
    <>
     
      <div className="row">
        <div className="col-12 col-xl-8">
          <div className="card card-body bg-white border-light shadow-sm mb-4">
            <h2 className="h5 mb-4">General information</h2>
            <form>
              <div className="row">
                <div className="col-md mb-3">
                  <div>
                    <label for="first_name">First Name</label>
                    <input
                      className="form-control"
                      id="first_name"
                      type="text"
                      placeholder="Full Name"
                      defaultValue={userData.full_name}
                      required
                    />
                  </div>
                </div>
                
              </div>
              
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label for="email">Email</label>
                    <input
                      className="form-control"
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      defaultValue={userData.email}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label for="phone">Phone</label>
                    <input
                      className="form-control"
                      id="phone"
                      type="number"
                      placeholder="+12-345 678 910"
                      defaultValue={userData.mobile}
                      required
                    />
                  </div>
                </div>
              </div>
           
              <div className="mt-3">
                <button type="submit" className="btn btn-primary">
                  Save All
                </button>
              </div>
            </form>
          </div>

          {/* Change Password Thing */}
          <div className="card card-body bg-white border-light shadow-sm mb-4">
            <h2 className="h5">Change Passwords</h2>
            <form onClick={(e) => { changePassword(e) }}>
              <input type="hidden" name="member_id" value={userData.member_id} />
              <input type="hidden" name="password_type" value="password" />
              <div className="row">
                <div className="col-md-4 mb-3">
                  <div>
                    <label for="old_pass">Old Password</label>
                    <input
                      className="form-control"
                      id="old_pass"
                      type="password"
                      placeholder="Old Password"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div>
                    <label for="first_name">New password</label>
                    <input
                      className="form-control"
                      id="password"
                      type="password"
                      placeholder="New Password"
                      name="pass"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div>
                    <label for="last_name">Confirm Password</label>
                    <input
                      className="form-control"
                      id="confirm_pass"
                      type="password"
                      placeholder="Confirm Password"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mt-1">
                <button type="submit" className="btn btn-primary">
                  Change Password
                </button>
              </div>
            </form>

            <h2 className="h5 mt-4">{ResetPass.title}</h2>
            <form onClick={(e) => { changePassword(e) }}>
              <input type="hidden" name="member_id" value={userData.member_id} />
              <input type="hidden" name="password_type" value="txn_password" />
              <div className="row">
                <div className="col-md-4 mb-3">
                  <div className="form-group">
                    <label for="campaing name">{ResetPass.campaingName.label}</label>
                    <input
                      className="form-control"
                      id="campaing id"
                      type="text"
                      placeholder={ResetPass.campaingName.tooltip}
                      required
                    />
                  </div>
                
                </div>
                <div className="col-md-4 mb-12">
                  <div className="form-group">
                    <label for="user name">{ResetPass.userName.label}</label>
                    <input
                      className="form-control"
                      id="user id"
                      type="text"
                      placeholder={ResetPass.userName.tooltip}
                      required
                    />

                  </div>

                  
                </div>

                <div className="col-md-4 mb-3">
                  
                  <div className="col-md-4 mb-3">
                    <button type="submit" className="btn btn-primary"
                      style={ResetPass.ResetPasswordbtn.style}
                      title={ResetPass.ResetPasswordbtn.tooltip}
                    >
                      {ResetPass.ResetPasswordbtn.value}
                    </button>
                  </div>

                </div>

              </div>
             
            </form>
          </div>
        </div>
        <div className="col-12 col-xl-4">
          <div className="row">
            <div className="col-12 mb-4">
              <div className="card border-light text-center p-0">
                <div
                  className="profile-cover rounded-top"
                  data-background="/theme_files/assets/img/profile-cover.jpg"
                ></div>
                <div className="card-body pb-5">
                  <img
                    src="/theme_files/assets/img/team/profile-picture-1.jpg"
                    className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4"
                    alt="Neil Portrait"
                  />
                  <h6 className="h6">{userData?.email}</h6>
                  <h6 className="h6">
                    Current Level : {ranks[userData.level]}
                  </h6>
                  <a className="btn btn-sm btn-primary mr-2" href="#">
                    <span className="fas fa-user-plus mr-1"></span> Connect
                  </a>
                  <a className="btn btn-sm btn-secondary" href="#">
                    Send Message
                  </a>
                </div>
              </div>
            </div>
             <div className="col-12">
              <div className="card card-body bg-white border-light shadow-sm mb-4">
                <h2 className="h5 mb-4">Select profile photo</h2>
                <div className="d-xl-flex align-items-center">
                  <div>
                    <div className="user-avatar xl-avatar mb-3">
                      <img
                        className="rounded"
                        src="/theme_files/assets/img/team/profile-picture-3.jpg"
                        alt="change avatar"
                      />
                    </div>
                  </div>
                  <div className="file-field">
                    <div className="d-flex justify-content-xl-center ml-xl-3">
                      <div className="d-flex">
                        <span className="icon icon-md">
                          <span className="fas fa-paperclip mr-3"></span>
                        </span>{" "}
                        <input type="file" />
                        <div className="d-md-block text-left">
                          <div className="font-weight-normal text-dark mb-1">
                            Choose Image
                          </div>
                          <div className="text-gray small">
                            JPG, GIF or PNG. Max size of 800K
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> 
          </div>
        </div>
      </div>
    </>
  );
}
