import React from "react";
import { fireEvent, render } from "@testing-library/react";
import NewProjectModal from "../components/NewProjectModal";
import {
  ProjectsProvider,
  useProjectsDispatch,
  newProject,
} from "../Context/projects/ProjectsContext";

jest.mock("../Context/projects/ProjectsContext.js", () => ({
  ...jest.requireActual("../Context/projects/ProjectsContext.js"),
  useProjectsDispatch: jest.fn(),
  newProject: jest.fn(),
}));

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const setup = (currentProject = null, isOpen = true) => {
  const mockSetIsNewProjectOpen = jest.fn();
  const utils = render(
    <ProjectsProvider currentProject={currentProject}>
      <NewProjectModal
        isNewProjectOpen={isOpen}
        setIsNewProjectOpen={mockSetIsNewProjectOpen}
      />
    </ProjectsProvider>
  );

  const projectsDispatch = useProjectsDispatch();
  const inputName = utils.getByTestId("input_name");
  const inputDescription = utils.getByTestId("input_description");
  const buttonNewProject = utils.getByTestId("button_new_project");
  const modal = utils.getByTestId("modal");

  return {
    ...utils,
    modal,
    projectsDispatch,
    mockSetIsNewProjectOpen,
    inputName,
    inputDescription,
    buttonNewProject,
  };
};

test("input name changes on input", () => {
  const { inputName } = setup();

  fireEvent.change(inputName, { target: { value: "test edit project name" } });

  expect(inputName.value).toBe("test edit project name");
});

test("input description changes on input", () => {
  const { inputDescription } = setup();

  fireEvent.change(inputDescription, {
    target: { value: "test edit project description" },
  });

  expect(inputDescription.value).toBe("test edit project description");
});

test("button calls newProject with to correct arguments and closes the modal", () => {
  const {
    inputName,
    inputDescription,
    projectsDispatch,
    mockSetIsNewProjectOpen,
    buttonNewProject,
  } = setup();

  const proj = {
    name: "test edit project name",
    description: "test edit project description",
  };
  fireEvent.change(inputName, { target: { value: proj.name } });
  fireEvent.change(inputDescription, {
    target: { value: proj.description },
  });

  fireEvent.click(buttonNewProject, { button: 0 });

  expect(newProject).toHaveBeenCalledWith(projectsDispatch, proj);
  expect(mockSetIsNewProjectOpen).toHaveBeenCalledWith(false);
});

test("pushes to /bugs of currentProject is set", () => {
  setup("test");

  expect(mockHistoryPush).toHaveBeenCalledWith("/bugs");
});

test("closes the modal when clicked", () => {
  const { modal, mockSetIsNewProjectOpen } = setup();

  fireEvent.click(modal, { button: 0 });

  expect(mockSetIsNewProjectOpen).toHaveBeenCalledWith(false);
});
