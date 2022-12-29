import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/User";
import api from "../../utils/api";
import SidebarMenu from "./SidebarMenu";


export default function DashboardAreaNav(props) {
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);
  // console.log("userInfo", userInfo)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function userLogout() {
    await api.put("/appuser/lgout/", { userid: userInfo.data[0].userid }).then((data) => {
      localStorage.clear();
    })
  }
  useDispatch(async () => {
    await DashboardAreaNav();
  }, [])
const PageData = {
  text1:"My Profile",
  text2:" Logout",
  style:{
    color:"#333"
  }
}
  return (
    <nav className="navbar navbar-top navbar-expand navbar-dashboard pl-0 pr-2 pb-0 pt-0">
      <div className="container-fluid px-0">
        <div
          className="d-flex justify-content-end w-100"
          id="navbarSupportedContent" 
        >
          <ul className="navbar-nav align-items-center" 
          title="User Profile"       
          data-toggle="tooltip">
            <li className="nav-item dropdown">
              <a
                className="nav-link pt-1 px-0"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                
              >
                <div className="media d-flex align-items-center">
                  <img
                    className="user-avatar md-avatar rounded-circle"
                    alt="Image placeholder"
                    src="https://cdnlib.a10s.in/cdndata/user.png"
                  />
                  <div className="media-body ml-2 text-dark align-items-center d-none d-lg-block">
                    <span className="mb-0 font-small font-weight-bold">
                      {userInfo?.user?.email}
                    </span>
                  </div>
                </div>
              </a>
              <div className="dropdown-menu dashboard-dropdown dropdown-menu-right mt-2">
                <Link className="dropdown-item font-weight-bold" to="profile">
                  <span className="far fa-user-circle"></span>{PageData.text1}
                </Link>
                <div role="separator" className="dropdown-divider"></div>
                <Link
                  className="dropdown-item font-weight-bold"
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    userLogout();
                    localStorage.removeItem("support_user");
                    dispatch(logout());
                    navigate('/', { replace: true })
                  }}
                >
                  <span className="fas fa-sign-out-alt text-danger"></span>
                  {PageData.text2}
               
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <hr style={PageData.color} />
    </nav>
  );
}
