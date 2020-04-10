import React, { useState, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import Collapse from "@material-ui/core/Collapse";
import Updatebug from "./UpdateBug";

import BugsContext from "../Context/bugs/bugsContext";
import DarkModeContext from "../Context/darkMode/darkModeContext";

const Bug = (props) => {
  const { open, setOpen, index, bug } = props;
  const [isMounted, setIsMounted] = useState(false);
  const bugsContext = useContext(BugsContext);
  const darkModeContext = useContext(DarkModeContext);

  const { deleteBug } = bugsContext;
  const { isDarkMode } = darkModeContext;

  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  const handleDelete = () => {
    const conf = window.confirm("Are you sure you want to delete this bug?");

    if (!conf) return;

    deleteBug(bug._id, index);
  };

  const statusColor = () => {
    switch (bug.status) {
      case "Open":
        return "bg-red-800";
      case "To Be Tested":
        return "bg-deep-orange-800";
      case "Closed":
        return "bg-green-500";
      default:
        return "bg-blue-500";
    }
  };

  const severityColor = () => {
    switch (bug.severity) {
      case "Major":
        return "bg-deep-purple-500 text-white";
      case "Minor":
        return "bg-deep-purple-200 text-black";
      default:
        return "bg-deep-purple-200 text-black";
    }
  };

  const reproduceabilityColor = () => {
    switch (bug.reproduceability) {
      case "Always":
        return "bg-cyan-600 text-white";
      case "Intermitent":
        return "bg-cyan-200 text-black";
      default:
        return "bg-cyan-200 text-black";
    }
  };

  const mobileDetails = (
    <div className="flex flex-wrap w-full mb-4">
      <div className="w-1/2">
        <span className="text-purple-500 text-xl">Reporter:</span>
        <p>{bug.fixer.name}</p>
      </div>
      <div className="w-1/2">
        <span className="text-purple-500 text-xl">Fixer:</span>
        <p>{bug.reporter.name}</p>
      </div>
      <div className="w-1/2">
        <span className="text-purple-500 text-xl">Severity:</span>
        <p className={`${severityColor()} mr-4 flex justify-center`}>
          {bug.severity}
        </p>
      </div>
      <div className="w-1/2">
        <span className="text-purple-500 text-xl">Reproduceability:</span>
        <p className={`${reproduceabilityColor()} mr-4 flex justify-center`}>
          {bug.reproduceability}
        </p>
      </div>
    </div>
  );

  const desktopDetails = (
    <div className="flex flex-row w-full mb-4">
      <div className="w-full">
        <span className="text-purple-500 text-xl">Reporter:</span>
        <p>{bug.fixer.name}</p>
      </div>
    </div>
  );

  return (
    <div>
      <button
        onClick={() => (open === index ? setOpen(null) : setOpen(index))}
        className={`flex flex-row items-center justify-between px-4 py-5 w-full bg-white ${
          isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-300"
        } transition-colors duration-500 ease-in-out dark:bg-gray-900 focus:outline-none border border-purple-a400 rounded-lg`}
      >
        <div className={`${isDesktop ? "w-3/8" : "w-2/4"}`}>{bug.name}</div>
        {isDesktop ? <div className={`w-1/8`}>{bug.fixer.name}</div> : null}
        {isDesktop ? <div className={`w-1/8`}>{bug.reporter.name}</div> : null}
        <div
          className={`${
            isDesktop ? "w-1/8" : "w-1/4"
          } mx-2 rounded text-white ${statusColor()}`}
        >
          {bug.status}
        </div>
        <div
          className={`${
            isDesktop ? "w-1/8" : "w-1/4"
          } mx-2 rounded ${severityColor()}`}
        >
          {bug.severity}
        </div>
        {isDesktop ? (
          <div className={`w-1/8 mx-2 rounded ${reproduceabilityColor()}`}>
            {bug.reproduceability}
          </div>
        ) : null}

        <i
          className={`material-icons transition-transform duration-500 ease-in-out transform ${
            open === index ? "rotate-180" : ""
          } w-8`}
        >
          keyboard_arrow_down
        </i>
      </button>

      {/* collapse */}
      <Collapse
        in={open === index}
        timeout={500}
        onEnter={() => setIsMounted(true)}
        onExited={() => setIsMounted(false)}
      >
        {isMounted ? (
          <div className="flex flex-wrap w-full max-w-screen bg-gray-50 dark:bg-dark-gray-900 border-l border-r rounded-lg p-4">
            <Updatebug bug={bug} index={index} />
            <div className="w-full md:w-1/2 p-4">
              <span className="text-purple-500 text-xl">Description: </span>
              <p className="mb-4">{bug.description}</p>
              {isDesktop ? desktopDetails : mobileDetails}
              <span className="text-purple-500 text-xl">Created At: </span>
              <p className="mb-4">{bug.createdAt}</p>
              <span className="text-purple-500 text-xl">Updated At: </span>
              <p className="mb-4">{bug.updatedAt}</p>
              <button
                className="w-full h-10 rounded bg-cyan-400 hover:bg-cyan-600 transition-colors duration-300 ease-in-out focus:outline-none text-white shadow"
                onClick={() => handleDelete()}
              >
                Delete
              </button>
            </div>
          </div>
        ) : null}
      </Collapse>
    </div>
  );
};

export default Bug;
