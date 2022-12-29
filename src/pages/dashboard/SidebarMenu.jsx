import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { FaAngleRight } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import {  NavLink, useNavigate } from "react-router-dom";
import { setActiveMenu, setParems } from "../../redux/Campaign";

const menuAnimation = {
  hidden: {
    opacity: 0,
    height: 0,
    padding: 0,
    transition: { duration: 0.3, when: "afterChildren" },
  },
  show: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      when: "beforeChildren",
    },
  },
};
const menuItemAnimation = {
  hidden: (i) => ({
    padding: 0,
    x: "-100%",
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
  show: (i) => ({
    x: 0,
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
};

const SidebarMenu = ({ route, showAnimation, isOpen, setIsOpen }) => {
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) {
      setIsMenuOpen(false);
    }
  }, [isOpen]);

  return (
    <>
      <div className="menu" onClick={toggleMenu}>
        <div className="menu_item">
          <div className="icon">

            <img src={route.imageurl} title={route.campname} alt="" />
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="link_text"
              >
                {route.campname}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {isOpen && (
          <motion.div
            animate={
              isMenuOpen
                ? {
                  rotate: -90,
                }
                : { rotate: 0 }
            }
          >
            <FaAngleRight />
          </motion.div>
        )}
      </div>{" "}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="menu_container"
          >
            {route.submenu?.map((submenu, i) => (
              <motion.div variants={menuItemAnimation} key={i} custom={i}>

                <NavLink className="link" to={submenu.subprocess_id}>
                  <span style={{ cursor: "pointer" }} onClick={() => {
                   
                    dispatch(setActiveMenu({ data: { campid: submenu.campid, componentid: submenu.componentid, subcompid: submenu.subcompid, keypointer: route.keypointer } }))
                    dispatch(setParems({ data: "" }))
                  }}>{submenu.menuname}</span>
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}{" "}
      </AnimatePresence>
    </>
  );
};

export default SidebarMenu;
