import React, { Fragment } from "react";

const DarkModeToggle = props => {
  return (
    <Fragment>
      {props.isDarkMode ? (
        <button
          className="flex flex-row items-center justify-center h-full w-16 focus:outline-none"
          onClick={() => props.setIsDarkMode(!props.isDarkMode)}
        >
          <i className="material-icons text-black">brightness_high</i>
        </button>
      ) : (
        <button
          className="flex flex-row items-center justify-center h-full w-16 focus:outline-none"
          onClick={() => props.setIsDarkMode(!props.isDarkMode)}
        >
          <i className="material-icons text-white">brightness_medium</i>
        </button>
      )}
    </Fragment>
  );
};

export default DarkModeToggle;
