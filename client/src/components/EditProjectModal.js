import React from "react";
import { CSSTransition } from "react-transition-group";

import {
  useProjectsDispatch,
  editProject,
} from "../Context/projects/ProjectsContext";

const EditProjectModal = (props) => {
  const { isEditProjectOpen, setIsEditProjectOpen, project, index } = props;
  const [editProjectBody, setEditProjectBody] = React.useState({ ...project });

  const [mounted, setMounted] = React.useState(false);

  const projectsDispatch = useProjectsDispatch();

  const handleChange = (event, field) => {
    const projectInfo = { ...editProjectBody, [field]: event.target.value };

    setEditProjectBody(projectInfo);
  };

  return (
    <CSSTransition
      in={isEditProjectOpen}
      timeout={300}
      classNames="modal"
      onEntered={() => setMounted(true)}
      onExiting={() => setMounted(false)}
      unmountOnExit
    >
      <div
        className="fixed inset-0 h-full w-full z-20 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer"
        onClick={(e) => {
          setIsEditProjectOpen(false);
        }}
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
            <div className="font-head text-center text-2xl">Edit Project</div>
            <div className="relative my-8">
              <input
                className="w-full px-3 py-1 focus:outline-none bg-transparent"
                data-testid="input_name"
                type="text"
                name="name"
                placeholder="Name. . ."
                defaultValue={editProjectBody.name}
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
                name="name"
                placeholder="Description. . ."
                defaultValue={editProjectBody.description}
                onChange={(event) => handleChange(event, "description")}
              />
              <div className="absolute z-10 bottom-0 left-0 right-0 mx-auto w-0 underline transition-width duration-500 ease-in-out border-b-2 border-purple-munsell" />
              <div className="absolute bottom-0 left-0 right-0 w-full border-b-2 border-dark-gray-700" />
            </div>
            <div className="flex flex-row">
              <button
                data-testid="button_edit_project"
                className="bg-purple-munsell w-full font-head py-1 px-8 focus:outline-none rounded "
                onClick={() => {
                  editProject(projectsDispatch, editProjectBody, index);
                  setIsEditProjectOpen(false);
                }}
              >
                Edit
              </button>
              <button className="bg-red-700 font-head rounded py-1 px-8 ml-4">
                Delete
              </button>
            </div>
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
};

export default EditProjectModal;
