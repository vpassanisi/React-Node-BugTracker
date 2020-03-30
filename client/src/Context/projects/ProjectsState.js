import React, { useReducer } from "react";
import { useHistory } from "react-router-dom";

import ProjectsContext from "./projectsContext";
import projectsReducer from "./projectsReducer";

import {
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAIL,
  SET_PROJECT_SUCCESS,
  SET_PROJECT_FAIL,
  NEW_PROJECT_SUCCESS,
  NEW_PORJECT_FAIL,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,
  CLEAR_PROJECTS_ERRORS
} from "../types";

const ProjectsState = props => {
  const initialState = {
    projects: [],
    currentProject: null,
    error: null
  };

  const history = useHistory();

  const [state, dispatch] = useReducer(projectsReducer, initialState);

  const getProjects = async () => {
    const loader = document.getElementById("loader");
    loader.classList.remove("hidden");
    try {
      const req = await fetch(`/api/v1/projects/getProjects`, {
        method: "GET",
        credentials: "include"
      });

      const res = await req.json();

      if (!res.success) {
        dispatch({
          type: GET_PROJECTS_FAIL,
          payload: res.error
        });
      } else {
        dispatch({
          type: GET_PROJECTS_SUCCESS,
          payload: res.data
        });
      }
    } catch (err) {
      dispatch({
        type: GET_PROJECTS_FAIL,
        payload: `${err}`
      });
    }
    loader.classList.add("hidden");
  };

  const setProject = async id => {
    const loader = document.getElementById("loader");
    loader.classList.remove("hidden");
    try {
      const req = await fetch(`/api/v1/projects/${id}`, {
        method: "GET",
        credentials: "include"
      });

      const res = await req.json();

      if (!res.success) {
        dispatch({
          type: SET_PROJECT_FAIL,
          payload: res.error
        });
      } else {
        dispatch({
          type: SET_PROJECT_SUCCESS,
          payload: res.data
        });
        history.push("/bugs");
      }
    } catch (err) {
      dispatch({
        type: SET_PROJECT_FAIL,
        payload: `${err}`
      });
    }
    loader.classList.add("hidden");
  };

  const newProject = async body => {
    const loader = document.getElementById("loader");
    loader.classList.remove("hidden");
    try {
      const req = await fetch(`/api/v1/projects`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const res = await req.json();

      if (!res.success) {
        dispatch({
          type: NEW_PORJECT_FAIL,
          payload: res.error
        });
      } else {
        const newProjectsArr = [...state.projects, res.data];
        dispatch({
          type: NEW_PROJECT_SUCCESS,
          payload: newProjectsArr
        });

        setProject(res.data._id);
      }
    } catch (err) {
      dispatch({
        type: NEW_PORJECT_FAIL,
        payload: `${err}`
      });
    }
    loader.classList.add("hidden");
  };

  const deleteProject = async (id, index) => {
    const loader = document.getElementById("loader");
    loader.classList.remove("hidden");
    try {
      const req = await fetch(`/api/v1/projects/${id}`, {
        method: "GET",
        credentials: "include"
      });

      const res = await req.json();

      if (!res.success) {
        return dispatch({
          type: DELETE_PROJECT_FAIL,
          payload: res.error
        });
      }

      const deleteReq = await fetch(`/api/v1/projects`, {
        method: "DELETE",
        credentials: "include"
      });

      const deleteRes = await deleteReq.json();

      if (!deleteRes.success) {
        dispatch({
          type: DELETE_PROJECT_FAIL,
          payload: deleteRes.error
        });
      } else {
        let newProjectsArr = [...state.projects];
        newProjectsArr.splice(index, 1);
        dispatch({
          type: DELETE_PROJECT_SUCCESS,
          payload: newProjectsArr
        });
      }
    } catch (err) {
      dispatch({
        type: DELETE_PROJECT_FAIL,
        payload: `${err}`
      });
    }
    loader.classList.add("hidden");
  };

  const clearProjectsErrors = () => {
    dispatch({
      type: CLEAR_PROJECTS_ERRORS
    });
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects: state.projects,
        currentProject: state.currentProject,
        error: state.error,
        getProjects,
        setProject,
        newProject,
        deleteProject,
        clearProjectsErrors
      }}
    >
      {props.children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsState;
