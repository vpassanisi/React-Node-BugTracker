import React from "react";
import { fireEvent, render } from "@testing-library/react";
import ProjectsContext from "../Context/projects/projectsContext";
import EditProjectModal from "../components/EditProjectModal";

const setup = () => {
  const mockEditProject = jest.fn();
  const mockSetIsEditProjectOpen = jest.fn();

  const props = {
    index: 2,
    project: {
      _id: "5e6c8473f2364c0017366583",
      bugsCount: 4,
      name: "test name",
      description: "test description",
      user: "5e28fda6126f2238701df213",
      createdAt: "2020-03-14T07:14:59.307+00:00",
      updatedAt: "2020-03-14T07:14:59.307+00:00",
    },
    isEditProjectOpen: true,
  };

  const utils = render(
    <ProjectsContext.Provider
      value={{
        editProject: mockEditProject,
      }}
    >
      <EditProjectModal
        index={props.index}
        project={props.project}
        isEditProjectOpen={props.isEditProjectOpen}
        setIsEditProjectOpen={mockSetIsEditProjectOpen}
      />
    </ProjectsContext.Provider>
  );

  const buttonEditProject = utils.getByTestId("button_edit_project");
  const inputName = utils.getByTestId("input_name");
  const inputDescription = utils.getByTestId("input_description");
  const modal = utils.getByTestId("modal");

  return {
    ...utils,
    props,
    modal,
    mockEditProject,
    mockSetIsEditProjectOpen,
    buttonEditProject,
    inputName,
    inputDescription,
  };
};

test("Has input for name and changes on input", () => {
  const { inputName } = setup();

  fireEvent.change(inputName, { target: { value: "test edit name" } });

  expect(inputName.value).toBe("test edit name");
});

test("Has input for description and changes on input", () => {
  const { inputDescription } = setup();

  fireEvent.change(inputDescription, {
    target: { value: "test edit description" },
  });

  expect(inputDescription.value).toBe("test edit description");
});

test("edit button closes the modal", () => {
  const { buttonEditProject, mockSetIsEditProjectOpen } = setup();

  fireEvent.click(buttonEditProject, { button: 0 });

  expect(mockSetIsEditProjectOpen).toHaveBeenCalledWith(false);
});

test("clicking the modal closes the modal", () => {
  const { modal, mockSetIsEditProjectOpen } = setup();

  fireEvent.click(modal, { button: 0 });

  expect(mockSetIsEditProjectOpen).toHaveBeenCalledWith(false);
});

test("Calls updateProject with the correct arguments", () => {
  const {
    inputName,
    inputDescription,
    buttonEditProject,
    mockEditProject,
    props,
  } = setup();

  let editedProps = { ...props };
  editedProps.project.name = "test edit name";
  editedProps.project.description = "test edit description";

  fireEvent.change(inputName, {
    target: { value: editedProps.project.name },
  });

  fireEvent.change(inputDescription, {
    target: { value: editedProps.project.description },
  });

  fireEvent.click(buttonEditProject, { button: 0 });

  expect(mockEditProject).toHaveBeenCalledWith(
    editedProps.project,
    editedProps.index
  );
});
