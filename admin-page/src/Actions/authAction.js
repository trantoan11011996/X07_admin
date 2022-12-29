import axios from "axios";
import { toast } from "react-toastify";
import { getApiHost } from "../config";
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../Constants/authConstant";

export const loginAdmin = (email, password, navigate) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      getApiHost() + "users/login",
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
export const logoutUser = (navigate) => async (dispatch) => {
  dispatch({ type: LOGOUT });
  localStorage.removeItem("currentAdmin");
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT, payload: null });
  navigate("/login");
};
