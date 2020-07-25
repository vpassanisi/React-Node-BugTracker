import React from "react";

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_ME_SUCCESS,
  GET_ME_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  CLEAR_AUTH_ERRORS,
} from "../types";

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload,
      };
    case GET_ME_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
      };
    case GET_ME_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
      };
    case CREATE_USER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case CLEAR_AUTH_ERRORS:
      return {
        ...state,
        error: null,
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const AuthProvider = ({
  children,
  isAuthenticated = null,
  // TODO: might not be needed??
  isLoading = true,
  error = null,
}) => {
  const initialState = {
    isAuthenticated: isAuthenticated,
    isLoading: isLoading,
    error: error,
  };

  const [state, dispatch] = React.useReducer(authReducer, initialState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

const login = async (dispatch, credentials) => {
  const loader = document.getElementById("loader");
  loader.classList.remove("hidden");
  try {
    const req = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(credentials),
    });

    const res = await req.json();

    if (!res.success) {
      dispatch({
        type: LOGIN_FAIL,
        payload: res.error,
      });
    } else {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: `${err}`,
    });
  }
  loader.classList.add("hidden");
};

const getMe = async (dispatch) => {
  try {
    const req = await fetch(`/api/v1/auth/me`, {
      method: "GET",
      credentials: "include",
    });

    const res = await req.json();

    if (!res.success) {
      dispatch({
        type: GET_ME_FAIL,
        payload: res.error,
      });
    } else {
      dispatch({
        type: GET_ME_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_ME_FAIL,
      payload: `${err}`,
    });
  }
};

const logout = async (dispatch) => {
  const loader = document.getElementById("loader");
  loader.classList.remove("hidden");
  try {
    const req = await fetch(`/api/v1/auth/logout`, {
      method: "GET",
      credentials: "include",
    });

    const res = await req.json();

    if (!res.success) {
      dispatch({
        type: LOGOUT_FAIL,
        payload: res.error,
      });
    } else {
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: res,
      });
    }
  } catch (err) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: `${err}`,
    });
  }
  loader.classList.add("hidden");
};

const createUser = async (dispatch, user) => {
  const loader = document.getElementById("loader");
  loader.classList.remove("hidden");
  try {
    const req = await fetch(`/api/v1/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const res = await req.json();

    if (!res.success) {
      dispatch({
        type: CREATE_USER_FAIL,
        payload: res.error,
      });
    } else {
      dispatch({
        type: CREATE_USER_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: CREATE_USER_FAIL,
      payload: `${err}`,
    });
  }
  loader.classList.add("hidden");
};

const clearAuthErrors = (dispatch) => {
  dispatch({
    type: CLEAR_AUTH_ERRORS,
  });
};

const useAuthState = () => {
  const context = React.useContext(AuthStateContext);

  if (context === undefined) {
    throw new Error(`useAuthState must be used within an AuthProvider`);
  }

  return context;
};

const useAuthDispatch = () => {
  const context = React.useContext(AuthDispatchContext);

  if (context === undefined) {
    throw new Error(`useAuthDispatch must be used within an AuthProvider`);
  }

  return context;
};

export {
  AuthProvider,
  AuthStateContext,
  useAuthState,
  useAuthDispatch,
  login,
  logout,
  getMe,
  createUser,
  clearAuthErrors,
};
