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
      };
    case GET_ME_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
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
      };
    case CREATE_USER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload,
      };
    case CLEAR_AUTH_ERRORS:
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

const AuthProvider = ({
  children,
  isAuthenticated = null,
  isLoading = false,
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
  dispatch({
    type: "IS_LOADING",
  });
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
  dispatch({
    type: "NOT_LOADING",
  });
};

const getMe = async (dispatch) => {
  dispatch({
    type: "IS_LOADING",
  });
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
      return false;
    } else {
      dispatch({
        type: GET_ME_SUCCESS,
        payload: res.data,
      });
      return true;
    }
  } catch (err) {
    dispatch({
      type: GET_ME_FAIL,
      payload: `${err}`,
    });

    return false;
  } finally {
    dispatch({
      type: "NOT_LOADING",
    });
  }
};

const logout = async (dispatch) => {
  dispatch({
    type: "IS_LOADING",
  });
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
      return false;
    } else {
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: res,
      });
      return true;
    }
  } catch (err) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: `${err}`,
    });
    return false;
  } finally {
    dispatch({
      type: "NOT_LOADING",
    });
  }
};

const createUser = async (dispatch, user) => {
  dispatch({
    type: "IS_LOADING",
  });
  try {
    const req = await fetch(`/api/v1/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const res = await req.json();

    if (res.success) {
      dispatch({
        type: CREATE_USER_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: CREATE_USER_FAIL,
        payload: res.error,
      });
    }
  } catch (err) {
    dispatch({
      type: CREATE_USER_FAIL,
      payload: `${err}`,
    });
  }
  dispatch({
    type: "NOT_LOADING",
  });
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
