import axios from "axios";
import { toast } from "react-toastify";
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_ADMIN_FAIL,
  REGISTER_ADMIN_REQUEST,
  REGISTER_ADMIN_SUCCESS,
} from "../Constants/authConstant";

export const loginAdmin = (email, password, navigate) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "https://xjob-mindx-production.up.railway.app/api/users/login",
      { email, password },
      config
    );

    localStorage.setItem("currentAdmin", JSON.stringify(data));
    localStorage.setItem("token", JSON.stringify(data.token));
    dispatch({ type: LOGIN_SUCCESS, payload: data });
    navigate("/");
  } catch (error) {
    toast.error(error.response.data.message);
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const registerAdmin =
  (email, password, role, navigate) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_ADMIN_REQUEST });
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "https://xjob-mindx-production.up.railway.app/api/admin/users",
        { email, password, role },
        config
      );

      dispatch({ type: REGISTER_ADMIN_SUCCESS, payload: data });
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch({
        type: REGISTER_ADMIN_FAIL,
        payload: error.response.data.message,
      });
    }
  };
