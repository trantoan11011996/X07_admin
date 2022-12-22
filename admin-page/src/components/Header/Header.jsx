import React from "react";
import classNames from "classnames/bind";
import styles from "./Header.mudole.css";
import logo from "../../img/XCAREERBUILDER_free-file.png";
import { RiAdminLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
const cx = classNames.bind(styles);
const Header = () => {
  return (
    <header className={cx("wrapper")}>
      <div className={cx("logo")}>
        <img src={logo} alt="Admin" />
      </div>
      <div className={cx("wrapper-info-admin")}>
        <div className={cx("info_admin")}>
          <RiAdminLine className={cx("logo-admin")}></RiAdminLine>
          <p className="admin-content">Quản trị viên</p>
        </div>
        <div className={cx("wrap-btn-logout")}>
          <button className={cx("btn-logout")}>Đăng xuất</button>
          <FiLogOut className={cx("logout-icon")}></FiLogOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
