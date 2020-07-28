import React from "react";
import { fireEvent, render } from "@testing-library/react";
import ProjectCard from "../components/ProjectCard";
import {
  ProjectsProvider,
  useProjectsDispatch,
  setProject,
  deleteProject,
} from "../Context/projects/ProjectsContext";
import EditProjectModal from "../components/EditProjectModal";

jest.mock("../Context/projects/ProjectsContext.js", () => ({
  ...jest.requireActual("../Context/projects/ProjectsContext.js"),
  useProjectsDispatch: jest.fn(),
  setProject: jest.fn(),
  deleteProject: jest.fn(),
}));

jest.mock("../components/EditProjectModal", () => jest.fn(() => null));

const setup = () => {
  const props = {
    project: {
      _id: "5e6c8473f2364c0017366583",
      bugsCount: 4,
      name: "test name",
      description: "test description",
      user: "5e28fda6126f2238701df213",
      createdAt: "2020-03-14T07:14:59.307+00:00",
      updatedAt: "2020-03-14T07:14:59.307+00:00",
    },
    index: 8,
  };

  const utils = render(
    <ProjectsProvider>
      <ProjectCard project={props.project} index={props.index} />
    </ProjectsProvider>
  );

  const projectsDispatch = useProjectsDispatch();
  const buttonDelete = utils.getByTestId("button_delete");
  const buttonEdit = utils.getByTestId("button_edit");
  const buttonGoTo = utils.getByTestId("button_go_to");

  return {
    ...utils,
    props,
    projectsDispatch,
    buttonDelete,
    buttonEdit,
    buttonGoTo,
  };
};

test("Renders a delete button and does not delete the project when clicked and confirm is false", () => {
  const { buttonDelete } = setup();

  global.confirm = () => false;
  expect(buttonDelete).toBeInTheDocument();

  fireEvent.click(buttonDelete, { button: 0 });

  expect(deleteProject).not.toHaveBeenCalled();
});

test("Renders a delete button and deletes the project when clicked and confirm is true", () => {
  const { buttonDelete, projectsDispatch, props } = setup();

  global.confirm = () => true;

  fireEvent.click(buttonDelete, { button: 0 });

  expect(deleteProject).toHaveBeenCalledWith(
    projectsDispatch,
    props.project._id,
    props.index
  );
});

test("renders edit project modal", () => {
  const { buttonEdit, props } = setup();

  fireEvent.click(buttonEdit, { button: 0 });

  expect(EditProjectModal).toHaveBeenCalledWith(
    expect.objectContaining({
      index: props.index,
      project: props.project,
      isEditProjectOpen: true,
      setIsEditProjectOpen: expect.anything(),
    }),
    expect.anything()
  );
});

test("Renders number of bugs correctly", () => {
  const { props, getByText } = setup();

  expect(getByText(`${props.project.bugsCount}`)).toBeInTheDocument();
});

test("Renders name", () => {
  const { props, getByText } = setup();

  expect(getByText(`${props.project.name}`)).toBeInTheDocument();
});

test("Renders description", () => {
  const { props, getByText } = setup();

  expect(getByText(`${props.project.description}`)).toBeInTheDocument();
});

test("Sets project when button is clicked", () => {
  const { buttonGoTo, projectsDispatch, props } = setup();

  fireEvent.click(buttonGoTo, { button: 0 });

  expect(setProject).toHaveBeenCalledWith(projectsDispatch, props.project._id);
});
