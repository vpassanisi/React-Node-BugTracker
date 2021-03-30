import React from "react";
import { CSSTransition } from "react-transition-group";
import { useHistory } from "react-router-dom";

import {
  useProjectsState,
  useProjectsDispatch,
  newProject,
} from "../Context/projects/ProjectsContext";

const NewProjectModal = (props) => {
  const { isNewProjectOpen, setIsNewProjectOpen } = props;
  const [mounted, setMounted] = React.useState(false);

  const history = useHistory();

  const projectsDispatch = useProjectsDispatch();
  const { currentProject } = useProjectsState();

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
    <CSSTransition
      in={isNewProjectOpen}
      timeout={300}
      classNames="modal"
      onEntered={() => setMounted(true)}
      onExiting={() => setMounted(false)}
      unmountOnExit
    >
      <div
        className="fixed inset-0 h-full w-full z-20 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer"
        onClick={(e) => setIsNewProjectOpen(false)}
        data-testid="modal"
      >
        <CSSTransition
          in={mounted}
          timeout={300}
          classNames="modal"
          unmountOnExit
        >
          <div
            className="relative w-11/12 max-w-screen-sm bg-oxford-blue-600 border border-gray-800 rounded p-4 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="font-head text-center text-2xl">New Project</div>
            <div className="relative my-8">
              <input
                className="w-full px-3 py-1 focus:outline-none bg-transparent"
                data-testid="input_name"
                type="text"
                name="name"
                placeholder="Project Name. . ."
                defaultValue={newProjectBody.name}
                onChange={(event) => handleChange(event, "name")}
              />
              <div className="absolute z-10 bottom-0 left-0 right-0 mx-auto w-0 underline transition-width duration-500 ease-in-out border-b-2 border-purple-munsell" />
              <div className="absolute bottom-0 left-0 right-0 w-full border-b-2 border-dark-gray-700" />
            </div>
            <div className="relative my-8">
              <textarea
                className="w-full px-3 py-1 focus:outline-none bg-transparent"
                data-testid="input_description"
                type="text"
                placeholder="Project Description. . ."
                defaultValue={newProjectBody.description}
                onChange={(event) => handleChange(event, "description")}
              />
              <div className="absolute z-10 bottom-0 left-0 right-0 mx-auto w-0 underline transition-width duration-500 ease-in-out border-b-2 border-purple-munsell" />
              <div className="absolute bottom-0 left-0 right-0 w-full border-b-2 border-dark-gray-700" />
            </div>
            <div className="flex flex-row">
              <button
                data-testid="button_new_project"
                className="bg-purple-munsell w-full font-head py-1 px-8 focus:outline-none rounded"
                onClick={() => {
                  newProject(projectsDispatch, newProjectBody);
                  setIsNewProjectOpen(false);
                }}
              >
                Add
              </button>
            </div>
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
};

export default NewProjectModal;
