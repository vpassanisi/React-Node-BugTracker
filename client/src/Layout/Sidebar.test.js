import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Sidebar from "../Layout/Sidebar";
import { ProjectsProvider } from "../Context/projects/ProjectsContext";
import { AuthProvider, logout } from "../Context/auth/AuthContext";
import { DarkModeProvider } from "../Context/darkMode/DarkModeContext";

jest.mock("../Context/auth/AuthContext.js", () => ({
  ...jest.requireActual("../Context/auth/AuthContext.js"),
  logout: jest.fn(),
}));
const mockPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockPush,
  }),
}));

const setup = (darkMode = true, curentProject = {}, isAuth = true) => {
  const mockSetIsOpen = jest.fn();
  const mockSetIsNewBugOpen = jest.fn();
  const mockSetIsNewProjectOpen = jest.fn();

  const utils = render(
    <AuthProvider isAuthenticated={isAuth}>
      <ProjectsProvider currentProject={curentProject}>
        <DarkModeProvider isDarkMode={darkMode}>
          <Sidebar
            isOpen={true}
            setIsOpen={mockSetIsOpen}
            setIsNewBugOpen={mockSetIsNewBugOpen}
            setIsNewProjectOpen={mockSetIsNewProjectOpen}
          />
        </DarkModeProvider>
      </ProjectsProvider>
    </AuthProvider>
  );

  return {
    ...utils,
    mockSetIsOpen,
    mockSetIsNewProjectOpen,
    mockSetIsNewBugOpen,
  };
};

test("clicking the logout button calls logout and closes the sidebar", () => {
  const { getByText, mockSetIsOpen } = setup(true, {}, true);

  const buttonLogout = getByText("Logout");

  fireEvent.click(buttonLogout, { button: 0 });

  expect(logout).toHaveBeenCalled();
  expect(mockSetIsOpen).toHaveBeenCalledWith(false);
});

test("clicking the new project button opens the new project modal and closes the sidebar", () => {
  const { mockSetIsNewProjectOpen, getByText, mockSetIsOpen } = setup(
    true,
    null,
    true
  );

  const buttonNewProject = getByText("New Project");

  fireEvent.click(buttonNewProject, { button: 0 });

  expect(mockSetIsNewProjectOpen).toHaveBeenCalledWith(true);
  expect(mockSetIsOpen).toHaveBeenCalledWith(false);
});

test("clicking new bug open the new bug modal", () => {
  const { getByText, mockSetIsNewBugOpen, mockSetIsOpen } = setup(
    true,
    {},
    true
  );

  const buttonNewBug = getByText("New Bug");

  fireEvent.click(buttonNewBug, { button: 0 });

  expect(mockSetIsNewBugOpen).toHaveBeenCalledWith(true);
  expect(mockSetIsOpen).toHaveBeenCalledWith(false);
});

test("clicking the info button pushes to /info and closes the modal", () => {
  const { getByText, mockSetIsOpen } = setup(true, null, false);

  const buttonInfo = getByText("Info");

  fireEvent.click(buttonInfo, { button: 0 });

  expect(mockPush).toHaveBeenCalledWith("/info");
  expect(mockSetIsOpen).toHaveBeenCalledWith(false);
});

test("clicking the login button pushes to /login and closes the sidebar", () => {
  const { getByText, mockSetIsOpen } = setup(true, null, false);

  const buttonLogin = getByText("Login");

  fireEvent.click(buttonLogin, { button: 0 });

  expect(mockPush).toHaveBeenCalledWith("/login");
  expect(mockSetIsOpen).toHaveBeenCalledWith(false);
});

test("clicking the create user button pushes to /create and closes the sidebar", () => {
  const { getByText, mockSetIsOpen } = setup(true, null, false);

  const buttonCreate = getByText("Create User");

  fireEvent.click(buttonCreate, { button: 0 });

  expect(mockPush).toHaveBeenCalledWith("/create");
  expect(mockSetIsOpen).toHaveBeenCalledWith(false);
});

test("clicking the your projects button pushes to / and closes the sidebar", () => {
  const { getByText, mockSetIsOpen } = setup(true, {}, true);

  const buttonProjects = getByText("Your Projects");

  fireEvent.click(buttonProjects, { button: 0 });

  expect(mockPush).toHaveBeenCalledWith("/");
  expect(mockSetIsOpen).toHaveBeenCalledWith(false);
});
