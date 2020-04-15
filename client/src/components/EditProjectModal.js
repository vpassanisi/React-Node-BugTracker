import React, { useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";

import ProjectsContext from "../Context/projects/projectsContext";

const EditProjectModal = (props) => {
  const { isEditProjectOpen, setIsEditProjectOpen, project, index } = props;
  const [editProjectBody, setEditProjectBody] = useState({
    ...project,
  });

  const projectsContext = useContext(ProjectsContext);

  const { editProject } = projectsContext;

  const handleChange = (event, field) => {
    const projectInfo = { ...editProjectBody, [field]: event.target.value };

    setEditProjectBody(projectInfo);
  };

  return (
    <Modal
      open={isEditProjectOpen}
      onClose={() => setIsEditProjectOpen(false)}
      className="flex items-center justify-center"
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isEditProjectOpen}>
        <div className="w-64 bg-gray-200 dark:bg-gray-900 p-4 w-90p max-w-screen-md focus:outline-none border border-cyan-400 rounded">
          <div className="text-4xl text-black dark:text-white text-center font-hairline">
            Edit Project Info
          </div>
          <div className="mb-4">
            <TextField
              variant="standard"
              label="Name"
              color="secondary"
              fullWidth={true}
              defaultValue={editProjectBody.name}
              onChange={(event) => handleChange(event, "name")}
            />
          </div>
          <div className="mb-4">
            <TextField
              multiline={true}
              variant="standard"
              label="Description"
              color="secondary"
              fullWidth={true}
              defaultValue={editProjectBody.description}
              onChange={(event) => handleChange(event, "description")}
            />
          </div>
          <button
            className="bg-purple-400 hover:bg-purple-600 transition-colors duration-300 ease-in-out focus:outline-none rounded w-full h-10 text-white"
            onClick={() => {
              editProject(editProjectBody, index);
              setIsEditProjectOpen(false);
            }}
          >
            Edit
          </button>
        </div>
      </Fade>
    </Modal>
  );
};

export default EditProjectModal;
