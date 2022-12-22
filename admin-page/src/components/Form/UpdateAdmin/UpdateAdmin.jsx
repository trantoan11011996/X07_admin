import React, { useState } from "react";
import styles from "./UpdateAdmin.module.scss";
import classNames from "classnames/bind";
import MetaData from "../../MetaData/MetaData";
import { toast, ToastContainer } from "react-toastify";
import { isEmpty } from "../../../utils/validate";
const cx = classNames.bind(styles);

const UpdateAdmin = () => {
  const initialState = {
    name: "",
    phoneNumber: "",
    password: "",
  };
  const [data, setData] = useState(initialState);
  const { name, phoneNumber, password } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmitUpdateAdmin = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      phoneNumber: phoneNumber,
      password: password,
    };
    if (isEmpty(name) || isEmpty(phoneNumber)) {
      toast.warn("Không được để trống các trường !");
    }
    if (phoneNumber && name && password) {
      console.log("data", data);
    }
  };
  return (
    <>
      <MetaData title="Cập nhật Admin" />
      <ToastContainer />
      <div className={cx("form_container")}>
        <form onSubmit={handleSubmitUpdateAdmin}>
          <div className={cx("title")}>
            <h1>Chỉnh sửa Admin</h1>
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
              value="Quang Minh"
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
          <div className={cx("form_group")}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form_input"
              onChange={handleChange}
            />
          </div>

          <div className={cx("form_group")}>
            <button type="submit">Hoàn tất</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateAdmin;
