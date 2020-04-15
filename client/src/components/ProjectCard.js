import React, { useContext, Fragment, useState } from "react";
import EditProjectModal from "./EditProjectModal";

import ProjectsContext from "../Context/projects/projectsContext";

const ProjectCard = (props) => {
  const projectsContext = useContext(ProjectsContext);

  const { setProject, deleteProject } = projectsContext;

  const { project, index } = props;

  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false);

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

    if (!conf) return;

    deleteProject(project._id, index);
  };

  return (
    <Fragment>
      <div className="relative bg-gray-200 dark:bg-gray-900 rounded border-2 border-purple-a400 p-4 flex flex-col justify-between shadow">
        <div>
          <div className="text-center font-hairline text-2xl">
            {project.name}
          </div>
          <hr className="border-cyan-400 my-2" />
          <div className="text-purple-800 dark:text-purple-300 bg-gray-300 dark:bg-dark-gray-900 mb-1 px-2">
            Bugs:{" "}
            <span className="text-black dark:text-white">
              {project.bugsCount}
            </span>
          </div>
          <div className="text-purple-800 dark:text-purple-300 bg-gray-300 dark:bg-dark-gray-900 mb-1 px-2">
            Created At:{" "}
            <span className="text-black dark:text-white">
              {project.createdAt}
            </span>
          </div>
          <div className="text-purple-800 dark:text-purple-300 bg-gray-300 dark:bg-dark-gray-900 mb-4 px-2">
            Last Updated:{" "}
            <span className="text-black dark:text-white">
              {project.updatedAt}
            </span>
          </div>
          <div className="text-purple-800 dark:text-purple-300 mb-4">
            Description:{" "}
            <span className="text-black dark:text-white">
              {project.description}
            </span>
          </div>
        </div>

        <button
          className="absolute top-0 right-0 flex items-center justify-center mt-4 mr-4 focus:outline-none"
          onClick={() => handleDelete()}
        >
          <i className="material-icons text-4xl text-red-500">clear</i>
        </button>
        <div>
          <button
            className="mb-2 p-1 flex focus:outline-none"
            onClick={() => setIsEditProjectOpen(true)}
          >
            <i className="material-icons text-blue-500">edit</i>
          </button>

          <button
            className="bg-cyan-a700 hover:bg-cyan-700 transition duration-300 ease-in-out h-10 w-full rounded focus:outline-none shadow text-white"
            onClick={() => {
              setProject(project._id);
            }}
          >
            Go To Project
          </button>
        </div>
      </div>

      <EditProjectModal
        project={project}
        index={index}
        isEditProjectOpen={isEditProjectOpen}
        setIsEditProjectOpen={setIsEditProjectOpen}
      />
    </Fragment>
  );
};

export default ProjectCard;
