import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { useMediaQuery } from "react-responsive";
import Navbar from "./Navbar";
import {
  DarkModeProvider,
  useDarkModeDispatch,
  darkModeOn,
  darkModeOff,
} from "../Context/darkMode/DarkModeContext";
import { ProjectsProvider } from "../Context/projects/ProjectsContext";
import {
  AuthProvider,
  useAuthDispatch,
  getMe,
  logout,
} from "../Context/auth/AuthContext";
import NewBugModal from "../components/NewBugModal";
import NewProjectModal from "../components/NewProjectModal";
import Sidebar from "./Sidebar";

jest.mock("../Context/auth/AuthContext.js", () => ({
  ...jest.requireActual("../Context/auth/AuthContext.js"),
  useAuthDispatch: jest.fn(),
  getMe: jest.fn(),
  logout: jest.fn(),
}));

jest.mock("../Context/darkMode/DarkModeContext.js", () => ({
  ...jest.requireActual("../Context/darkMode/DarkModeContext.js"),
  useDarkModeDispatch: jest.fn(),
  darkModeOff: jest.fn(),
  darkModeOn: jest.fn(),
}));

global.matchMedia = jest.fn(() => ({
  matches: true,
}));

const mockPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockPush,
  }),
}));

jest.mock("react-responsive", () => ({
  useMediaQuery: jest.fn(() => true),
}));

jest.mock("../components/NewBugModal.js", () => jest.fn(() => null));

jest.mock("../Layout/Sidebar.js", () => jest.fn(() => null));

jest.mock("../components/NewProjectModal.js", () => jest.fn(() => null));

jest.mock("../Layout/DarkModeToggle.js", () => jest.fn(() => null));

const setup = (darkMode = true, curentProject = {}, isAuth = true) => {
  const mockSetIsDark = jest.fn();

  const utils = render(
    <DarkModeProvider isDarkMode={darkMode}>
      <ProjectsProvider currentProject={curentProject}>
        <AuthProvider isAuthenticated={isAuth}>
          <Navbar setIsDark={mockSetIsDark} />
        </AuthProvider>
      </ProjectsProvider>
    </DarkModeProvider>
  );

  return {
    ...utils,
    mockSetIsDark,
  };
};

test("calls getMe when it mounts", () => {
  setup();

  expect(getMe).toHaveBeenCalled();
});

test("sets theme to dark when isDarkMode is true", () => {
  const { mockSetIsDark } = setup(true);

  expect(darkModeOn).toHaveBeenCalled();
  expect(mockSetIsDark).toHaveBeenCalledWith(true);
});

test("sets theme to light when isDarkMode is false", () => {
  const { mockSetIsDark } = setup(false);

  expect(darkModeOff).toHaveBeenCalled();
  expect(mockSetIsDark).toHaveBeenCalledWith(false);
});

test("clicking new bug button opens new bug modal", () => {
  const { getByText } = setup(true, {}, true);

  const buttonNewBug = getByText("New Bug");

  fireEvent.click(buttonNewBug, { button: 0 });

  const props = {
    isNewBugOpen: true,
    setIsNewBugOpen: expect.anything(),
  };

  expect(NewBugModal).toHaveBeenCalledWith(props, expect.anything());
});

test("clicking new project button opens new project modal", () => {
  const { getByText } = setup(true, null, true);

  const buttonNewProject = getByText("New Project");

  fireEvent.click(buttonNewProject, { button: 0 });

  const props = {
    isNewProjectOpen: true,
    setIsNewProjectOpen: expect.anything(),
  };

  expect(NewProjectModal).toHaveBeenCalledWith(props, expect.anything());
});

test("hamberger button opens sidebar", () => {
  useMediaQuery.mockImplementation(() => false);
  const { getByTestId } = setup();

  const hamburger = getByTestId("button_hamburger");

  fireEvent.click(hamburger, { button: 0 });

  const props = {
    isOpen: true,
    setIsOpen: expect.anything(),
    setIsNewBugOpen: expect.anything(),
    setIsNewProjectOpen: expect.anything(),
  };

  expect(Sidebar).toHaveBeenCalledWith(props, expect.anything());
});

test("clicking the info button pushes to /info", () => {
  useMediaQuery.mockImplementation(() => true);
  const { getByText } = setup(true, null, false);

  const buttonInfo = getByText("Info");

  fireEvent.click(buttonInfo, { button: 0 });

  expect(mockPush).toHaveBeenCalledWith("/info");
});

test("clicking logout button calls logout with args", () => {
  const { getByText } = setup(true, null, true);

  const buttonLogout = getByText("Logout");

  fireEvent.click(buttonLogout, { button: 0 });

  expect(logout).toHaveBeenCalled();
});

test("clicking your projects button pushes to /", () => {
  const { getByText } = setup(true, {}, true);

  const buttonProjects = getByText("Your Projects");

  fireEvent.click(buttonProjects, { button: 0 });

  expect(mockPush).toHaveBeenCalledWith("/");
});

test("clicking login button pushes to /login", () => {
  const { getByText } = setup(true, null, false);

  const buttonLogin = getByText("Login");

  fireEvent.click(buttonLogin, { button: 0 });

  expect(mockPush).toHaveBeenCalledWith("/login");
});

test("clicking create user button pushes /create", () => {
  const { getByText } = setup(true, null, false);

  const buttonCreate = getByText("Create User");

  fireEvent.click(buttonCreate, { button: 0 });

  expect(mockPush).toHaveBeenCalledWith("/create");
});
