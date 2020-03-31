import {
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAIL,
  SET_PROJECT_SUCCESS,
  SET_PROJECT_FAIL,
  NEW_PROJECT_SUCCESS,
  NEW_PORJECT_FAIL,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,
  CLEAR_CURRENT_PROJECT,
  CLEAR_PROJECTS_ERRORS
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload
      };
    case GET_PROJECTS_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case SET_PROJECT_SUCCESS:
      return {
        ...state,
        currentProject: action.payload
      };
    case SET_PROJECT_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case NEW_PROJECT_SUCCESS:
      return {
        ...state,
        projects: action.payload
      };
    case NEW_PORJECT_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: action.payload
      };
    case DELETE_PROJECT_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case CLEAR_CURRENT_PROJECT:
      return {
        ...state,
        currentProject: null
      };
    case CLEAR_PROJECTS_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};
