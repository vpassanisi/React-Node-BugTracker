import React from "react";
import { useHistory } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";

import {
  useProjectsState,
  useProjectsDispatch,
  newProject,
} from "../Context/projects/ProjectsContext";

const NewProjectModal = (props) => {
  const history = useHistory();

  const projectsDispatch = useProjectsDispatch();

  const { currentProject } = useProjectsState();

  const { isNewProjectOpen, setIsNewProjectOpen } = props;

  const [newProjectBody, setNewProjectBody] = React.useState({
    name: "",
    description: "",
  });

  const handleChange = (event, field) => {
    const project = { ...newProjectBody, [field]: event.target.value };

    setNewProjectBody(project);
  };

  React.useEffect(() => {
    if (currentProject) history.push("/bugs");
    // eslint-disable-next-line
  }, [currentProject]);

  return (
    <Modal
      open={isNewProjectOpen}
      onClose={() => setIsNewProjectOpen(false)}
      className="flex items-center justify-center"
      BackdropProps={{
        "data-testid": "modal",
        timeout: 500,
      }}
    >
      <Fade in={isNewProjectOpen}>
        <div className="w-64 bg-gray-200 dark:bg-gray-900 p-4 w-90p max-w-screen-md focus:outline-none border border-cyan-400 rounded">
          <div className="text-4xl text-black dark:text-white text-center font-hairline">
            New Project
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
          <div className="mb-8">
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
          <button
            data-testid="button_new_project"
            className="bg-purple-400 hover:bg-purple-600 transition-colors duration-300 ease-in-out focus:outline-none rounded w-full h-10 text-white"
            onClick={() => {
              newProject(projectsDispatch, newProjectBody);
              setIsNewProjectOpen(false);
            }}
          >
            Add
          </button>
        </div>
      </Fade>
    </Modal>
  );
};

export default NewProjectModal;
