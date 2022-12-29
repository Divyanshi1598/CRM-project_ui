import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { getFormData } from "../../helpers/helpers";
import api from "../../utils/api";

export default function ForgotPassword() {
  const [isEmailSent, setIsEmailSent] = useState(false);
  function authenticateUser(e) {
    e.preventDefault();
   
    const formData = getFormData(e.target);
    const signinRes = api.post("/forgot", formData);
    toast
      .promise(signinRes, {
        loading: "Verifying email address.",
        success: (data) => {
          setIsEmailSent(true);
          return `An email verification email has been sent to your email address.`;
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
       
      });
  }

  const ForgotPass = {
    "style": {"backgroundImage": "url(/theme_files/assets/img/illustrations/signin.svg)"},
    "title": "Forgot Password",    
    "cardstyle": {
      "backgroundColor": " ",
      "height": " ",
      "weight": " ",
    },
    "para": "Don't fret! Just type in your email and we will send you a code to reset your password!",
    "label": "your email",
    "tooltip": "Enter your email",
    "RecoverPasswordbtn": {
      "value": "Recover Password",
      "style": {
        "backgroundColor": "#639"
      },
      "tooltip": "Click here For Recover your Password"
    },
    "ForgotPasswordbtn": {
      "value": "Forgot Password",
      "style": {
        "backgroundColor": "#639"
      },
      "tooltip": "Click here For Change Password"
    },
"span":" Go back to the",
"link":" login page"
  }
  return (
    <>
      {isEmailSent ? (
        <section className="vh-lg-100 bg-soft d-flex align-items-center">
          <div className="container">
            <div className="row justify-content-center form-bg-image">
              <div className="col-12 d-flex align-items-center justify-content-center">
                <div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                  <h1 className="h3 mb-4">Reset password</h1>
                  <form action="#">
                    <div className="mb-4">
                      <label for="email">Your Email</label>
                      <div className="input-group">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="example@company.com"
                          id="email"
                          required
                          disabled
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label for="password">Your Password</label>
                      <div className="input-group">
                        <span className="input-group-text" id="basic-addon4">
                          <span className="fas fa-unlock-alt"></span>
                        </span>
                        <input
                          type="password"
                          placeholder="Password"
                          className="form-control"
                          id="password"
                          required
                          autofocus
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label for="confirm_password">Confirm Password</label>
                      <div className="input-group">
                        <span className="input-group-text" id="basic-addon5">
                          <span className="fas fa-unlock-alt"></span>
                        </span>
                        <input
                          type="password"
                          placeholder="Confirm Password"
                          className="form-control"
                          id="confirm_password"
                          required
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-block btn-primary">
                      Reset password
                    </button>
                  </form>
                  <div className="d-flex justify-content-center align-items-center mt-4">
                    <span className="font-weight-normal">
                      Go back to the
                      <Link to="/">Login page</Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="vh-lg-100 bg-soft d-flex align-items-center">
          <div className="container">
          {
              <div
                className="row justify-content-center form-bg-image"                
                style={ForgotPass.style}>
            <div className="row justify-content-center form-bg-image">
              <div className="col-12 d-flex align-items-center justify-content-center">
                <div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-350">
                  <h1 className="h3">{ForgotPass.title}</h1>
                  <p className="mb-4">
                    {ForgotPass.para}
                  </p>
                  <form
                    onSubmit={(e) => {
                      authenticateUser(e);
                    }}
                  >
                    <div className="mb-4">
                      <label for="email">{ForgotPass.label}</label>
                      <div className="input-group">
                        <input
                          name="email"
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder={ForgotPass.tooltip}
                          required
                          autofocus
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-block btn-primary">
                      Recover password
                    </button>
                  </form>
                  <div className="d-flex justify-content-center align-items-center mt-4">
                    <span className="font-weight-normal">
                     {ForgotPass.span} &nbsp;
                      <Link to="/" className="font-weight-bold">
                        login page
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            </div>
}
          </div>
        </section>
      )}
    </>
  );
}
