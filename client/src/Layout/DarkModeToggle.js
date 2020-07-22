import React, { Fragment, useContext } from "react";

import DarkModeContext from "../Context/darkMode/darkModeContext";

const DarkModeToggle = () => {
  const darkModeContext = useContext(DarkModeContext);

  const { isDarkMode, darkModeOff, darkModeOn } = darkModeContext;

  return (
    <button
      data-testid="button_dark_mode"
      className="flex flex-row items-center justify-center h-full w-16 focus:outline-none"
      onClick={() => (isDarkMode ? darkModeOff() : darkModeOn())}
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
