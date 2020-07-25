import React from "react";
import { render } from "@testing-library/react";
import Home from "../Pages/Home";
import {
  ProjectsProvider,
  getProjects,
  clearCurrentProject,
} from "../Context/projects/ProjectsContext";
import { AuthProvider } from "../Context/auth/AuthContext";
import ProjectCard from "../components/ProjectCard";

jest.mock("../Context/auth/AuthContext.js", () => ({
  ...jest.requireActual("../Context/auth/AuthContext.js"),
  useAuthDispatch: jest.fn(),
  login: jest.fn(),
}));

jest.mock("../Context/projects/ProjectsContext.js", () => ({
  ...jest.requireActual("../Context/projects/ProjectsContext.js"),
  useProjectsDispatch: jest.fn(),
  getProjects: jest.fn(),
  clearCurrentProject: jest.fn(),
}));

jest.mock("../components/ProjectCard", () => jest.fn(() => null));

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const setup = (isAuth = true) => {
  const utils = render(
    <ProjectsProvider projects={[{}, {}, {}]}>
      <AuthProvider isAuthenticated={isAuth} isLoading={false}>
        <Home />
      </AuthProvider>
    </ProjectsProvider>
  );

  return {
    ...utils,
  };
};

test("Pushes to /info if not authenticated and not loading", () => {
  setup(false);

  expect(mockHistoryPush).toHaveBeenCalledWith("/info");
});

test("calls getProjects if authenticated and not loading", () => {
  setup();

  expect(getProjects).toHaveBeenCalled();
});

test("always clears current project to avoid conflicts with routing", () => {
  setup();

  expect(clearCurrentProject).toHaveBeenCalled();
});

test("renders projects as children", () => {
  setup();

  expect(ProjectCard).toHaveBeenCalled();
});
