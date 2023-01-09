import React, { useState } from "react";
import styles from "./UpdateAdmin.module.scss";
import classNames from "classnames/bind";
import MetaData from "../../MetaData/MetaData";
import { toast, ToastContainer } from "react-toastify";
import { isEmpty } from "../../../utils/validate";
import { useDispatch, useSelector } from "react-redux";
import { updateInfoAdmin } from "../../../Actions/adminAction";
const cx = classNames.bind(styles);

const InfoAdmin = () => {
  const { user } = useSelector((state) => state.auths);
  const initialState = {
    name: "",
    phoneNumber: "",
    email: user?.email,
  };
  const [data, setData] = useState(initialState);
  const { name, phoneNumber, email } = data;

  const { token } = useSelector((state) => state.auths.user);
  const dispatch = useDispatch();

  //handle even update info admin
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleChangeInfoAdmin = (e) => {
    e.preventDefault();

    const info = { name, email, phoneNumber };

    dispatch(updateInfoAdmin(token, { info }));
  };
  return (
    <>
      <MetaData title="Cập nhật Admin" />
      <ToastContainer />
      <div className={cx("form_container")}>
        <form onSubmit={handleChangeInfoAdmin}>
          <div className={cx("title")}>
            <h1>Thông tin quản trị viên</h1>
          </div>
          <div className={cx("form_group")}>
            <label htmlFor="name">Họ và tên</label>
            <input
              type="text"
              id="name"
              name="name"
              className={cx("form_input")}
              onChange={handleChange}
            />
          </div>
          <div className={cx("form_group")}>
            <label htmlFor="email">Địa chỉ Email</label>
            <input
              type="email"
              id="email"
              className="form_input"
              disabled
              value={user?.email}
              onChange={handleChange}
            />
          </div>
          <div className={cx("form_group")}>
            <label htmlFor="phoneNumber">Số điện thoại</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="form_input"
              onChange={handleChange}
            />
          </div>
          {/* <div className={cx("form_group")}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form_input"
            />
          </div> */}

          <div className={cx("form_group")}>
            <button type="submit">Chỉnh sửa thông tin cá nhân</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default InfoAdmin;
