import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";

import ProjectsContext from "../Context/projects/projectsContext";

const NewProjectModal = props => {
  const history = useHistory();
  const projectsContext = useContext(ProjectsContext);

  const { currentProject, newProject } = projectsContext;

  const [newProjectBody, setNewProjectBody] = useState({
    name: "",
    description: ""
  });

  const handleChange = (event, field) => {
    const project = { ...newProjectBody, [field]: event.target.value };

    setNewProjectBody(project);
  };

  useEffect(() => {
    if (currentProject) history.push("/bugs");
    // eslint-disable-next-line
  }, [currentProject]);

  return (
    <Modal
      open={props.isNewProjectOpen}
      onClose={() => props.setIsNewProjectOpen(false)}
      className="flex items-center justify-center"
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={props.isNewProjectOpen}>
        <div className="w-64 bg-gray-200 dark:bg-gray-900 p-4 w-90p max-w-screen-md focus:outline-none border border-cyan-400 rounded">
          <div className="text-4xl text-black dark:text-white text-center font-hairline">
            New Project
          </div>
          <div className="mb-4">
            <TextField
              variant="standard"
              label="Name"
              color="secondary"
              fullWidth={true}
              onChange={event => handleChange(event, "name")}
            />
          </div>
          <div className="mb-8">
            <TextField
              multiline={true}
              variant="standard"
              label="Description"
              color="secondary"
              fullWidth={true}
              onChange={event => handleChange(event, "description")}
            />
          </div>
          <button
            className="bg-purple-400 hover:bg-purple-600 transition-colors duration-300 ease-in-out focus:outline-none rounded w-full h-10 text-white"
            onClick={() => {
              newProject(newProjectBody);
              props.setIsNewProjectOpen(false);
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
