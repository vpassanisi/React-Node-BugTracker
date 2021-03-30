import React from "react";
import EditProjectModal from "./EditProjectModal";
import { useHistory } from "react-router-dom";

import {
  useProjectsDispatch,
  setProject,
} from "../Context/projects/ProjectsContext";

const ProjectCard = (props) => {
  const { project, index } = props;

  const history = useHistory();

  const projectsDispatch = useProjectsDispatch();

  const [isEditProjectOpen, setIsEditProjectOpen] = React.useState(false);

  return (
    <React.Fragment>
      <div className="relative flex flex-col justify-between bg-oxford-blue-600">
        <div className="p-4">
          <div className="font-head text-center text-2xl">{project.name}</div>
          <hr className="border-purple-munsell my-2" />
          <div className="mb-4">{project.description}</div>
        </div>

        <div className="flex flex-row">
          <button
            data-testid="button_go_to"
            className="w-full focus:outline-none bg-maximum-blue-700 py-2 rounded-bl"
            onClick={async () => {
              await setProject(projectsDispatch, project._id);
              history.push("/bugs");
            }}
          >
            Go To Project
          </button>
          <button
            className="bg-maximum-blue-700 border-l border-maximum-blue-50 px-4 focus:outline-none rounded-br"
            onClick={() => setIsEditProjectOpen(true)}
          >
            <i className="material-icons flex">edit</i>
          </button>
        </div>

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
