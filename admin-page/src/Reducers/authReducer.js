import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../Constants/authConstant";
export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT:
      return {
        isAuthenticated: false,
        error: false,
        user: null,
      };

    default:
      return state;
  }
};
