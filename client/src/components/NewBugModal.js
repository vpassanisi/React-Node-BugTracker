import React from "react";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import { useBugsDispatch, newBug } from "../Context/bugs/BugsContext";

const NewBugModal = (props) => {
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
    <Modal
      open={isNewBugOpen}
      onClose={() => setIsNewBugOpen(false)}
      className="flex items-center justify-center"
      BackdropProps={{
        "data-testid": "modal",
        timeout: 500,
      }}
    >
      <Fade in={isNewBugOpen}>
        <div className="w-64 bg-gray-200 dark:bg-gray-900 p-4 w-90p max-w-screen-md focus:outline-none border border-cyan-400 rounded">
          <div className="text-4xl text-black dark:text-white text-center font-hairline">
            New Bug
          </div>
          <div className="mb-4">
            <TextField
              inputProps={{
                "data-testid": "input_name",
              }}
              variant="standard"
              label="Name"
              color="secondary"
              fullWidth={true}
              onChange={(event) => handleChange(event, "name")}
            />
          </div>
          <div className="mb-4">
            <TextField
              inputProps={{
                "data-testid": "input_fixer",
              }}
              variant="standard"
              label="Fixer"
              helperText="Must be a users email"
              color="secondary"
              type="email"
              name="email"
              autoComplete="on"
              fullWidth={true}
              onChange={(event) => handleChange(event, "fixer")}
            />
          </div>
          <div className="mb-4">
            <TextField
              inputProps={{
                "data-testid": "input_description",
              }}
              multiline={true}
              variant="standard"
              label="Description"
              color="secondary"
              fullWidth={true}
              onChange={(event) => handleChange(event, "description")}
            />
          </div>
          <div className="flex mb-8">
            <div className="w-1/3 pr-4">
              <FormControl
                variant="standard"
                color="secondary"
                fullWidth={true}
              >
                <InputLabel>Status</InputLabel>
                <Select
                  inputProps={{
                    "data-testid": "select_status",
                  }}
                  onChange={(event) => handleChange(event, "status")}
                  label="Status"
                  value={newBugBody.status}
                >
                  <MenuItem value={"Open"}>Open</MenuItem>
                  <MenuItem value={"In Progress"}>In Progress</MenuItem>
                  <MenuItem value={"To Be Tested"}>To Be Tested</MenuItem>
                  <MenuItem value={"Closed"}>Closed</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="w-1/3 pr-4">
              <FormControl
                variant="standard"
                color="secondary"
                fullWidth={true}
              >
                <InputLabel>Severity</InputLabel>
                <Select
                  inputProps={{
                    "data-testid": "select_severity",
                  }}
                  onChange={(event) => handleChange(event, "severity")}
                  label="Severity"
                  value={newBugBody.severity}
                >
                  <MenuItem value={"Major"}>Major</MenuItem>
                  <MenuItem value={"Minor"}>Minor</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="w-1/3">
              <FormControl
                variant="standard"
                color="secondary"
                fullWidth={true}
              >
                <InputLabel>Reproduceable</InputLabel>
                <Select
                  inputProps={{ "data-testid": "select_reproduceability" }}
                  onChange={(event) => handleChange(event, "reproduceability")}
                  label="Reproduceable"
                  value={newBugBody.reproduceability}
                >
                  <MenuItem value={"Always"}>Always</MenuItem>
                  <MenuItem value={"Intermitent"}>Intermitent</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <button
            data-testid="button_new_bug"
            className="bg-purple-400 hover:bg-purple-600 transition-colors duration-300 ease-in-out focus:outline-none rounded w-full h-10 text-white"
            onClick={() => {
              newBug(bugsDispatch, newBugBody);
              setIsNewBugOpen(false);
            }}
          >
            Add
          </button>
        </div>
      </Fade>
    </Modal>
  );
};

export default NewBugModal;
