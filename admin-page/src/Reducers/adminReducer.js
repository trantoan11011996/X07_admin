import {
  CREATE_ADMIN_FAIL,
  CREATE_ADMIN_REQUEST,
  CREATE_ADMIN_SUCCESS,
  DELETE_RECRUIMENT_FAIL,
  DELETE_RECRUIMENT_REQUEST,
  DELETE_RECRUIMENT_SUCCESS,
} from "../Constants/adminConstant";

export const adminReducer = (state = { admin: {} }, action) => {
  switch (action.type) {
    case CREATE_ADMIN_REQUEST:
    case DELETE_RECRUIMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_ADMIN_SUCCESS:
    case DELETE_RECRUIMENT_SUCCESS:
      return {
        admin: action.payload,
        loading: false,
      };
    case CREATE_ADMIN_FAIL:
    case DELETE_RECRUIMENT_FAIL:
      return {
        admin: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
