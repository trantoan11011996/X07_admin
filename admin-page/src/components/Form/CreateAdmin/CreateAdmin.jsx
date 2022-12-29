import React, { useEffect, useState } from "react";
import styles from "./CreateAdmin.module.scss";
import classNames from "classnames/bind";
import MetaData from "../../MetaData/MetaData";
import { isEmail, isEmpty, isPassword } from "../../../utils/validate";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createAdmin } from "../../../Actions/adminAction";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

const CreateAdmin = () => {
  const initialState = {
    email: "",
    password: "",
    role: "admin",
  };
  const [data, setData] = useState(initialState);
  const { email, password, role } = data;
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const tokenValue = JSON.parse(localStorage.getItem("token"));
    setToken(tokenValue);
  }, [token]);
  //handle even
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmitCreateAdmin = (e) => {
    e.preventDefault();

    //check fields
    if (isEmpty(email) || isEmpty(password) || isEmpty(role))
      return toast.warn("Vui lòng điền tất cả thông tin !");
    // check email
    if (!isEmail(email))
      return toast.error("Vui lòng nhập một địa chỉ email hợp lệ !");
    if (email && password && role) {
      dispatch(createAdmin(email, password, role, token, navigate));
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
            <label htmlFor="name">Mật khẩu</label>
            <input
              type="password"
              id="password"
              name="password"
              className={cx("form_input")}
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
