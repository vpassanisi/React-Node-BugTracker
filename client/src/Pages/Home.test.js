import React from "react";
import { render } from "@testing-library/react";
import Home from "../Pages/Home";
import ProjectsContext from "../Context/projects/projectsContext";
import AuthContext from "../Context/auth/authContext";
import ProjectCard from "../components/ProjectCard";

jest.mock("../components/ProjectCard", () => jest.fn(() => null));

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const setup = (isAuth = true) => {
  const mockGetProjects = jest.fn();
  const mockClearCurrentProject = jest.fn();

  const utils = render(
    <ProjectsContext.Provider
      value={{
        clearCurrentProject: mockClearCurrentProject,
        projects: [{}, {}, {}, {}],
        getProjects: mockGetProjects,
      }}
    >
      <AuthContext.Provider
        value={{
          isAuthenticated: isAuth,
          isLoading: false,
        }}
      >
        <Home />
      </AuthContext.Provider>
    </ProjectsContext.Provider>
  );

  return {
    ...utils,
    mockClearCurrentProject,
    mockGetProjects,
  };
};

test("Pushes to /info if not authenticated", () => {
  setup(false);

  expect(mockHistoryPush).toHaveBeenCalledWith("/info");
});

test("calls getProjects if authenticated", () => {
  const { mockGetProjects } = setup(true);

  expect(mockGetProjects).toHaveBeenCalled();
});

test("always clears current project to avoid conflicts with routing", () => {
  const { mockClearCurrentProject } = setup(true);

  expect(mockClearCurrentProject).toHaveBeenCalled();
});

test("renders projects as children", () => {
  setup(true);

  expect(ProjectCard).toHaveBeenCalled();
});
