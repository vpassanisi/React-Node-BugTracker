import React, { useReducer, useEffect } from "react";

import AuthContext from "./authContext";
import authReducer from "./authReducer";

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

const AuthState = props => {
  const initialState = {
    isAuthenticated: null,
    isLoading: true,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async credentials => {
    const loader = document.getElementById("loader");
    loader.classList.remove("hidden");
    try {
      const req = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials)
      });

      const res = await req.json();

      if (!res.success) {
        dispatch({
          type: LOGIN_FAIL,
          payload: res.error
        });
      } else {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        });
      }
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: `${err}`
      });
    }
    loader.classList.add("hidden");
  };

  const getMe = async () => {
    try {
      const req = await fetch(`/api/v1/auth/me`, {
        method: "GET",
        credentials: "include"
      });

      const res = await req.json();

      if (!res.success) {
        dispatch({
          type: GET_ME_FAIL,
          payload: res.error
        });
      } else {
        dispatch({
          type: GET_ME_SUCCESS,
          payload: res.data
        });
      }
    } catch (err) {
      dispatch({
        type: GET_ME_FAIL,
        payload: `${err}`
      });
    }
  };

  const logout = async () => {
    const loader = document.getElementById("loader");
    loader.classList.remove("hidden");
    try {
      const req = await fetch(`/api/v1/auth/logout`, {
        method: "GET",
        credentials: "include"
      });

      const res = await req.json();

      if (!res.success) {
        dispatch({
          type: LOGOUT_FAIL,
          payload: res.error
        });
      } else {
        dispatch({
          type: LOGOUT_SUCCESS,
          payload: res
        });
      }
    } catch (err) {
      dispatch({
        type: LOGOUT_FAIL,
        payload: `${err}`
      });
    }
    loader.classList.add("hidden");
  };

  const createUser = async user => {
    const loader = document.getElementById("loader");
    loader.classList.remove("hidden");
    try {
      const req = await fetch(`/api/v1/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      });

      const res = await req.json();

      if (!res.success) {
        dispatch({
          type: CREATE_USER_FAIL,
          payload: res.error
        });
      } else {
        dispatch({
          type: CREATE_USER_SUCCESS,
          payload: res.data
        });
      }
    } catch (err) {
      dispatch({
        type: CREATE_USER_FAIL,
        payload: `${err}`
      });
    }
    loader.classList.add("hidden");
  };

  const clearAuthErrors = () => {
    dispatch({
      type: CLEAR_AUTH_ERRORS
    });
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        error: state.error,
        isLoading: state.isLoading,
        login,
        logout,
        createUser,
        getMe,
        clearAuthErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
