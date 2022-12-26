import {
  CREATE_ADMIN_FAIL,
  CREATE_ADMIN_REQUEST,
  CREATE_ADMIN_SUCCESS,
} from "../Constants/adminConstant";

export const adminReducer = (state = { admin: {} }, action) => {
  switch (action.type) {
    case CREATE_ADMIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_ADMIN_SUCCESS:
      return {
        admin: action.payload,
        loading: false,
      };
    case CREATE_ADMIN_FAIL:
      return {
        admin: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
