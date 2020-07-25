import React from "react";

import {
  useDarkModeState,
  useDarkModeDispatch,
  darkModeOn,
  darkModeOff,
} from "../Context/darkMode/DarkModeContext";

const DarkModeToggle = () => {
  const { isDarkMode } = useDarkModeState();
  const dispatch = useDarkModeDispatch();

  return (
    <button
      data-testid="button_dark_mode"
      className="flex flex-row items-center justify-center h-full w-16 focus:outline-none"
      onClick={() =>
        isDarkMode ? darkModeOff(dispatch) : darkModeOn(dispatch)
      }
    >
      {isDarkMode ? (
        <i className="material-icons text-white">brightness_high</i>
      ) : (
        <i className="material-icons text-black">brightness_medium</i>
      )}
    </button>
  );
};

export default DarkModeToggle;
