import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import api from "../../utils/api";




const SideBar = ({ children,props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },

    },
    show: {
      width: "auto",
      transition: {
        duration: 0.2,
      },
    },
  };
  const { userInfo } = useSelector((state) => state?.user?.value);
  const [sideNavbarMenus, setSideNavbarMenus] = useState("");
  const dispatch = useDispatch();
  async function getSideManuInfo() {
    api
      .get(`/appuser/menus/${userInfo.data[0].userid}/${userInfo.data[0].usergroup}`, {
        headers: {
          Authorization: userInfo.data[0].UserToken //the token is a variable which holds the token
        }
      })
      .then((res) => {
        setSideNavbarMenus(res.data.data);
      })
      .catch((error) => {
        toast?.error(
          error?.response?.data?.message ??
          error?.message ??
          "OOPs, Something went wrong."
        );
      });
  }

  useEffect(async () => {
    await getSideManuInfo();
  }, [])




  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },  };




  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "450px" : "75px",
            position: "sticky",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar ` }
  
        >
          <div className="top_section display-flex p-15 text-white text-center justifiContent-space-between">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="log text-white"
                >
                  <img className="bg-white rounded"
                    src="http://cdnlib.a10s.in/cdndata/m-atslogo.png "
                    alt=""
                    style={{ height: "40px" }}
                  />
                </motion.h1>
              )}
            </AnimatePresence>
            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <section className="routes">
            {Object.keys(sideNavbarMenus).length > 0 ? sideNavbarMenus?.map((route, index) => {
              if (route.submenu) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }
              return (
                <NavLink
                  key={index}
                >
                  <div className="icon">
                    <img src={route.imageurl} alt="" />
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className=" link_text"
                      >
                        {route?.campname}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            }
            ) : ""}
          </section>
          
        </motion.div>
        <main>{children}</main>   
      </div>
    </>
  );
}

export default SideBar;
