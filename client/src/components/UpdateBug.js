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
    <div className="w-full md:w-1/2 p-4 rounded border border-cyan-400">
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
          helperText="Must be a users email"
          type="text"
          onChange={(event) => handleChange(event, "fixer")}
        />
        <div className="absolute z-10 bottom-0 left-0 right-0 mx-auto w-0 underline transition-width duration-500 ease-in-out border-b-2 border-purple-munsell" />
        <div className="absolute bottom-0 left-0 right-0 w-full border-b-2 border-dark-gray-700" />
      </div>
      <div className="mb-4">
        <textarea
          className="w-full px-3 py-1 focus:outline-none bg-transparent"
          data-testid="input_edit_description"
          placeholder="Description"
          defaultValue={bug.description}
          onChange={(event) => handleChange(event, "description")}
        />
      </div>
      <div className="flex mb-4">
        <div className="w-1/3 pr-4">
          {/* <FormControl variant="standard" color="secondary" fullWidth={true}>
            <InputLabel>Status</InputLabel>
            <Select
              inputProps={{
                "data-testid": "select_status",
              }}
              value={updateBugBody.status}
              onChange={(event) => handleChange(event, "status")}
              label="Status"
            >
              <MenuItem value={"Open"}>Open</MenuItem>
              <MenuItem value={"In Progress"}>In Progress</MenuItem>
              <MenuItem value={"To Be Tested"}>To Be Tested</MenuItem>
              <MenuItem value={"Closed"}>Closed</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="w-1/3 pr-4">
          <FormControl variant="standard" color="secondary" fullWidth={true}>
            <InputLabel>Severity</InputLabel>
            <Select
              inputProps={{
                "data-testid": "select_severity",
              }}
              value={updateBugBody.severity}
              onChange={(event) => handleChange(event, "severity")}
              label="Severity"
            >
              <MenuItem value={"Major"}>Major</MenuItem>
              <MenuItem value={"Minor"}>Minor</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="w-1/3">
          <FormControl variant="standard" color="secondary" fullWidth={true}>
            <InputLabel>Reproduceable</InputLabel>
            <Select
              inputProps={{
                "data-testid": "select_reproduceability",
              }}
              autoWidth={false}
              value={updateBugBody.reproduceability}
              onChange={(event) => handleChange(event, "reproduceability")}
              label="Reproduceable"
            >
              <MenuItem value={"Always"}>Always</MenuItem>
              <MenuItem value={"Intermitent"}>Intermitent</MenuItem>
            </Select>
          </FormControl> */}
        </div>
      </div>
      <button
        data-testid="button_edit"
        className="w-full h-10 bg-purple-400 hover:bg-purple-600 transition duration-300 ease-in-out rounded focus:outline-none text-white shadow"
        onClick={() => updateBug(bugsDispatch, updateBugBody, bug._id, index)}
      >
        Update
      </button>
    </div>
  );
};

export default UpdateBug;
