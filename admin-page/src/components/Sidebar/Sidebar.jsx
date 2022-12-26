import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { MenuItems } from "../MenuItem/MenuItems";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import Users from "../../pages/Users/Users";
import Header from "../Header/Header";
const cx = classNames.bind(styles);
const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Header />
      <div className={cx("container")}>
        <div
          style={{ width: isOpen ? "300px" : "50px" }}
          className={cx("sidebar")}
        >
          <div className={cx("top_section")}>
            <h1
              style={{ display: isOpen ? "block" : "none" }}
              className={cx("logo")}
            >
              Logo
            </h1>
            <div
              style={{ marginLeft: isOpen ? "50px" : "0px" }}
              className={cx("bars")}
            >
              {isOpen ? (
                <RiCloseLine onClick={toggle} />
              ) : (
                <FaBars onClick={toggle} />
              )}
            </div>
          </div>
          {MenuItems.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={cx("link")}
              // activeClassName={cx("active")}
            >
              <div className={cx("icon")}>{item.icon}</div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className={cx("link_text")}
              >
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
        <main>{children}</main>
      </div>
    </>
  );
};

export default Sidebar;
