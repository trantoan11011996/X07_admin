// import React, { useState } from "react";
// import styles from "./Register.module.scss";
// import classNames from "classnames/bind";
// import { MdVisibility, MdVisibilityOff } from "react-icons/md";
// import { Link, useNavigate } from "react-router-dom";
// import { isEmail, isEmpty, isPassword } from "../../../utils/validate";
// import { toast, ToastContainer } from "react-toastify";
// import MetaData from "../../MetaData/MetaData";
// import { useDispatch } from "react-redux";
// import { registerAdmin } from "../../../Actions/authAction";

// const cx = classNames.bind(styles);

// const Register = () => {
//   const initialState = {
//     email: "",
//     password: "",
//     role: "",
//   };
//   const [data, setData] = useState(initialState);
//   const [visible, setVisible] = useState(false);
//   const { email, password, role } = data;
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   //Handle Even
//   const handleClick = () => {
//     setVisible(!visible);
//   };
//   const handleChange = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   const handleSubmitRegisterAdmin = (e) => {
//     e.preventDefault();
//     //check fields
//     if (isEmpty(email) || isEmpty(password) || isEmpty(role))
//       return toast.warn("Vui lòng điền tất cả thông tin !");
//     // check email
//     if (!isEmail(email))
//       return toast.error("Vui lòng nhập một địa chỉ email hợp lệ !");
//     //check length password
//     if (password.length < 6)
//       return toast.error("Mật khẩu phải lớn hơn 6 kí tự !");
//     //check password
//     if (!isPassword(password))
//       return toast.error(
//         "Mật khẩu phải ít nhất 8 kí tự, 1 chữ số,chữ in hoa và 1 ký tự đặc biệt !"
//       );
//     if (email && password && role) {
//       dispatch(registerAdmin(email, password, role, navigate));
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <MetaData title="Đăng ký" />
//       <div className={cx("container")}>
//         <div className={cx("wrapper_login")}>
//           <form onSubmit={handleSubmitRegisterAdmin}>
//             <h1>Đăng ký</h1>

//             <div className={cx("form_group")}>
//               <label htmlFor="email">
//                 Địa chỉ Email <span>*</span>
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 id="email"
//                 onChange={handleChange}
//                 placeholder="Vidu@gmail.com"
//               />
//             </div>
//             <div className={cx("form_group")}>
//               <label htmlFor="password">
//                 Mật khẩu <span>*</span>
//                 <div className={cx("input_icon")} onClick={handleClick}>
//                   {visible ? <MdVisibility /> : <MdVisibilityOff />}
//                 </div>
//                 <input
//                   type={visible ? "text" : "password"}
//                   id="password"
//                   name="password"
//                   onChange={handleChange}
//                   className={cx("password")}
//                   placeholder="Mật khẩu"
//                 />
//               </label>
//             </div>
//             <div className={cx("login_actions")}>
//               <div className={cx("role")}>
//                 <input
//                   type="radio"
//                   id="admin"
//                   name="role"
//                   value="admin"
//                   onChange={handleChange}
//                 />
//                 <label htmlFor="admin">Admin</label>
//               </div>
//               <div className={cx("role")}>
//                 <div className={cx("register")}>
//                   <Link to={"/login"}>Bạn đã có tài khoản ?</Link>
//                 </div>
//               </div>
//             </div>

//             <div className={cx("login_btn")}>
//               {/* {loading ? (
//               <button type="submit" disabled>
//                 <Loading loading={loading} color={"#fff"} size={20} />
//               </button>
//             ) : (

//             )} */}
//               <button type="submit">Đăng ký</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Register;
