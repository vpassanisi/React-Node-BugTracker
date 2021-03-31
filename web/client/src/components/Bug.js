import React from "react";
import { CSSTransition } from "react-transition-group";
import Updatebug from "./UpdateBug";

import { useBugsDispatch, deleteBug } from "../Context/bugs/bugsContext";

const Bug = (props) => {
  const { open, setOpen, index, bug } = props;

  const bugsDispatch = useBugsDispatch();

  const handleDelete = () => {
    const conf = window.confirm("Are you sure you want to delete this bug?");

    if (conf) deleteBug(bugsDispatch, bug._id, index);
  };

  bug.createdAt = new Date(Date.parse(bug.createdAt)).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  bug.updatedAt = new Date(Date.parse(bug.updatedAt)).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

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
        return "bg-deep-purple-500";
      case "Minor":
        return "bg-deep-purple-200 text-black";
      default:
        return "bg-deep-purple-200 text-black";
    }
  };

  const reproduceabilityColor = () => {
    switch (bug.reproduceability) {
      case "Always":
        return "bg-cyan-600";
      case "Intermitent":
        return "bg-cyan-200 text-black";
      default:
        return "bg-cyan-200 text-black";
    }
  };

  return (
    <div>
      <button
        data-testid="button_open"
        onClick={() => (open === index ? setOpen(null) : setOpen(index))}
        className="flex flex-row items-center justify-between px-4 py-5 w-full focus:outline-none border-b border-purple-munsell"
      >
        <div className="w-2/4 md:w-3/8">{bug.name}</div>
        <div className="hidden md:inline-block w-1/8">{bug.fixer.name}</div>
        <div className="hidden md:inline-block w-1/8">{bug.reporter.name}</div>
        <div
          className={`w-1/4 md:w-1/8 mx-2 rounded text-white ${statusColor()}`}
        >
          {bug.status}
        </div>
        <div className={`w-1/4 md:w-1/8 mx-2 rounded ${severityColor()}`}>
          {bug.severity}
        </div>

        <div
          className={`hidden md:inline-block w-1/8 mx-2 rounded ${reproduceabilityColor()}`}
        >
          {bug.reproduceability}
        </div>

        <i
          className={`material-icons transition-transform duration-500 ease-in-out transform ${
            open === index ? "rotate-180" : ""
          } w-8`}
        >
          keyboard_arrow_down
        </i>
      </button>

      {/* collapse */}

      <CSSTransition
        in={open === index}
        classNames="collapse"
        timeout={750}
        unmountOnExit
        mountOnEnter
      >
        <div className="flex flex-wrap w-full max-w-screen border-b border-purple-munsell overflow-hidden">
          <Updatebug bug={bug} index={index} />
          <div className="w-full md:w-1/2 p-4">
            <span className="text-xl">Description: </span>
            <p data-testid="description" className="mb-4">
              {bug.description}
            </p>

            <div className="md:hidden flex flex-wrap w-full mb-4">
              <div className="w-1/2">
                <span className="text-xl">Reporter:</span>
                <p>{bug.fixer.name}</p>
              </div>
              <div className="w-1/2">
                <span className="text-xl">Fixer:</span>
                <p>{bug.reporter.name}</p>
              </div>
              <div className="w-1/2">
                <span className="text-xl">Severity:</span>
                <p className={`${severityColor()} mr-4 flex justify-center`}>
                  {bug.severity}
                </p>
              </div>
              <div className="w-1/2">
                <span className="text-xl">Reproduceability:</span>
                <p
                  className={`${reproduceabilityColor()} mr-4 flex justify-center`}
                >
                  {bug.reproduceability}
                </p>
              </div>
            </div>

            <div className="hidden md:flex flex-row w-full mb-4">
              <div className="w-full">
                <span className="text-xl">Reporter:</span>
                <p>{bug.fixer.name}</p>
              </div>
            </div>

            <span className="text-xl">Created At: </span>
            <p className="mb-4">{bug.createdAt}</p>
            <span className="text-xl">Updated At: </span>
            <p className="mb-4">{bug.updatedAt}</p>
            <button
              data-testid="button_delete"
              className="w-full py-2 rounded bg-red-600 font-head focus:outline-none"
              onClick={() => handleDelete()}
            >
              Delete
            </button>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Bug;
