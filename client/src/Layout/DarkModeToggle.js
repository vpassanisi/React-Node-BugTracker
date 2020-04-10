import React, { Fragment, useContext } from "react";

import DarkModeContext from "../Context/darkMode/darkModeContext";

const DarkModeToggle = () => {
  const darkModeContext = useContext(DarkModeContext);

  const { isDarkMode, darkModeOff, darkModeOn } = darkModeContext;

  return (
    <Fragment>
      {isDarkMode ? (
        <button
          className="flex flex-row items-center justify-center h-full w-16 focus:outline-none"
          onClick={() => darkModeOff()}
        >
          <i className="material-icons text-white">brightness_high</i>
        </button>
      ) : (
        <button
          className="flex flex-row items-center justify-center h-full w-16 focus:outline-none"
          onClick={() => darkModeOn()}
        >
          <i className="material-icons text-black">brightness_medium</i>
        </button>
      )}
    </Fragment>
  );
};

export default DarkModeToggle;
