import {
  CREATE_ADMIN_FAIL,
  CREATE_ADMIN_REQUEST,
  CREATE_ADMIN_SUCCESS,
  DELETE_RECRUIMENT_FAIL,
  DELETE_RECRUIMENT_REQUEST,
  DELETE_RECRUIMENT_SUCCESS,
  GET_RECRUIMENT_DETAILS_FAIL,
  GET_RECRUIMENT_DETAILS_REQUEST,
  GET_RECRUIMENT_DETAILS_SUCCESS,
  UPDATE_INFO_ADMIN_FAIL,
  UPDATE_INFO_ADMIN_REQUEST,
  UPDATE_INFO_ADMIN_SUCCESS,
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

export const recruimentReducer = (state = { recruiments: [] }, action) => {
  switch (action.type) {
    case GET_RECRUIMENT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_RECRUIMENT_DETAILS_SUCCESS:
      return {
        recruiments: action.payload,
        loading: false,
      };
    case GET_RECRUIMENT_DETAILS_FAIL:
      return {
        error: action.payload,
        recruiments: null,
      };
    default:
      return state;
  }
};

export const updateAdminReducer = (state = { info: {} }, action) => {
  switch (action.type) {
    case UPDATE_INFO_ADMIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_INFO_ADMIN_SUCCESS:
      return {
        ...state,
        info: action.payload,
        loading: false,
      };
    case UPDATE_INFO_ADMIN_FAIL:
      return {
        info: null,
        error: action.payload,
      };

    default:
      return state;
  }
};
