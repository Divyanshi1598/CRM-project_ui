import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/api";

export default function DashboardHome(props) {
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);
  const [tableData, setTableData] = useState([]);
  const [pageData, setpageData] = useState("")

  async function getSideManuInfo() {
    api
      .get(`appuser/campmaster/`, {
        headers: {
          Authorization: userInfo.data[0].UserToken //the token is a variable which holds the token
        }
      })
      .then((res) => {
        setTableData(res.data.data);
      })
      .catch((error) => {
        console.log("ERROR: ", error)
        toast.error(
          error.response.data.message ??
          error.message ??
          "OOPs, Something went wrong."
        );
      });
  }


  useEffect(async () => {
    await getSideManuInfo();
  }, [])

  const infoArray = [

    { label1: "Total Allocation", label2: " Call Till Time", value1: 100, value2: 41 },
    { label1: "Total Allocation", label2: "Call Till Time", value1: 100, value2: 41 },
    { label1: "Total Allocation", label2: " Call Till Time", value1: 100, value2: 41 },
    { label1: "Total Allocation", label2: "Call Till Time", value1: 100, value2: 41 },
    // { icon: "fas fa-wallet", field: "3", label: "Toatal Inactive camp" },
    // { icon: "fas fa-coins", field: "20", label: "Toatal Active User" },
    // { icon: "fas fa-wallet", field: "5", label: "Toatal Inactive User" },

  ];

  const dashboard = {
    headerStyle: {
      background: "#262B40",
      color: "#eaedf2"
    },
    LevelOneCards: {
      cardImage: {
        url: "/images/text-editor.png",
        style: {

        }
      },
      style: {
        background: "#fff",
        color: "#262B40"
      },
      label: {
        style: {
          fontWeight: "bold",
          color: "#F0526F"
        },
        lableName: [
          { l: { l1: "Total Call Till Time", l2: "Total Allocation", l3: "Inactive" } },
          { l: { l1: "Title", l2: "Active", l3: "Inactive" } },
          { l: { l1: "Total Allocation", l2: "Total Call Till Time", l3: "Inactive" } },
        ],
      }
    },
    tableStyle: {
      style: {
        background: "#fff",
        color: "#fff"
      }
    },
    dashboardChart: {
      style: {
        background: "#333",
        color: "#fff"
      }
    }
  }



  return (
    <>
      {
        Object.keys(dashboard).length > 0 ? (
          <div>
            <div className="container-fluid py-4">
              {/* <div className="mb-2">Referral Link : <a to={`/signup/${userData.member_id}`} target="_blank" rel="noreferrer">http://signup?referrer={userData.member_id}</a></div> */}
              <div className="row">
                <div className="card col-xl-12" style={dashboard.headerStyle}>
                  <div className="row row-cols-md-2 m-2 p-2 row-cols-lg-2 row-cols-xl-2 font-weight-bold">
                    <span className="text-left" 
                     title="Hello Admin"       
                    data-toggle="tooltip"
                    >Hello, {userInfo.data[0].username}</span>
                    <span className="text-right"  
                    title="Current Show Day and Date"       
                    data-toggle="tooltip"
                    >
                    {(new Date).toLocaleDateString(undefined, {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              {infoArray.map((data) => (
                <div class="col-12 col-sm-3 col-xl-3 mb-4">
                  <div class="card border-0 shadow" style={dashboard.LevelOneCards.style}>
                    <div class="card-body">
                      <div class="row d-block d-xl-flex align-items-center">
                        <div class="col-12 col-xl-3 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center">
                          <div class="icon-shape rounded me-4 me-sm-0">
                            <img src={dashboard.LevelOneCards.cardImage.url} class="card-img " alt="..." />
                          </div>
                        </div>
                        <div class="col-12 col-xl-9 px-xl-0">
                          <div class="float-sm-right px-2" style={dashboard.LevelOneCards.label.style}>

                            <span className="d-flex font-weight-bold text-right" 
                            title={data.task}       
                            data-toggle="tooltip">{data.task}</span>
                            <span className="d-flex font-weight-bold text-right" title={data.label1}       
                            data-toggle="tooltip">{data.label1}:{data.value1}</span>
                            <span className="d-flex font-weight-bold text-success text-right"
                            title={data.label2}      
                    data-toggle="tooltip"
                            >{data.label2}:{data.value2}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              ))}
            </div>
            <div class="row">
              <div class="col-12 col-xl-8">
                <div class="row">
                  <div class="col-12 table shadow-soft rounded mb-4">
                    <div class="card border-0 shadow">
                      <div class="card-header">
                        <div class="row align-items-center">
                          <div class="col">
                            <h2 class="fs-5 fw-bold mb-0" title="Page Visits"       
                            data-toggle="tooltip">Page Visits</h2>
                          </div>
                          <div class="col text-end">
                            <a to="#" class="btn btn-sm btn-primary" title="See all"       
                            data-toggle="tooltip">See all</a>
                          </div>
                        </div>
                      </div>
                      <div class="table-responsive">
                        <table class="table align-items-center table-flush">
                          <thead class="thead-light">
                            <tr>
                              <th class="border-bottom" scope="col" title="SL No."       
                              data-toggle="tooltip">SL No.</th>
                              <th class="border-bottom" scope="col" title="Error"       
                              data-toggle="tooltip">Error</th>
                              <th class="border-bottom" scope="col" title="Date"       
                              data-toggle="tooltip">Date</th>
                              <th class="border-bottom" scope="col" title="status"       
                              data-toggle="tooltip">status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tableData?.map((data, index) => (
                              <tr>
                                <th class="text-gray-900" scope="row">
                                  1
                                </th>
                                <td class="fw-bolder text-gray-500">
                                  1
                                </td>
                                <td class="fw-bolder text-gray-500">
                                  12
                                </td>
                                <td class="fw-bolder text-gray-500">
                                  <div class="d-flex">
                                    <svg class="icon icon-xs text-danger me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                    success
                                  </div>
                                </td>
                              </tr>
                            ))}
                            <tr>
                              <th class="text-gray-900" scope="row">
                                /demo/admin/index.html
                              </th>
                              <td class="fw-bolder text-gray-500">
                                3,225
                              </td>
                              <td class="fw-bolder text-gray-500">
                                $20
                              </td>
                              <td class="fw-bolder text-gray-500">
                                <div class="d-flex">
                                  <svg class="icon icon-xs text-danger me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                  42,55%
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-xxl-6 mb-4">
                    <div class="card border-0 shadow">
                      <div class="card-header border-bottom d-flex align-items-center justify-content-between">
                        <h2 class="fs-5 fw-bold mb-0"  title="Team Members"       
                        data-toggle="tooltip">Team Members</h2>
                        <a to="#" class="btn btn-sm btn-primary">See all</a>
                      </div>
                      <div class="card-body">
                        <ul class="list-group list-group-flush list my--3">
                          <li class="list-group-item px-0">
                            <div class="row align-items-center">
                              <div class="col-auto">
                                {/* <!-- Avatar --> */}
                                <a to="#" class="avatar">
                                  {/* <img class="rounded" alt="Image placeholder" src="../../assets/img/team/profile-picture-1.jpg" /> */}
                                </a>
                              </div>
                              <div class="col-auto ms--2">
                                <h4 class="h6 mb-0">
                                  <a to="#">Chris Wood</a>
                                </h4>
                                <div class="d-flex align-items-center">
                                  <div class="bg-success dot rounded-circle me-1"></div>
                                  <small>Online</small>
                                </div>
                              </div>
                              <div class="col text-end">
                                <a to="#" class="btn btn-sm btn-secondary d-inline-flex align-items-center">
                                  {/* <svg class="icon icon-xxs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg> */}
                                  Invite
                                </a>
                              </div>
                            </div>
                          </li>
                          <li class="list-group-item px-0">
                            <div class="row align-items-center">
                              <div class="col-auto">
                                {/* <!-- Avatar --> */}
                                <a to="#" class="avatar">
                                </a>
                              </div>
                              <div class="col-auto ms--2">
                                <h4 class="h6 mb-0">
                                  <a to="#">Jose Leos</a>
                                </h4>
                                <div class="d-flex align-items-center">
                                  <div class="bg-warning dot rounded-circle me-1"></div>
                                  <small>In a meeting</small>
                                </div>
                              </div>
                              <div class="col text-end">
                                <a to="#" class="btn btn-sm btn-secondary d-inline-flex align-items-center">
                                  <svg class="icon icon-xxs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd"></path></svg>
                                  Message
                                </a>
                              </div>
                            </div>
                          </li>
                          <li class="list-group-item px-0">
                            <div class="row align-items-center">
                              <div class="col-auto">
                                {/* <!-- Avatar --> */}
                                <a to="#" class="avatar">
                                </a>
                              </div>
                              <div class="col-auto ms--2">
                                <h4 class="h6 mb-0">
                                  <a to="#">Bonnie Green</a>
                                </h4>
                                <div class="d-flex align-items-center">
                                  <div class="bg-danger dot rounded-circle me-1"></div>
                                  <small>Offline</small>
                                </div>
                              </div>
                              <div class="col text-end">
                                <a to="#" class="btn btn-sm btn-secondary d-inline-flex align-items-center">
                                  <svg class="icon icon-xxs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd"></path></svg>
                                  Message
                                </a>
                              </div>
                            </div>
                          </li>
                          <li class="list-group-item px-0">
                            <div class="row align-items-center">
                              <div class="col-auto">
                                {/* <!-- Avatar --> */}
                                <a to="#" class="avatar">
                                </a>
                              </div>
                              <div class="col-auto ms--2">
                                <h4 class="h6 mb-0">
                                  <a to="#">Neil Sims</a>
                                </h4>
                                <div class="d-flex align-items-center">
                                  <div class="bg-danger dot rounded-circle me-1"></div>
                                  <small>Offline</small>
                                </div>
                              </div>
                              <div class="col text-end">
                                <a to="#" class="btn btn-sm btn-secondary d-inline-flex align-items-center">
                                  <svg class="icon icon-xxs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd"></path></svg>
                                  Message
                                </a>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-xxl-6 mb-4">
                    <div class="card border-0 shadow">
                      <div class="card-header border-bottom d-flex align-items-center justify-content-between">
                        <h2 class="fs-5 fw-bold mb-0">Progress track</h2>
                        <a to="#" class="btn btn-sm btn-primary">See tasks</a>
                      </div>
                      <div class="card-body">
                        {/* <!-- Project 1 --> */}
                        <div class="row mb-4">
                          <div class="col-auto">
                            <svg class="icon icon-sm text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path></svg>
                          </div>
                          <div class="col">
                            <div class="progress-wrapper">
                              <div class="progress-info">
                                <div class="h6 mb-0">Rocket - SaaS Template</div>
                                <div class="small fw-bold text-gray-500"><span>75 %</span></div>
                              </div>
                              <div class="progress mb-0">
                                <div class="progress-bar bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: "75%" }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!-- Project 2 --> */}
                        <div class="row align-items-center mb-4">
                          <div class="col-auto">
                            <svg class="icon icon-sm text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path></svg>
                          </div>
                          <div class="col">
                            <div class="progress-wrapper">
                              <div class="progress-info">
                                <div class="h6 mb-0">Themesberg - Design System</div>
                                <div class="small fw-bold text-gray-500"><span>60 %</span></div>
                              </div>
                              <div class="progress mb-0">
                                <div class="progress-bar bg-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: "60px" }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!-- Project 3 --> */}
                        <div class="row align-items-center mb-4">
                          <div class="col-auto">
                            <svg class="icon icon-sm text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path></svg>
                          </div>
                          <div class="col">
                            <div class="progress-wrapper">
                              <div class="progress-info">
                                <div class="h6 mb-0">Homepage Design in Figma</div>
                                <div class="small fw-bold text-gray-500"><span>45 %</span></div>
                              </div>
                              <div class="progress mb-0">
                                <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style={{ "width": "45px" }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!-- Project 4 --> */}
                        <div class="row align-items-center mb-3">
                          <div class="col-auto">
                            <svg class="icon icon-sm text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path></svg>
                          </div>
                          <div class="col">
                            <div class="progress-wrapper">
                              <div class="progress-info">
                                <div class="h6 mb-0">Backend for Themesberg v2</div>
                                <div class="small fw-bold text-gray-500"><span>34 %</span></div>
                              </div>
                              <div class="progress mb-0">
                                <div class="progress-bar bg-danger" role="progressbar" aria-valuenow="34" aria-valuemin="0" aria-valuemax="100" style={{ "width": "34px" }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-xl-4">
                <div class="col-12 px-0 mb-4">
                  <div class="card border-0 shadow">
                    <div class="card-header d-flex flex-row align-items-center flex-0 border-bottom">
                      <div class="d-block">
                        <div class="h6 fw-normal text-gray mb-2">Total orders</div>
                        <h2 class="h3 fw-extrabold">452</h2>
                        <div class="small mt-2">
                          <span class="fas fa-angle-up text-success"></span>
                          <span class="text-success fw-bold">18.2%</span>
                        </div>
                      </div>
                      <div class="d-block ms-auto">
                        <div class="d-flex align-items-center text-end mb-2">
                          <span class="dot rounded-circle bg-gray-800 me-2"></span>
                          <span class="fw-normal small">July</span>
                        </div>
                        <div class="d-flex align-items-center text-end">
                          <span class="dot rounded-circle bg-secondary me-2"></span>
                          <span class="fw-normal small">August</span>
                        </div>
                      </div>
                    </div>
                    <div class="card-body p-2">
                      <div class="ct-chart-ranking ct-golden-section ct-series-a"></div>
                    </div>
                  </div>
                </div>
                <div class="col-12 px-0 mb-4">
                  <div class="card border-0 shadow">
                    <div class="card-body">
                      <div class="d-flex align-items-center justify-content-between border-bottom pb-3">
                        <div>
                          <div class="h6 mb-0 d-flex align-items-center">
                            <svg class="icon icon-xs text-gray-500 me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd"></path></svg>
                            Global Rank
                          </div>
                        </div>
                        <div>
                          <a to="#" class="d-flex align-items-center fw-bold">
                            #755
                            <svg class="icon icon-xs text-gray-500 ms-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                          </a>
                        </div>
                      </div>
                      <div class="d-flex align-items-center justify-content-between border-bottom py-3">
                        <div>
                          <div class="h6 mb-0 d-flex align-items-center">
                            <svg class="icon icon-xs text-gray-500 me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd"></path></svg>
                            Country Rank
                          </div>
                          <div class="small card-stats">
                            United States
                            <svg class="icon icon-xs text-success" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
                          </div>
                        </div>
                        <div>
                          <a to="#" class="d-flex align-items-center fw-bold">
                            #32
                            <svg class="icon icon-xs text-gray-500 ms-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                          </a>
                        </div>
                      </div>
                      <div class="d-flex align-items-center justify-content-between pt-3">
                        <div>
                          <div class="h6 mb-0 d-flex align-items-center">
                            <svg class="icon icon-xs text-gray-500 me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clipRule="evenodd"></path><path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"></path></svg>
                            Category Rank
                          </div>
                          <div class="small card-stats">
                            Computers Electronics Technology
                            <svg class="icon icon-xs text-success" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
                          </div>
                        </div>
                        <div>
                          <a to="#" class="d-flex align-items-center fw-bold">
                            #11
                            <svg class="icon icon-xs text-gray-500 ms-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 px-0">
                  <div class="card border-0 shadow">
                    <div class="card-body">
                      <h2 class="fs-5 fw-bold mb-1">Acquisition</h2>
                      <p>Tells you where your visitors originated from, such as search engines, social networks or website referrals.</p>
                      <div class="d-block">
                        <div class="d-flex align-items-center me-5">
                          <div class="icon-shape icon-sm icon-shape-danger rounded me-3">
                            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z" clipRule="evenodd"></path></svg>
                          </div>
                          <div class="d-block">
                            <label class="mb-0">Bounce Rate</label>
                            <h4 class="mb-0">33.50%</h4>
                          </div>
                        </div>
                        <div class="d-flex align-items-center pt-3">
                          <div class="icon-shape icon-sm icon-shape-purple rounded me-3">
                            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path></svg>                                        </div>
                          <div class="d-block">
                            <label class="mb-0">Sessions</label>
                            <h4 class="mb-0">9,567</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        ) : ""
      }

    </>
  );
}
