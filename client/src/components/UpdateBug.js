import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import BugsContext from "../Context/bugs/bugsContext";

const UpdateBug = (props) => {
  const bugsContext = useContext(BugsContext);

  const { updateBug } = bugsContext;

  const { bug, index } = props;

  const [updateBugBody, setUpdateBugBody] = useState({
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
      <div className="mb-4">
        <TextField
          inputProps={{
            "data-testid": "input_edit_name",
          }}
          variant="standard"
          label="Name"
          color="secondary"
          fullWidth={true}
          defaultValue={bug.name}
          onChange={(event) => handleChange(event, "name")}
        />
      </div>
      <div className="mb-4">
        <TextField
          inputProps={{
            "data-testid": "input_edit_fixer",
          }}
          variant="standard"
          label="Fixer"
          color="secondary"
          fullWidth={true}
          defaultValue={bug.fixer.email}
          helperText="Must be a users email"
          type="email"
          onChange={(event) => handleChange(event, "fixer")}
        />
      </div>
      <div className="mb-4">
        <TextField
          inputProps={{
            "data-testid": "input_edit_description",
          }}
          multiline={true}
          variant="standard"
          label="Description"
          color="secondary"
          fullWidth={true}
          defaultValue={bug.description}
          onChange={(event) => handleChange(event, "description")}
        />
      </div>
      <div className="flex mb-4">
        <div className="w-1/3 pr-4">
          <FormControl variant="standard" color="secondary" fullWidth={true}>
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
          </FormControl>
        </div>
      </div>
      <button
        data-testid="button_edit"
        className="w-full h-10 bg-purple-400 hover:bg-purple-600 transition duration-300 ease-in-out rounded focus:outline-none text-white shadow"
        onClick={() => updateBug(updateBugBody, bug._id, index)}
      >
        Update
      </button>
    </div>
  );
};

export default UpdateBug;
