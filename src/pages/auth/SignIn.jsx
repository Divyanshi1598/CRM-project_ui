import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getFormData } from "../../helpers/helpers";
import { login } from "../../redux/User";
import api from "../../utils/api";
import { useEffect } from "react";
import { useState } from "react";
import "./Style.css";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageData, setpageData] = useState("")
  useEffect(() => {
    api.get("/appuser/logincomponent/LOGIN").then(async (data) => {
      await setpageData(JSON.parse(data.data.data[0].DATA))
    });
  }, [])
  async function authenticateUser(e) {
    e.preventDefault();
    const formData = getFormData(e.target);
    const signinRes = api.post("/appuser/usersignIn", formData);
    toast
      .promise(signinRes, {
        loading: "Authenticating member.",
        success: (signinRes) => {
          return signinRes.data.message;
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
        if (data.data.status === true) {
          const uData = { isLoggedIn: true, userInfo: data.data };
          localStorage.setItem("support_user", JSON.stringify(uData));
          dispatch(login({ isLoggedIn: true, userInfo: data.data }));
          navigate("../dashboard", { replace: true });
        }
        if (data.data.status === false && data.data.message === 'User first Login') {
          navigate("/changepassword", { replace: true });
        }
      });

  }
  const PageData = {
    title: "ATS Services",
    text: "Manage  your all application support work configure your users and its mapping with other application like  quality portal , chat system ,data allocation and reporting system.",
    link: " Forgot password?"
  }

  return (
    <div className="">

      <section className="">
        <div className="container-fulid">
          {
            Object.keys(pageData).length > 0 ? (
              <div
                className="row justify-content-center form-bg-image"

              >

                <div className="col-sm-6">
                  <div id="Carousel4" className="carousel  mt-7 slide shadow-soft border border-light  rounded" data-ride="carousel">
                    <ol className="carousel-indicators">
                      <li data-target="#Carousel4" data-slide-to="0" className="active"></li>
                      <li data-target="#Carousel4" data-slide-to="1"></li>
                      <li data-target="#Carousel4" data-slide-to="2"></li>
                      <li data-target="#Carousel4" data-slide-to="3"></li>
                      <li data-target="#Carousel4" data-slide-to="4"></li>
                    </ol>
                    <div className="carousel-inner rounded">
                      <div className="carousel-item overlay-primary active">
                        <img className="d-block w-100" src="/Images/slider.jpg" alt="First slide" />
                        <div className="carousel-caption d-none d-md-block text-dark">
                          <h3 className="h5 text-white">{PageData.title}</h3>
                          <p className=" text-white"> {PageData.text}
                          </p>
                        </div>
                      </div>

                      <div className="carousel-item overlay-primary">
                        <img className="d-block w-100" src="/Images/slider.jpg" alt="Second slide" />
                        <div className="carousel-caption d-none d-md-block text-dark">
                          <h3 className="h5 text-white">{PageData.title}</h3>
                          <p className=" text-white"> {PageData.text}
                          </p>
                        </div>
                      </div>
                      <div className="carousel-item overlay-primary">
                        <img className="d-block w-100" src="/Images/slider.jpg" alt="Third slide" />
                        <div className="carousel-caption d-none d-md-block text-dark">
                          <h3 className="h5 text-white">{PageData.title}</h3>
                          <p className=" text-white"> {PageData.text}
                          </p>
                        </div>
                      </div>
                    </div>
                    <a className="carousel-control-prev" href="#Carousel4" role="button" data-slide="prev">
                      <span className="carousel-control" aria-hidden="true"></span>
                      <span className="sr-only"></span>
                    </a>
                    <a className="carousel-control-next" href="#Carousel4" role="button" data-slide="next">
                      <span className="carousel-control" aria-hidden="true"></span>
                      <span className="sr-only"></span>
                    </a>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="col">
                    <div className="col-lg  mt-5 ml-2">
                      <div className="wrapper">
                        <div className="log">
                          <div className="nav-wrapper position-relative mb-4">
                            <ul className="nav nav-pills nav-fill flex-column flex-md-row" id="tabs-icons-text" role="tablist">
                              <li className="nav-item">
                                <a className="nav-link mb-sm-3 mb-md-0 bg-white" id="tabs-icons-text-1-tab" data-toggle="tab" href="#tabs-icons-text-1" role="tab" aria-controls="tabs-icons-text-1" aria-selected="true">
                                  <img src={pageData.vendorLogo.logo} style={pageData.vendorLogo.style} alt="ATS LOGO" className="bg-white" /></a>
                              </li>
                            </ul>
                            <div className="text-center fs-5 font-weight-bold "> {pageData.logInMsg.value} </div>
                          </div>
                        </div>
                        <form className="p-3" onSubmit={(e) => {
                          authenticateUser(e);
                        }}>
                          <div className="form-field d-flex align-items-center">
                            <span className="far fa-user ml-3"> </span>
                            <input
                              className="form-control-sm  fs-6"
                              autocomplete="off"
                              type="text"
                              name="userid"
                              placeholder={
                                pageData?.userName?.tooltip
                              }
                            />
                          </div>
                          <div className="form-field d-flex align-items-center">
                            <span className="fas fa-key ml-3"></span>
                            <input style={{ border: 'none' }}
                              className="form-control-sm fs-6"
                              name="password"
                              placeholder={
                                pageData?.password?.tooltip
                              }
                              type="password"

                            />
                          </div>
                          <button type="submit" className="btn btn-block"
                            title={pageData?.submitBtn?.tooltip} >
                            {pageData?.submitBtn?.value}
                          </button>
                        </form>
                        <div className="text-center fs-6"> <Link to="/forgot-password"
                          className="text-muted">
                          {PageData.link} </Link> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) :
              <div className="d-flex p-5 justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
          }


        </div>
      </section>
    </div>
  );
}
