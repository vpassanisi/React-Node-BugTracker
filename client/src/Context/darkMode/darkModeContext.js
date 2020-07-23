import React from "react";
import { DARKMODE_ON, DARKMODE_OFF } from "../types";

const DarkModeStateContext = React.createContext();
const DarkModeDispatchContext = React.createContext();

const darkModeReducer = (state, action) => {
  switch (action.type) {
    case DARKMODE_ON:
      return {
        ...state,
        isDarkMode: true,
      };
    case DARKMODE_OFF:
      return {
        ...state,
        isDarkMode: false,
      };
    default: {
      throw new Error(`Undhandled action type: ${action.type}`);
    }
  }
};

const DarkModeProvider = ({ children }) => {
  const initialState = {
    isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
    error: null,
  };

  const [state, dispatch] = React.useReducer(darkModeReducer, initialState);

  return (
    <DarkModeStateContext.Provider value={state}>
      <DarkModeDispatchContext.Provider value={dispatch}>
        {children}
      </DarkModeDispatchContext.Provider>
    </DarkModeStateContext.Provider>
  );
};

const darkModeOff = (dispatch) => {
  const html = document.documentElement.classList;

  html.remove("mode-dark");
  dispatch({
    type: DARKMODE_OFF,
  });
};

const darkModeOn = (dispatch) => {
  const html = document.documentElement.classList;

  html.add("mode-dark");
  dispatch({
    type: DARKMODE_ON,
  });
};

const useDarkModeState = () => {
  const context = React.useContext(DarkModeStateContext);

  if (context === undefined) {
    throw new Error("useDarkModeState must be used within a DarkModeProvider");
  }

  return context;
};

const useDarkModeDispatch = () => {
  const context = React.useContext(DarkModeDispatchContext);

  if (context === undefined) {
    throw new Error(
      "useDarkModeDispatch must be used within a DarkModeProvider"
    );
  }

  return context;
};

export {
  DarkModeProvider,
  useDarkModeState,
  useDarkModeDispatch,
  darkModeOn,
  darkModeOff,
};
