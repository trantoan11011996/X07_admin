import React, { useState } from "react";
import styles from "./CreateAdmin.module.scss";
import classNames from "classnames/bind";
import MetaData from "../../MetaData/MetaData";
import {
  isEmail,
  isEmpty,
  isVietnamesePhoneNumberValid,
} from "../../../utils/validate";
import { ToastContainer, toast } from "react-toastify";
const cx = classNames.bind(styles);

const CreateAdmin = () => {
  const initialState = {
    name: "",
    email: "",
    phoneNumber: "",
  };
  const [data, setData] = useState(initialState);
  const { name, email, phoneNumber } = data;
  //handle even
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmitCreateAdmin = (e) => {
    e.preventDefault();

    if (isEmpty(name) || isEmpty(email) || isEmpty(phoneNumber)) {
      toast.warn("Không được để trống các trường !");
    }

    if (name && email && phoneNumber) {
      if (!isEmail(email)) {
        return toast.error("Vui lòng nhập một địa chỉ email hợp lệ !");
      }
      if (!isVietnamesePhoneNumberValid(phoneNumber)) {
        return toast.error("Số điện thoại chưa đúng định dạng !");
      }
      const data = {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
      };
      console.log("data", data);
      toast.success("Tạo mới thành công !");
    }
  };
  return (
    <>
      <MetaData title="Tạo mới Admin" />
      <ToastContainer />
      <div className={cx("form_container")}>
        <form onSubmit={handleSubmitCreateAdmin}>
          <div className={cx("title")}>
            <h1>Tạo Admin</h1>
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
              name="email"
              className="form_input"
              onChange={handleChange}
            />
          </div>
          <div className={cx("form_group")}>
            <label htmlFor="phoneNumber">Số điện thoại</label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
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

export default CreateAdmin;
