import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_ME_SUCCESS,
  GET_ME_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  CLEAR_AUTH_ERRORS
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload
      };
    case GET_ME_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false
      };
    case GET_ME_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false
      };
    case CREATE_USER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      };
    case CLEAR_AUTH_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};
