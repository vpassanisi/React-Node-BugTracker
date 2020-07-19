import React from "react";
import { fireEvent, render } from "@testing-library/react";
import ProjectCard from "../components/ProjectCard";
import ProjectsContext from "../Context/projects/projectsContext";
import EditProjectModal from "../components/EditProjectModal";

jest.mock("../components/EditProjectModal", () => {
  return jest.fn(() => null);
});

const setup = () => {
  const mockSetProject = jest.fn();
  const mockDeleteProject = jest.fn();

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
    <ProjectsContext.Provider
      value={{
        setProject: mockSetProject,
        deleteProject: mockDeleteProject,
      }}
    >
      <ProjectCard project={props.project} index={props.index} />
    </ProjectsContext.Provider>
  );

  const buttonDelete = utils.getByTestId("button_delete");
  const buttonEdit = utils.getByTestId("button_edit");
  const buttonGoTo = utils.getByTestId("button_go_to");

  return {
    ...utils,
    props,
    mockDeleteProject,
    mockSetProject,
    buttonDelete,
    buttonEdit,
    buttonGoTo,
  };
};

test("Renders a delete button and deletes the project when clicked and confirm is true", () => {
  const { buttonDelete, mockDeleteProject } = setup();

  global.confirm = () => true;
  expect(buttonDelete).toBeInTheDocument();

  fireEvent.click(buttonDelete, { button: 0 });

  expect(mockDeleteProject).toHaveBeenCalled();
  expect(mockDeleteProject.mock.calls[0][0]).toBe("5e6c8473f2364c0017366583");
  expect(mockDeleteProject.mock.calls[0][1]).toBe(8);
});
test("Renders a delete button and does not delete the project when clicked and confirm is false", () => {
  const { buttonDelete, mockDeleteProject } = setup();

  global.confirm = () => false;
  expect(buttonDelete).toBeInTheDocument();

  fireEvent.click(buttonDelete, { button: 0 });

  expect(mockDeleteProject).not.toHaveBeenCalled();
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
  const { buttonGoTo, mockSetProject } = setup();

  fireEvent.click(buttonGoTo, { button: 0 });

  expect(mockSetProject).toHaveBeenCalled();
});
