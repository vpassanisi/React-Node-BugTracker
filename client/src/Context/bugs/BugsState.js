import React, { useReducer } from "react";

import BugsContext from "./bugsContext";
import bugsReducer from "./bugsReducer";

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

const BugsState = props => {
  const initialState = {
    bugs: [
      {
        name: "",
        status: "",
        severity: "",
        reproduceablility: "",
        description: "",
        createdAt: "",
        updatedAt: "",
        reporter: {
          name: ""
        },
        fixer: {
          name: ""
        }
      }
    ],
    error: null
  };

  const [state, dispatch] = useReducer(bugsReducer, initialState);

  const getBugs = async () => {
    const loader = document.getElementById("loader");
    loader.classList.remove("hidden");
    try {
      const req = await fetch(`/api/v1/bugs/project`, {
        method: "GET",
        credentials: "include"
      });

      const res = await req.json();

      if (!res.success) {
        dispatch({
          type: GET_BUGS_FAIL,
          payload: res.error
        });
      } else {
        dispatch({
          type: GET_BUGS_SUCCESS,
          payload: res.data
        });
      }
    } catch (err) {
      dispatch({
        type: GET_BUGS_FAIL,
        payload: err
      });
    }
    loader.classList.add("hidden");
  };

  const newBug = async body => {
    const loader = document.getElementById("loader");
    loader.classList.remove("hidden");
    try {
      const req = await fetch(`/api/v1/bugs`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const res = await req.json();

      if (!res.success) {
        dispatch({
          type: NEW_BUG_FAIL,
          payload: res.error
        });
      } else {
        let newBugsArr = [...state.bugs, res.data];
        dispatch({
          type: NEW_BUG_SUCCESS,
          payload: newBugsArr
        });
      }
    } catch (err) {
      dispatch({
        type: NEW_BUG_FAIL,
        payload: `${err}`
      });
    }
    loader.classList.add("hidden");
  };

  const updateBug = async (body, id, index) => {
    const loader = document.getElementById("loader");
    loader.classList.remove("hidden");
    try {
      const req = await fetch(`/api/v1/bugs/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const res = await req.json();

      if (!res.success) {
        dispatch({
          type: UPDATE_BUG_FAIL,
          payload: res.error
        });
      } else {
        let newBugsArr = [...state.bugs];
        newBugsArr[index] = res.data;
        dispatch({
          type: UPDATE_BUG_SUCCESS,
          payload: newBugsArr
        });
      }
    } catch (err) {
      dispatch({
        type: UPDATE_BUG_FAIL,
        payload: `${err}`
      });
    }
    loader.classList.add("hidden");
  };

  const deleteBug = async (id, index) => {
    const loader = document.getElementById("loader");
    loader.classList.remove("hidden");
    try {
      const req = await fetch(`/api/v1/bugs/${id}`, {
        method: "DELETE",
        credentials: "include"
      });

      const res = await req.json();

      if (!res.success) {
        dispatch({
          type: DELETE_BUG_FAIL,
          payload: res.error
        });
      } else {
        let newBugsArr = [...state.bugs];
        newBugsArr.splice(index, 1);
        dispatch({
          type: DELETE_BUG_SUCCESS,
          payload: newBugsArr
        });
      }
    } catch (err) {
      dispatch({
        type: DELETE_BUG_FAIL,
        payload: `${err}`
      });
    }
    loader.classList.add("hidden");
  };

  const sortBugs = sortBy => {
    const n = state.bugs;
    let sorted = [...n].sort((bug, nextBug) => {
      let X;
      let Y;
      sortBy === "reporter" || sortBy === "fixer"
        ? (X = bug[sortBy].name.toUpperCase())
        : (X = bug[sortBy].toUpperCase());
      sortBy === "reporter" || sortBy === "fixer"
        ? (Y = nextBug[sortBy].name.toUpperCase())
        : (Y = nextBug[sortBy].toUpperCase());
      if (X > Y) return 1;
      if (X < Y) return -1;
      return 0;
    });

    let wasChanged = false;
    n.forEach((bug, index) => {
      if (bug !== sorted[index]) wasChanged = true;
    });

    if (!wasChanged) sorted = sorted.reverse();

    dispatch({
      type: SORT_BUGS,
      payload: sorted
    });
  };

  const clearBugsErrors = () => {
    dispatch({
      type: CLEAR_BUGS_ERRORS
    });
  };

  return (
    <BugsContext.Provider
      value={{
        bugs: state.bugs,
        error: state.error,
        getBugs,
        sortBugs,
        updateBug,
        newBug,
        deleteBug,
        clearBugsErrors
      }}
    >
      {props.children}
    </BugsContext.Provider>
  );
};

export default BugsState;
