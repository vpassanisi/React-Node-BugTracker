import React, { useContext } from "react";

import ProjectsContext from "../Context/projects/projectsContext";

const ProjectCard = props => {
  const projectsContext = useContext(ProjectsContext);

  const { setProject, deleteProject } = projectsContext;

  const { project, index } = props;

  const handleDelete = () => {
    const conf = window.confirm(
      "Are you sure you want to delete this project? This will permanently delete this project And all of it's bugs"
    );

    if (!conf) return;

    deleteProject(project._id, index);
  };

  return (
    <div className="relative bg-white-alpha-10 rounded border-2 border-purple-a400 p-4 flex flex-col justify-between">
      <div>
        <div className="text-center font-hairline text-2xl">{project.name}</div>
        <hr className="border-cyan-400 my-2" />
        <div className="text-purple-800 dark:text-purple-300 mb-4">
          Bugs:{" "}
          <span className="text-black dark:text-white">
            {project.bugsCount}
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

      <button
        className="bg-cyan-a700 hover:bg-cyan-700 transition duration-300 ease-in-out h-10 w-full rounded focus:outline-none shadow text-white"
        onClick={() => {
          setProject(project._id);
        }}
      >
        Go To Project
      </button>
    </div>
  );
};

export default ProjectCard;
