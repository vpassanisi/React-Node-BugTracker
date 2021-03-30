import React from "react";
import { CSSTransition } from "react-transition-group";

import { useBugsDispatch, newBug } from "../Context/bugs/BugsContext";

const NewBugModal = (props) => {
  const [mounted, setMounted] = React.useState(false);

  const [newBugBody, setNewBugBody] = React.useState({
    name: "",
    fixer: "",
    description: "",
    status: "Open",
    severity: "Major",
    reproduceability: "Always",
  });

  const bugsDispatch = useBugsDispatch();

  const { isNewBugOpen, setIsNewBugOpen } = props;

  const handleChange = (event, field) => {
    const bug = { ...newBugBody, [field]: event.target.value };

    setNewBugBody(bug);
  };

  return (
    <CSSTransition
      in={isNewBugOpen}
      timeout={300}
      classNames="modal"
      onEntered={() => setMounted(true)}
      onExiting={() => setMounted(false)}
      unmountOnExit
    >
      <div
        className="fixed inset-0 h-full w-full z-20 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer"
        onClick={(e) => setIsNewBugOpen(false)}
        data-testid="modal"
      >
        <CSSTransition
          in={mounted}
          timeout={300}
          classNames="modal"
          unmountOnExit
        >
          <div
            className="relative w-11/12 max-w-screen-sm bg-oxford-blue-600 border border-gray-800 rounded p-4 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="font-head text-center text-2xl">New Bug</div>
            <div className="relative my-8">
              <input
                className="w-full px-3 py-1 focus:outline-none bg-transparent"
                data-testid="input_name"
                type="text"
                name="name"
                placeholder="Bug Name. . ."
                onChange={(event) => handleChange(event, "name")}
              />
              <div className="absolute z-10 bottom-0 left-0 right-0 mx-auto w-0 underline transition-width duration-500 ease-in-out border-b-2 border-purple-munsell" />
              <div className="absolute bottom-0 left-0 right-0 w-full border-b-2 border-dark-gray-700" />
            </div>
            <div className="relative my-8">
              <input
                className="w-full px-3 py-1 focus:outline-none bg-transparent"
                data-testid="input_fixer"
                type="text"
                name="name"
                placeholder="Fixer. . ."
                onChange={(event) => handleChange(event, "fixer")}
              />
              <div className="absolute z-10 bottom-0 left-0 right-0 mx-auto w-0 underline transition-width duration-500 ease-in-out border-b-2 border-purple-munsell" />
              <div className="absolute bottom-0 left-0 right-0 w-full border-b-2 border-dark-gray-700" />
            </div>
            <div className="relative my-8">
              <textarea
                className="w-full px-3 py-1 focus:outline-none bg-transparent"
                data-testid="input_description"
                type="text"
                name="email"
                placeholder="Description. . ."
                onChange={(event) => handleChange(event, "description")}
              />
              <div className="absolute z-10 bottom-0 left-0 right-0 mx-auto w-0 underline transition-width duration-500 ease-in-out border-b-2 border-purple-munsell" />
              <div className="absolute bottom-0 left-0 right-0 w-full border-b-2 border-dark-gray-700" />
            </div>
            <div className="flex mb-8">
              <div className="relative w-1/3">
                <select
                  className="bg-transparent w-full p-1 focus:outline-none"
                  data-testid="select_status"
                  onChange={(event) => handleChange(event, "status")}
                  label="Status"
                  value={newBugBody.status}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="To Be Tested">To Be Tested</option>
                  <option value="Closed">Closed</option>
                </select>
                <div className="absolute z-10 bottom-0 left-0 right-0 mx-auto w-0 underline transition-width duration-500 ease-in-out border-b-2 border-purple-munsell" />
                <div className="absolute bottom-0 left-0 right-0 w-full border-b-2 border-dark-gray-700" />
              </div>
              <div className="relative w-1/3 mx-2">
                <select
                  className="bg-transparent w-full p-1 focus:outline-none"
                  data-testid="select_severity"
                  onChange={(event) => handleChange(event, "severity")}
                  label="Severity"
                  value={newBugBody.severity}
                >
                  <option value="Major">Major</option>
                  <option value="Minor">Minor</option>
                </select>
                <div className="absolute z-10 bottom-0 left-0 right-0 mx-auto w-0 underline transition-width duration-500 ease-in-out border-b-2 border-purple-munsell" />
                <div className="absolute bottom-0 left-0 right-0 w-full border-b-2 border-dark-gray-700" />
              </div>
              <div className="relative w-1/3">
                <select
                  className="bg-transparent w-full p-1 focus:outline-none"
                  data-testid="select_reproduceability"
                  onChange={(event) => handleChange(event, "reproduceability")}
                  label="Reproduceable"
                  value={newBugBody.reproduceability}
                >
                  <option value="Always">Always</option>
                  <option value="Intermitent">Intermitent</option>
                </select>
                <div className="absolute z-10 bottom-0 left-0 right-0 mx-auto w-0 underline transition-width duration-500 ease-in-out border-b-2 border-purple-munsell" />
                <div className="absolute bottom-0 left-0 right-0 w-full border-b-2 border-dark-gray-700" />
              </div>
            </div>
            <button
              data-testid="button_new_bug"
              className="bg-purple-munsell py-2 w-full focus:outline-none rounded font-head"
              onClick={() => {
                newBug(bugsDispatch, newBugBody);
                setIsNewBugOpen(false);
              }}
            >
              Add
            </button>
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
};

export default NewBugModal;
