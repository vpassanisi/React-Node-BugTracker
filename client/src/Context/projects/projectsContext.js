import React from "react";

import {
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAIL,
  SET_PROJECT_SUCCESS,
  SET_PROJECT_FAIL,
  NEW_PROJECT_SUCCESS,
  NEW_PORJECT_FAIL,
  EDIT_PROJECT_SUCCESS,
  EDIT_PROJECT_FAIL,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,
  CLEAR_CURRENT_PROJECT,
  CLEAR_PROJECTS_ERRORS,
} from "../types";

const ProjectsStateContext = React.createContext();
const ProjectsDispatchContext = React.createContext();

const projectsReducer = (state, action) => {
  switch (action.type) {
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload,
      };
    case GET_PROJECTS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case SET_PROJECT_SUCCESS:
      return {
        ...state,
        currentProject: action.payload,
      };
    case SET_PROJECT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case NEW_PROJECT_SUCCESS:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case NEW_PORJECT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case EDIT_PROJECT_SUCCESS:
      let arr = [...state.projects];
      arr[action.payload.index] = action.payload.data;
      return {
        ...state,
        projects: arr,
      };
    case EDIT_PROJECT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_PROJECT_SUCCESS:
      let arr2 = [...state.projects];
      arr2.splice(action.payload, 1);
      return {
        ...state,
        projects: arr2,
      };
    case DELETE_PROJECT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_CURRENT_PROJECT:
      return {
        ...state,
        currentProject: null,
      };
    case CLEAR_PROJECTS_ERRORS:
      return {
        ...state,
        error: null,
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const ProjectsProvider = ({ children }) => {
  const initialState = {
    projects: [],
    currentProject: null,
    error: null,
  };

  const [state, dispatch] = React.useReducer(projectsReducer, initialState);

  return (
    <ProjectsStateContext.Provider value={state}>
      <ProjectsDispatchContext.Provider value={dispatch}>
        {children}
      </ProjectsDispatchContext.Provider>
    </ProjectsStateContext.Provider>
  );
};

const getProjects = async (dispatch) => {
  const loader = document.getElementById("loader");
  loader.classList.remove("hidden");
  try {
    const req = await fetch(`/api/v1/projects/getProjects`, {
      method: "GET",
      credentials: "include",
    });

    const res = await req.json();

    if (!res.success) {
      dispatch({
        type: GET_PROJECTS_FAIL,
        payload: res.error,
      });
    } else {
      dispatch({
        type: GET_PROJECTS_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_PROJECTS_FAIL,
      payload: `${err}`,
    });
  }
  loader.classList.add("hidden");
};

const setProject = async (dispatch, id) => {
  const loader = document.getElementById("loader");
  loader.classList.remove("hidden");
  try {
    const req = await fetch(`/api/v1/projects/${id}`, {
      method: "GET",
      credentials: "include",
    });

    const res = await req.json();

    if (!res.success) {
      dispatch({
        type: SET_PROJECT_FAIL,
        payload: res.error,
      });
    } else {
      dispatch({
        type: SET_PROJECT_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: SET_PROJECT_FAIL,
      payload: `${err}`,
    });
  }
  loader.classList.add("hidden");
};

const newProject = async (dispatch, body) => {
  const loader = document.getElementById("loader");
  loader.classList.remove("hidden");
  try {
    const req = await fetch(`/api/v1/projects`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const res = await req.json();

    if (!res.success) {
      dispatch({
        type: NEW_PORJECT_FAIL,
        payload: res.error,
      });
    } else {
      // const newProjectsArr = [...state.projects, res.data];
      dispatch({
        type: NEW_PROJECT_SUCCESS,
        payload: res.data,
      });

      setProject(dispatch, res.data._id);
    }
  } catch (err) {
    dispatch({
      type: NEW_PORJECT_FAIL,
      payload: `${err}`,
    });
  }
  loader.classList.add("hidden");
};

const editProject = async (dispatch, project, index) => {
  try {
    const req = await fetch(`/api/v1/projects`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });

    const res = await req.json();

    if (!res.success) {
      dispatch({
        type: EDIT_PROJECT_FAIL,
        payload: res.error,
      });
    } else {
      // let newProjectsArr = [...state.projects];
      // newProjectsArr[index] = res.data;
      dispatch({
        type: EDIT_PROJECT_SUCCESS,
        payload: { data: res.data, index: index },
      });
    }
  } catch (err) {
    dispatch({
      type: EDIT_PROJECT_FAIL,
      payload: err,
    });
  }
};

const deleteProject = async (dispatch, id, index) => {
  const loader = document.getElementById("loader");
  loader.classList.remove("hidden");
  try {
    const req = await fetch(`/api/v1/projects/${id}`, {
      method: "GET",
      credentials: "include",
    });

    const res = await req.json();

    if (!res.success) {
      return dispatch({
        type: DELETE_PROJECT_FAIL,
        payload: res.error,
      });
    }

    const deleteReq = await fetch(`/api/v1/projects`, {
      method: "DELETE",
      credentials: "include",
    });

    const deleteRes = await deleteReq.json();

    if (!deleteRes.success) {
      dispatch({
        type: DELETE_PROJECT_FAIL,
        payload: deleteRes.error,
      });
    } else {
      // let newProjectsArr = [...state.projects];
      // newProjectsArr.splice(index, 1);
      dispatch({
        type: DELETE_PROJECT_SUCCESS,
        payload: index,
      });
    }
  } catch (err) {
    dispatch({
      type: DELETE_PROJECT_FAIL,
      payload: `${err}`,
    });
  }
  loader.classList.add("hidden");
};

const clearCurrentProject = (dispatch) => {
  dispatch({
    type: CLEAR_CURRENT_PROJECT,
  });
};

const clearProjectsErrors = (dispatch) => {
  dispatch({
    type: CLEAR_PROJECTS_ERRORS,
  });
};

const useProjectsState = () => {
  const context = React.useContext(ProjectsStateContext);
  if (context === undefined) {
    throw new Error(`useProjectsState must be used within a ProjectsProvider`);
  }
  return context;
};

const useProjectsDispatch = () => {
  const context = React.useContext(ProjectsDispatchContext);
  if (context === undefined) {
    throw new Error(
      `useProjectsDispatch must be used within a ProjectsProvider`
    );
  }
  return context;
};

export {
  ProjectsProvider,
  useProjectsState,
  useProjectsDispatch,
  getProjects,
  setProject,
  newProject,
  editProject,
  deleteProject,
  clearCurrentProject,
  clearProjectsErrors,
};
