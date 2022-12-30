import React from "react";
import classNames from "classnames/bind";
import styles from "./Header.mudole.css";
import logo from "../../img/XCAREERBUILDER_free-file.png";
import { RiAdminLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Actions/authAction";
import { useDispatch, useSelector } from "react-redux";
const cx = classNames.bind(styles);
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auths);

  const handleLogoutUser = (e) => {
    e.preventDefault();

    dispatch(logoutUser(navigate));
  };
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
        <div className={cx("wrap-btn-logout")} onClick={handleLogoutUser}>
          <button className={cx("btn-logout")}>Đăng xuất</button>
          <FiLogOut className={cx("logout-icon")}></FiLogOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
