import React from "react";
import EditProjectModal from "./EditProjectModal";

import {
  useProjectsDispatch,
  setProject,
  deleteProject,
} from "../Context/projects/ProjectsContext";

const ProjectCard = (props) => {
  const { project, index } = props;

  const projectsDispatch = useProjectsDispatch();

  const [isEditProjectOpen, setIsEditProjectOpen] = React.useState(false);

  project.createdAt = new Date(Date.parse(project.createdAt)).toLocaleString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  project.updatedAt = new Date(Date.parse(project.updatedAt)).toLocaleString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  const handleDelete = () => {
    const conf = window.confirm(
      "Are you sure you want to delete this project? This will permanently delete this project And all of it's bugs"
    );

    if (conf) {
      deleteProject(projectsDispatch, project._id, index);
    }
  };

  return (
    <React.Fragment>
      <div className="relative flex flex-col justify-between bg-oxford-blue-600">
        <div className="p-4">
          <div className="font-head text-center text-2xl">{project.name}</div>
          <hr className="border-purple-munsell my-2" />
          <div className="mb-4">{project.description}</div>
        </div>

        {/* <button
          data-testid="button_delete"
          className="absolute top-0 right-0 flex items-center justify-center mt-4 mr-4 focus:outline-none"
          onClick={() => handleDelete()}
        >
          <i className="material-icons text-4xl text-red-500">clear</i>
        </button> */}
        {/* <div> */}
        {/* <button
            data-testid="button_edit"
            className="mb-2 p-1 flex focus:outline-none"
            onClick={() => setIsEditProjectOpen(true)}
          >
            <i className="material-icons text-blue-500">edit</i>
          </button> */}

        <div className="flex flex-row">
          <button
            data-testid="button_go_to"
            className="w-full focus:outline-none bg-maximum-blue-700 py-2 rounded-bl"
            onClick={() => {
              setProject(projectsDispatch, project._id);
            }}
          >
            Go To Project
          </button>
          <button
            className="bg-maximum-blue-700 border-l border-maximum-blue-50 px-4 focus:outline-none rounded-br"
            onClick={() => setIsEditProjectOpen(true)}
          >
            <i className="material-icons flex">more_vert</i>
          </button>
        </div>
        {/* </div> */}
        <EditProjectModal
          project={project}
          index={index}
          isEditProjectOpen={isEditProjectOpen}
          setIsEditProjectOpen={setIsEditProjectOpen}
        />
      </div>
    </React.Fragment>
  );
};

export default ProjectCard;
