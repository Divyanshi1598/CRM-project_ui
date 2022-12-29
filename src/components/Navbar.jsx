import { Link } from "react-router-dom";
import navbarMenus from "../helpers/navbar_menus";

export default function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow py-0 sticky-top">
      <div class="container">
        <Link class="navbar-brand py-0" to="/">
          <img src="/theme_files/assets/asset-00.png" alt="" style={{height:"40px"}}/>
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          {navbarMenus?.leftMenu && (
            <ul className="app-nav navbar-nav navbar-nav-hover align-items-lg-center mr-auto">
              {navbarMenus.leftMenu.map((menu) => (
                <li className="nav-item mr-2">
                  <Link to={menu.page} className="nav-link fw-bold py-4">
                    {menu.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {navbarMenus?.rightMenu && (
            <ul className="app-nav navbar-nav navbar-nav-hover align-items-lg-center ml-auto">
              {navbarMenus.rightMenu.map((menu) => (
                <li className="nav-item mr-2">
                  <Link to={menu.page} className="nav-link fw-bold py-4">
                    {menu.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
