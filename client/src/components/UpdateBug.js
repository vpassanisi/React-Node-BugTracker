import React from "react";

import { useBugsDispatch, updateBug } from "../Context/bugs/BugsContext";

const UpdateBug = (props) => {
  const bugsDispatch = useBugsDispatch();

  const { bug, index } = props;

  const [updateBugBody, setUpdateBugBody] = React.useState({
    name: bug.name,
    fixer: bug.fixer.email,
    description: bug.description,
    status: bug.status,
    severity: bug.severity,
    reproduceability: bug.reproduceability,
  });

  const handleChange = (event, item) => {
    const newUpdateBugBody = { ...updateBugBody, [item]: event.target.value };

    setUpdateBugBody(newUpdateBugBody);
  };

  return (
    <div className="w-full md:w-1/2 p-4">
      <div className="h-full p-4 rounded border border-maximum-blue">
        <div className="relative mb-4">
          <input
            className="w-full px-3 py-1 focus:outline-none bg-transparent"
            data-testid="input_edit_name"
            placeholder="Name. . ."
            defaultValue={bug.name}
            onChange={(event) => handleChange(event, "name")}
          />
          <div className="absolute z-10 bottom-0 left-0 right-0 mx-auto w-0 underline transition-width duration-500 ease-in-out border-b-2 border-purple-munsell" />
          <div className="absolute bottom-0 left-0 right-0 w-full border-b-2 border-dark-gray-700" />
        </div>
        <div className="relative mb-4">
          <input
            className="w-full px-3 py-1 focus:outline-none bg-transparent"
            data-testid="input_edit_fixer"
            placeholder="Fixer. . ."
            defaultValue={bug.fixer.email}
            type="text"
            onChange={(event) => handleChange(event, "fixer")}
          />
          <div className="absolute z-10 bottom-0 left-0 right-0 mx-auto w-0 underline transition-width duration-500 ease-in-out border-b-2 border-purple-munsell" />
          <div className="absolute bottom-0 left-0 right-0 w-full border-b-2 border-dark-gray-700" />
        </div>
        <div className="relative mb-4">
          <textarea
            className="w-full px-3 py-1 focus:outline-none bg-transparent"
            data-testid="input_edit_description"
            placeholder="Description. . ."
            defaultValue={bug.description}
            onChange={(event) => handleChange(event, "description")}
          />
          <div className="absolute z-10 bottom-0 left-0 right-0 mx-auto w-0 underline transition-width duration-500 ease-in-out border-b-2 border-purple-munsell" />
          <div className="absolute bottom-0 left-0 right-0 w-full border-b-2 border-dark-gray-700" />
        </div>
        <div className="flex mb-4">
          <div className="relative w-1/3">
            <select
              className="bg-transparent w-full p-1 focus:outline-none"
              data-testid="select_status"
              value={updateBugBody.status}
              onChange={(event) => handleChange(event, "status")}
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
              value={updateBugBody.severity}
              onChange={(event) => handleChange(event, "severity")}
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
              value={updateBugBody.reproduceability}
              onChange={(event) => handleChange(event, "reproduceability")}
            >
              <option value="Always">Always</option>
              <option value="Intermitent">Intermitent</option>
            </select>
            <div className="absolute z-10 bottom-0 left-0 right-0 mx-auto w-0 underline transition-width duration-500 ease-in-out border-b-2 border-purple-munsell" />
            <div className="absolute bottom-0 left-0 right-0 w-full border-b-2 border-dark-gray-700" />
          </div>
        </div>
        <button
          data-testid="button_edit"
          className="w-full bg-purple-munsell py-2 mt-4 rounded focus:outline-none font-head"
          onClick={() => updateBug(bugsDispatch, updateBugBody, bug._id, index)}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateBug;
