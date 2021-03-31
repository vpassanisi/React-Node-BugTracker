import React from "react";

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
  CLEAR_BUGS_ERRORS,
  CLEAR_BUGS,
} from "../types";

const BugsStateContext = React.createContext();
const BugsDispatchContext = React.createContext();

const bugsReducer = (state, action) => {
  switch (action.type) {
    case GET_BUGS_SUCCESS:
      return {
        ...state,
        bugs: action.payload,
      };
    case GET_BUGS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case NEW_BUG_SUCCESS:
      return {
        ...state,
        bugs: [...state.bugs, action.payload],
      };
    case NEW_BUG_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_BUG_SUCCESS:
      let bugs = [...state.bugs];
      bugs[action.payload.index] = action.payload.data;
      return {
        ...state,
        bugs: bugs,
      };
    case UPDATE_BUG_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_BUG_SUCCESS:
      let arr = [...state.bugs];
      arr.splice(action.payload, 1);
      return {
        ...state,
        bugs: arr,
      };
    case DELETE_BUG_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case SORT_BUGS:
      const sortBy = action.payload;
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

      return {
        ...state,
        bugs: sorted,
      };
    case CLEAR_BUGS:
      return {
        ...state,
        bugs: [],
      };
    case CLEAR_BUGS_ERRORS:
      return {
        ...state,
        error: null,
      };
    case "IS_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "NOT_LOADING":
      return {
        ...state,
        isLoading: false,
      };
    default: {
      return {
        ...state,
        error: `Unhandled action type: ${action.type}`,
      };
    }
  }
};

const BugsProvider = ({
  children,
  isLoading = false,
  error = null,
  bugs = [
    {
      name: "",
      status: "",
      severity: "",
      reproduceablility: "",
      description: "",
      createdAt: "",
      updatedAt: "",
      reporter: {
        name: "",
      },
      fixer: {
        name: "",
      },
    },
  ],
}) => {
  const initialState = {
    bugs: bugs,
    isLoading: isLoading,
    error: error,
  };

  const [state, dispatch] = React.useReducer(bugsReducer, initialState);

  return (
    <BugsStateContext.Provider value={state}>
      <BugsDispatchContext.Provider value={dispatch}>
        {children}
      </BugsDispatchContext.Provider>
    </BugsStateContext.Provider>
  );
};

const getBugs = async (dispatch) => {
  dispatch({
    type: "IS_LOADING",
  });
  try {
    const req = await fetch(`/api/v1/bugs/project`, {
      method: "GET",
      credentials: "include",
    });

    const res = await req.json();

    if (res.success) {
      dispatch({
        type: GET_BUGS_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_BUGS_FAIL,
        payload: res.error,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_BUGS_FAIL,
      payload: err,
    });
  }
  dispatch({
    type: "NOT_LOADING",
  });
};

const newBug = async (dispatch, body) => {
  dispatch({
    type: "IS_LOADING",
  });
  try {
    const req = await fetch(`/api/v1/bugs`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const res = await req.json();

    if (res.success) {
      // let newBugsArr = [...state.bugs, res.data];
      dispatch({
        type: NEW_BUG_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: NEW_BUG_FAIL,
        payload: res.error,
      });
    }
  } catch (err) {
    dispatch({
      type: NEW_BUG_FAIL,
      payload: `${err}`,
    });
  }
  dispatch({
    type: "NOT_LOADING",
  });
};

const updateBug = async (dispatch, body, id, index) => {
  dispatch({
    type: "IS_LOADING",
  });
  try {
    const req = await fetch(`/api/v1/bugs/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const res = await req.json();

    if (res.success) {
      // let newBugsArr = [...state.bugs];
      // newBugsArr[index] = res.data;
      dispatch({
        type: UPDATE_BUG_SUCCESS,
        payload: { data: res.data, index: index },
      });
    } else {
      dispatch({
        type: UPDATE_BUG_FAIL,
        payload: res.error,
      });
    }
  } catch (err) {
    dispatch({
      type: UPDATE_BUG_FAIL,
      payload: `${err}`,
    });
  }
  dispatch({
    type: "NOT_LOADING",
  });
};

const deleteBug = async (dispatch, id, index) => {
  dispatch({
    type: "IS_LOADING",
  });
  try {
    const req = await fetch(`/api/v1/bugs/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const res = await req.json();

    if (res.success) {
      // let newBugsArr = [...state.bugs];
      // newBugsArr.splice(index, 1);
      dispatch({
        type: DELETE_BUG_SUCCESS,
        payload: index,
      });
    } else {
      dispatch({
        type: DELETE_BUG_FAIL,
        payload: res.error,
      });
    }
  } catch (err) {
    dispatch({
      type: DELETE_BUG_FAIL,
      payload: `${err}`,
    });
  }
  dispatch({
    type: "NOT_LOADING",
  });
};

const sortBugs = (dispatch, sortBy) => {
  dispatch({
    type: SORT_BUGS,
    payload: sortBy,
  });
};

const clearBugs = (dispatch) => {
  dispatch({
    type: CLEAR_BUGS,
  });
};

const clearBugsErrors = (dispatch) => {
  dispatch({
    type: CLEAR_BUGS_ERRORS,
  });
};

const useBugsState = () => {
  const context = React.useContext(BugsStateContext);
  if (context === undefined) {
    throw new Error(`useBugsState must be used within a BugsProvider`);
  }
  return context;
};

const useBugsDispatch = () => {
  const context = React.useContext(BugsDispatchContext);
  if (context === undefined) {
    throw new Error(`useBugsDispatch must be used within a BugsProvider`);
  }
  return context;
};

export {
  BugsProvider,
  BugsStateContext,
  useBugsState,
  useBugsDispatch,
  getBugs,
  newBug,
  updateBug,
  deleteBug,
  sortBugs,
  clearBugsErrors,
  clearBugs,
};
