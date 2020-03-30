import {
  GET_BUGS_SUCCESS,
  GET_BUGS_FAIL,
  SORT_BUGS,
  UPDATE_BUG_SUCCESS,
  UPDATE_BUG_FAIL,
  NEW_BUG_SUCCESS,
  NEW_BUG_FAIL,
  DELETE_BUG_SUCCESS,
  DELETE_BUG_FAIL,
  CLEAR_BUGS_ERRORS
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_BUGS_SUCCESS:
      return {
        ...state,
        bugs: action.payload
      };
    case GET_BUGS_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case NEW_BUG_SUCCESS:
      return {
        ...state,
        bugs: action.payload
      };
    case NEW_BUG_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case UPDATE_BUG_SUCCESS:
      return {
        ...state,
        bugs: action.payload
      };
    case UPDATE_BUG_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case DELETE_BUG_SUCCESS:
      return {
        ...state,
        bugs: action.payload
      };
    case DELETE_BUG_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case SORT_BUGS:
      return {
        ...state,
        bugs: action.payload
      };
    case CLEAR_BUGS_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};
