import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getApiHost } from "../config";
import {
  CREATE_ADMIN_FAIL,
  CREATE_ADMIN_REQUEST,
  CREATE_ADMIN_SUCCESS,
  DELETE_RECRUIMENT_FAIL,
  DELETE_RECRUIMENT_REQUEST,
  DELETE_RECRUIMENT_SUCCESS,
} from "../Constants/adminConstant";

export const createAdmin =
  (email, password, role, token, navigate) => async (dispatch) => {
    console.log(token);
    try {
      dispatch({ type: CREATE_ADMIN_REQUEST });
      const { data } = await axios.post(
        // "https://xjob-mindx-production.up.railway.app/api/admin/users",
        getApiHost() + "admin/users",
        { email, password, role },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({ type: CREATE_ADMIN_SUCCESS, payload: data });
      toast.success("Tạo mới tài khoản admin thành công!");
      setTimeout(() => {
        navigate("/user");
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch({
        type: CREATE_ADMIN_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const deleteRecruiment = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_RECRUIMENT_REQUEST });
    const { data } = await axios.post(
      // "https://xjob-mindx-production.up.railway.app/api/admin/users",
      getApiHost() + `admin/recruiments/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({ type: DELETE_RECRUIMENT_SUCCESS, payload: data });
    toast.success("Xóa lĩnh vực thành công!");
  } catch (error) {
    toast.error(error.response.data.message);
    dispatch({
      type: DELETE_RECRUIMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};
