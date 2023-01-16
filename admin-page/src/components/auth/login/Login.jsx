import React, { useState } from "react";
import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { isEmpty, isEmail, isPassword } from "../../../utils/validate";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import MetaData from "../../MetaData/MetaData";
import { loginAdmin } from "../../../Actions/authAction";

const cx = classNames.bind(styles);

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(initialState);
  const { email, password } = data;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Handle Even
  const handleClick = () => {
    setVisible(!visible);
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    //check fields
    if (isEmpty(email) || isEmpty(password))
      return toast.warn("Vui lòng điền tất cả thông tin !");
    // check email
    if (!isEmail(email))
      return toast.error("Vui lòng nhập một địa chỉ email hợp lệ !");

    if (email && password) {
      
      dispatch(loginAdmin(email, password, navigate));
    }
  };

  return (
    <>
      <ToastContainer />
      <MetaData title="Đăng nhập" />
      <div className={cx("container")}>
        <div className={cx("wrapper_login")}>
          <form onSubmit={handleSubmitLogin}>
            <h1>Đăng nhập</h1>

            <div className={cx("form_group")}>
              <label htmlFor="email">
                Địa chỉ Email <span>*</span>
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                id="email"
                placeholder="Vidu@gmail.com"
              />
            </div>
            <div className={cx("form_group")}>
              <label htmlFor="password">
                Mật khẩu <span>*</span>
                <div className={cx("input_icon")} onClick={handleClick}>
                  {visible ? <MdVisibility /> : <MdVisibilityOff />}
                </div>
                <input
                  type={visible ? "text" : "password"}
                  id="password"
                  name="password"
                  onChange={handleChange}
                  className={cx("password")}
                  placeholder="Mật khẩu"
                />
              </label>
            </div>
            <div className={cx("login_actions")}>
              <div className={cx("forgot_password")}>
                <Link to={"/register"}>Quên mật khẩu ?</Link>
              </div>
            </div>
            <div className={cx("login_btn")}>
              {/* {loading ? (
              <button type="submit" disabled>
                <Loading loading={loading} color={"#fff"} size={20} />
              </button>
            ) : (
             
            )} */}
              <button type="submit">Đăng nhập</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
